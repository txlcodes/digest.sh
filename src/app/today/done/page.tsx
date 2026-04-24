import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

export default function DonePage() {
  return (
    <>
      <AppHeader right="10 / 10" />

      <main className="flex-grow flex items-center justify-center px-6 py-24 max-w-[680px] mx-auto w-full min-h-screen">
        <div className="text-center space-y-12">
          <div className="relative w-24 h-24 mx-auto opacity-10 text-[96px] leading-none">
            📖
          </div>

          <div className="space-y-6">
            <h1 className="font-serif italic text-[42px] leading-tight text-on-surface">
              That&apos;s it for today.
              <br />
              <span className="opacity-60">See you tomorrow.</span>
            </h1>
            <div className="w-12 h-[1px] bg-outline-variant mx-auto" />
            <p className="text-on-surface-variant max-w-sm mx-auto">
              You&apos;ve completed your daily curation. Take a moment to
              reflect on what you&apos;ve learned.
            </p>
          </div>

          <div className="opacity-40 select-none">
            <div className="border-t border-outline-variant pt-8">
              <p className="text-[11px] text-on-surface-variant tracking-[0.2em] uppercase">
                Curated for you
              </p>
              <p className="mt-2 italic text-on-surface-variant">
                The next edition will be available at 8:00 AM.
              </p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
