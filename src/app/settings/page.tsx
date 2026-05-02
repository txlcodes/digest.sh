import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

export default function SettingsPage() {
  return (
    <>
      <AppHeader right="Settings" />

      <main className="pt-24 pb-32 px-6 max-w-[560px] mx-auto min-h-screen flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-outline-variant mb-6">
          <span className="text-xl">⚙</span>
        </div>

        <span className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-3">
          Launching summer 2026
        </span>

        <h2 className="font-serif text-3xl md:text-4xl text-on-surface mb-4">
          Settings are <span className="serif-italic">coming soon.</span>
        </h2>

        <p className="text-on-surface-variant leading-relaxed max-w-sm">
          You&rsquo;ll be able to pick your topics, your delivery time, and the
          sources you trust. Until then, today&rsquo;s edition is the same for
          everyone, and we like it that way.
        </p>

        <p className="serif-italic text-on-surface-variant/70 text-sm mt-8 max-w-sm">
          Boring for a reason. Funny for a reason.
        </p>
      </main>

      <BottomNav />
    </>
  );
}
