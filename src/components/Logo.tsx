export default function Logo({
  size = "sm",
  className = "",
}: {
  size?: "sm" | "lg";
  className?: string;
}) {
  if (size === "lg") {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-on-surface/30" />
          <span className="text-[9px] tracking-[0.4em] uppercase text-on-surface-variant font-semibold">
            MMXXVI
          </span>
          <span className="h-px w-8 bg-on-surface/30" />
        </div>
        <span className="serif-italic text-5xl md:text-6xl text-on-surface">
          Digest
        </span>
        <div className="flex items-center gap-3 mt-1">
          <span className="h-px w-6 bg-on-surface/30" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-on-surface-variant font-semibold">
            A Daily Edition
          </span>
          <span className="h-px w-6 bg-on-surface/30" />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 leading-none ${className}`}>
      <span
        className="serif-italic text-2xl text-on-surface"
        aria-label="Digest logo"
      >
        Digest
      </span>
      <span className="serif-italic text-on-surface text-2xl leading-none translate-y-[-4px]">
        .
      </span>
    </div>
  );
}
