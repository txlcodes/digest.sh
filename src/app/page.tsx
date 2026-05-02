"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FadeIn from "@/components/FadeIn";
import AppStoreBadges from "@/components/AppStoreBadges";
import Logo from "@/components/Logo";
import SourcesMarquee from "@/components/SourcesMarquee";
import type { Digest } from "@/lib/types";

const ROTATING_WORLDS = [
  "tech",
  "design",
  "AI",
  "startup",
  "crypto",
  "science",
];

function RotatingWord({ words = ROTATING_WORLDS }: { words?: string[] }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing",
  );

  useEffect(() => {
    const target = words[wordIdx];

    if (phase === "typing") {
      if (text === target) {
        const t = setTimeout(() => setPhase("pausing"), 0);
        return () => clearTimeout(t);
      }
      const t = setTimeout(
        () => setText(target.slice(0, text.length + 1)),
        70 + Math.random() * 50,
      );
      return () => clearTimeout(t);
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), 1400);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (text === "") {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase("typing");
        return;
      }
      const t = setTimeout(() => setText(text.slice(0, -1)), 40);
      return () => clearTimeout(t);
    }
  }, [text, phase, wordIdx, words]);

  const wordClass =
    "italic font-normal text-primary whitespace-nowrap text-[0.85em]";
  const wordStyle = { fontFamily: "var(--font-serif)" } as const;

  return (
    <span
      className="relative inline-grid align-baseline"
      style={{ verticalAlign: "baseline" }}
    >
      {/* Invisible sizers: each word occupies the same grid cell, container sizes to widest. */}
      {words.map((w) => (
        <span
          key={`s-${w}`}
          aria-hidden
          className={`invisible ${wordClass}`}
          style={{ ...wordStyle, gridArea: "1 / 1" }}
        >
          {w}
        </span>
      ))}
      {/* Visible typing word, left-aligned with blinking cursor. */}
      <span
        className={`${wordClass} text-left`}
        style={{ ...wordStyle, gridArea: "1 / 1" }}
      >
        {text}
        <span
          aria-hidden
          className="inline-block w-[0.06em] bg-primary ml-[0.04em] animate-pulse not-italic"
          style={{ height: "0.9em", verticalAlign: "-0.1em" }}
        />
      </span>
    </span>
  );
}

function formatDigestDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const TOPICS = [
  "Tech", "Design", "AI", "Startups", "Crypto", "Science", "Economics",
  "Politics", "Philosophy", "Culture", "History", "Literature", "Biology",
  "Venture Capital", "Architecture", "Neuroscience",
];

const SAMPLE_CARDS = [
  {
    n: "01",
    source: "Hacker News",
    tag: "Engineering",
    title: "The quiet rise of local-first software",
    excerpt:
      "How a small movement of engineers is rebuilding applications to work offline-first — and why it matters for the next decade of tools.",
    tint: "from-stone-100 to-stone-200",
    anim: "sync" as const,
  },
  {
    n: "02",
    source: "Substack",
    tag: "Essay",
    title: "A new theory of taste in an age of infinite content",
    excerpt:
      "When everything is recommended, what does personal taste mean? A meditation on curation, identity, and the algorithms that shape us.",
    tint: "from-amber-50 to-stone-100",
    anim: "orbit" as const,
  },
  {
    n: "03",
    source: "GitHub Trending",
    tag: "Open Source",
    title: "The 7 repos that quietly defined the last month",
    excerpt:
      "A short tour of the projects gathering stars from builders you respect. Worth the 90 seconds.",
    tint: "from-neutral-100 to-stone-200",
    anim: "stars" as const,
  },
];

const DEMO_STEPS: { kind: DemoKind; title: string; body: string }[] = [
  {
    kind: "welcome",
    title: "Welcome",
    body: "The pitch in five seconds. Stay ahead, ten minutes a day.",
  },
  {
    kind: "topics",
    title: "Pick your topics",
    body: "Tell us your stack. Curation tunes to you, not the algorithm.",
  },
  {
    kind: "today",
    title: "Get ten cards",
    body: "Delivered at the time you choose. Read or skip — your call.",
  },
  {
    kind: "article",
    title: "Distraction-free reader",
    body: "No ads. No related-content rabbit holes. Just the piece.",
  },
  {
    kind: "end",
    title: "The app ends",
    body: "Card ten is the last one. Then it goes quiet until tomorrow.",
  },
];

type DemoKind = "welcome" | "topics" | "today" | "article" | "end";

const DEMO_TOPICS = [
  { k: "Engineering", l: "Software" },
  { k: "Data", l: "AI & ML" },
  { k: "Interface", l: "Design" },
  { k: "Strategy", l: "Growth" },
  { k: "Capital", l: "Startups" },
  { k: "Source", l: "Open Source" },
];

type DemoCard = {
  tag: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  authorRole: string;
  topics: string[]; // matches DEMO_TOPICS keys
};

const DEMO_CARDS: DemoCard[] = [
  // Engineering
  {
    tag: "Engineering",
    title: "The quiet death of the microservice",
    excerpt: "Three years after the rewrite, the team is back on a monolith — and shipping faster than ever.",
    body: "The microservice era was a response to scale problems most teams never had. The rebuild back to a modular monolith took six months and removed forty thousand lines of glue code. Deploys went from twenty minutes to forty seconds. The lesson isn't that microservices are wrong — it's that distributed systems are a tax, and most teams were paying it for nothing.",
    author: "Maya Chen",
    authorRole: "Staff engineer",
    topics: ["Engineering"],
  },
  {
    tag: "Engineering",
    title: "Why Bun won the runtime war you didn't know was happening",
    excerpt: "Speed alone wouldn't have done it. The real edge was developer mood per minute.",
    body: "Node still runs the world. But the new project default has shifted, and it shifted in 2025. Bun's bet wasn't on benchmarks — it was that startup time, install time, and zero-config TypeScript would change how often you reach for the runtime in a day. They were right. The compounding effect of a fast feedback loop is the most underrated force in software.",
    author: "Daniel Park",
    authorRole: "Infra lead",
    topics: ["Engineering"],
  },
  {
    tag: "Engineering",
    title: "Local-first, one year in production",
    excerpt: "What teams have learned shipping offline-capable apps to real users — and what still hurts.",
    body: "Local-first sells itself in a demo. Conflict resolution at the edges sells itself less well. Twelve months of production data: users love it, support tickets dropped 30%, and the team spent three months on edge cases that no library handles cleanly. The pattern works. It just isn't free.",
    author: "Priya Anand",
    authorRole: "Founding engineer",
    topics: ["Engineering"],
  },

  // AI & ML
  {
    tag: "AI & ML",
    title: "Small models are eating the agent stack",
    excerpt: "The default of reaching for the biggest model is starting to look like 2023 thinking.",
    body: "For narrow, high-volume tasks — classification, extraction, routing — a fine-tuned small model now beats a frontier model on cost, latency, and often accuracy. The frontier still matters for open-ended reasoning. But most production AI is not open-ended. The teams shipping fastest right now are the ones who figured this out twelve months ago.",
    author: "Ravi Iyer",
    authorRole: "ML engineer",
    topics: ["Data"],
  },
  {
    tag: "AI & ML",
    title: "Evals are the new tests — and most teams are doing it wrong",
    excerpt: "Your prompt isn't the system. The eval set is.",
    body: "Without an eval set, every prompt change is a vibe check. With a bad eval set, every prompt change is a vibe check with extra steps. The teams winning are treating eval curation like product work: small, adversarial, updated weekly. The prompt is downstream of the eval. Most orgs still have it backward.",
    author: "Lena Sørensen",
    authorRole: "Applied AI",
    topics: ["Data"],
  },
  {
    tag: "AI & ML",
    title: "On-device inference quietly went mainstream",
    excerpt: "Apple ships it. Samsung ships it. The cloud-only assumption is yesterday's architecture.",
    body: "The shift happened without a launch event. By Q1 2026, the median high-end phone runs a 3B-parameter model locally with sub-100ms latency. Privacy, offline support, and per-request cost go to zero. The cloud isn't dead. But for a growing share of inference, the right answer is no round-trip at all.",
    author: "Tomás Ruiz",
    authorRole: "Mobile platforms",
    topics: ["Data"],
  },

  // Design
  {
    tag: "Design",
    title: "Density is back",
    excerpt: "Why power users keep choosing tools that show more, not less.",
    body: "A decade of whitespace was a reaction to the cluttered web. The reaction overshot. Power users want their tools to respect the screen they paid for. The new dense interfaces — Linear, Raycast, the post-Notion wave — aren't ugly. They're confident. Confidence in design is showing the user you trust them with information.",
    author: "Iris Vahedi",
    authorRole: "Design director",
    topics: ["Interface"],
  },
  {
    tag: "Design",
    title: "Typography is the interface",
    excerpt: "Before color, before motion — the letterforms set the tone.",
    body: "If you can only afford to get one thing right in your product, get the type right. Type carries hierarchy, mood, voice, and trust before any other element registers. The best new SaaS of 2026 are not winning on novel layouts — they're winning on serif body copy and a single italic that says we read books.",
    author: "Marcus Hale",
    authorRole: "Type designer",
    topics: ["Interface"],
  },
  {
    tag: "Design",
    title: "The anti-AI aesthetic is a real category now",
    excerpt: "Hand-set type, real photographs, visible craft. A market signal, not a vibe.",
    body: "When everything generated looks the same, hand-made becomes a positioning. The brands leaning into film grain, letterpress, and slow scroll aren't being precious. They're sending a price signal: we made this on purpose. Expect the gap between AI-default and human-default brands to widen for the rest of the year.",
    author: "Sophie Lambert",
    authorRole: "Brand strategist",
    topics: ["Interface"],
  },

  // Strategy / Growth
  {
    tag: "Growth",
    title: "The retention math founders skip",
    excerpt: "Acquisition is theater if D30 is below 20%. The numbers, plainly.",
    body: "A short walk through the only spreadsheet that matters: D1, D7, D30, and the LTV that falls out. Below 20% D30 retention, you don't have a business — you have a leaky bucket with a paid-acquisition hose pointed at it. The fix is almost never marketing. It's the second session.",
    author: "Hannah Reeves",
    authorRole: "Growth lead",
    topics: ["Strategy"],
  },
  {
    tag: "Growth",
    title: "Founder-mode is a stage, not a strategy",
    excerpt: "It works at 12 people. It breaks at 200. Knowing the difference is the job.",
    body: "The founder-mode debate confused a phase with a philosophy. At 12, the founder is the system. At 200, the founder is a bottleneck the system routes around. The skill isn't picking a mode — it's noticing when the company has outgrown the one you're in.",
    author: "Joel Tan",
    authorRole: "Operator",
    topics: ["Strategy"],
  },
  {
    tag: "Growth",
    title: "Distribution is back to being expensive",
    excerpt: "The free-organic-virality window has closed. Plan accordingly.",
    body: "Twitter is fragmented. SEO is contested. App Store discovery is pay-to-play. The 2018-2022 playbook of free distribution through one big channel is over for almost everyone. The teams winning now are paying — in money, in patience, or in showing up somewhere weekly for two years. There is no third option.",
    author: "Emma Lin",
    authorRole: "GTM",
    topics: ["Strategy"],
  },

  // Startups / Capital
  {
    tag: "Startups",
    title: "AI wrappers aren't dying — but most of them should",
    excerpt: "It's not the model providers killing them. It's that the moat was never there.",
    body: "Every cycle has a category that confuses a feature for a company. This time it's prompts in a chrome. The wrappers that will survive built distribution, workflow lock-in, or proprietary data on top of the model. The ones that didn't are about to learn what a margin compression chart looks like.",
    author: "Arjun Mehta",
    authorRole: "Investor",
    topics: ["Capital"],
  },
  {
    tag: "Startups",
    title: "Profitability over growth: the 2026 default",
    excerpt: "Series A bars are higher. Bridge rounds are friendlier. Read the room.",
    body: "The capital environment has rewired what a healthy startup looks like. Not break-even — disciplined. Burn multiples under 1.5, gross margins above 70%, deliberate hiring. The decks raising right now look more like a small business plan than a 2021 pitch. That's not a bug.",
    author: "Clara Bishop",
    authorRole: "Partner",
    topics: ["Capital"],
  },
  {
    tag: "Startups",
    title: "Why small teams keep beating big ones",
    excerpt: "Ten people, one decision-maker, one product. Still the most underrated structure.",
    body: "AI tooling collapsed the labor cost of shipping. The remaining bottleneck is coordination. Ten-person teams with one PM, one designer, and a strong taste hierarchy ship at a rate fifty-person teams can no longer match. The advice for 2026: stay smaller longer than feels comfortable.",
    author: "Noah Wexler",
    authorRole: "Founder",
    topics: ["Capital"],
  },

  // Open Source / Source
  {
    tag: "Open Source",
    title: "Maintainers without burnout",
    excerpt: "A short field guide to staying with a project for a decade.",
    body: "The maintainers still going after ten years all share three habits: they say no by default, they batch responses, and they treat triage as a separate job from coding. The ones who flamed out optimized for the next contributor. The ones who lasted optimized for next year.",
    author: "Vera Okafor",
    authorRole: "Maintainer",
    topics: ["Source"],
  },
  {
    tag: "Open Source",
    title: "The relicensing wave isn't over",
    excerpt: "Three more notable projects flipped this quarter. The pattern is now legible.",
    body: "Successful infra OSS, VC-backed, with a hyperscaler reselling it — that's the formula that keeps producing relicenses. The community usually forks. The fork usually struggles. The next two years will tell us whether AGPL and BUSL become the new default for serious infra, or whether the foundation model wins.",
    author: "Felix Brandt",
    authorRole: "OSS lawyer",
    topics: ["Source"],
  },
  {
    tag: "Open Source",
    title: "Sustainable OSS funding, finally working",
    excerpt: "GitHub Sponsors hit a quiet milestone. What changed — and what didn't.",
    body: "Aggregate sponsorship volume crossed a real number this quarter. The shape of who gets funded is what to watch: the long tail is still starving. The middle — projects with 10–100k stars and a recognizable maintainer — is doing genuinely well. Sustainability arrived. It just arrived unevenly.",
    author: "Yuki Tanaka",
    authorRole: "Open source PM",
    topics: ["Source"],
  },
];

const computeFeed = (topics: Set<string>): number[] => {
  const matching: number[] = [];
  const others: number[] = [];
  DEMO_CARDS.forEach((c, i) => {
    if (c.topics.some((t) => topics.has(t))) matching.push(i);
    else others.push(i);
  });
  return [...matching, ...others].slice(0, 10);
};

type DemoState = {
  step: number;
  topics: Set<string>;
  cardIdx: number;
  feed: number[];
  read: number;
  saved: number;
  skipped: number;
};

const initialState = (): DemoState => {
  const topics = new Set(["Engineering", "Data", "Capital"]);
  return {
    step: 0,
    topics,
    cardIdx: 0,
    feed: computeFeed(topics),
    read: 0,
    saved: 0,
    skipped: 0,
  };
};

function SampleEdition() {
  // Pick 3 representative cards by category for the inline demo
  const SAMPLE_INDICES = [0, 3, 6]; // Engineering / AI / Design (first card of each)
  const cards = SAMPLE_INDICES.map((i) => DEMO_CARDS[i]).filter(Boolean);
  const [openId, setOpenId] = useState<number | null>(null);
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  const toggleSave = (id: number, title: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setToast(`Removed: ${title}`);
      } else {
        next.add(id);
        setToast(`Saved: ${title}`);
      }
      return next;
    });
    setTimeout(() => setToast(null), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Edition header */}
      <div className="flex items-baseline justify-between border-b border-outline-variant/60 pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant font-semibold">
            Issue · Today
          </p>
          <p className="font-serif italic text-2xl text-on-surface mt-1">
            {cards.length} of 10 · sample
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant font-semibold">
            Saved
          </p>
          <p className="font-serif text-2xl text-on-surface mt-1">
            {saved.size}
          </p>
        </div>
      </div>

      {/* Cards */}
      {cards.map((card, idx) => {
        const id = SAMPLE_INDICES[idx];
        const isOpen = openId === id;
        const isSaved = saved.has(id);
        return (
          <motion.article
            key={id}
            layout
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border border-outline-variant/60 hover:border-outline-variant transition-colors"
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-surface-container-low text-on-surface px-2 py-1 text-[10px] uppercase tracking-widest font-semibold">
                  {card.tag}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                  {card.author} · {card.authorRole}
                </span>
              </div>

              <button
                onClick={() => setOpenId(isOpen ? null : id)}
                className="text-left w-full"
              >
                <h3 className="font-serif text-2xl md:text-3xl text-on-surface leading-tight mb-3 hover:opacity-70 transition-opacity">
                  {card.title}
                </h3>
              </button>

              <p className="text-on-surface-variant text-base leading-relaxed font-serif italic mb-4">
                {card.excerpt}
              </p>

              {/* Expanded full body */}
              <motion.div
                initial={false}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-2 pb-4 border-t border-outline-variant/40 mt-2">
                  <p className="font-serif text-[17px] text-on-surface leading-[1.7]">
                    <span className="font-serif text-[40px] leading-none float-left mr-2 mt-1">
                      {card.body.charAt(0)}
                    </span>
                    {card.body.slice(1)}
                  </p>
                </div>
              </motion.div>

              {/* Action row */}
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/40 mt-4">
                <button
                  onClick={() => setOpenId(isOpen ? null : id)}
                  className="text-[10px] uppercase tracking-widest font-semibold text-on-surface hover:opacity-70 transition-opacity"
                >
                  {isOpen ? "← Collapse" : "Tap to read →"}
                </button>
                <button
                  onClick={() => toggleSave(id, card.title)}
                  className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold transition-colors ${
                    isSaved ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                  aria-label={isSaved ? "Remove from saved" : "Save for later"}
                >
                  <span>{isSaved ? "★" : "☆"}</span>
                  {isSaved ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </motion.article>
        );
      })}

      {/* Footer note */}
      <p className="text-center text-[11px] uppercase tracking-widest text-on-surface-variant opacity-60 pt-4">
        + 7 more cards every morning · install the app to read them all
      </p>

      {/* Toast */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: toast ? 1 : 0,
          y: toast ? 0 : 12,
        }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary px-5 py-3 text-[11px] uppercase tracking-widest font-semibold shadow-lg pointer-events-none"
      >
        {toast}
      </motion.div>
    </div>
  );
}

function InteractiveDemo() {
  const [state, setState] = useState<DemoState>(initialState);
  const { step, topics, cardIdx, feed, read, saved, skipped } = state;
  const feedCards = feed.map((i) => DEMO_CARDS[i]);
  const current = DEMO_STEPS[step];

  const phoneRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [autoplayState, setAutoplayState] = useState<"idle" | "playing" | "done">("idle");

  const clearTimers = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const interrupt = () => {
    if (autoplayState === "playing") {
      clearTimers();
      setAutoplayState("done");
    }
  };

  // wrap user-facing actions so any manual click cancels autoplay
  const userAction = <A extends unknown[]>(fn: (...a: A) => void) => (...a: A) => {
    interrupt();
    fn(...a);
  };

  const _goto = (i: number) =>
    setState((s) => ({ ...s, step: i, ...(DEMO_STEPS[i].kind === "today" ? { cardIdx: 0 } : {}) }));
  const goto = userAction(_goto);
  const next = userAction(() => _goto((step + 1) % DEMO_STEPS.length));
  const prev = userAction(() => _goto((step - 1 + DEMO_STEPS.length) % DEMO_STEPS.length));

  const begin = userAction(() => _goto(1));
  const toggleTopic = userAction((k: string) =>
    setState((s) => {
      const t = new Set(s.topics);
      t.has(k) ? t.delete(k) : t.add(k);
      return { ...s, topics: t };
    })
  );
  const continueToCards = userAction(() =>
    setState((s) => ({ ...s, step: 2, cardIdx: 0, feed: computeFeed(s.topics) }))
  );
  const openArticle = userAction(() => setState((s) => ({ ...s, step: 3 })));
  const advanceFromCard = userAction((action: "read" | "skip" | "save") =>
    setState((s) => {
      const isLast = s.cardIdx >= DEMO_CARDS.length - 1;
      return {
        ...s,
        step: isLast ? 4 : 2,
        cardIdx: isLast ? s.cardIdx : s.cardIdx + 1,
        read: action === "read" || action === "save" ? s.read + 1 : s.read,
        saved: action === "save" ? s.saved + 1 : s.saved,
        skipped: action === "skip" ? s.skipped + 1 : s.skipped,
      };
    })
  );
  const restart = userAction(() => setState(initialState()));

  // Auto-play once when phone scrolls into view
  useEffect(() => {
    const el = phoneRef.current;
    if (!el || autoplayState !== "idle") return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && autoplayState === "idle") {
          setAutoplayState("playing");
          const at = (delay: number, fn: () => void) =>
            timeoutsRef.current.push(setTimeout(fn, delay));

          at(900, () => setState((s) => ({ ...s, step: 1 })));
          at(1700, () =>
            setState((s) => {
              const t = new Set(s.topics);
              t.add("Interface");
              return { ...s, topics: t };
            })
          );
          at(2500, () =>
            setState((s) => ({ ...s, step: 2, cardIdx: 0, feed: computeFeed(s.topics) }))
          );
          at(3500, () => setState((s) => ({ ...s, step: 3 })));
          at(4700, () => setState((s) => ({ ...s, step: 2, cardIdx: 1, read: s.read + 1 })));
          at(5600, () =>
            setState((s) => ({ ...s, step: 2, cardIdx: 2, skipped: s.skipped + 1 }))
          );
          at(6500, () => {
            const topics = new Set(["Engineering", "Data", "Capital", "Interface"]);
            setState({
              step: 4,
              topics,
              cardIdx: 9,
              feed: computeFeed(topics),
              read: 4,
              saved: 2,
              skipped: 4,
            });
          });
          at(7000, () => {
            timeoutsRef.current = [];
            setAutoplayState("done");
          });
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimers();
    };
  }, [autoplayState]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 items-center">
      {/* Left: step list */}
      <div className="order-2 lg:order-1 lg:text-right">
        {DEMO_STEPS.map((s, i) => (
          <button
            key={s.kind}
            onClick={() => goto(i)}
            className={`block w-full lg:text-right py-4 border-b border-outline-variant/40 transition-all ${
              i === step ? "opacity-100" : "opacity-40 hover:opacity-70"
            }`}
          >
            <div className="flex lg:justify-end items-baseline gap-3">
              <span className="serif-italic text-lg">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="font-serif text-lg text-on-surface">{s.title}</h4>
            </div>
            {i === step && (
              <p className="text-on-surface-variant text-sm leading-relaxed mt-1 max-w-[280px] lg:ml-auto">
                {s.body}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* Center: phone */}
      <div ref={phoneRef} className="order-1 lg:order-2 flex justify-center relative">
        {autoplayState === "playing" && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-stone-900 text-white text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Auto demo
          </div>
        )}
        <div className="relative w-[280px] h-[560px] bg-white rounded-[36px] shadow-2xl border-[8px] border-stone-900 overflow-hidden">
          <motion.div
            key={current.kind + (current.kind === "today" ? cardIdx : "")}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <DemoScreen
              kind={current.kind}
              topics={topics}
              cardIdx={cardIdx}
              feedCards={feedCards}
              tallies={{ read, saved, skipped }}
              pulseRestart={autoplayState === "done"}
              onBegin={begin}
              onToggleTopic={toggleTopic}
              onContinue={continueToCards}
              onRead={openArticle}
              onSkip={() => advanceFromCard("skip")}
              onSave={() => advanceFromCard("save")}
              onBackFromArticle={() => advanceFromCard("read")}
              onRestart={restart}
            />
          </motion.div>
        </div>
      </div>

      {/* Right: controls */}
      <div className="order-3 flex flex-col items-center lg:items-start gap-4">
        <div className="flex gap-2">
          {DEMO_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => goto(i)}
              aria-label={`Go to step ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? "w-8 bg-primary" : "w-1.5 bg-outline-variant"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="border border-outline-variant px-5 py-3 text-[10px] uppercase tracking-widest font-semibold hover:bg-surface-container-low transition-colors"
          >
            ← Prev
          </button>
          <button
            onClick={step === DEMO_STEPS.length - 1 ? restart : next}
            className="bg-primary text-on-primary px-5 py-3 text-[10px] uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity"
          >
            {step === DEMO_STEPS.length - 1 ? "Restart" : "Next →"}
          </button>
        </div>
        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest opacity-60">
          Tap the phone — it's live
        </p>
      </div>
    </div>
  );
}

type DemoScreenProps = {
  kind: DemoKind;
  topics: Set<string>;
  cardIdx: number;
  feedCards: DemoCard[];
  tallies: { read: number; saved: number; skipped: number };
  pulseRestart: boolean;
  onBegin: () => void;
  onToggleTopic: (k: string) => void;
  onContinue: () => void;
  onRead: () => void;
  onSkip: () => void;
  onSave: () => void;
  onBackFromArticle: () => void;
  onRestart: () => void;
};

function DemoScreen({
  kind,
  topics,
  cardIdx,
  feedCards,
  tallies,
  pulseRestart,
  onBegin,
  onToggleTopic,
  onContinue,
  onRead,
  onSkip,
  onSave,
  onBackFromArticle,
  onRestart,
}: DemoScreenProps) {
  if (kind === "welcome") {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="px-5 pt-7 pb-3">
          <p className="font-serif italic text-[16px]">Digest</p>
        </div>
        <div className="flex-1 px-5 flex flex-col justify-center">
          <p className="text-[7px] uppercase tracking-[0.25em] text-stone-400 font-bold mb-3">
            No. 001 · MMXXVI
          </p>
          <h4 className="font-serif text-[20px] font-bold leading-[1.05]">
            Stay ahead of <span className="serif-italic">90%</span> of your field.
          </h4>
          <h4 className="font-serif italic text-[20px] font-bold leading-[1.05] mt-1">
            In ten minutes a day.
          </h4>
          <p className="text-[9px] text-stone-500 leading-relaxed mt-4">
            We read the internet for you and deliver the ten things that matter.
            Then it stops.
          </p>
        </div>
        <div className="px-3 pb-3">
          <button
            onClick={onBegin}
            className="block w-full bg-stone-900 text-white text-[8px] tracking-widest font-bold py-2.5 text-center uppercase hover:bg-stone-700 transition-colors"
          >
            Begin →
          </button>
          <p className="text-[6px] uppercase tracking-widest text-stone-400 font-bold text-center mt-2">
            7 days free · $5/mo
          </p>
        </div>
      </div>
    );
  }

  if (kind === "end") {
    return (
      <div className="h-full flex flex-col bg-white items-center justify-center px-5 text-center">
        <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center mb-4">
          <div className="w-7 h-7 rounded-full border border-stone-200" />
        </div>
        <h4 className="font-serif text-[18px] font-bold leading-tight">
          That&rsquo;s it for today.
        </h4>
        <p className="font-serif italic text-[12px] text-stone-500 mt-1">
          See you tomorrow.
        </p>
        <div className="w-6 h-[2px] bg-stone-900 my-3" />
        <div className="flex gap-4 mt-2">
          <div className="text-center">
            <p className="text-[7px] uppercase tracking-widest text-stone-400 font-bold">Saved</p>
            <p className="font-serif text-[14px] font-bold">{tallies.saved}</p>
          </div>
          <div className="text-center">
            <p className="text-[7px] uppercase tracking-widest text-stone-400 font-bold">Read</p>
            <p className="font-serif text-[14px] font-bold">{tallies.read}</p>
          </div>
          <div className="text-center">
            <p className="text-[7px] uppercase tracking-widest text-stone-400 font-bold">Skipped</p>
            <p className="font-serif text-[14px] font-bold">{tallies.skipped}</p>
          </div>
        </div>
        <p className="font-serif italic text-[9px] text-stone-400 mt-5 max-w-[180px] leading-snug">
          &ldquo;Reading is a conversation. A good book listens as well.&rdquo;
        </p>
        <button
          onClick={onRestart}
          className={`mt-4 border border-stone-900 px-3 py-1.5 text-[8px] uppercase tracking-widest font-bold hover:bg-stone-900 hover:text-white transition-colors ${
            pulseRestart ? "bg-stone-900 text-white animate-pulse" : ""
          }`}
        >
          {pulseRestart ? "Your turn → Try it" : "Run again →"}
        </button>
      </div>
    );
  }

  if (kind === "topics") {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="px-4 pt-7 pb-3 border-b border-stone-100">
          <p className="text-[8px] font-bold tracking-[0.2em] text-stone-400 uppercase">
            Step 02 of 03
          </p>
          <h4 className="font-serif text-[15px] font-bold leading-tight mt-1">
            What are you into?
          </h4>
        </div>
        <div className="flex-1 p-3 grid grid-cols-2 gap-2">
          {DEMO_TOPICS.map((t) => {
            const on = topics.has(t.k);
            return (
              <button
                key={t.k}
                onClick={() => onToggleTopic(t.k)}
                className={`p-2 border text-left transition-colors ${on ? "bg-stone-900 border-stone-900" : "bg-stone-50 border-stone-200 hover:border-stone-400"}`}
              >
                <p className={`text-[6px] uppercase tracking-widest font-bold ${on ? "text-stone-400" : "text-stone-500"}`}>
                  {t.k}
                </p>
                <p className={`font-serif text-[11px] font-bold mt-0.5 ${on ? "text-white" : "text-stone-900"}`}>
                  {t.l}
                </p>
              </button>
            );
          })}
        </div>
        <div className="px-3 pb-3">
          <button
            onClick={onContinue}
            disabled={topics.size === 0}
            className="block w-full bg-stone-900 text-white text-[8px] tracking-widest font-bold py-2.5 text-center uppercase hover:bg-stone-700 transition-colors disabled:opacity-40"
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  if (kind === "today") {
    const card = feedCards[cardIdx] ?? DEMO_CARDS[0];
    const num = String(cardIdx + 1).padStart(2, "0");
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="flex justify-between items-center px-4 py-3 border-b border-stone-100">
          <span className="text-[10px]">☰</span>
          <span className="font-serif italic text-[11px]">{num} / 10</span>
          <span className="text-[10px]">◯</span>
        </div>
        <div className="flex-1 p-3">
          <div className="border border-stone-200 p-3 space-y-2">
            <div className="flex justify-between items-center pb-2 border-b border-stone-100">
              <span className="bg-stone-100 px-1.5 py-0.5 text-[7px] uppercase tracking-widest font-bold">
                {card.tag}
              </span>
              <span className="text-[7px] uppercase tracking-widest text-stone-400 font-bold">
                Apr 27
              </span>
            </div>
            <div className="aspect-[16/9] bg-stone-100 border border-stone-300 flex items-center justify-center">
              <div className="w-8 h-8 border border-stone-700 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-stone-700" />
              </div>
            </div>
            <p className="font-serif text-[12px] font-bold leading-tight">
              {card.title}
            </p>
            <p className="font-serif italic text-[9px] text-stone-500 leading-snug">
              {card.excerpt}
            </p>
            <div className="w-6 h-[1px] bg-stone-900" />
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                onClick={onRead}
                className="bg-stone-900 text-white text-[7px] uppercase tracking-widest font-bold py-2 text-center hover:bg-stone-700 transition-colors"
              >
                Read
              </button>
              <button
                onClick={onSkip}
                className="border border-stone-900 text-stone-900 text-[7px] uppercase tracking-widest font-bold py-2 text-center hover:bg-stone-100 transition-colors"
              >
                Skip →
              </button>
            </div>
          </div>
          <p className="text-[7px] uppercase tracking-widest text-stone-400 font-bold text-center mt-3">
            {tallies.read} read · {tallies.saved} saved · {tallies.skipped} skipped
          </p>
        </div>
        <div className="h-7 border-t border-stone-100 flex justify-around items-center text-[10px] text-stone-300">
          <span className="text-stone-900">▦</span>
          <span>☐</span>
          <span>⚙</span>
        </div>
      </div>
    );
  }

  // article
  const card = feedCards[cardIdx] ?? DEMO_CARDS[0];
  const num = String(cardIdx + 1).padStart(2, "0");
  return (
    <div className="h-full flex flex-col bg-white relative">
      <div className="flex justify-between items-center px-3 py-2.5 border-b border-stone-100">
        <button
          onClick={onBackFromArticle}
          className="font-serif italic text-[10px] hover:text-stone-500 transition-colors"
        >
          ‹ Back
        </button>
        <span className="font-serif italic text-[10px]">{num} / 10</span>
        <span className="text-[10px]">◯</span>
      </div>
      <div className="flex-1 p-3 space-y-2 overflow-hidden">
        <div className="flex gap-2 items-center">
          <span className="bg-stone-100 px-1.5 py-0.5 text-[7px] uppercase tracking-widest font-bold">
            {card.tag}
          </span>
          <span className="text-[7px] uppercase tracking-widest text-stone-400 font-bold">
            8 min read
          </span>
        </div>
        <h4 className="font-serif text-[14px] font-bold leading-tight">
          {card.title}
        </h4>
        <div className="flex gap-2 items-center py-2 border-y border-stone-100">
          <div className="w-6 h-6 rounded-full bg-stone-200" />
          <div className="flex-1">
            <p className="text-[8px] font-bold">{card.author}</p>
            <p className="text-[6px] uppercase tracking-widest text-stone-400 font-bold">
              {card.authorRole}
            </p>
          </div>
        </div>
        <div className="text-[8px] leading-relaxed text-stone-700 space-y-1.5 overflow-y-auto max-h-[260px] pr-1">
          <div className="border-l-2 border-stone-900 pl-2 my-1.5">
            <p className="font-serif italic text-[9px] text-stone-900">
              {card.excerpt}
            </p>
          </div>
          <p>
            <span className="font-serif text-[18px] font-bold float-left mr-1 leading-none">
              {card.body.charAt(0)}
            </span>
            {card.body.slice(1)}
          </p>
        </div>
      </div>
      <button
        onClick={onSave}
        title="Save and continue"
        className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-[12px] shadow-lg hover:bg-stone-700 transition-colors"
      >
        ☐
      </button>
    </div>
  );
}

function CardAnimation({ kind }: { kind: "sync" | "orbit" | "stars" }) {
  // Engineering / local-first: two devices with packets flowing between them
  if (kind === "sync") {
    return (
      <svg viewBox="0 0 200 150" className="absolute inset-0 w-full h-full">
        {/* Left laptop */}
        <g transform="translate(25 50)">
          <rect x="0" y="0" width="50" height="34" rx="2" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
          <rect x="4" y="4" width="42" height="26" fill="#1a1a1a" opacity="0.08" />
          <path d="M -4 36 L 54 36 L 50 42 L 0 42 Z" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
          <circle cx="25" cy="17" r="2.5" fill="#1a1a1a">
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
        {/* Right phone */}
        <g transform="translate(140 46)">
          <rect x="0" y="0" width="28" height="50" rx="4" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
          <rect x="3" y="6" width="22" height="36" fill="#1a1a1a" opacity="0.08" />
          <circle cx="14" cy="46" r="1.5" fill="#1a1a1a" />
          <circle cx="14" cy="24" r="2.5" fill="#1a1a1a">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
        {/* Packets flowing between */}
        {[0, 0.6, 1.2].map((d, i) => (
          <circle key={`r${i}`} cx="80" cy="71" r="2.5" fill="#1a1a1a">
            <animate attributeName="cx" values="80;138" dur="1.8s" begin={`${d}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" begin={`${d}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {[0.3, 0.9, 1.5].map((d, i) => (
          <circle key={`l${i}`} cx="138" cy="75" r="2.5" fill="#1a1a1a">
            <animate attributeName="cx" values="138;80" dur="1.8s" begin={`${d}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" begin={`${d}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <line x1="80" y1="73" x2="138" y2="73" stroke="#1a1a1a" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.3" />
      </svg>
    );
  }

  // Essay / taste: open book with text lines appearing
  if (kind === "orbit") {
    return (
      <svg viewBox="0 0 200 150" className="absolute inset-0 w-full h-full">
        {/* Book spine shadow */}
        <line x1="100" y1="35" x2="100" y2="120" stroke="#1a1a1a" strokeWidth="0.5" opacity="0.3" />
        {/* Left page */}
        <path d="M 30 40 Q 30 35 35 35 L 100 38 L 100 118 L 35 118 Q 30 118 30 113 Z"
              fill="#fff" stroke="#1a1a1a" strokeWidth="1.2" />
        {/* Right page */}
        <path d="M 170 40 Q 170 35 165 35 L 100 38 L 100 118 L 165 118 Q 170 118 170 113 Z"
              fill="#fff" stroke="#1a1a1a" strokeWidth="1.2" />
        {/* Left page lines - animated typewriter */}
        {[52, 60, 68, 76, 84, 92, 100, 108].map((y, i) => (
          <line key={`L${i}`} x1="40" y1={y} x2="40" y2={y} stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" opacity="0.7">
            <animate attributeName="x2" values="40;90" dur="0.6s" begin={`${i * 0.4}s`} fill="freeze" />
            <animate attributeName="x2" values="90;40" dur="0.2s" begin={`${8 * 0.4 + 1}s`} fill="freeze" />
          </line>
        ))}
        {/* Right page lines */}
        {[52, 60, 68, 76, 84, 92, 100, 108].map((y, i) => (
          <line key={`R${i}`} x1="110" y1={y} x2="110" y2={y} stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" opacity="0.7">
            <animate attributeName="x2" values="110;160" dur="0.6s" begin={`${4 + i * 0.4}s`} fill="freeze" />
            <animate attributeName="x2" values="160;110" dur="0.2s" begin={`${4 + 8 * 0.4 + 1}s`} fill="freeze" />
          </line>
        ))}
      </svg>
    );
  }

  // Open Source / GitHub: git branch graph with commits
  return (
    <svg viewBox="0 0 200 150" className="absolute inset-0 w-full h-full">
      {/* Main branch */}
      <line x1="30" y1="75" x2="180" y2="75" stroke="#1a1a1a" strokeWidth="1.5" />
      {/* Upper branch */}
      <path d="M 70 75 Q 85 75 90 55 L 140 55 Q 145 55 150 75" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      {/* Lower branch */}
      <path d="M 90 75 Q 105 75 110 100 L 150 100 Q 155 100 160 75" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />

      {/* Main commits */}
      {[30, 70, 90, 150, 180].map((x, i) => (
        <circle key={`m${i}`} cx={x} cy="75" r="5" fill="#fff" stroke="#1a1a1a" strokeWidth="1.5">
          <animate attributeName="r" values="3;6;5" dur="0.6s" begin={`${i * 0.4}s`} fill="freeze" />
          <animate attributeName="fill" values="#1a1a1a;#fff" dur="0.6s" begin={`${i * 0.4}s`} fill="freeze" />
        </circle>
      ))}
      {/* Upper branch commits */}
      {[100, 120, 140].map((x, i) => (
        <circle key={`u${i}`} cx={x} cy="55" r="5" fill="#fff" stroke="#1a1a1a" strokeWidth="1.5">
          <animate attributeName="r" values="0;6;5" dur="0.6s" begin={`${1 + i * 0.4}s`} fill="freeze" />
        </circle>
      ))}
      {/* Lower branch commits */}
      {[120, 150].map((x, i) => (
        <circle key={`l${i}`} cx={x} cy="100" r="5" fill="#fff" stroke="#1a1a1a" strokeWidth="1.5">
          <animate attributeName="r" values="0;6;5" dur="0.6s" begin={`${1.5 + i * 0.4}s`} fill="freeze" />
        </circle>
      ))}
      {/* Pulsing star near latest */}
      <g transform="translate(180 40)">
        <path
          d="M 0 -7 L 2 -2 L 7 -2 L 3 1.5 L 4.5 7 L 0 4 L -4.5 7 L -3 1.5 L -7 -2 L -2 -2 Z"
          fill="#1a1a1a"
        >
          <animate attributeName="opacity" values="0;1;0.6;1" dur="2s" begin="2.5s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

export default function LandingPage() {
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(
    new Set(["Tech", "AI", "Politics"]),
  );
  const toggleTopic = (t: string) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  };

  const [digest, setDigest] = useState<Digest | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/digest")
      .then((r) => r.json())
      .then((d: Digest) => {
        if (!cancelled) setDigest(d);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b border-[#e5e5e1] sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4 max-w-[1180px] mx-auto w-full">
          <Logo size="sm" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-on-surface-variant font-semibold">
            No. 001 · MMXXVI
          </span>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center">
        {/* Hero — split: copy left, phone right */}
        <section className="max-w-[1180px] w-full px-6 pt-16 md:pt-24 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <FadeIn>
                <span className="inline-block text-[10px] text-on-surface-variant uppercase tracking-[0.3em] mb-8 border border-outline-variant rounded-full px-4 py-1.5">
                  Now in private beta
                </span>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="font-serif text-[44px] md:text-[56px] leading-[1.05] tracking-tight font-semibold text-on-surface mb-8">
                  Ten minutes a day.
                  <br />
                  Updated with the <RotatingWord /> world.
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-6 max-w-[520px] mx-auto md:mx-0">
                  AI is moving faster than any field in history. Falling behind
                  is a daily choice. Digest reads the internet for you. HN,
                  GitHub, Reddit, the best newsletters. We deliver the ten
                  things that actually matter in your field. Every morning.
                  Then it stops.
                </p>
                <p className="serif-italic text-on-surface text-lg mb-10 max-w-[520px] mx-auto md:mx-0">
                  Boring for a reason. Funny for a reason. You can&rsquo;t fry
                  your dopamine here.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                  <AppStoreBadges />
                  <a
                    href="#today"
                    className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 text-[11px] uppercase tracking-widest font-semibold hover:bg-stone-700 transition-colors"
                  >
                    Try the demo
                    <span aria-hidden>↓</span>
                  </a>
                </div>
                <p className="text-[11px] text-on-surface-variant uppercase tracking-widest mt-8 opacity-60">
                  7 days free · $5/mo after · Cancel anytime
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.2} className="flex justify-center md:justify-end relative">
              <div className="relative w-[320px] h-[640px] bg-white rounded-[40px] shadow-2xl border-[8px] border-stone-900 overflow-hidden">
                <div className="h-full flex flex-col">
                  <div className="px-6 pt-12 pb-5 border-b border-stone-100">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold tracking-[0.25em] text-stone-400 uppercase">
                        Today
                      </p>
                      <p className="text-[10px] font-bold tracking-[0.25em] text-stone-900 uppercase">
                        10 / 10
                      </p>
                    </div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-stone-500 mt-2">
                      {digest ? formatDigestDate(digest.date) : "Saturday, May 2"}
                    </p>
                  </div>

                  <div className="flex-1 p-6 flex flex-col">
                    {/* All-done hero */}
                    <div className="text-center pt-2">
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                          delay: 0.1,
                        }}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-stone-900 mb-4"
                      >
                        <motion.span
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.4,
                          }}
                          className="text-stone-900 text-lg leading-none inline-block"
                        >
                          ✓
                        </motion.span>
                      </motion.div>
                      <h2 className="font-serif text-[28px] leading-[1.1] text-on-surface mb-2">
                        You&rsquo;re <span className="serif-italic">caught up.</span>
                      </h2>
                      <p className="text-[12px] text-stone-500 leading-relaxed max-w-[220px] mx-auto">
                        10 things read. The internet is paused for today.
                      </p>
                    </div>

                    <div className="h-px bg-stone-100 w-full my-5" />

                    {/* What you covered */}
                    <span className="text-[9px] font-bold text-stone-900 uppercase tracking-[0.25em] mb-3">
                      Today you read
                    </span>
                    <ul className="space-y-2.5 flex-1">
                      {(digest?.posts ?? []).slice(0, 4).map((p, i) => (
                        <motion.li
                          key={p.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.15 + i * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex items-start gap-2.5 text-[12px] leading-snug text-stone-800"
                        >
                          <span className="text-stone-400 font-mono text-[10px] mt-0.5 flex-shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-medium line-clamp-2">
                            {p.title}
                          </span>
                        </motion.li>
                      ))}
                      {!digest && (
                        <>
                          <li className="text-[12px] text-stone-400">
                            Loading today&rsquo;s edition…
                          </li>
                        </>
                      )}
                    </ul>

                    <p className="serif-italic text-[12px] text-stone-500 text-center mt-4 pt-4 border-t border-stone-100 leading-relaxed">
                      See you tomorrow at 8 AM. We made this{" "}
                      <strong className="not-italic font-bold text-stone-900">
                        boring and simple
                      </strong>{" "}
                      for a reason, so you don&rsquo;t{" "}
                      <strong className="not-italic font-bold text-stone-900">
                        fry your dopamine receptors
                      </strong>{" "}
                      here.
                    </p>
                  </div>

                  <div className="h-16 border-t border-stone-100 flex justify-around items-center px-4 text-[20px]">
                    <span className="text-stone-900">❐</span>
                    <span className="text-stone-300">⌕</span>
                    <span className="text-stone-300">☆</span>
                    <span className="text-stone-300">☺</span>
                  </div>
                </div>
              </div>

              {/* Floating testimonial quote */}
              <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-4 z-10 w-[210px] bg-white p-5 border border-stone-200 shadow-xl rotate-2">
                <p className="font-serif italic text-[17px] leading-snug text-on-surface mb-3">
                  &ldquo;I will never stop using Digest. It has 10×&rsquo;d my
                  productivity and I don&rsquo;t miss out on anything.&rdquo;
                </p>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest">
                  — Sarah K., Creative Director
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Sources — continuous marquee */}
        <SourcesMarquee />

        {/* The math */}
        <section className="max-w-[680px] w-full px-6 py-24 text-center">
          <FadeIn>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] mb-6 block">
              The math
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-on-surface leading-[1.1] mb-12">
              Save up to{" "}
              <span className="serif-italic font-medium">45 days</span> a year.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-left">
            {[
              {
                n: "2.5",
                unit: "h",
                label: "Avg. daily doomscroll",
                body: "The average knowledge worker loses 2½ hours a day to feeds without deciding to.",
              },
              {
                n: "10",
                unit: "m",
                label: "With Digest",
                body: "Ten minutes of quality reading. Then the app closes and you go live your life.",
              },
              {
                n: "45",
                unit: "",
                label: "Days reclaimed · per year",
                body: "That's six weeks of your life — back. Use them to build, to rest, to be with the people you love.",
                italic: true,
              },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <p
                  className={`font-serif text-[72px] leading-none text-on-surface ${
                    s.italic ? "serif-italic" : ""
                  }`}
                >
                  {s.n}
                  {s.unit && (
                    <span className="text-on-surface-variant text-4xl">
                      {s.unit}
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-on-surface-variant uppercase tracking-widest mt-3 font-semibold">
                  {s.label}
                </p>
                <p className="text-on-surface-variant text-sm mt-2 leading-relaxed">
                  {s.body}
                </p>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <p className="text-on-surface-variant text-sm max-w-[480px] mx-auto italic">
              &ldquo;Quality scrolling, not quantity scrolling. You read the ten
              posts that actually move your career forward. Everything else is
              noise.&rdquo;
            </p>
          </FadeIn>
        </section>

        <div className="max-w-[680px] w-full px-6">
          <hr className="border-t border-outline-variant/60 w-full" />
        </div>

        {/* How it works */}
        <section className="max-w-[680px] w-full px-6 py-24">
          <FadeIn className="text-center mb-16">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] mb-4 block">
              How it works
            </span>
            <h2 className="font-serif text-4xl text-on-surface">
              Three minutes once.{" "}
              <span className="serif-italic">A lifetime of calm mornings.</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                n: "01",
                title: "Tell us who you are",
                body: "Your role, what you build, what you want to stay sharp on. Takes about three minutes.",
              },
              {
                n: "02",
                title: "We read the internet",
                body: "Every night, our AI fetches thousands of posts and scores each one against your taste profile.",
              },
              {
                n: "03",
                title: "Ten cards at dawn",
                body: "Delivered at your chosen time. Read or skip. After the tenth, the app goes quiet until tomorrow.",
              },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="flex flex-col gap-3">
                  <span className="serif-italic text-3xl text-on-surface">
                    {s.n}
                  </span>
                  <h3 className="font-serif text-xl text-on-surface">
                    {s.title}
                  </h3>
                  <p className="text-on-surface-variant text-[15px] leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Knowledge-gained progress visual */}
          <FadeIn delay={0.4} className="mt-20">
            <div className="border-t border-outline-variant/60 pt-10">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em]">
                  Knowledge compounded · first 30 days
                </span>
                <span className="font-serif serif-italic text-2xl text-on-surface">
                  300 posts
                </span>
              </div>
              <div className="relative h-2 bg-surface-container rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "82%" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-y-0 left-0 bg-primary rounded-full"
                />
                {[10, 30, 50, 70].map((p) => (
                  <span
                    key={p}
                    className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-white/60"
                    style={{ left: `${p}%` }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-6 mt-8 text-left">
                <div>
                  <p className="font-serif text-[28px] text-on-surface leading-none">
                    10
                    <span className="serif-italic text-base text-on-surface-variant ml-1">
                      /day
                    </span>
                  </p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-2">
                    Signal delivered
                  </p>
                </div>
                <div>
                  <p className="font-serif text-[28px] text-on-surface leading-none">
                    92
                    <span className="text-base text-on-surface-variant">%</span>
                  </p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-2">
                    Readers feel less behind
                  </p>
                </div>
                <div>
                  <p className="font-serif serif-italic text-[28px] text-on-surface leading-none">
                    0
                  </p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-2">
                    Notifications after 8am
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Topics preview — interactive */}
        <section className="w-full bg-surface-container-low py-24">
          <div className="max-w-[680px] mx-auto px-6">
            <FadeIn className="text-center mb-12">
              <span className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] mb-4 block">
                Your signal
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-on-surface leading-[1.1] mb-4">
                What are <span className="serif-italic">you</span> into?
              </h2>
              <p className="text-on-surface-variant text-lg max-w-[540px] mx-auto leading-relaxed">
                Select the topics that define your intellectual curiosity.
                We&apos;ll curate your daily digest based on these signals.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex flex-wrap gap-3 justify-center mb-10">
                {TOPICS.map((t) => {
                  const isActive = selectedTopics.has(t);
                  return (
                    <button
                      key={t}
                      onClick={() => toggleTopic(t)}
                      className={`px-6 py-2.5 rounded-full border transition-all duration-300 text-[11px] uppercase tracking-widest font-semibold flex items-center gap-2 ${
                        isActive
                          ? "bg-primary text-on-primary border-primary"
                          : "bg-white text-on-surface-variant border-transparent hover:border-outline-variant"
                      }`}
                    >
                      {t}
                      {isActive && <span className="text-sm">✓</span>}
                    </button>
                  );
                })}
              </div>
              <p className="text-center serif-italic text-on-surface-variant">
                {selectedTopics.size} selected · tap to toggle
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Today's digest — live, real content */}
        <section
          id="today"
          className="w-full bg-surface-container-low py-24"
        >
          <FadeIn className="text-center mb-12 max-w-[680px] mx-auto px-6">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] mb-4 block">
              {digest
                ? `Today's digest · ${formatDigestDate(digest.date)}`
                : "Today's digest"}
            </span>
            <h2 className="font-serif text-4xl text-on-surface">
              Read <span className="serif-italic">today&apos;s</span> edition.
            </h2>
            <p className="text-on-surface-variant mt-4 max-w-[520px] mx-auto">
              Ten things worth knowing, written by hand. No fluff, no infinite
              scroll. Try it right here.
            </p>
          </FadeIn>

          <div className="max-w-[1080px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(digest?.posts ?? Array.from({ length: 6 })).slice(0, 6).map(
              (p, i) => {
                const post = p as Digest["posts"][number] | undefined;
                return (
                  <FadeIn key={post?.id ?? i} delay={i * 0.08}>
                    <motion.a
                      href={post?.url ?? "#"}
                      target={post ? "_blank" : undefined}
                      rel={post ? "noopener noreferrer" : undefined}
                      whileHover={post ? { y: -4 } : undefined}
                      transition={{ duration: 0.3 }}
                      className="block bg-white rounded p-6 border border-outline-variant/40 h-full shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">
                            {post?.source ?? "—"}
                          </span>
                          {post?.kind && (
                            <span
                              className={`text-[9px] tracking-widest uppercase font-bold px-2 py-1 ${
                                post.kind === "news"
                                  ? "bg-on-surface text-surface"
                                  : "bg-surface-container text-on-surface border border-outline-variant"
                              }`}
                            >
                              {post.kind}
                            </span>
                          )}
                        </div>
                        <span className="font-serif italic text-4xl opacity-10">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl leading-tight text-on-surface mb-4 min-h-[3em]">
                        {post?.title ?? "Loading…"}
                      </h3>

                      {post && (
                        <ul className="space-y-2 border-l-2 border-outline-variant pl-4 mb-5">
                          {post.bullets.slice(0, 3).map((b, j) => (
                            <li
                              key={j}
                              className="text-sm text-on-surface-variant leading-relaxed"
                            >
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-auto pt-4 border-t border-outline-variant/40 flex justify-between items-center text-[10px] uppercase tracking-widest">
                        <span className="text-on-surface-variant">
                          {post?.bullets?.length ?? 0} key points
                        </span>
                        <span className="text-on-surface font-semibold">
                          Read full article →
                        </span>
                      </div>
                    </motion.a>
                  </FadeIn>
                );
              },
            )}
          </div>

          <FadeIn className="text-center mt-12">
            <Link
              href="/today"
              className="inline-flex items-center gap-3 bg-on-surface text-surface px-6 py-4 text-[11px] uppercase tracking-widest font-bold hover:opacity-90 transition"
            >
              <span>Read all 10 posts</span>
              <span aria-hidden>→</span>
            </Link>
            <p className="serif-italic text-on-surface-variant mt-6">
              Updated daily. New edition every morning.
            </p>
          </FadeIn>
        </section>

        {/* Why Digest */}
        <section className="w-full py-24">
          <div className="max-w-[680px] mx-auto px-6">
            <FadeIn className="text-center mb-12">
              <span className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] mb-4 block">
                Why Digest
              </span>
              <h2 className="font-serif text-4xl text-on-surface">
                You tried willpower.{" "}
                <span className="serif-italic">This works.</span>
              </h2>
            </FadeIn>

            <div className="space-y-6">
              {[
                {
                  k: "The signal the top 10% read",
                  v: "Your feed is optimized for engagement. Digest is optimized for what actually compounds your career.",
                },
                {
                  k: "Bounded by design",
                  v: "Ten posts, no more. The app is built to end, not to engage.",
                },
                {
                  k: "Trained by you, not by advertisers",
                  v: "Your taste profile is yours. It doesn't optimize for whoever's paying for reach this week.",
                },
                {
                  k: "One app, not seven",
                  v: "HN, GitHub, Reddit, newsletters — one morning briefing instead of seven tabs.",
                },
                {
                  k: "Read, then return to your life",
                  v: "No notifications throughout the day. No 'you might also like.' Come back tomorrow.",
                },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="flex gap-5 border-b border-outline-variant/40 pb-6 last:border-0">
                    <span className="serif-italic text-2xl text-on-surface opacity-40 shrink-0 w-10">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg text-on-surface mb-1.5">
                        {item.k}
                      </h3>
                      <p className="text-on-surface-variant text-[15px] leading-relaxed">
                        {item.v}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full bg-primary text-on-primary py-24 flex flex-col items-center">
          <FadeIn className="max-w-[680px] w-full px-6 text-center">
            <h3 className="font-serif text-4xl md:text-5xl mb-4">
              Ready to <span className="serif-italic">reclaim</span> your
              attention?
            </h3>
            <p className="text-on-primary/70 text-base mb-10 max-w-[420px] mx-auto">
              Get Digest on iOS and Android. 7 days free, then $5/month.
              Cancel anytime.
            </p>
            <div className="flex justify-center">
              <div className="[&_a]:bg-white [&_a]:text-primary">
                <AppStoreBadges />
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      <footer className="bg-background py-16 border-t border-outline-variant/40">
        <div className="max-w-[680px] mx-auto px-6 flex flex-col items-center gap-8">
          <span className="serif-italic text-2xl text-on-surface opacity-40">
            Digest
          </span>
          <nav className="flex gap-8">
            <a
              href="#"
              className="text-[11px] text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest"
            >
              About
            </a>
            <a
              href="#"
              className="text-[11px] text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[11px] text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest"
            >
              Archives
            </a>
          </nav>
          <p className="text-[10px] text-outline opacity-50 uppercase tracking-[0.2em] pt-4">
            © 2026 Digest · digest.sh
          </p>
        </div>
      </footer>
    </>
  );
}
