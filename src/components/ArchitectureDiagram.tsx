import { useState } from "react"

const layers = [
  {
    id: "frontend",
    step: "01",
    title: "Frontend",
    short: "Lo que se ve",
    queEs:
      "Lo que el usuario ve e interactúa: HTML, CSS y JavaScript. Botones, textos, colores y el formulario.",
    hoy: "Es lo que estamos construyendo en Cursor con prompts. No hace falta escribir el código a mano.",
    ejemplo:
      "El CV en el navegador: el nombre, la experiencia en un acordeón y el botón Hablemos.",
  },
  {
    id: "backend",
    step: "02",
    title: "Backend",
    short: "La lógica",
    queEs:
      "La lógica de negocio, las reglas y los servidores detrás de escena. Decide qué se acepta y qué se responde.",
    hoy: "Hoy Cursor escribe esa lógica. En el bonus, Supabase recibe el formulario de contacto.",
    ejemplo:
      "La regla que guarda un mensaje completo y rechaza uno vacío, sin que el visitante vea el servidor.",
  },
  {
    id: "database",
    step: "03",
    title: "Base de datos",
    short: "La memoria",
    queEs:
      "El almacenamiento persistente de la información. Los datos siguen ahí aunque cierres el navegador.",
    hoy: "Hoy el CV muestra la información. En el bonus, una tabla de Supabase guarda cada mensaje.",
    ejemplo:
      "Cada fila es un lead: nombre, email y mensaje. Mañana sigue en la tabla.",
  },
] as const

type LayerId = (typeof layers)[number]["id"]

export function ArchitectureDiagram() {
  const [active, setActive] = useState<LayerId>("frontend")
  const layer = layers.find((item) => item.id === active) ?? layers[0]

  return (
    <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
        Para proyectar
      </p>
      <h3 className="mt-1 text-lg font-semibold text-zinc-950 dark:text-white">
        Frontend, backend y base de datos
      </h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Pulsa una capa para ver qué es, qué hacemos hoy y un ejemplo con el CV.
      </p>

      <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-stretch">
        {layers.map((item, index) => {
          const selected = item.id === active
          return (
            <div key={item.id} className="flex flex-1 flex-col gap-2 md:flex-row md:items-stretch">
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(item.id)}
                className={`flex-1 rounded-xl border px-4 py-4 text-left transition-colors ${
                  selected
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
                }`}
              >
                <span className="text-[11px] font-semibold tracking-wide text-indigo-600 dark:text-indigo-300">
                  {item.step}
                </span>
                <span className="mt-1 block text-lg font-semibold">{item.title}</span>
                <span className="mt-1 block text-sm text-zinc-500">{item.short}</span>
              </button>
              {index < layers.length - 1 && (
                <span
                  aria-hidden
                  className="flex items-center justify-center text-lg text-zinc-400 md:px-1"
                >
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </span>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-5 grid gap-4 rounded-xl border border-zinc-200 bg-white p-5 sm:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-900">
        <Detail label="Qué es" text={layer.queEs} />
        <Detail label="Qué hacemos hoy" text={layer.hoy} />
        <Detail label="Ejemplo del CV" text={layer.ejemplo} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
            Landing estática
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Se ve y no recuerda nada. Un CV que solo muestra información.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-4">
          <p className="text-xs font-semibold tracking-wide text-emerald-700 uppercase dark:text-emerald-300">
            Web app con persistencia
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Además guarda datos. En el bonus, el mismo CV deja el mensaje en Supabase.
          </p>
        </div>
      </div>
    </div>
  )
}

function Detail({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{text}</p>
    </div>
  )
}
