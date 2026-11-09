"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

import BrowserFrame from "./BrowserFrame";
import styles from "./agentcam.module.css";

// A list of features on one side and the screenshot of the picked one on the
// other. Follows the ARIA tabs pattern: arrow keys move between tabs.
export default function Showcase({ items, label }) {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const baseId = useId();

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
      setActive(next);
      tabs.current[next]?.focus();
    }
  }

  return (
    <div className={styles.showcase}>
      <div
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
              onClick={() => setActive(index)}
            >
              <span className={styles.showcaseTabTitle}>
                <span className={styles.kindDot} data-kind={item.kind} aria-hidden="true" />
                {item.title}
              </span>
              <span className={styles.showcaseTabBody}>{item.body}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.showcasePanels}>
        {items.map((item, index) => (
          <div
            key={item.id}
            role="tabpanel"
            id={`${baseId}-panel-${item.id}`}
            aria-labelledby={`${baseId}-tab-${item.id}`}
            hidden={index !== active}
            className={styles.showcasePanel}
          >
            <p className={styles.panelBody}>{item.body}</p>
            <BrowserFrame path={item.path}>
              <Image
                src={item.src}
                alt={item.alt}
                width={1920}
                height={1280}
                sizes="(max-width: 960px) 92vw, 60vw"
                className={styles.shot}
              />
            </BrowserFrame>
          </div>
        ))}
      </div>
    </div>
  );
}
