import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

export default function DonePage() {
  return (
    <>
      <AppHeader right="10 / 10" />

      <main className="flex-grow flex items-center justify-center px-6 py-24 max-w-[680px] mx-auto w-full min-h-screen">
        <div className="text-center space-y-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-on-surface mb-2">
            <span className="text-2xl leading-none">✓</span>
          </div>

          <div className="space-y-5">
            <span className="block text-[10px] uppercase tracking-[0.3em] text-on-surface-variant">
              Launching summer 2026
            </span>
            <h1 className="font-serif text-[42px] leading-[1.05] text-on-surface">
              You&rsquo;re <span className="serif-italic">caught up.</span>
            </h1>
            <div className="w-12 h-[1px] bg-outline-variant mx-auto" />
            <p className="text-on-surface-variant leading-relaxed max-w-md mx-auto">
              You read all 10 things that mattered today. The internet is
              paused. The app is in private beta now, the full version with
              saved posts, custom topics, and morning delivery launches summer
              2026.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-on-surface text-surface px-6 py-4 text-[11px] uppercase tracking-widest font-bold hover:opacity-90 transition"
            >
              <span>Get notified at launch</span>
              <span aria-hidden>→</span>
            </Link>
            <p className="serif-italic text-on-surface-variant text-sm">
              See you tomorrow at 8 AM.
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
