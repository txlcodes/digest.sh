import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

export default function SavedPage() {
  return (
    <>
      <AppHeader right="Saved" />

      <main className="pt-24 pb-32 px-6 max-w-[560px] mx-auto min-h-screen flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-outline-variant mb-6">
          <span className="text-xl">☆</span>
        </div>

        <span className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-3">
          Launching summer 2026
        </span>

        <h2 className="font-serif text-3xl md:text-4xl text-on-surface mb-4">
          Saved is <span className="serif-italic">coming soon.</span>
        </h2>

        <p className="text-on-surface-variant leading-relaxed max-w-sm">
          Star a post in today&rsquo;s edition and it will live here, organized
          by week, ready for you when you have a quiet moment.
        </p>

        <p className="serif-italic text-on-surface-variant/70 text-sm mt-8 max-w-sm">
          We&rsquo;re building this slowly, on purpose.
        </p>
      </main>

      <BottomNav />
    </>
  );
}
