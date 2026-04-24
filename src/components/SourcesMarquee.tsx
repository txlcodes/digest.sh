const SOURCES = [
  { name: "Hacker News", slug: "ycombinator" },
  { name: "GitHub", slug: "github" },
  { name: "Reddit", slug: "reddit" },
  { name: "Substack", slug: "substack" },
  { name: "Product Hunt", slug: "producthunt" },
  { name: "Dribbble", slug: "dribbble" },
  { name: "Medium", slug: "medium" },
  { name: "Dev.to", slug: "devdotto" },
  { name: "X", slug: "x" },
  { name: "Stack Overflow", slug: "stackoverflow" },
  { name: "Notion", slug: "notion" },
  { name: "Figma", slug: "figma" },
  { name: "arXiv", slug: "arxiv" },
  { name: "Vercel", slug: "vercel" },
];

function Row() {
  return (
    <div className="flex items-center gap-16 shrink-0 pr-16">
      {SOURCES.map((s) => (
        <div
          key={s.name}
          className="flex items-center gap-3 shrink-0 text-on-surface/70"
        >
          <img
            src={`https://cdn.simpleicons.org/${s.slug}/000000`}
            alt=""
            className="w-6 h-6 grayscale opacity-80"
            loading="lazy"
          />
          <span className="text-sm font-medium tracking-tight whitespace-nowrap">
            {s.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SourcesMarquee() {
  return (
    <section className="w-full border-y border-outline-variant/40 py-10 bg-surface-container-low overflow-hidden relative">
      <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] text-center mb-6 opacity-70">
        Curated from
      </p>

      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-surface-container-low to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-surface-container-low to-transparent pointer-events-none" />

        <div className="flex animate-marquee w-max">
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}
