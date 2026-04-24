"use client";

import Link from "next/link";
import { useState } from "react";

const TOPICS = [
  "Tech", "Design", "AI", "Startups", "Crypto", "Science", "Economics",
  "Politics", "Philosophy", "Culture", "History", "Literature", "Biology",
  "Venture Capital", "Architecture", "Neuroscience",
];

export default function TopicsPage() {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["Tech", "AI", "Politics"]),
  );

  const toggle = (t: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-[#e5e5e1] sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4 max-w-[680px] mx-auto w-full">
          <span className="serif-italic text-2xl">Digest</span>
          <span className="serif-italic text-xl">02 / 03</span>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center px-6 py-12 max-w-[680px] mx-auto w-full">
        <section className="w-full mb-12 text-center md:text-left">
          <h1 className="font-serif text-[44px] md:text-[48px] font-semibold leading-[1.05] tracking-tight text-on-surface mb-4">
            What are you into?
          </h1>
          <p className="text-lg text-on-surface-variant max-w-[540px] leading-relaxed">
            Select the topics that define your intellectual curiosity. We&apos;ll
            curate your daily digest based on these signals.
          </p>
        </section>

        <section className="w-full flex flex-wrap gap-3 mb-16">
          {TOPICS.map((t) => {
            const isActive = selected.has(t);
            return (
              <button
                key={t}
                onClick={() => toggle(t)}
                className={`px-6 py-2.5 rounded-full border transition-all duration-300 text-[11px] uppercase tracking-widest font-semibold flex items-center gap-2 ${
                  isActive
                    ? "bg-primary text-on-primary border-primary"
                    : "bg-surface-container text-on-surface-variant border-transparent hover:border-outline-variant"
                }`}
              >
                {t}
                {isActive && <span className="text-sm">✓</span>}
              </button>
            );
          })}
        </section>

        <hr className="w-full border-t border-outline-variant/60 mb-12" />

        <div className="w-full p-8 border border-outline-variant bg-white flex flex-col md:flex-row gap-6 items-center mb-16">
          <div className="flex-shrink-0 w-24 h-24 bg-surface-variant overflow-hidden grayscale">
            <img
              alt="Stacked newspapers"
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80&auto=format&fit=crop"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <div>
            <h3 className="font-serif text-2xl mb-2">Focused by Design</h3>
            <p className="text-on-surface-variant">
              Unlike social feeds, Digest doesn&apos;t use algorithms to keep
              you scrolling. We use your interests to build a finished edition
              every morning.
            </p>
          </div>
        </div>

        <div className="w-full mt-auto pt-8 flex flex-col items-center gap-4">
          <Link
            href="/onboarding/time"
            className="w-full max-w-[320px] bg-primary text-on-primary py-4 rounded text-center text-[11px] uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity"
          >
            Continue
          </Link>
          <Link
            href="/onboarding/time"
            className="text-[11px] text-on-surface-variant border-b border-transparent hover:border-outline-variant transition-all py-1 uppercase tracking-widest"
          >
            Skip for now
          </Link>
        </div>
      </main>
    </div>
  );
}
