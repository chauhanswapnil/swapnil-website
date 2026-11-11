import Image from "next/image";
import Link from "next/link";

import styles from "./orion.module.css";

export const metadata = {
  title: "RunRecount - Runs, hikes, and walks in one place",
  description:
    "RunRecount brings runs, hikes, walks, recovery, routes, and progress into one private iPhone app.",
  alternates: {
    canonical: "/runrecount",
  },
  openGraph: {
    type: "website",
    url: "https://swapnilchauhan.com/runrecount",
    title: "RunRecount - Runs, hikes, and walks in one place",
    description:
      "Runs, hikes, walks, recovery, and progress in one private iPhone app.",
    images: [
      {
        url: "/runrecount/app-icon.png",
        width: 1024,
        height: 1024,
        alt: "RunRecount app icon",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "RunRecount - Runs, hikes, and walks in one place",
    description:
      "Runs, hikes, walks, recovery, and progress in one private iPhone app.",
    images: ["/runrecount/app-icon.png"],
  },
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="m4 10 4 4 8-9" />
    </svg>
  );
}

function PhoneFrame({ src, alt, className = "", priority = false, sizes }) {
  return (
    <div className={`${styles.phoneFrame} ${className}`}>
      <div className={styles.phoneScreen}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={styles.phoneImage}
        />
      </div>
    </div>
  );
}

export default function RunRecountPage() {
  return (
    <article className={styles.page}>
      <section className={styles.hero} aria-labelledby="runrecount-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.brandLockup}>
              <Image
                src="/runrecount/app-icon.png"
                alt=""
                width={76}
                height={76}
                priority
                className={styles.brandIcon}
              />
              <span>RunRecount</span>
            </div>
            <h1 id="runrecount-title">Runs, hikes, and walks in one place.</h1>
            <p>
              RunRecount brings runs, hikes, walks, recovery, routes, and progress into
              one private iPhone app.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href="#features">
                Explore RunRecount
                <ArrowIcon />
              </Link>
              <Link className={styles.textAction} href="/runrecount/privacy_policy">
                Privacy by design
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual} aria-label="RunRecount readiness screen">
            <div className={styles.heroGlow} aria-hidden="true" />
            <PhoneFrame
              src="/runrecount/01-readiness.png"
              alt="RunRecount Home screen showing a Good readiness score and recent runs"
              priority
              sizes="(max-width: 760px) 78vw, 420px"
              className={styles.heroPhone}
            />
          </div>
        </div>
      </section>

      <section id="features" className={styles.runsSection} aria-labelledby="runs-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Your activity history</p>
          <h2 id="runs-title">Your runs, hikes, and walks.</h2>
        </div>

        <div className={styles.runsStage}>
          <div className={`${styles.featureCopy} ${styles.activitiesCopy}`}>
            <span className={styles.featureNumber}>01</span>
            <h3>Every activity, easy to find.</h3>
            <p>
              Browse a clean activity history with pace, distance, effort, and
              the details of each run, hike, and walk.
            </p>
          </div>

          <div className={styles.phonePair}>
            <PhoneFrame
              src="/runrecount/02-run-history.png"
              alt="RunRecount Activities screen with a list of recent runs"
              sizes="(max-width: 760px) 42vw, 290px"
              className={styles.activitiesPhone}
            />
            <PhoneFrame
              src="/runrecount/04-running-map.png"
              alt="RunRecount Map screen with running routes across the city"
              sizes="(max-width: 760px) 42vw, 290px"
              className={styles.mapPhone}
            />
          </div>

          <div className={`${styles.featureCopy} ${styles.mapCopy}`}>
            <span className={styles.featureNumber}>02</span>
            <h3>See where every mile takes you.</h3>
            <p>
              Turn your routes into a personal activity map and spot the places
              you keep coming back to.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.statsSection} aria-labelledby="stats-title">
        <div className={styles.statsInner}>
          <div className={styles.statsCopy}>
            <p className={styles.eyebrow}>Progress without the noise</p>
            <h2 id="stats-title">See your progress add up.</h2>
            <p>
              Clear trends make the work visible-without turning every run into
              a spreadsheet.
            </p>
            <ul className={styles.statList}>
              <li>
                <CheckIcon /> Training load and recovery in context
              </li>
              <li>
                <CheckIcon /> Trends for pace, distance, and heart rate
              </li>
              <li>
                <CheckIcon /> Milestones worth noticing
              </li>
            </ul>
          </div>

          <div className={styles.statsVisual}>
            <div className={styles.statsOrb} aria-hidden="true" />
            <PhoneFrame
              src="/runrecount/03-progress.png"
              alt="RunRecount Stats screen showing running totals and weekly distance trends"
              sizes="(max-width: 760px) 74vw, 390px"
              className={styles.statsPhone}
            />
          </div>
        </div>
      </section>

      <section className={styles.momentsSection} aria-labelledby="moments-title">
        <div className={styles.momentsShade} aria-hidden="true" />
        <div className={styles.momentsInner}>
          <div className={styles.momentsVisual}>
            <PhoneFrame
              src="/runrecount/05-moments.png"
              alt="RunRecount Moments screen highlighting a standout run"
              sizes="(max-width: 760px) 74vw, 390px"
              className={styles.momentsPhone}
            />
          </div>
          <div className={styles.momentsCopy}>
            <p className={styles.eyebrow}>The runs you will remember</p>
            <h2 id="moments-title">Remember the runs that mattered.</h2>
            <p>
              RunRecount brings records, breakthroughs, and standout efforts back
              into view.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.privacySection} aria-labelledby="privacy-title">
        <div className={styles.privacyInner}>
          <div className={styles.privacyHeading}>
            <p className={styles.eyebrow}>Private by default</p>
            <h2 id="privacy-title">Your health data stays yours.</h2>
            <Link className={styles.privacyLink} href="/runrecount/privacy_policy">
              Read the privacy policy
              <ArrowIcon />
            </Link>
          </div>
          <ul className={styles.privacyProofs}>
            <li>
              <span aria-hidden="true">01</span>
              <strong>No account</strong>
              <p>No sign-up or profile required.</p>
            </li>
            <li>
              <span aria-hidden="true">02</span>
              <strong>No ads</strong>
              <p>Your attention stays on your training.</p>
            </li>
            <li>
              <span aria-hidden="true">03</span>
              <strong>No third-party analytics in the app</strong>
              <p>Your health data is not used to track you.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.finalSection} aria-labelledby="final-title">
        <div className={styles.finalInner}>
          <Image
            src="/runrecount/app-icon.png"
            alt="RunRecount app icon"
            width={112}
            height={112}
            className={styles.finalIcon}
          />
          <div>
            <p className={styles.eyebrow}>Built for iPhone</p>
            <h2 id="final-title">Meet RunRecount for iPhone.</h2>
          </div>
          <a
            className={styles.primaryAction}
            href="mailto:mail@swapnilchauhan.com?subject=RunRecount"
          >
            Ask about RunRecount
            <ArrowIcon />
          </a>
        </div>
      </section>
    </article>
  );
}
