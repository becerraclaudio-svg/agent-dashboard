export type AgentStatus = "working" | "idle" | "done" | "error";

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  task: string;
  progress: number;
  uptimeSec: number;
}

export interface ActivityPoint {
  t: number;
  tasks: number;
}

const AGENT_DEFS = [
  { id: "a1", name: "Scout", role: "Investigación" },
  { id: "a2", name: "Forge", role: "Generación de código" },
  { id: "a3", name: "Sentinel", role: "QA / Revisión" },
  { id: "a4", name: "Courier", role: "Despliegue" },
  { id: "a5", name: "Archivist", role: "Documentación" },
  { id: "a6", name: "Pathfinder", role: "Planificación" },
];

const TASKS = [
  "Analizando requerimientos",
  "Generando componentes UI",
  "Ejecutando tests",
  "Revisando pull request",
  "Optimizando build",
  "Sincronizando repositorio",
  "Desplegando a producción",
  "Indexando documentación",
];

const TICK_MS = 3000;

function mulberry32(seed: number) {
  let s = seed | 0;
  return function random() {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStr(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) {
    h = (Math.imul(31, h) + value.charCodeAt(i)) | 0;
  }
  return h;
}

/**
 * Genera un estado de agentes determinístico a partir del tiempo, para que
 * cualquier instancia serverless (sin estado compartido) devuelva la misma
 * "foto" dentro de la misma ventana de 3s, y una distinta en la siguiente.
 */
export function getAgents(now: number = Date.now()): Agent[] {
  const tick = Math.floor(now / TICK_MS);

  return AGENT_DEFS.map((def) => {
    const rand = mulberry32(hashStr(def.id) ^ tick);
    const roll = rand();

    let status: AgentStatus;
    if (roll < 0.6) status = "working";
    else if (roll < 0.78) status = "idle";
    else if (roll < 0.94) status = "done";
    else status = "error";

    const task = status === "idle" ? "Esperando siguiente tarea" : TASKS[Math.floor(rand() * TASKS.length)];

    const progress =
      status === "working"
        ? Math.floor(rand() * 75) + 15
        : status === "done"
          ? 100
          : status === "error"
            ? Math.floor(rand() * 55)
            : 0;

    const uptimeSec = (tick % 900) * 3 + Math.floor(rand() * 40);

    return { id: def.id, name: def.name, role: def.role, status, task, progress, uptimeSec };
  });
}

export function getActivitySeries(now: number = Date.now(), points = 30): ActivityPoint[] {
  const tick = Math.floor(now / TICK_MS);
  const series: ActivityPoint[] = [];

  for (let i = points - 1; i >= 0; i--) {
    const t = tick - i;
    const rand = mulberry32(t * 7919);
    const base = 9 + 5 * Math.sin(t / 6);
    const tasks = Math.max(0, Math.round(base + rand() * 6 - 3));
    series.push({ t: -i, tasks });
  }

  return series;
}
