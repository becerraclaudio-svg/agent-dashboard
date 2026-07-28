"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AgentCard } from "@/components/AgentCard";
import { ActivityChart } from "@/components/ActivityChart";
import { MetricTile } from "@/components/MetricTile";
import type { Agent, ActivityPoint } from "@/lib/agents";

interface ApiResponse {
  agents: Agent[];
  activity: ActivityPoint[];
  timestamp: number;
}

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    let active = true;

    async function poll() {
      try {
        const res = await fetch("/api/agents", { cache: "no-store" });
        const json: ApiResponse = await res.json();
        if (active) setData(json);
      } catch {
        // el próximo poll reintenta solo
      }
    }

    poll();
    const id = setInterval(poll, 3000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  const agents = data?.agents ?? [];
  const activity = data?.activity ?? [];
  const working = agents.filter((a) => a.status === "working").length;
  const done = agents.filter((a) => a.status === "done").length;
  const avgProgress = agents.length
    ? Math.round(agents.reduce((sum, a) => sum + a.progress, 0) / agents.length)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-[28px] font-semibold tracking-tight text-neutral-900">
          Panel de actividad de agentes
        </h1>
        <p className="mt-1 text-[15px] text-neutral-400">Estado en vivo de tu equipo de agentes.</p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricTile label="Agentes activos" value={working} />
          <MetricTile label="Completados" value={done} />
          <MetricTile label="Progreso promedio" value={avgProgress} suffix="%" />
          <MetricTile label="Total de agentes" value={agents.length} />
        </div>

        <div className="mt-8 rounded-3xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
          <h2 className="text-[15px] font-semibold text-neutral-900">Actividad</h2>
          <ActivityChart data={activity} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </main>
    </div>
  );
}
