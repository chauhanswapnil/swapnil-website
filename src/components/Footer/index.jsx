import { site } from "../../content/site";
import TrackedLink from "../TrackedLink";
import styles from "./index.module.css";

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
      fill="currentColor"
    />
  </svg>
);

const RssIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 11a9 9 0 0 1 9 9" />
    <path d="M4 4a16 16 0 0 1 16 16" />
    <circle cx="5" cy="19" r="1.5" fill="currentColor" />
  </svg>
);

const SOCIALS = [
  {
    label: site.email,
    href: `mailto:${site.email}`,
    type: "email",
    external: false,
    Icon: MailIcon,
  },
  {
    label: "chauhanswapnil",
    href: site.githubUrl,
    type: "github",
    external: true,
    Icon: GithubIcon,
  },
  {
    label: "swapstar",
    href: site.xUrl,
    type: "x",
    external: true,
    Icon: XIcon,
  },
  {
    label: "RSS",
    href: "/feed.xml",
    type: "rss",
    external: true,
    Icon: RssIcon,
  },
];

export default function Footer() {
  return (
    <footer className={styles.footerCustom}>
      <div className={styles.inner}>
        <div className={styles.blurb}>
          <p className={styles.name}>{site.name}</p>
          <p className={styles.note}>
            Written and built in London. Say hello — I answer my email.
          </p>
        </div>

        <div className={styles.socialLinks}>
          {SOCIALS.map(({ label, href, type, external, Icon }) => (
            <TrackedLink
              key={type}
              href={href}
              className={styles.socialLink}
              external={external}
              eventName="nav_link_click"
              eventParams={{
                location: "footer",
                link_type: type,
                target_url: href,
              }}
            >
              <Icon />
              {label}
            </TrackedLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
