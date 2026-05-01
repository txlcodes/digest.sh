import fs from "node:fs/promises";
import path from "node:path";
import type { Digest, Post } from "./types";
import { fetchHN } from "./sources/hn";
import { fetchLobsters } from "./sources/lobsters";

const HOUR = 1000 * 60 * 60;

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

async function loadDatedDigest(date: string): Promise<Digest | null> {
  const file = path.join(process.cwd(), "content", `digest-${date}.json`);
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as Digest;
  } catch {
    return null;
  }
}

async function loadLatestDigest(): Promise<Digest | null> {
  const dir = path.join(process.cwd(), "content");
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return null;
  }
  const dated = entries
    .map((f) => f.match(/^digest-(\d{4}-\d{2}-\d{2})\.json$/)?.[1])
    .filter((d): d is string => !!d)
    .sort()
    .reverse();
  if (!dated.length) return null;
  return loadDatedDigest(dated[0]);
}

function score(post: Post, now: number): number {
  if (!post.publishedAt || !post.signal) return 0;
  const ageHours = Math.max(1, (now - post.publishedAt) / HOUR);
  const sourceWeight = post.source === "Lobsters" ? 1.4 : 1;
  return (post.signal * sourceWeight) / Math.pow(ageHours, 0.7);
}

async function buildLiveDigest(limit: number): Promise<Digest> {
  const results = await Promise.allSettled([fetchHN(40), fetchLobsters()]);
  const all: Post[] = results.flatMap((r) =>
    r.status === "fulfilled" ? r.value : [],
  );
  const now = Date.now();
  const seen = new Set<string>();
  const deduped = all.filter((p) => {
    const key = p.url.replace(/[#?].*$/, "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  deduped.sort((a, b) => score(b, now) - score(a, now));

  const picked: Post[] = [];
  let hnCount = 0;
  let lobCount = 0;
  for (const p of deduped) {
    if (picked.length >= limit) break;
    if (p.source === "Hacker News" && hnCount >= Math.ceil(limit * 0.7))
      continue;
    if (p.source === "Lobsters" && lobCount >= Math.ceil(limit * 0.7)) continue;
    picked.push(p);
    if (p.source === "Hacker News") hnCount++;
    else lobCount++;
  }
  return { date: todayISO(), posts: picked };
}

export async function getDigest(limit = 10): Promise<Digest> {
  const today = todayISO();
  const exact = await loadDatedDigest(today);
  if (exact) return { ...exact, posts: exact.posts.slice(0, limit) };

  const latest = await loadLatestDigest();
  if (latest) return { ...latest, posts: latest.posts.slice(0, limit) };

  return buildLiveDigest(limit);
}
