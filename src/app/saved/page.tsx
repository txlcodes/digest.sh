import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

type SavedItem = {
  category: string;
  title: string;
  excerpt: string;
  source: string;
  readTime: string;
  image?: string;
};

const TODAY: SavedItem[] = [
  {
    category: "Technology",
    title: "The Silent Shift in Urban Architecture and Digital Living",
    excerpt:
      "An exploration of how metropolitan spaces are adapting to the post-digital era through minimalist design and shared focus zones.",
    source: "The Monocle Quarterly",
    readTime: "12 min read",
  },
  {
    category: "Literature",
    title: "Why Physical Books Persist in a Fluid Information Age",
    excerpt:
      "Tracing the sensory psychology of reading and why digital exhaustion is bringing audiences back to the tactile page.",
    source: "New York Review",
    readTime: "8 min read",
  },
];

const EARLIER: SavedItem[] = [
  {
    category: "Economics",
    title: "The Rise of the Micro-Economy in Remote Coastal Towns",
    excerpt:
      "How specialized artisans are leveraging global platforms to revitalize local craftsmanship in isolated geographies.",
    source: "Economist Insights",
    readTime: "15 min read",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80&auto=format&fit=crop",
  },
  {
    category: "Philosophy",
    title: "Stoicism for the Modern Hyper-Connected Professional",
    excerpt:
      "Applying ancient wisdom to navigate the relentless stream of digital notifications and workplace urgency.",
    source: "The Atlantic",
    readTime: "6 min read",
  },
];

function Article({ item }: { item: SavedItem }) {
  return (
    <article className="group cursor-pointer">
      <div
        className={`grid ${
          item.image ? "grid-cols-1 md:grid-cols-[1fr_120px]" : "grid-cols-1"
        } gap-6`}
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-on-surface uppercase tracking-widest bg-surface-variant px-2 py-1 font-semibold">
              {item.category}
            </span>
            <span className="text-outline text-lg">🔖</span>
          </div>
          <h3 className="font-serif text-2xl leading-tight text-on-surface group-hover:opacity-70 transition-opacity">
            {item.title}
          </h3>
          <p className="text-on-surface-variant leading-relaxed line-clamp-2">
            {item.excerpt}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[11px] text-on-surface-variant">
              {item.source}
            </span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span className="text-[11px] text-on-surface-variant">
              {item.readTime}
            </span>
          </div>
        </div>
        {item.image && (
          <div className="hidden md:block">
            <img
              alt={item.title}
              src={item.image}
              className="w-full aspect-square object-cover rounded grayscale group-hover:grayscale-0 transition duration-500"
            />
          </div>
        )}
      </div>
    </article>
  );
}

export default function SavedPage() {
  return (
    <>
      <AppHeader right="Library" />

      <main className="pt-24 pb-32 px-6 max-w-[680px] mx-auto">
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-on-surface mb-2">
            Library
          </h2>
          <p className="text-on-surface-variant">
            Archived and saved for later reading.
          </p>
        </div>

        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[11px] tracking-widest text-on-surface-variant uppercase font-semibold">
              Today
            </span>
            <div className="flex-grow h-px bg-outline-variant" />
          </div>
          <div className="space-y-12">
            {TODAY.map((item, i) => (
              <Article key={i} item={item} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[11px] tracking-widest text-on-surface-variant uppercase font-semibold">
              Earlier this week
            </span>
            <div className="flex-grow h-px bg-outline-variant" />
          </div>
          <div className="space-y-12">
            {EARLIER.map((item, i) => (
              <Article key={i} item={item} />
            ))}
          </div>
        </section>

        <div className="mt-20 pt-10 border-t border-outline-variant text-center">
          <p className="text-[11px] text-on-surface-variant tracking-widest uppercase italic">
            End of Library
          </p>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
