import styles from "./privacyPolicy.module.css";

const APPLE_PRIVACY_URL = "https://www.apple.com/legal/privacy/";
const APPLE_MAPS_PRIVACY_URL =
  "https://www.apple.com/legal/privacy/data/en/apple-maps/";
const GOOGLE_PRIVACY_URL = "https://policies.google.com/privacy";

export const metadata = {
  title: "RunRecount Privacy Policy",
  description:
    "How RunRecount handles Apple Health data, location, app preferences, and website analytics.",
  alternates: {
    canonical: "/runrecount/privacy_policy",
  },
  openGraph: {
    title: "RunRecount Privacy Policy | Swapnil Chauhan",
    description:
      "How RunRecount handles Apple Health data, location, app preferences, and website analytics.",
    url: "https://swapnilchauhan.com/runrecount/privacy_policy",
    type: "website",
  },
};

export default function RunRecountPrivacyPolicyPage() {
  return (
    <div className={`pageShell ${styles.page}`}>
      <article className={styles.article}>
        <header className={styles.header}>
          <p className={`${styles.productName} mutedText`}>RunRecount</p>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={`${styles.lead} softText`}>
            RunRecount is built to help you understand your runs, hikes, and walks while keeping
            your health data under your control.
          </p>
          <p className={`${styles.updated} mutedText`}>
            Effective August 3, 2026
          </p>
        </header>

        <div className={styles.summary}>
          <h2>The short version</h2>
          <p>
            RunRecount does not require an account, show ads, or include third-party
            analytics in the app. Your activity history and core analytics stay on
            your device. RunRecount reads only the Apple Health data you allow and
            uses it to provide the app&apos;s features.
          </p>
        </div>

        <section>
          <h2>1. Scope</h2>
          <p>
            This Privacy Policy explains how the RunRecount iOS app (&quot;RunRecount&quot;)
            handles information. It also explains the limited analytics used on
            this website, which hosts RunRecount&apos;s privacy policy.
          </p>
        </section>

        <section>
          <h2>2. Information RunRecount accesses</h2>

          <h3>Apple Health data</h3>
          <p>
            If you grant permission, RunRecount reads the health and fitness data
            needed for its running, hiking, and walking features. This may include:
          </p>
          <ul>
            <li>Workout records and workout routes</li>
            <li>
              Walking, running, and cycling distance samples used in workout
              analysis
            </li>
            <li>Active energy, heart rate, and resting heart rate</li>
            <li>Heart rate variability (HRV) and VO₂ max</li>
            <li>Step count and sleep analysis</li>
            <li>Date of birth</li>
          </ul>
          <p>
            RunRecount requests read-only access. It does not write data to Apple
            Health. You choose which data types RunRecount can access in Apple Health
            and can change those permissions at any time.
          </p>

          <h3>Information you add</h3>
          <p>
            You may add a display name, profile photo, weekly goal, biological
            sex, height, weight, maximum heart rate, custom heart-rate zones,
            and app preferences. These details are optional and stored on your
            device.
          </p>

          <h3>Location and route information</h3>
          <p>
            RunRecount reads workout routes from Apple Health when you allow it. The
            app may use Apple&apos;s geocoding service to turn a route location
            into a general place name, such as a city or neighbourhood. RunRecount
            requests your current location only when you choose Locate on the
            Map. It does not track your location in the background.
          </p>

          <h3>Notifications and settings</h3>
          <p>
            If you allow notifications, RunRecount stores your notification choices
            and schedules alerts on your device for the options you enable,
            such as goals, streaks, records, achievements, Moments, and sync
            problems.
          </p>
        </section>

        <section>
          <h2>3. How RunRecount uses information</h2>
          <p>RunRecount uses the information above only to:</p>
          <ul>
            <li>Import and display your runs, hikes, and walks</li>
            <li>Calculate splits, trends, records, achievements, and Moments</li>
            <li>Calculate training load, recovery, and Run Readiness</li>
            <li>Create route maps and general place labels</li>
            <li>
              Produce Coach Insights with on-device Apple system models when
              available, or with local evidence-based text
            </li>
            <li>Provide the preferences and notifications you choose</li>
          </ul>
          <p>
            RunRecount does not use health, fitness, or location data for advertising,
            marketing, user profiling, or data brokerage.
          </p>
        </section>

        <section>
          <h2>4. Storage and sharing</h2>
          <p>
            RunRecount stores imported workouts, routes, calculated results, profile
            details, and preferences locally on your device. RunRecount has no user
            accounts or developer-operated server that receives this app data.
          </p>
          <p>
            RunRecount does not sell your personal information. The app does not
            contain advertising SDKs or third-party analytics SDKs.
          </p>
          <p>
            RunRecount uses Apple system services, including HealthKit, Maps and
            geocoding, notifications, and on-device language models. Apple may
            process information needed to provide those services under its own
            privacy terms. You can read the{" "}
            <a href={APPLE_PRIVACY_URL}>Apple Privacy Policy</a> and{" "}
            <a href={APPLE_MAPS_PRIVACY_URL}>Apple Maps &amp; Privacy</a>.
          </p>
        </section>

        <section>
          <h2>5. Website analytics</h2>
          <p>
            The RunRecount app does not use Google Analytics. This website uses
            Google Analytics to understand visits and improve the site. When you
            view this page, Google may receive information such as your IP
            address, device and browser details, referring page, pages viewed,
            and visit times. Google may use cookies or similar browser storage
            for this purpose.
          </p>
          <p>
            Google handles that information under the{" "}
            <a href={GOOGLE_PRIVACY_URL}>Google Privacy Policy</a>. Website
            analytics are separate from RunRecount&apos;s health and fitness data. This
            website cannot access data stored inside RunRecount or Apple Health.
          </p>
        </section>

        <section>
          <h2>6. Retention, deletion, and your choices</h2>
          <ul>
            <li>
              <strong>Apple Health:</strong> Change or revoke RunRecount&apos;s access
              in the Health app or in iOS Settings. Revoking access stops future
              reads but does not remove data RunRecount already stored locally.
            </li>
            <li>
              <strong>Location:</strong> Change RunRecount&apos;s location permission in
              iOS Settings. The Map remains available without current-location
              access.
            </li>
            <li>
              <strong>Notifications:</strong> Turn individual reminders off in
              RunRecount or revoke notification permission in iOS Settings.
            </li>
            <li>
              <strong>AI Insights:</strong> Turn AI Insights off and remove
              generated insight text from RunRecount&apos;s Profile screen.
            </li>
            <li>
              <strong>Local app data:</strong> Delete RunRecount from your device to
              remove its local database, profile, preferences, and cached data.
              This does not delete the original workouts stored in Apple Health.
            </li>
          </ul>
          <p>
            Because RunRecount does not operate user accounts or receive your app
            data, the developer cannot view, export, or delete that local data
            on your behalf.
          </p>
        </section>

        <section>
          <h2>7. Security</h2>
          <p>
            RunRecount relies on iOS security controls, Apple&apos;s permission system,
            and the device&apos;s protected local storage. No system can guarantee
            absolute security, but RunRecount limits access to the data needed for
            its features and does not run its own service for storing your
            health data.
          </p>
        </section>

        <section>
          <h2>8. Children</h2>
          <p>
            RunRecount is not directed to children under 13, and the developer does
            not knowingly collect personal information from children through
            the app.
          </p>
        </section>

        <section>
          <h2>9. Changes to this policy</h2>
          <p>
            This policy may change when RunRecount&apos;s features or data practices
            change. The effective date at the top of this page will identify the
            latest version.
          </p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>
            For privacy questions about RunRecount, email{" "}
            <a href="mailto:mail@swapnilchauhan.com">
              mail@swapnilchauhan.com
            </a>
            .
          </p>
        </section>
      </article>
    </div>
  );
}
