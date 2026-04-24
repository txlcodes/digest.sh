"use client";

import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

const ALL_TOPICS = [
  "Global Affairs",
  "Technology",
  "Philosophy",
  "Arts",
  "Economics",
  "Science",
  "Environment",
  "Design",
];

const SOURCES = [
  { name: "Hacker News", on: true },
  { name: "GitHub Trending", on: true },
  { name: "Reddit", on: true },
  { name: "The Atlantic", on: false },
  { name: "Substack", on: true },
];

export default function SettingsPage() {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["Global Affairs", "Technology", "Philosophy", "Arts", "Economics", "Design"]),
  );
  const [sources, setSources] = useState(SOURCES);

  const toggleTopic = (t: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  };

  const toggleSource = (name: string) => {
    setSources((prev) =>
      prev.map((s) => (s.name === name ? { ...s, on: !s.on } : s)),
    );
  };

  return (
    <>
      <AppHeader right="Settings" />

      <main className="pt-24 pb-32 px-6 max-w-[680px] mx-auto">
        <section className="mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-on-surface mb-4">
            Preferences
          </h2>
          <p className="text-on-surface-variant mb-12 leading-relaxed">
            Tailor your daily reading experience to your intellectual interests
            and schedule.
          </p>

          <div className="space-y-12">
            {/* Topics */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-serif text-2xl text-on-surface">Topics</h3>
                <span className="text-[11px] text-on-surface-variant uppercase tracking-widest">
                  {selected.size} selected
                </span>
              </div>
              <p className="text-on-surface-variant mb-6">
                Choose the subjects that will form the backbone of your daily
                digest.
              </p>
              <div className="flex flex-wrap gap-2">
                {ALL_TOPICS.map((t) => {
                  const active = selected.has(t);
                  return (
                    <button
                      key={t}
                      onClick={() => toggleTopic(t)}
                      className={`px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase rounded-full transition-colors ${
                        active
                          ? "bg-primary text-on-primary"
                          : "bg-surface-variant text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 border-b border-outline-variant opacity-30" />
            </div>

            {/* Time */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-serif text-2xl text-on-surface">Time</h3>
                <span className="text-[11px] text-on-surface-variant uppercase tracking-widest">
                  08:30 AM
                </span>
              </div>
              <p className="text-on-surface-variant mb-6">
                Schedule your delivery to arrive exactly when you&apos;re ready
                to focus.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex-1 h-[1px] bg-outline-variant relative">
                  <div className="absolute left-1/3 w-4 h-4 bg-primary rounded-full -top-[7px] border-4 border-background" />
                </div>
                <span className="text-sm text-on-surface font-medium">
                  Morning delivery
                </span>
              </div>
              <div className="mt-8 border-b border-outline-variant opacity-30" />
            </div>

            {/* Sources */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-serif text-2xl text-on-surface">Sources</h3>
                <span className="text-[11px] text-on-surface-variant uppercase tracking-widest">
                  {sources.filter((s) => s.on).length} active
                </span>
              </div>
              <p className="text-on-surface-variant mb-6">
                Manage the publications curated into your stream.
              </p>
              <div className="space-y-4">
                {sources.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => toggleSource(s.name)}
                    className="w-full flex items-center justify-between py-2 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-surface-container-high rounded flex items-center justify-center text-sm">
                        ◉
                      </div>
                      <span className="text-on-surface">{s.name}</span>
                    </div>
                    <span
                      className={`text-xl ${
                        s.on ? "text-on-surface" : "text-outline-variant"
                      }`}
                    >
                      {s.on ? "●" : "○"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 pt-12 border-t-2 border-primary">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-on-surface mb-8">
            Account & Privacy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-outline-variant rounded hover:bg-surface-container-low transition-colors cursor-pointer">
              <h4 className="text-[11px] text-on-surface uppercase tracking-widest mb-2 font-semibold">
                Subscription
              </h4>
              <p className="font-serif text-2xl mb-4 text-on-surface">
                Free forever
              </p>
              <p className="text-on-surface-variant">
                You joined during private beta. Thank you.
              </p>
            </div>
            <div className="p-6 border border-outline-variant rounded hover:bg-surface-container-low transition-colors cursor-pointer">
              <h4 className="text-[11px] text-on-surface uppercase tracking-widest mb-2 font-semibold">
                Data Usage
              </h4>
              <p className="font-serif text-2xl mb-4 text-on-surface">
                Privacy First
              </p>
              <p className="text-on-surface-variant">
                Manage how your reading data is used for curation.
              </p>
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <button className="bg-primary text-on-primary px-8 py-3 rounded text-[11px] tracking-widest uppercase font-semibold hover:opacity-90 transition-opacity">
              Sign out
            </button>
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
