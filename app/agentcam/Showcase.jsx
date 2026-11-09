"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import BrowserFrame from "./BrowserFrame";
import styles from "./agentcam.module.css";

const ADVANCE_MS = 7000;

// A list of features on one side and the screenshot of the picked one on the
// other. Follows the ARIA tabs pattern: arrow keys move between tabs.
//
// While the showcase is on screen it moves to the next tab every few seconds,
// with a line in the open tab showing how long is left. It pauses while the
// pointer or focus is inside, and stops for good once someone picks a tab.
// Nobody who asked for reduced motion gets it.
export default function Showcase({ items, label }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false);
  const root = useRef(null);
  const list = useRef(null);
  const tabs = useRef([]);
  const baseId = useId();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAuto(!reduced.matches);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.45 },
    );
    if (root.current) {
      observer.observe(root.current);
    }
    return () => observer.disconnect();
  }, []);

  // When tabs sit in a sideways-scrolling row (narrow screens), keep the open
  // one in view without moving the page.
  useEffect(() => {
    const row = list.current;
    const tab = tabs.current[active];
    if (!row || !tab || row.scrollWidth <= row.clientWidth) {
      return;
    }
    const left = tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2;
    row.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  function choose(index) {
    setAuto(false);
    setActive(index);
  }

  function advance() {
    setActive((current) => (current + 1) % items.length);
  }

  function onKeyDown(event) {
    const last = items.length - 1;
    let next = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = active === last ? 0 : active + 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = active === 0 ? last : active - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    }
    if (next !== null) {
      event.preventDefault();
      choose(next);
      tabs.current[next]?.focus();
    }
  }

  const running = auto && inView && !held;

  return (
    <div
      ref={root}
      className={styles.showcase}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setHeld(false);
        }
      }}
    >
      <div
        ref={list}
        className={styles.showcaseTabs}
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
      >
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              className={styles.showcaseTab}
              onClick={() => choose(index)}
            >
              <span className={styles.showcaseTabTitle}>
                <span className={styles.kindDot} data-kind={item.kind} aria-hidden="true" />
                {item.title}
              </span>
              <span className={styles.showcaseTabBody}>
                <span>{item.body}</span>
              </span>
              {selected && auto ? (
                <span
                  key={`progress-${active}`}
                  className={styles.showcaseProgress}
                  data-kind={item.kind}
                  style={{
                    animationDuration: `${ADVANCE_MS}ms`,
                    animationPlayState: running ? "running" : "paused",
                  }}
                  onAnimationEnd={advance}
                  aria-hidden="true"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className={styles.showcasePanels}>
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <div
              key={item.id}
              role="tabpanel"
              id={`${baseId}-panel-${item.id}`}
              aria-labelledby={`${baseId}-tab-${item.id}`}
              aria-hidden={!selected}
              // React 18 passes unknown attributes through as strings.
              {...(selected ? {} : { inert: "" })}
              data-active={selected}
              className={styles.showcasePanel}
            >
              <p className={styles.panelBody}>{item.body}</p>
              <BrowserFrame path={item.path}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1920}
                  height={1280}
                  sizes="(max-width: 1050px) 92vw, 60vw"
                  className={styles.shot}
                />
              </BrowserFrame>
            </div>
          );
        })}
      </div>
    </div>
  );
}
