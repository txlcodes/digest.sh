import { NextResponse } from "next/server";
import { getDigest } from "@/lib/digest";

export const revalidate = 1800;

export async function GET() {
  const digest = await getDigest(10);
  return NextResponse.json(digest);
}
