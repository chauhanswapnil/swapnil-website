"use client";

import { useEffect, useState } from "react";

// Which modifier key to name in shortcut hints. Assume a Mac on the server so
// the markup matches the majority case, then correct it once mounted.
//
// userAgentData is the supported route; navigator.platform is deprecated but
// still the only thing Safari and Firefox offer, so it stays as the fallback.
function detectMac() {
  const platform =
    window.navigator.userAgentData?.platform || window.navigator.platform || "";

  return /mac|iphone|ipad|ipod/i.test(platform);
}

export default function useIsMac() {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(detectMac());
  }, []);

  return isMac;
}
