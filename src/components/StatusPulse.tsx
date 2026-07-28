import type { AgentStatus } from "@/lib/agents";

const COLORS: Record<AgentStatus, string> = {
  working: "bg-emerald-500",
  idle: "bg-neutral-300",
  done: "bg-[#0071e3]",
  error: "bg-red-500",
};

export function StatusPulse({ status }: { status: AgentStatus }) {
  const color = COLORS[status];
  return (
    <span className="relative flex h-2.5 w-2.5">
      {status === "working" && (
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-75`} />
      )}
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  );
}
