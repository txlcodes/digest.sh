import type { Post } from "../types";

type LobstersStory = {
  short_id: string;
  title: string;
  url: string;
  description?: string;
  description_plain?: string;
  score: number;
  comment_count: number;
  created_at: string;
  submitter_user?: string;
  tags?: string[];
};

export async function fetchLobsters(): Promise<Post[]> {
  const res = await fetch("https://lobste.rs/hottest.json", {
    next: { revalidate: 1800 },
    headers: { "User-Agent": "digest.sh (curated reader)" },
  });
  if (!res.ok) return [];
  const stories: LobstersStory[] = await res.json();

  return stories.map((s) => {
    const desc = (s.description_plain ?? s.description ?? "").trim();
    const excerpt = desc
      ? desc.slice(0, 280)
      : `${s.score} points · ${s.comment_count} comments · ${(s.tags ?? []).join(", ")}`;
    return {
      id: `lob-${s.short_id}`,
      source: "Lobsters",
      title: s.title,
      bullets: [excerpt],
      excerpt,
      url: s.url || `https://lobste.rs/s/${s.short_id}`,
      author: s.submitter_user,
      publishedAt: new Date(s.created_at).getTime(),
      signal: s.score,
    };
  });
}
