"use client";

import Link from "next/link";
import { useState } from "react";

const HOURS = ["05", "06", "07", "08", "09", "10", "11"];
const MINUTES = ["00", "15", "30", "45"];
const PERIODS = ["AM", "PM"];

export default function TimePage() {
  const [hour, setHour] = useState("08");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-background border-b border-outline-variant w-full">
        <div className="max-w-[680px] mx-auto px-6 py-8 flex items-center justify-between">
          <Link href="/" className="font-serif italic text-xl">
            Digest
          </Link>
          <span className="text-[11px] text-on-surface-variant tracking-widest uppercase">
            03 / 03
          </span>
        </div>
      </header>

      <main className="max-w-[680px] mx-auto px-6 pt-16 pb-32 flex flex-col items-center text-center flex-grow">
        <section className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-on-surface mb-4">
            When do you want it?
          </h1>
          <p className="text-lg text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            Schedule your morning briefing. We&apos;ll curate the world&apos;s
            essentials for the moment you wake.
          </p>
        </section>

        <div className="relative w-full max-w-[360px] bg-surface-container-low border border-outline-variant rounded-lg p-8 mb-12">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-3">
                Hour
              </p>
              <div className="flex flex-col gap-1 text-2xl font-serif">
                {HOURS.map((h) => (
                  <button
                    key={h}
                    onClick={() => setHour(h)}
                    className={`py-1 ${
                      hour === h
                        ? "text-on-surface font-bold"
                        : "text-on-surface-variant/40"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-3">
                Minute
              </p>
              <div className="flex flex-col gap-1 text-2xl font-serif">
                {MINUTES.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMinute(m)}
                    className={`py-1 ${
                      minute === m
                        ? "text-on-surface font-bold"
                        : "text-on-surface-variant/40"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-3">
                Period
              </p>
              <div className="flex flex-col gap-1 text-2xl font-serif">
                {PERIODS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`py-1 ${
                      period === p
                        ? "text-on-surface font-bold"
                        : "text-on-surface-variant/40"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 pt-6 border-t border-outline-variant/40 text-on-surface-variant text-sm">
            Delivery at{" "}
            <span className="font-serif italic text-on-surface">
              {hour}:{minute} {period}
            </span>{" "}
            every morning.
          </p>
        </div>

        <Link
          href="/today"
          className="w-full max-w-[280px] bg-primary text-on-primary py-4 rounded text-[11px] tracking-widest uppercase font-semibold hover:opacity-90 transition-opacity text-center"
        >
          Start your digest
        </Link>

        <div className="mt-24 border-t border-outline-variant pt-8 w-full">
          <blockquote className="font-serif italic text-xl text-on-surface-variant max-w-xs mx-auto">
            &ldquo;Focus is the art of knowing what to ignore.&rdquo;
          </blockquote>
        </div>
      </main>
    </div>
  );
}
