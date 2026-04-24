"use client";

import Link from "next/link";
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

type Post = {
  source: string;
  title: string;
  excerpt: string;
  image: string;
};

const POSTS: Post[] = [
  {
    source: "Hacker News",
    title:
      "Why the return to physical infrastructure is dominating Silicon Valley's next decade",
    excerpt:
      "After decades of focusing purely on software, the world's leading engineers are shifting their attention back to the physical atoms that power our digital existence.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop",
  },
  {
    source: "GitHub Trending",
    title: "The quiet rise of local-first software",
    excerpt:
      "How a small movement of engineers are rebuilding applications to work offline first, and why it matters for the next generation of tools.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop",
  },
  {
    source: "Substack",
    title: "A new theory of taste in an age of infinite content",
    excerpt:
      "When everything is recommended, what does personal taste mean? A meditation on curation, identity, and the algorithms that shape us.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80&auto=format&fit=crop",
  },
];

export default function TodayPage() {
  const [index, setIndex] = useState(0);
  const post = POSTS[index];
  const atEnd = index >= POSTS.length - 1;

  const next = () => {
    if (atEnd) return;
    setIndex((i) => i + 1);
  };

  return (
    <>
      <AppHeader right={`${String(index + 1).padStart(2, "0")} / 10`} />

      <main className="pt-24 pb-32 px-6 max-w-[680px] mx-auto min-h-screen flex flex-col">
        <section className="mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-on-surface">
            Today — 10 posts
          </h2>
          <div className="w-12 h-[2px] bg-primary mt-4" />
        </section>

        <div className="flex-1 flex flex-col justify-center">
          <article className="group">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center border border-outline-variant bg-white text-sm">
                  ⌘
                </div>
                <span className="text-[11px] text-on-surface-variant tracking-widest uppercase font-semibold">
                  {post.source}
                </span>
              </div>
              <span className="font-serif italic text-6xl opacity-10 select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="mb-8 overflow-hidden aspect-[4/3] relative bg-surface-container-low">
              <img
                alt={post.title}
                src={post.image}
                className="w-full h-full object-cover grayscale"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-3xl md:text-4xl leading-tight text-on-surface">
                {post.title}
              </h3>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                {post.excerpt}
              </p>
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
                  Tap to read
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
