"use client";

import Link from "next/link";
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import type { Digest } from "@/lib/types";

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function TodayClient({ digest }: { digest: Digest }) {
  const [index, setIndex] = useState(0);
  const posts = digest.posts;
  const total = posts.length;
  const post = posts[index];
  const atEnd = index >= total - 1;

  const next = () => {
    if (atEnd) return;
    setIndex((i) => i + 1);
  };

  if (!post) {
    return (
      <>
        <AppHeader right="—" />
        <main className="pt-24 pb-32 px-6 max-w-[680px] mx-auto min-h-screen flex flex-col items-center justify-center text-center">
          <h2 className="font-serif text-3xl text-on-surface mb-4">
            No digest available
          </h2>
          <p className="text-on-surface-variant max-w-sm">
            Today&apos;s edition isn&apos;t ready yet. Check back shortly.
          </p>
        </main>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <AppHeader
        right={`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
      />

      <main className="pt-24 pb-32 px-6 max-w-[680px] mx-auto min-h-screen flex flex-col">
        <section className="mb-10">
          <p className="text-[11px] uppercase tracking-widest text-on-surface-variant/70 mb-2">
            {formatDate(digest.date)}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-on-surface">
            Today. {total} posts.
          </h2>
          <div className="w-12 h-[2px] bg-primary mt-4" />
        </section>

        <div className="flex-1 flex flex-col justify-center">
          <article className="group">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="w-8 h-8 flex items-center justify-center border border-outline-variant bg-white text-sm">
                  ⌘
                </div>
                <span className="text-[11px] text-on-surface-variant tracking-widest uppercase font-semibold">
                  {post.source}
                </span>
                {post.kind && (
                  <span
                    className={`text-[10px] tracking-widest uppercase font-bold px-2 py-1 ${
                      post.kind === "news"
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container text-on-surface border border-outline-variant"
                    }`}
                  >
                    {post.kind}
                  </span>
                )}
              </div>
              <span className="font-serif italic text-6xl opacity-10 select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="space-y-6">
              <h3 className="font-serif text-3xl md:text-4xl leading-tight text-on-surface">
                {post.title}
              </h3>

              <ul className="space-y-3 border-l-2 border-outline-variant pl-5">
                {post.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="text-base md:text-lg text-on-surface-variant leading-relaxed"
                  >
                    {b}
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-on-surface text-surface px-5 py-3 text-[11px] uppercase tracking-widest font-bold hover:opacity-90 transition"
                >
                  <span>Read full article</span>
                  <span aria-hidden>→</span>
                </a>
                {post.author && (
                  <p className="mt-3 text-[11px] uppercase tracking-widest text-on-surface-variant/70">
                    by {post.author}
                  </p>
                )}
              </div>
            </div>
          </article>
        </div>

        <section className="mt-auto pt-12">
          <div className="flex items-center justify-between py-6 border-t border-outline-variant">
            <button
              onClick={next}
              disabled={atEnd}
              className="flex items-center gap-3 text-on-surface-variant/60 hover:text-on-surface-variant transition disabled:opacity-30"
            >
              <span>→</span>
              <span className="text-[11px] uppercase tracking-widest">
                Swipe to skip
              </span>
            </button>
            {atEnd ? (
              <Link
                href="/today/done"
                className="flex items-center gap-3 text-on-surface font-semibold"
              >
                <span className="text-[11px] uppercase tracking-widest">
                  Finish
                </span>
                <span>✓</span>
              </Link>
            ) : (
              <button
                onClick={next}
                className="flex items-center gap-3 text-on-surface font-semibold"
              >
                <span className="text-[11px] uppercase tracking-widest">
                  Next
                </span>
                <span>→</span>
              </button>
            )}
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
