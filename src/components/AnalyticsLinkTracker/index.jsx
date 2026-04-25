"use client";

import { useEffect } from "react";

import { trackEventFromElement } from "../../lib/analytics";

export default function AnalyticsLinkTracker() {
  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target instanceof Element
        ? event.target.closest("[data-analytics-event]")
        : null;

      trackEventFromElement(target);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
