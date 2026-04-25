import Link from "next/link";

export default function TrackedLink({
  href,
  children,
  className,
  eventName,
  eventParams,
  external = false,
  ...props
}) {
  const analyticsProps = eventName
    ? {
        "data-analytics-event": eventName,
        "data-analytics-params": JSON.stringify(eventParams ?? {}),
      }
    : {};

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        {...analyticsProps}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} {...analyticsProps} {...props}>
      {children}
    </Link>
  );
}
