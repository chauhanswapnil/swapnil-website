export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export function trackEventFromElement(element) {
  if (!element) {
    return;
  }

  const eventName = element.dataset.analyticsEvent;

  if (!eventName) {
    return;
  }

  try {
    const params = element.dataset.analyticsParams
      ? JSON.parse(element.dataset.analyticsParams)
      : {};

    trackEvent(eventName, params);
  } catch {
    trackEvent(eventName);
  }
}
