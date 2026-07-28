"use client";

import { motion } from "framer-motion";
import type { Agent } from "@/lib/agents";
import { StatusPulse } from "./StatusPulse";

const STATUS_LABEL: Record<Agent["status"], string> = {
  working: "Trabajando",
  idle: "En espera",
  done: "Completado",
  error: "Error",
};

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group rounded-3xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[17px] font-semibold tracking-tight text-neutral-900">{agent.name}</h3>
          <p className="text-[13px] text-neutral-400">{agent.role}</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-neutral-50 px-2.5 py-1">
          <StatusPulse status={agent.status} />
          <span className="text-[11px] font-medium text-neutral-500">{STATUS_LABEL[agent.status]}</span>
        </div>
      </div>

      <p className="mt-4 text-[14px] text-neutral-600">{agent.task}</p>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
        <motion.div
          className="h-full rounded-full bg-[#0071e3]"
          animate={{ width: `${agent.progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      <div className="mt-3 flex justify-between text-[11px] text-neutral-400">
        <span>
          Activo {Math.floor(agent.uptimeSec / 60)}m {agent.uptimeSec % 60}s
        </span>
        <span>{agent.progress}%</span>
      </div>
    </motion.div>
  );
}
