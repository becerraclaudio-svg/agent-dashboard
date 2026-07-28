# Agent Activity Dashboard

Panel en vivo, estilo Apple, que visualiza el estado de un equipo de agentes:
tarjetas de estado por agente, progreso, y un gráfico de actividad que se
actualiza solo cada 3 segundos.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Recharts (gráfico de actividad)
- Framer Motion (animaciones)

## Desarrollo local

```bash
npm install
npm run dev
```

## Datos

`GET /api/agents` devuelve el estado actual de los agentes y la serie de
actividad. Hoy los datos son **simulados** (generados de forma determinística
a partir del tiempo, sin base de datos). Para conectar agentes reales, se
puede reemplazar `src/lib/agents.ts` por una fuente real (por ejemplo, un
endpoint `POST /api/agents/update` respaldado por Vercel KV / Upstash).

## Despliegue

Conectado a Vercel: cada push a `master` en GitHub dispara un deploy a
producción automáticamente.
