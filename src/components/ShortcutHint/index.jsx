"use client";

import useIsMac from "../../lib/useIsMac";

// The homepage is a server component, so the one line on it that has to know
// which keyboard the reader is on lives here instead.
export default function ShortcutHint({ className, kbdClassName }) {
  const modifier = useIsMac() ? "⌘" : "Ctrl";

  return (
    <p className={className}>
      Press <kbd className={kbdClassName}>{modifier}</kbd>
      <kbd className={kbdClassName}>K</kbd> to search this site.
    </p>
  );
}
