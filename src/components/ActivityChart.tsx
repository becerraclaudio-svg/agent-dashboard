"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ActivityPoint } from "@/lib/agents";

export function ActivityChart({ data }: { data: ActivityPoint[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0071e3" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#0071e3" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="t" hide />
          <YAxis width={28} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 12 }}
            labelFormatter={() => "actividad"}
          />
          <Area type="monotone" dataKey="tasks" stroke="#0071e3" strokeWidth={2} fill="url(#activityFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
