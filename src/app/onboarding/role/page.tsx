"use client";

import Link from "next/link";
import { useState } from "react";

const ROLES = ["Developer", "Founder", "Designer", "PM", "Marketer", "Writer"];

export default function RolePage() {
  const [selected, setSelected] = useState<string | null>("Designer");

  return (
    <main className="min-h-screen flex flex-col max-w-[680px] mx-auto px-6 py-12 md:py-20">
      <header className="mb-16">
        <Link href="/" className="serif-italic text-2xl">
          Digest
        </Link>
      </header>

      <div className="flex-grow">
        <div className="mb-12">
          <span className="text-[11px] text-on-surface-variant tracking-widest uppercase mb-4 block">
            Onboarding 01 / 03
          </span>
          <h1 className="font-serif text-[44px] md:text-[48px] font-semibold leading-[1.05] tracking-tight text-on-surface mb-4">
            What do you do?
          </h1>
          <p className="text-lg text-on-surface-variant max-w-[500px] leading-relaxed">
            Select your primary focus. We&apos;ll curate a reading experience
            tailored to your work.
          </p>
        </div>

        <form className="space-y-1 mb-20">
          {ROLES.map((role) => {
            const isActive = selected === role;
            return (
              <label
                key={role}
                className="block cursor-pointer group"
                onClick={() => setSelected(role)}
              >
                <div
                  className={`flex justify-between items-center py-6 border-b border-outline-variant transition-all duration-300 ${
                    isActive
                      ? "bg-surface-container-low px-4 border-primary"
                      : "px-1 group-hover:px-4"
                  }`}
                >
                  <span className="font-serif italic text-2xl">{role}</span>
                  <span
                    className={`text-on-surface transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    ✓
                  </span>
                </div>
              </label>
            );
          })}
        </form>
      </div>

      <footer className="sticky bottom-0 bg-background/80 backdrop-blur-md pt-8 pb-12">
        <div className="flex items-center justify-between">
          <Link
            href="/onboarding/topics"
            className="text-[11px] text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest"
          >
            Skip for now
          </Link>
          <Link
            href="/onboarding/topics"
            className="bg-primary text-on-primary px-12 py-4 rounded hover:opacity-90 transition-all duration-300 flex items-center gap-4"
          >
            <span className="text-[11px] uppercase tracking-widest font-semibold">
              Continue
            </span>
            <span>→</span>
          </Link>
        </div>
        <div className="mt-12 h-[1px] w-full bg-outline-variant/30" />
      </footer>
    </main>
  );
}
