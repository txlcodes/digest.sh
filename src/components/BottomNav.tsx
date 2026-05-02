"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const tabs = [
  { href: "/today", label: "Today", icon: "📅" },
  { href: "/saved", label: "Saved", icon: "🔖" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

function formatTodayLabel(): string {
  const d = new Date();
  return d
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toUpperCase();
}

export default function BottomNav() {
  const pathname = usePathname();
  const [todayLabel, setTodayLabel] = useState<string>("Today");

  useEffect(() => {
    setTodayLabel(formatTodayLabel());
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e5e5e1]">
      <div className="flex justify-around items-center px-8 pb-6 pt-2 max-w-[680px] mx-auto w-full">
        {tabs.map((t) => {
          const active =
            pathname === t.href || pathname?.startsWith(t.href + "/");
          const label = t.href === "/today" ? todayLabel : t.label;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex flex-col items-center gap-1 pt-2 transition-transform ${
                active
                  ? "text-on-surface font-bold border-t-2 border-on-surface"
                  : "text-outline hover:text-on-surface"
              }`}
            >
              <span className="text-lg grayscale">{t.icon}</span>
              <span className="text-[10px] tracking-widest uppercase">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
