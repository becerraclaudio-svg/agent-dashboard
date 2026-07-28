"use client";

import { AnimatePresence, motion } from "framer-motion";

export function MetricTile({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
      <p className="text-[13px] text-neutral-400">{label}</p>
      <div className="mt-1 h-9 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.p
            key={value}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[32px] font-semibold tracking-tight text-neutral-900"
          >
            {value}
            <span className="text-[18px] text-neutral-400">{suffix}</span>
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
