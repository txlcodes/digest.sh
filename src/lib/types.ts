export type PostKind =
  | "news"
  | "tool"
  | "project"
  | "opinion"
  | "obituary"
  | "culture";

export type Post = {
  id: string;
  source: string;
  title: string;
  url: string;
  bullets: string[];
  kind?: PostKind;
  excerpt?: string;
  author?: string;
  publishedAt?: number;
  signal?: number;
};

export type Digest = {
  date: string;
  posts: Post[];
};
