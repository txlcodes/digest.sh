import Link from "next/link";

export default function AppHeader({ right }: { right?: React.ReactNode }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#e5e5e1]">
      <div className="flex justify-between items-center px-6 py-4 max-w-[680px] mx-auto w-full">
        <Link href="/today" className="serif-italic text-2xl">
          Digest
        </Link>
        <span className="serif-italic text-xl text-on-surface opacity-70">
          {right}
        </span>
      </div>
    </header>
  );
}
