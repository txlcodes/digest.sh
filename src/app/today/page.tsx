import { getDigest } from "@/lib/digest";
import TodayClient from "./TodayClient";

export const revalidate = 1800;

export default async function TodayPage() {
  const digest = await getDigest(10);
  return <TodayClient digest={digest} />;
}
