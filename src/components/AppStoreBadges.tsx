"use client";

import { useState } from "react";

type Platform = "ios" | "android";

const APPLE_ICON = (
  <svg
    className="w-6 h-6 flex-shrink-0"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const PLAY_ICON = (
  <svg
    className="w-6 h-6 flex-shrink-0"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.699-3.7l2.532 1.466c.768.446.768 1.558 0 2.004l-2.532 1.466-2.6-2.468 2.6-2.468zm-3.7-3.698L5.863 1.48l10.937 6.333-2.302 2.302z" />
  </svg>
);

const CHECK_ICON = (
  <svg
    className="w-5 h-5 flex-shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function AppStoreBadges({
  size = "md",
}: {
  size?: "sm" | "md";
}) {
  const height = size === "sm" ? "h-11" : "h-14";
  const [tapped, setTapped] = useState<Platform | null>(null);

  const buttonClass = `group relative flex items-center gap-3 bg-primary text-on-primary px-6 ${height} rounded hover:opacity-90 transition-all`;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <button
        type="button"
        onClick={() => setTapped("ios")}
        aria-label="App Store launching soon"
        className={buttonClass}
      >
        {tapped === "ios" ? (
          <>
            {CHECK_ICON}
            <span className="flex flex-col items-start leading-tight whitespace-nowrap">
              <span className="text-[10px] uppercase tracking-widest opacity-80">
                Launching soon
              </span>
              <span className="text-base font-semibold">App Store</span>
            </span>
          </>
        ) : (
          <>
            {APPLE_ICON}
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[10px] uppercase tracking-widest opacity-80">
                Download on
              </span>
              <span className="text-base font-semibold">App Store</span>
            </span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={() => setTapped("android")}
        aria-label="Google Play launching soon"
        className={buttonClass}
      >
        {tapped === "android" ? (
          <>
            {CHECK_ICON}
            <span className="flex flex-col items-start leading-tight whitespace-nowrap">
              <span className="text-[10px] uppercase tracking-widest opacity-80">
                Launching soon
              </span>
              <span className="text-base font-semibold">Google Play</span>
            </span>
          </>
        ) : (
          <>
            {PLAY_ICON}
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[10px] uppercase tracking-widest opacity-80">
                Get it on
              </span>
              <span className="text-base font-semibold">Google Play</span>
            </span>
          </>
        )}
      </button>
    </div>
  );
}
