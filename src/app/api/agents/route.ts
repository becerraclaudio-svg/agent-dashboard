import { getAgents, getActivitySeries } from "@/lib/agents";

export async function GET() {
  const now = Date.now();
  const agents = getAgents(now);
  const activity = getActivitySeries(now);

  return Response.json({ agents, activity, timestamp: now });
}
