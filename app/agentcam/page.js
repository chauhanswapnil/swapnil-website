import Image from "next/image";

import BrowserFrame from "./BrowserFrame";
import CopyCommand from "./CopyCommand";
import Showcase from "./Showcase";
import styles from "./agentcam.module.css";

const REPO_URL = "https://github.com/chauhanswapnil/agentcam";

const TITLE = "agentcam — A dashcam for your coding agents";
const DESCRIPTION =
  "agentcam reads the logs Claude Code and Codex already write and shows you what your agents did: replays, search, what lasted, and a risk audit. Local, open source, one binary.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/agentcam",
  },
  openGraph: {
    type: "website",
    url: "https://swapnilchauhan.com/agentcam",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/agentcam/overview.png",
        width: 1920,
        height: 1280,
        alt: "agentcam overview: agent time, a year of activity, sessions and projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/agentcam/overview.png"],
  },
};

const INSTALL = `git clone ${REPO_URL}
cd agentcam
npm --prefix web ci && npm --prefix web run build
cargo install --path crates/agentcam
agentcam`;

const PRINCIPLES = [
  {
    title: "Read only",
    body: "It reads the logs your agents already write. It never edits, moves or uploads them.",
  },
  {
    title: "Local only",
    body: "One server on 127.0.0.1. No account, no telemetry, no network calls.",
  },
  {
    title: "Nothing to set up",
    body: "No hooks or SDK. Your past sessions show up the first time you run it.",
  },
  {
    title: "One binary",
    body: "Written in Rust, with the web UI built in. Open source under Apache 2.0.",
  },
];

const OUTCOMES = [
  {
    id: "lasted",
    kind: "you",
    title: "What lasted",
    body: "Of the lines your agents wrote, how many are still in the code today. By model, project, file and week.",
    src: "/agentcam/lasted.png",
    path: "/lasted",
    alt: "What lasted: share of agent-written lines still in the code, by age, model and week",
  },
  {
    id: "blame",
    kind: "change",
    title: "Who wrote this",
    body: "Open a file and see which session, model and prompt wrote each line that is still there.",
    src: "/agentcam/blame.png",
    path: "/blame",
    alt: "Who wrote this: each line of a file with the agent edit that wrote it",
  },
  {
    id: "compare",
    kind: "look",
    title: "Compare",
    body: "Two models, agent versions or efforts side by side, or before and after you changed AGENTS.md.",
    src: "/agentcam/compare.png",
    path: "/compare",
    alt: "Compare: two models side by side, with comparisons agentcam found",
  },
  {
    id: "instructions",
    kind: "agent",
    title: "Instructions",
    body: "The rules in AGENTS.md and CLAUDE.md that a log can check, and how often sessions followed each one.",
    src: "/agentcam/instructions.png",
    path: "/follow",
    alt: "Instructions: AGENTS.md rules and how often sessions followed them",
  },
];

const DAILY = [
  {
    id: "live",
    kind: "look",
    title: "Live",
    body: "Which agents are working now, which are waiting for you, and how close you are to your usage limits.",
    src: "/agentcam/live.png",
    path: "/live",
    alt: "Live: usage windows, a working session and a quiet one",
  },
  {
    id: "search",
    kind: "you",
    title: "Search",
    body: "Full-text search over prompts, replies, commands, output and file paths. Every hit opens the replay at that step.",
    src: "/agentcam/search.png",
    path: "/search",
    alt: "Search results with highlighted matches",
  },
  {
    id: "prompts",
    kind: "you",
    title: "Prompts",
    body: "Everything you typed, with the prompts you keep typing grouped. Some of them belong in a skill.",
    src: "/agentcam/prompts.png",
    path: "/prompts",
    alt: "Prompts: your prompts and the ones you keep asking",
  },
  {
    id: "skills",
    kind: "change",
    title: "Skills",
    body: "Which skills exist, which ran, which sit unused, and how much context each one takes.",
    src: "/agentcam/skills.png",
    path: "/skills",
    alt: "Skills: runs, steps under each skill and size when loaded",
  },
  {
    id: "setup",
    kind: "agent",
    title: "Setup",
    body: "Settings, MCP servers, hooks and memory files on this machine, with the ones worth a second look.",
    src: "/agentcam/setup.png",
    path: "/setup",
    alt: "Setup: settings worth a look, settings files, MCP servers and hooks",
  },
];

const TEAM = [
  {
    id: "insights",
    kind: "you",
    title: "Insights",
    body: "Agent time, cost, lines kept and rules followed, by week, team, repo and model.",
    src: "/agentcam/team-insights.png",
    path: "/team",
    alt: "Team insights: time, cost and what lasted by week, team and repo",
  },
  {
    id: "value",
    kind: "look",
    title: "Value",
    body: "Cost per commit and pull request, lines kept per dollar, and seats against use.",
    src: "/agentcam/team-value.png",
    path: "/team/value",
    alt: "Team value: cost per commit and PR, lines kept per dollar and seats",
  },
  {
    id: "fleet",
    kind: "agent",
    title: "Fleet",
    body: "Agent versions, MCP servers, skills and hooks on each machine, and a baseline to check them against.",
    src: "/agentcam/team-fleet.png",
    path: "/team/fleet",
    alt: "Team fleet: agent versions and what is installed across machines",
  },
];

const SAFETY = [
  {
    title: "73 built-in rules",
    body: "Secrets in transcripts (masked before they are stored), sensitive files, risky commands, data sent out, writes outside the project. Add your own in YAML.",
  },
  {
    title: "Chains across steps",
    body: "A secret read and then an upload. A stopped call, then another way around it. Each finding links back to where the chain started.",
  },
  {
    title: "Approvals",
    body: "How each tool call was allowed or stopped, and allow rules you could add so agents ask you less. You copy them; agentcam never edits settings.",
  },
  {
    title: "Block next time",
    body: "Turn a step into a guard rule. A PreToolUse hook stops matching calls with a message to the agent. Only rules you set ever stop anything.",
  },
];

const MORE = [
  ["Cost", "Estimated per step, turn, session and day, from a price table you can edit."],
  ["Usage limits", "Codex's 5-hour and weekly windows, and an estimate of Claude Code's from logged tokens."],
  ["Alerts", "A browser notification when a session waits for you or passes a cost you set."],
  ["Ask your history", "agentcam mcp lets your agents look up past work, with secrets masked."],
  ["Evidence bundles", "A session or date range as one JSON file with a SHA-256 checksum."],
  ["SIEM and OpenTelemetry", "Findings as NDJSON or OCSF, and sessions as traces for Jaeger or Tempo."],
  ["Export", "Any session as Markdown or JSON, any table as CSV, secrets masked."],
  ["Commits and PRs", "The commits each session made and the pull requests it opened."],
];

const KEYS = [
  ["Space", "play"],
  ["←  →", "step"],
  ["⇧J", "next file change"],
  ["E", "next error"],
  ["R", "next risk"],
];

// The strip above the hero screenshot: one session's steps, colored by kind,
// with a playhead sweeping across. Widths are shares of the strip.
const TIMELINE = [
  ["agent", 4], ["you", 4], ["agent", 9], ["agent", 4], ["look", 5], ["look", 5],
  ["look", 7], ["look", 5], ["look", 6], ["change", 4], ["change", 4], ["agent", 5],
  ["change", 7], ["agent", 5], ["change", 10], ["look", 7], ["agent", 3],
];

function SessionTimeline() {
  return (
    <div className={styles.timeline} aria-hidden="true">
      <div className={styles.timelineTrack}>
        {TIMELINE.map(([kind, width], index) => (
          <span key={index} data-kind={kind} style={{ flexGrow: width }} />
        ))}
        <span className={styles.timelineUnplayed} />
        <span className={styles.timelinePlayhead} />
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={styles.fillIcon}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function SectionHeading({ eyebrow, title, id, children }) {
  return (
    <div className={styles.sectionHeading}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {children ? <p className={styles.sectionLead}>{children}</p> : null}
    </div>
  );
}

export default function AgentcamPage() {
  return (
    <article className={styles.page}>
      <section className={styles.hero} aria-labelledby="agentcam-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.inner}>
          <div className={styles.heroCopy}>
            <div className={styles.brandLockup}>
              <Image src="/agentcam/logo.svg" alt="" width={44} height={44} priority />
              <span>agentcam</span>
              <span className={styles.recBadge}>
                <span className={styles.recDot} aria-hidden="true" />
                REC
              </span>
            </div>
            <h1 id="agentcam-title">A dashcam for your coding agents.</h1>
            <p className={styles.heroLead}>
              agentcam reads the session logs Claude Code and Codex already
              write on your machine and shows you what your agents did: every
              session replayed step by step, searchable, with the code that
              lasted and the steps worth a second look.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href={REPO_URL}>
                <GitHubIcon />
                View on GitHub
              </a>
              <a className={styles.secondaryAction} href="#install">
                Install
                <ArrowIcon />
              </a>
            </div>
            <ul className={styles.agentChips} aria-label="Supported agents">
              <li>
                <span className={styles.agentDot} data-agent="claude" aria-hidden="true" />
                Claude Code
              </li>
              <li>
                <span className={styles.agentDot} data-agent="codex" aria-hidden="true" />
                Codex
              </li>
            </ul>
          </div>

          <div className={styles.heroStage}>
            <SessionTimeline />
            <BrowserFrame path="/" className={styles.heroShot}>
              <Image
                src="/agentcam/overview.png"
                alt="agentcam overview: agent time, a year of activity, sessions and projects"
                width={1920}
                height={1280}
                priority
                sizes="(max-width: 960px) 92vw, 80rem"
                className={styles.shot}
              />
            </BrowserFrame>
          </div>
        </div>
      </section>

      <section className={styles.principles} aria-label="How agentcam works">
        <ul className={styles.inner}>
          {PRINCIPLES.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="replay-title">
        <div className={styles.inner}>
          <SectionHeading eyebrow="Replay" title="Scrub through any session." id="replay-title">
            A timeline you can zoom and play at 1×, 4× or 16×. The transcript
            follows along, split into turns, with each command and its output,
            each diff, how each call was approved and what it cost.
          </SectionHeading>

          <BrowserFrame path="/session/add-a-dry-run-flag" className={styles.wideShot}>
            <Image
              src="/agentcam/replay.png"
              alt="Replay: a zoomable timeline, the transcript, and a diff for the current step"
              width={1920}
              height={1280}
              sizes="(max-width: 960px) 92vw, 80rem"
              className={styles.shot}
            />
          </BrowserFrame>

          <div className={styles.replayNotes}>
            <div>
              <h3>Every step has a link</h3>
              <p>
                Send someone the exact edit you want them to look at. Open any
                changed file at its line in VS Code, Cursor or Zed.
              </p>
            </div>
            <div>
              <h3>Pick up where it stopped</h3>
              <p>
                Copy the command that resumes the session in its own folder:{" "}
                <code>claude --resume</code> or <code>codex resume</code>.
              </p>
            </div>
            <div>
              <h3>Made for the keyboard</h3>
              <ul className={styles.keys}>
                {KEYS.map(([key, action]) => (
                  <li key={key}>
                    <kbd>{key}</kbd>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="outcomes-title">
        <div className={styles.inner}>
          <SectionHeading eyebrow="Did it work?" title="See what the work came to." id="outcomes-title">
            Steps and tokens tell you how busy an agent was. These tell you
            what stayed. All of it works on your past sessions, with nothing to
            install first.
          </SectionHeading>
          <Showcase items={OUTCOMES} label="Ways to see what the work came to" />
        </div>
      </section>

      <section className={`${styles.section} ${styles.safety}`} aria-labelledby="safety-title">
        <div className={styles.inner}>
          <SectionHeading eyebrow="Safety" title="A flight recorder, not a cop." id="safety-title">
            agentcam assumes your agent is capable and acting in good faith. It
            shows what happened and flags only what deserves a second look, in
            plain words.
          </SectionHeading>

          <div className={styles.safetyGrid}>
            <BrowserFrame path="/audit" className={styles.safetyShot}>
              <Image
                src="/agentcam/chains.png"
                alt="A command the agent ran because a Sentry result told it to, linked back to that result"
                width={1920}
                height={1280}
                sizes="(max-width: 960px) 92vw, 50rem"
                className={styles.shot}
              />
            </BrowserFrame>
            <div className={styles.safetyCopy}>
              <h3>Instructions that came from outside.</h3>
              <p>
                A fake Sentry error tells the agent to run a package. agentcam
                notices when a command runs a package or sends data to an
                address that showed up in a tool result and never in your
                prompt, and links the two.
              </p>
              <p>
                It also reads what each MCP server and skill told your agent,
                and points out hidden characters, orders like &ldquo;don&rsquo;t
                tell the user&rdquo;, and descriptions that changed after you
                started using them.
              </p>
            </div>
          </div>

          <ul className={styles.cardGrid}>
            {SAFETY.map((item) => (
              <li key={item.title} className={styles.card}>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="daily-title">
        <div className={styles.inner}>
          <SectionHeading eyebrow="Day to day" title="Keep an eye on the agents you run." id="daily-title" />
          <Showcase items={DAILY} label="Day-to-day views" />

          <ul className={styles.moreGrid}>
            {MORE.map(([title, body]) => (
              <li key={title}>
                <strong>{title}</strong>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="team-title">
        <div className={styles.inner}>
          <SectionHeading eyebrow="For teams" title="A team server you run yourself." id="team-title">
            Each laptop sends metadata only: counts, times, cost, findings and
            file paths. Never prompts, output or diffs. It covers Claude Code
            and Codex together, on any plan or API key. Names stay hidden unless
            an admin turns them on, and no view ranks people.
          </SectionHeading>
          <Showcase items={TEAM} label="Team server views" />
        </div>
      </section>

      <section className={`${styles.section} ${styles.privacy}`} aria-labelledby="privacy-title">
        <div className={`${styles.inner} ${styles.privacyInner}`}>
          <div>
            <p className={styles.eyebrow}>Privacy</p>
            <h2 id="privacy-title">Your logs stay on your machine.</h2>
          </div>
          <ul className={styles.privacyList}>
            <li>The server listens on 127.0.0.1 and turns away requests for any other host name.</li>
            <li>Secrets the rules find are masked before they reach the index, and again in exports.</li>
            <li>It reads project files to count lines that lasted, and stores counts, never contents.</li>
            <li>Nothing leaves until you join a team, and the Outbox page shows exactly what would.</li>
          </ul>
        </div>
      </section>

      <section id="install" className={styles.section} aria-labelledby="install-title">
        <div className={`${styles.inner} ${styles.installInner}`}>
          <div>
            <p className={styles.eyebrow}>Install</p>
            <h2 id="install-title">Try it on your own logs.</h2>
            <p className={styles.sectionLead}>
              agentcam is in heavy daily use and not packaged yet. Build it from
              source with Rust and Node 20+. It indexes your logs, starts on{" "}
              <code>127.0.0.1:4747</code> and opens your browser. Packages for
              cargo, npx and Homebrew are coming.
            </p>
          </div>
          <div className={styles.terminal}>
            <div className={styles.terminalBar}>
              <span>Terminal</span>
              <CopyCommand code={INSTALL} />
            </div>
            <pre>
              <code>
                {INSTALL.split("\n").map((line) => (
                  <span key={line} className={styles.terminalLine}>
                    {line}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className={styles.final} aria-labelledby="final-title">
        <div className={styles.inner}>
          <Image src="/agentcam/logo.svg" alt="" width={72} height={72} />
          <h2 id="final-title">See what your agents did.</h2>
          <p>Open source, Apache 2.0. Issues and pull requests welcome.</p>
          <a className={styles.primaryAction} href={REPO_URL}>
            <GitHubIcon />
            chauhanswapnil/agentcam
          </a>
        </div>
      </section>
    </article>
  );
}
