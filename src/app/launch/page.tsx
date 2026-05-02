"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Digest } from "@/lib/types";

// (Typewriter removed — replaced with static hero text below.)

// ---------- Soundtrack + auto-scroll engine ---------- //
function SoundtrackEngine({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const scrollingRef = useRef(false);
  const scrollStartRef = useRef<number>(0);
  const manualOverrideUntilRef = useRef<number>(0);

  // Total auto-scroll duration once launched.
  const AUTO_SCROLL_MS = 50000;

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.35;
  }, []);

  // Detect a real manual scroll: any wheel/touch input or a window scrollY
  // that diverges from where we last drove it. When that happens, pause
  // auto-scroll for 4 seconds (enough for a user to read mid-scene).
  useEffect(() => {
    const onWheel = () => {
      manualOverrideUntilRef.current = Date.now() + 4000;
    };
    const onTouch = () => {
      manualOverrideUntilRef.current = Date.now() + 4000;
    };
    const onKey = (e: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space", "Home", "End"]
          .includes(e.code)
      ) {
        manualOverrideUntilRef.current = Date.now() + 4000;
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const scrollFinishedRef = useRef<boolean>(false);

  // Manual scroll detection: extends the current scene's hold by 4s
  // each time the user wheels/touches/uses keys.
  useEffect(() => {
    const bump = () => {
      manualOverrideUntilRef.current = Date.now() + 4000;
    };
    const onKey = (e: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space", "Home", "End"]
          .includes(e.code)
      ) {
        bump();
      }
    };
    window.addEventListener("wheel", bump, { passive: true });
    window.addEventListener("touchmove", bump, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", bump);
      window.removeEventListener("touchmove", bump);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Fade audio out smoothly over `ms` then pause.
  const fadeOutAudio = (ms = 2000) => {
    const a = audioRef.current;
    if (!a || a.paused) return;
    const startVol = a.volume;
    const startAt = Date.now();
    const step = () => {
      const aNow = audioRef.current;
      if (!aNow) return;
      const t = Math.min((Date.now() - startAt) / ms, 1);
      aNow.volume = Math.max(0, startVol * (1 - t));
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        aNow.pause();
        aNow.volume = startVol; // restore for replay
        setPlaying(false);
      }
    };
    requestAnimationFrame(step);
  };

  // rAF loop: drive scroll linearly from 0 to maxScroll over AUTO_SCROLL_MS.
  // Scroll runs unconditionally once launched — independent of audio.
  useEffect(() => {
    let rafId = 0;
    const tick = () => {
      if (
        scrollingRef.current &&
        scrollStartRef.current > 0 &&
        !scrollFinishedRef.current &&
        Date.now() >= manualOverrideUntilRef.current
      ) {
        const elapsed = Date.now() - scrollStartRef.current;
        const ratio = Math.min(elapsed / AUTO_SCROLL_MS, 1);
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        const target = Math.round(ratio * max);
        const prev = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, target);
        document.documentElement.style.scrollBehavior = prev;
        if (ratio >= 1) {
          scrollFinishedRef.current = true;
          fadeOutAudio(2000);
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const launch = async () => {
    // Start scroll FIRST — independent of audio.
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    manualOverrideUntilRef.current = 0;
    scrollFinishedRef.current = false;
    scrollStartRef.current = Date.now();
    scrollingRef.current = true;
    setStarted(true);

    // Audio is best-effort — experience plays even if blocked.
    const a = audioRef.current;
    if (a) {
      try {
        a.currentTime = 0;
        a.volume = 0.35;
        await a.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  const replay = () => {
    scrollFinishedRef.current = false;
    manualOverrideUntilRef.current = 0;
    scrollStartRef.current = Date.now();
    scrollingRef.current = true;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.35;
      void audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />

      {/* Full-screen start overlay until user launches */}
      <div
        style={{
          opacity: started ? 0 : 1,
          pointerEvents: started ? "none" : "auto",
          transition: "opacity 0.6s ease",
        }}
        className="fixed inset-0 z-[60] bg-black flex items-center justify-center px-6"
      >
        <div className="text-center max-w-[640px]">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-6"
          >
            digest.sh · launch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="font-serif text-4xl md:text-6xl text-white mb-4 leading-tight"
          >
            Press <span className="serif-italic">play</span> to begin.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-white/50 text-sm md:text-base mb-3 max-w-md mx-auto"
          >
            A short, sound-on experience. Less than a minute.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="serif-italic text-white/70 text-base md:text-lg mb-12 max-w-md mx-auto"
          >
            Don&rsquo;t scroll. Sit back. Just enjoy.
          </motion.p>
          <motion.button
            type="button"
            onClick={launch}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-4 bg-white text-black px-8 py-5 rounded-full text-sm uppercase tracking-[0.25em] font-bold"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-xs">
              ▶
            </span>
            <span>Launch the experience</span>
          </motion.button>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="serif-italic text-white/30 text-xs mt-10"
          >
            best with sound on
          </motion.p>
        </div>
      </div>

      {/* Corner controls (visible after launch) */}
      {started && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
          <button
            type="button"
            onClick={replay}
            aria-label="Replay launch"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur border border-white/10 transition-colors text-white text-sm"
          >
            ↺
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Mute soundtrack" : "Play soundtrack"}
            className="flex items-center gap-3 px-4 py-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur border border-white/10 transition-colors text-white"
          >
            {playing ? (
              <span className="flex items-end gap-[2px] h-4">
                <motion.span
                  animate={{ height: ["30%", "100%", "60%"] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                  className="w-[3px] bg-white rounded-sm"
                />
                <motion.span
                  animate={{ height: ["80%", "30%", "100%"] }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                  className="w-[3px] bg-white rounded-sm"
                />
                <motion.span
                  animate={{ height: ["50%", "90%", "40%"] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                  className="w-[3px] bg-white rounded-sm"
                />
              </span>
            ) : (
              <span className="text-base leading-none">♪</span>
            )}
            <span className="text-[10px] uppercase tracking-widest font-bold">
              {playing ? "Sound on" : "Sound off"}
            </span>
          </button>
        </div>
      )}
    </>
  );
}

// ---------- Manifesto line (own hook scope) ---------- //
function ManifestoLine({
  line,
  index,
  total,
  sceneStart,
  sceneSize,
  italic,
}: {
  line: string;
  index: number;
  total: number;
  sceneStart: number;
  sceneSize: number;
  italic: boolean;
}) {
  const { scrollYProgress } = useScroll();
  const stagger = sceneSize / (total + 1);
  const opacity = useTransform(
    scrollYProgress,
    [sceneStart + stagger * index, sceneStart + stagger * (index + 0.4)],
    [0, 1],
  );
  return (
    <motion.h2
      style={{ opacity }}
      className={`font-serif text-4xl md:text-6xl leading-tight ${
        italic ? "serif-italic" : ""
      }`}
    >
      {line}
    </motion.h2>
  );
}

// ---------- Scene wrapper (sticky, fades in/out by scroll range) ---------- //
function Scene({
  children,
  start,
  end,
  isFirst = false,
  isLast = false,
  className = "",
}: {
  children: React.ReactNode;
  start: number;
  end: number;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
}) {
  const { scrollYProgress } = useScroll();
  const fade = (end - start) * 0.2;
  const stops = isFirst
    ? ([start, end - fade, end] as const)
    : isLast
      ? ([start, start + fade, end] as const)
      : ([start, start + fade, end - fade, end] as const);
  const values = isFirst
    ? ([1, 1, 0] as const)
    : isLast
      ? ([0, 1, 1] as const)
      : ([0, 1, 1, 0] as const);
  const opacity = useTransform(
    scrollYProgress,
    stops as unknown as number[],
    values as unknown as number[],
  );
  const visibility = useTransform(opacity, (v) =>
    v < 0.01 ? "hidden" : "visible",
  );

  return (
    <motion.div
      style={{ opacity, visibility }}
      className={`fixed inset-0 flex items-center justify-center px-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ---------- Page ---------- //
export default function LaunchPage() {
  const [digest, setDigest] = useState<Digest | null>(null);
  useEffect(() => {
    fetch("/api/digest")
      .then((r) => r.json())
      .then(setDigest)
      .catch(() => {});
  }, []);

  // total scroll height = 8 scenes × 100vh
  const totalScenes = 8;
  const sceneSize = 1 / totalScenes;
  const at = (i: number) => ({
    start: i * sceneSize,
    end: (i + 1) * sceneSize,
  });

  // ----- Scroll-driven values for specific scenes ----- //
  const { scrollYProgress } = useScroll();

  // Scene 2 → 3 transition: phone slides up from bottom and scales
  const phoneY = useTransform(
    scrollYProgress,
    [at(2).start, at(2).end],
    [120, 0],
  );
  const phoneScale = useTransform(
    scrollYProgress,
    [at(2).start, at(2).end],
    [0.85, 1],
  );

  // Scene index 3 (timer) fills 0 → 1 as user scrolls through it
  const timerProgress = useTransform(
    scrollYProgress,
    [at(3).start + sceneSize * 0.1, at(3).end - sceneSize * 0.15],
    [0, 1],
  );
  const timerDashoffset = useTransform(timerProgress, (v) => 283 - 283 * v);
  const timerLabel = useTransform(timerProgress, (v) => {
    const mins = Math.round(v * 10);
    return `${String(mins).padStart(2, "0")}:00`;
  });
  const [timerText, setTimerText] = useState("00:00");
  useEffect(() => {
    setTimerText(timerLabel.get());
    return timerLabel.on("change", (v) => setTimerText(v));
  }, [timerLabel]);
  const tickScale = useTransform(
    scrollYProgress,
    [at(3).end - sceneSize * 0.15, at(3).end - sceneSize * 0.02],
    [0, 1],
  );

  // Cards grid: stagger reveal in scene 6
  const cardsOpacity = useTransform(
    scrollYProgress,
    [at(6).start, at(6).start + sceneSize * 0.3],
    [0, 1],
  );

  // ----- Manifesto sequence (scene 5) ----- //
  const manifestoLines = [
    "No feed.",
    "No FOMO.",
    "Boring on purpose.",
    "Funny on purpose.",
  ];

  return (
    <div className="bg-black text-white">
      <SoundtrackEngine src="/music/launch.mp3" />

      {/* Spacer that creates the scroll runway */}
      <div style={{ height: `${totalScenes * 100}vh` }} aria-hidden />

      {/* ---------- Scene 1: Hero typewriter ---------- */}
      <Scene {...at(0)} isFirst>
        <div className="text-center max-w-[1100px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-10"
          >
            digest.sh
          </motion.p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-white">
            Ten minutes a day.
            <br />
            <span className="text-white/60">Updated with the </span>
            <span className="serif-italic text-white">tech world.</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.2 }}
            className="serif-italic text-white/40 mt-12 text-lg"
          >
            scroll
          </motion.p>
        </div>
      </Scene>

      {/* ---------- Scene 2: Setup ---------- */}
      <Scene {...at(1)}>
        <div className="text-center max-w-[820px] mx-auto">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-8">
            The problem
          </p>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.1]">
            The average knowledge worker spends
            <br />
            <span className="serif-italic text-white">
              two and a half hours
            </span>{" "}
            a day on feeds
            <br />
            without deciding to.
          </h2>
        </div>
      </Scene>

      {/* ---------- Scene 3: Phone reveal ---------- */}
      <Scene {...at(2)}>
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-[1100px] mx-auto w-full">
          <div className="text-center md:text-left">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-6">
              What we built
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-6">
              Ten things,
              <br />
              <span className="serif-italic">written by hand,</span>
              <br />
              every morning.
            </h2>
            <p className="text-white/60 leading-relaxed max-w-md mx-auto md:mx-0">
              We read HN, Lobsters, GitHub, and the best newsletters so you
              don&apos;t have to. Then the app stops.
            </p>
          </div>
          <motion.div
            style={{ y: phoneY, scale: phoneScale }}
            className="flex justify-center"
          >
            <div className="relative w-[280px] h-[560px] bg-white rounded-[40px] shadow-[0_40px_120px_rgba(255,255,255,0.15)] border-[8px] border-stone-900 overflow-hidden">
              <div className="h-full flex flex-col text-stone-900">
                <div className="px-5 pt-10 pb-4 border-b border-stone-100 flex items-center justify-between">
                  <p className="text-[9px] font-bold tracking-[0.25em] text-stone-400 uppercase">
                    Today
                  </p>
                  <p className="text-[9px] font-bold tracking-[0.25em] text-stone-900 uppercase">
                    01 / 10
                  </p>
                </div>
                <div className="flex-1 p-5 flex flex-col">
                  <p className="text-[9px] font-bold tracking-[0.2em] text-stone-400 uppercase mb-3">
                    Hacker News · News
                  </p>
                  <h3 className="font-serif text-xl leading-tight mb-4">
                    {digest?.posts?.[0]?.title ?? "Loading today's edition…"}
                  </h3>
                  <ul className="space-y-2 border-l-2 border-stone-200 pl-3">
                    {(digest?.posts?.[0]?.bullets ?? []).slice(0, 3).map(
                      (b, i) => (
                        <li
                          key={i}
                          className="text-[11px] text-stone-700 leading-snug"
                        >
                          {b}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Scene>

      {/* ---------- Scene 4: 10-minute timer + caught up ---------- */}
      <Scene {...at(3)}>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-10">
            Then it stops
          </p>
          <div className="relative w-[280px] h-[280px] mx-auto mb-10">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="283"
                style={{ strokeDashoffset: timerDashoffset }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="font-serif text-6xl tracking-tight tabular-nums">
                {timerText}
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-2">
                minutes
              </p>
            </div>
          </div>
          <motion.div
            style={{ scale: tickScale, opacity: tickScale }}
            className="inline-flex items-center gap-3"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-white text-sm">
              ✓
            </span>
            <span className="font-serif text-2xl serif-italic">
              you&rsquo;re caught up.
            </span>
          </motion.div>
        </div>
      </Scene>

      {/* ---------- Scene 5: Stay ahead of 90% ---------- */}
      <Scene {...at(4)}>
        <div className="text-center max-w-[900px] mx-auto">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-10">
            The promise
          </p>
          <h2 className="font-serif text-5xl md:text-7xl leading-[1.05]">
            Stay ahead of{" "}
            <span className="serif-italic">90%</span> of your field.
          </h2>
          <p className="text-white/60 leading-relaxed mt-8 text-lg max-w-md mx-auto">
            Ten minutes. Once a day. While the rest of the internet is still
            scrolling.
          </p>
        </div>
      </Scene>

      {/* ---------- Scene 6: Manifesto sequence ---------- */}
      <Scene {...at(5)}>
        <div className="text-center max-w-[800px] mx-auto">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-12">
            What it isn&rsquo;t
          </p>
          <div className="space-y-6">
            {manifestoLines.map((line, i) => (
              <ManifestoLine
                key={line}
                line={line}
                index={i}
                total={manifestoLines.length}
                sceneStart={at(5).start}
                sceneSize={sceneSize}
                italic={i % 2 === 1}
              />
            ))}
          </div>
        </div>
      </Scene>

      {/* ---------- Scene 7: Real cards grid (today's digest) ---------- */}
      <Scene {...at(6)}>
        <div className="max-w-[1100px] mx-auto w-full">
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-4">
              Today&rsquo;s edition · live
            </p>
            <h2 className="font-serif text-3xl md:text-5xl">
              This isn&rsquo;t a mockup. <span className="serif-italic">It&rsquo;s today.</span>
            </h2>
          </div>
          <motion.div
            style={{ opacity: cardsOpacity }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {(digest?.posts ?? []).slice(0, 3).map((p, i) => (
              <div
                key={p.id}
                className="bg-white/5 border border-white/10 backdrop-blur p-5 rounded"
              >
                <p className="text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase mb-3">
                  {p.source} · {p.kind ?? "post"}
                </p>
                <h3 className="font-serif text-lg leading-tight mb-3">
                  {p.title}
                </h3>
                <p className="text-[12px] text-white/60 leading-relaxed line-clamp-3">
                  {p.bullets[0]}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mt-4">
                  0{i + 1} of 10
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </Scene>

      {/* ---------- Scene 8: Final CTA ---------- */}
      <Scene {...at(7)} isLast>
        <div className="text-center max-w-[680px] mx-auto">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-6">
            Launching summer 2026
          </p>
          <h2 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-10">
            <span className="serif-italic">digest.sh</span>
          </h2>
          <p className="text-white/60 leading-relaxed mb-10 max-w-md mx-auto">
            Boring for a reason. Funny for a reason. You can&rsquo;t fry your
            dopamine here.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-5 text-[11px] uppercase tracking-widest font-bold hover:opacity-90 transition"
          >
            <span>Get notified at launch</span>
            <span aria-hidden>→</span>
          </Link>
          <p className="serif-italic text-white/30 mt-12 text-sm">
            see you tomorrow at 8 AM.
          </p>
        </div>
      </Scene>
    </div>
  );
}
