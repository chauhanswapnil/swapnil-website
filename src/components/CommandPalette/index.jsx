"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { trackEvent } from "../../lib/analytics";
import useIsMac from "../../lib/useIsMac";
import styles from "./index.module.css";

const RESULTS_ID = "command-palette-results";
const rowId = (position) => `command-palette-row-${position}`;

const KIND_LABELS = {
  page: "Page",
  post: "Post",
  project: "Project",
  link: "Link",
  action: "Action",
};

const KIND_ORDER = ["action", "page", "post", "project", "link"];

// Subsequence match: every character of the query must appear in order.
// Runs of adjacent characters and matches at a word boundary score higher,
// so typing "lox" ranks "Lox Playground" above "Lessons ... Oxford".
function fuzzyScore(query, text) {
  if (!query) {
    return 0;
  }

  const haystack = text.toLowerCase();
  const needle = query.toLowerCase();

  let score = 0;
  let cursor = 0;
  let streak = 0;

  for (const character of needle) {
    const found = haystack.indexOf(character, cursor);
    if (found === -1) {
      return -1;
    }

    if (found === cursor && cursor > 0) {
      streak += 1;
      score += 6 + streak * 2;
    } else {
      streak = 0;
      score += 1;
    }

    if (found === 0 || /[\s\-–—/·.]/.test(haystack[found - 1])) {
      score += 8;
    }

    cursor = found + 1;
  }

  // Prefer shorter titles when the match is otherwise equal.
  return score - haystack.length * 0.05;
}

function scoreEntry(query, entry) {
  const titleScore = fuzzyScore(query, entry.title);
  if (titleScore >= 0) {
    return titleScore + 30;
  }

  const subtitleScore = fuzzyScore(query, entry.subtitle || "");
  if (subtitleScore >= 0) {
    return subtitleScore + 10;
  }

  const keywords = (entry.keywords || []).join(" ");
  return fuzzyScore(query, keywords);
}

export default function CommandPalette({ index = [] }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const isMac = useIsMac();

  const inputRef = useRef(null);
  const listRef = useRef(null);
  const returnFocusTo = useRef(null);

  const actions = useMemo(
    () => [
      {
        id: "action-theme",
        kind: "action",
        title: "Toggle light and dark",
        subtitle: "Switch the colour scheme",
        keywords: ["theme", "dark", "light", "mode", "colour", "color"],
        run: () => {
          const root = document.documentElement;
          const next = root.dataset.theme === "light" ? "dark" : "light";
          root.dataset.theme = next;
          root.dataset.colorMode = next;
          root.style.colorScheme = next;
          window.localStorage.setItem("theme-preference", next);
          window.dispatchEvent(
            new CustomEvent("themechange", { detail: { theme: next } }),
          );
        },
      },
      {
        id: "action-top",
        kind: "action",
        title: "Scroll to top",
        subtitle: "Back to the start of the page",
        keywords: ["top", "up", "start"],
        run: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      },
    ],
    [],
  );

  const entries = useMemo(() => [...actions, ...index], [actions, index]);

  const results = useMemo(() => {
    if (!query.trim()) {
      // With an empty box, show a useful default rather than everything.
      return [...entries]
        .sort(
          (left, right) =>
            KIND_ORDER.indexOf(left.kind) - KIND_ORDER.indexOf(right.kind),
        )
        .slice(0, 8);
    }

    return entries
      .map((entry) => ({ entry, score: scoreEntry(query.trim(), entry) }))
      .filter((row) => row.score >= 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, 12)
      .map((row) => row.entry);
  }, [entries, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const select = useCallback(
    (entry) => {
      if (!entry) {
        return;
      }

      trackEvent("command_palette_select", {
        kind: entry.kind,
        target: entry.href || entry.id,
      });

      if (entry.run) {
        entry.run();
        close();
        return;
      }

      close();

      if (entry.external) {
        window.open(entry.href, "_blank", "noreferrer");
        return;
      }

      router.push(entry.href);
    },
    [close, router],
  );

  // Global shortcuts: Cmd/Ctrl+K anywhere, or "/" when not already typing.
  useEffect(() => {
    function onKeyDown(event) {
      const key = event.key.toLowerCase();
      const inField = /^(input|textarea|select)$/i.test(
        event.target?.tagName || "",
      ) || event.target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        setOpen((current) => !current);
        return;
      }

      // Bare "/" only. With a modifier held it belongs to the browser —
      // Ctrl+/ and Cmd+/ are bound to other things in several of them.
      const bareKey =
        !event.metaKey && !event.ctrlKey && !event.altKey;

      if (key === "/" && bareKey && !inField && !open) {
        event.preventDefault();
        setOpen(true);
      }
    }

    function onRequestOpen() {
      setOpen(true);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onRequestOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onRequestOpen);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    trackEvent("command_palette_open", {});

    // Send focus back where it came from on close, so closing the palette with
    // Escape leaves the reader on the control they opened it from.
    returnFocusTo.current = document.activeElement;
    const timer = setTimeout(() => inputRef.current?.focus(), 20);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = overflow;

      const previous = returnFocusTo.current;
      returnFocusTo.current = null;
      if (previous instanceof HTMLElement && document.contains(previous)) {
        previous.focus();
      }
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-row="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  // Bound to the panel rather than the input, so Escape still closes and Tab
  // still stays put wherever focus has ended up inside the dialog.
  function onPanelKeyDown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    // The input is the only focusable thing in here — the rows are listbox
    // options driven from the input, per the combobox pattern. So Tab has
    // nowhere legitimate to go, and letting it through would walk focus out
    // into the page behind a dialog marked aria-modal.
    if (event.key === "Tab") {
      event.preventDefault();
      inputRef.current?.focus();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => (current + 1) % Math.max(1, results.length));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive(
        (current) =>
          (current - 1 + Math.max(1, results.length)) %
          Math.max(1, results.length),
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      select(results[active]);
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className={styles.scrim}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          close();
        }
      }}
    >
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Search this site"
        onKeyDown={onPanelKeyDown}
      >
        <div className={styles.inputRow}>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts, projects and pages…"
            aria-label="Search posts, projects and pages"
            role="combobox"
            aria-expanded="true"
            aria-controls={RESULTS_ID}
            aria-autocomplete="list"
            aria-activedescendant={
              results[active] ? rowId(active) : undefined
            }
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className={styles.escHint}>esc</kbd>
        </div>

        <ul
          className={styles.results}
          ref={listRef}
          id={RESULTS_ID}
          role="listbox"
          aria-label="Results"
        >
          {results.length === 0 ? (
            <li className={styles.empty} role="presentation">
              Nothing matches “{query}”. Try a language, a project, or a word
              from a post title.
            </li>
          ) : (
            results.map((entry, position) => (
              // The row is the option itself. A button inside it would be a
              // second interactive element the listbox has no way to describe,
              // and focus stays on the input either way.
              <li
                key={entry.id}
                id={rowId(position)}
                role="option"
                aria-selected={position === active}
                data-row={position}
                className={`${styles.row} ${position === active ? styles.rowActive : ""}`}
                onMouseMove={() => setActive(position)}
                onClick={() => select(entry)}
              >
                <span className={styles.rowText}>
                  <span className={styles.rowTitle}>{entry.title}</span>
                  {entry.subtitle ? (
                    <span className={styles.rowSubtitle}>{entry.subtitle}</span>
                  ) : null}
                </span>
                <span className={styles.kind}>
                  {KIND_LABELS[entry.kind] || entry.kind}
                </span>
              </li>
            ))
          )}
        </ul>

        <footer className={styles.footer}>
          <span>
            <kbd className={styles.key}>↑</kbd>
            <kbd className={styles.key}>↓</kbd> to move
          </span>
          <span>
            <kbd className={styles.key}>↵</kbd> to open
          </span>
          <span>
            <kbd className={styles.key}>{isMac ? "⌘" : "Ctrl"}</kbd>
            <kbd className={styles.key}>K</kbd> to toggle
          </span>
        </footer>
      </div>
    </div>
  );
}
