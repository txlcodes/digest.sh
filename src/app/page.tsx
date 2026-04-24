"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import AppStoreBadges from "@/components/AppStoreBadges";
import Logo from "@/components/Logo";
import SourcesMarquee from "@/components/SourcesMarquee";

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
                <h1 className="font-serif text-[44px] md:text-[56px] leading-[1.02] tracking-tight font-semibold text-on-surface mb-8">
                  Stay ahead of{" "}
                  <span className="serif-italic font-medium">90%</span> of your
                  field.{" "}
                  <span className="serif-italic font-medium">
                    In ten minutes a day.
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-6 max-w-[520px] mx-auto md:mx-0">
                  AI is moving faster than any field in history. Falling behind
                  is a daily choice. Digest reads the internet for you — HN,
                  GitHub, Reddit, the best newsletters — and delivers the ten
                  things that actually matter in your field. Every morning.
                  Then it stops.
                </p>
                <p className="serif-italic text-on-surface text-lg mb-10 max-w-[520px] mx-auto md:mx-0">
                  Stay sharp. Stay ahead. Stay free.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex justify-center md:justify-start">
                  <AppStoreBadges />
                </div>
                <p className="text-[11px] text-on-surface-variant uppercase tracking-widest mt-8 opacity-60">
                  Free forever · 847 builders already in
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.2} className="flex justify-center md:justify-end relative">
              <div className="relative w-[320px] h-[640px] bg-white rounded-[40px] shadow-2xl border-[8px] border-stone-900 overflow-hidden">
                <div className="h-full flex flex-col">
                  <div className="px-6 pt-12 pb-6 border-b border-stone-100">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase mb-2">
                      Issue #429 · Monday
                    </p>
                    <h2 className="font-serif text-2xl font-bold leading-tight text-on-surface">
                      The Future of Intentional Consumption
                    </h2>
                  </div>
                  <div className="flex-1 p-6 space-y-5 overflow-y-auto">
                    <div className="w-full aspect-[4/3] rounded-sm bg-gradient-to-br from-stone-200 to-stone-400 relative overflow-hidden grayscale">
                      <svg
                        viewBox="0 0 200 150"
                        className="absolute inset-0 w-full h-full"
                      >
                        <rect x="0" y="0" width="200" height="150" fill="#e7e5e4" />
                        <rect
                          x="35"
                          y="25"
                          width="130"
                          height="100"
                          fill="#fff"
                          stroke="#57534e"
                          strokeWidth="1"
                        />
                        <line x1="45" y1="40" x2="155" y2="40" stroke="#1c1917" strokeWidth="2" />
                        <line x1="45" y1="50" x2="120" y2="50" stroke="#1c1917" strokeWidth="1" opacity="0.6" />
                        {[65, 73, 81, 89, 97, 105, 113].map((y, i) => (
                          <line
                            key={i}
                            x1="45"
                            y1={y}
                            x2={110 + (i % 3) * 15}
                            y2={y}
                            stroke="#57534e"
                            strokeWidth="0.8"
                            opacity="0.7"
                          />
                        ))}
                      </svg>
                    </div>
                    <div className="space-y-4">
                      <p className="font-serif text-sm leading-relaxed text-stone-800">
                        In an era of infinite scrolls, the most radical act is
                        to stop. The architecture of attention is shifting from
                        quantity to quality...
                      </p>
                      <div className="h-px bg-stone-100 w-full" />
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-stone-900 uppercase tracking-widest">
                          Highlights
                        </span>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="inline-block w-3.5 h-3.5 rounded-full border border-stone-900 flex-shrink-0 mt-0.5 relative">
                              <span className="absolute inset-0 flex items-center justify-center text-[8px] leading-none">
                                ✓
                              </span>
                            </span>
                            <span className="text-[12px] font-medium text-stone-800">
                              The rise of digital sabbaticals
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="inline-block w-3.5 h-3.5 rounded-full border border-stone-900 flex-shrink-0 mt-0.5 relative">
                              <span className="absolute inset-0 flex items-center justify-center text-[8px] leading-none">
                                ✓
                              </span>
                            </span>
                            <span className="text-[12px] font-medium text-stone-800">
                              Curation as a service model
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
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

        {/* What a day looks like — phone-style cards */}
        <section className="w-full bg-surface-container-low py-24">
          <FadeIn className="text-center mb-16 max-w-[680px] mx-auto px-6">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] mb-4 block">
              Today&apos;s edition
            </span>
            <h2 className="font-serif text-4xl text-on-surface">
              What <span className="serif-italic">a day</span> looks like.
            </h2>
            <p className="text-on-surface-variant mt-4 max-w-[480px] mx-auto">
              A peek at one morning&apos;s digest. Three of the ten cards from a
              real Tuesday.
            </p>
          </FadeIn>

          <div className="max-w-[1080px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_CARDS.map((card, i) => (
              <FadeIn key={card.n} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded p-6 border border-outline-variant/40 h-full flex flex-col shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">
                      {card.source}
                    </span>
                    <span className="font-serif italic text-4xl opacity-10">
                      {card.n}
                    </span>
                  </div>

                  <div
                    className={`relative aspect-[4/3] rounded overflow-hidden bg-gradient-to-br ${card.tint} mb-5`}
                  >
                    <CardAnimation kind={card.anim} />
                    <div className="absolute inset-0 flex items-end p-4">
                      <span className="text-[10px] text-on-surface uppercase tracking-widest font-semibold bg-white/80 backdrop-blur px-2 py-1 rounded-sm">
                        {card.tag}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl leading-tight text-on-surface mb-3">
                    {card.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">
                    {card.excerpt}
                  </p>

                  <div className="mt-5 pt-4 border-t border-outline-variant/40 flex justify-between items-center text-[10px] uppercase tracking-widest">
                    <span className="text-on-surface-variant">3 min read</span>
                    <span className="text-on-surface font-semibold">
                      Tap to read →
                    </span>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-12">
            <p className="serif-italic text-on-surface-variant">
              …and seven more, every morning at 8 AM. or at your custom time.
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
              Get Digest on iOS and Android. Free forever for the first 1,000
              members.
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
