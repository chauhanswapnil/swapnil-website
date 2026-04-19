"use client";

import Link from "next/link";

import { trackEvent } from "../../lib/analytics";

export default function TrackedLink({
  href,
  children,
  className,
  eventName,
  eventParams,
  external = false,
  ...props
}) {
  const handleClick = () => {
    if (eventName) {
      trackEvent(eventName, eventParams);
    }
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
