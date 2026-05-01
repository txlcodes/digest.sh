import type { Post } from "../types";

type HNItem = {
  id: number;
  type?: string;
  by?: string;
  title?: string;
  url?: string;
  text?: string;
  score?: number;
  time?: number;
  descendants?: number;
  dead?: boolean;
  deleted?: boolean;
};

const TOP_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const ITEM_URL = (id: number) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

export async function fetchHN(limit = 30): Promise<Post[]> {
  const idsRes = await fetch(TOP_URL, { next: { revalidate: 1800 } });
  if (!idsRes.ok) return [];
  const ids: number[] = await idsRes.json();

  const items = await Promise.all(
    ids.slice(0, limit).map(async (id) => {
      const r = await fetch(ITEM_URL(id), { next: { revalidate: 1800 } });
      if (!r.ok) return null;
      return (await r.json()) as HNItem | null;
    }),
  );

  return items
    .filter(
      (it): it is HNItem =>
        !!it && it.type === "story" && !it.dead && !it.deleted && !!it.title,
    )
    .map((it) => {
      const url = it.url ?? `https://news.ycombinator.com/item?id=${it.id}`;
      const excerpt = it.text
        ? stripHtml(it.text).slice(0, 280)
        : `${it.score ?? 0} points · ${it.descendants ?? 0} comments on Hacker News`;
      return {
        id: `hn-${it.id}`,
        source: "Hacker News",
        title: it.title!,
        bullets: [excerpt],
        excerpt,
        url,
        author: it.by,
        publishedAt: (it.time ?? 0) * 1000,
        signal: it.score ?? 0,
      };
    });
}
