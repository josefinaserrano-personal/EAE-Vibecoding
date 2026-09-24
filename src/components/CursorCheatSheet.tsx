const zones = [
  {
    id: "files",
    label: "Los archivos",
    body: "La carpeta del proyecto. Desde aquí se abre un archivo para ver qué escribió el agente.",
  },
  {
    id: "stage",
    label: "Código o navegador",
    body: "La ventana del centro. Muestra el código de un archivo o el navegador con la web en localhost.",
  },
  {
    id: "terminal",
    label: "La terminal",
    body: "Donde corre el proyecto. Si el servidor está encendido, el aviso aparece aquí.",
  },
  {
    id: "chat",
    label: "Chat",
    body: "Donde escribes el prompt y el agente responde. Es el lugar de trabajo.",
  },
  {
    id: "agents",
    label: "Listado de agentes",
    body: "A la derecha del chat. Cada conversación es un agente: aquí ves los que tienes abiertos y creas uno nuevo.",
  },
] as const

function ZoneLabel({ index, label }: { index: number; label: string }) {
  return (
    <p className="text-[11px] font-semibold tracking-wide text-white uppercase">
      <span className="mr-1.5 text-white/55">{index}</span>
      {label}
    </p>
  )
}

export function CursorCheatSheet() {
  return (
    <figure className="mt-8">
      <figcaption className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
        Chuleta · la pantalla de Cursor
      </figcaption>
      <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-sm">
        <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="ml-2 text-xs text-zinc-500">Cursor</span>
        </div>

        <div className="grid gap-1.5 p-1.5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,0.85fr)] md:grid-rows-[minmax(11rem,1fr)_6.5rem]">
          <div className="rounded-xl border border-amber-300/30 bg-amber-400/10 p-3 md:row-span-2">
            <ZoneLabel index={1} label="Los archivos" />
            <ul className="mt-3 space-y-1 font-mono text-[11px] text-amber-100/90">
              <li>src/</li>
              <li className="pl-3">App.tsx</li>
              <li>index.html</li>
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-3 md:col-start-2">
            <ZoneLabel index={2} label="Código o navegador" />
            <div className="mt-3 flex gap-1.5 text-[11px]">
              <span className="rounded-md bg-zinc-800 px-2 py-1 text-zinc-100">App.tsx</span>
              <span className="rounded-md px-2 py-1 text-zinc-500">Navegador</span>
            </div>
            <pre className="mt-3 overflow-hidden font-mono text-[11px] leading-relaxed text-zinc-400">
              {`export default function App() {
  return <CvLanding />
}`}
            </pre>
          </div>

          <div className="rounded-xl border border-emerald-400/30 bg-black p-3 md:col-start-2 md:row-start-2">
            <ZoneLabel index={3} label="La terminal" />
            <p className="mt-3 font-mono text-[11px] text-emerald-300/90">
              $ npm run dev
              <br />
              localhost:5173
            </p>
          </div>

          <div className="rounded-xl border border-violet-400/35 bg-violet-500/10 p-3 md:col-start-3 md:row-span-2 md:row-start-1">
            <ZoneLabel index={4} label="Chat" />
            <div className="mt-3 space-y-2 text-xs leading-relaxed">
              <p className="rounded-lg bg-violet-400/15 px-2.5 py-2 text-violet-50">
                Pega el PRD y arma el plan del CV.
              </p>
              <p className="rounded-lg bg-zinc-900/80 px-2.5 py-2 text-zinc-300">
                Plan listo. Revisa los pasos y, si están bien, haz Build.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-indigo-400/40 bg-indigo-500/15 p-3 md:col-start-4 md:row-span-2 md:row-start-1">
            <ZoneLabel index={5} label="Listado de agentes" />
            <ul className="mt-3 space-y-1.5 text-xs text-indigo-100">
              <li className="rounded-md bg-indigo-400/20 px-2 py-1.5">CV · primer prompt</li>
              <li className="rounded-md px-2 py-1.5 text-indigo-200/70">Formulario de contacto</li>
              <li className="rounded-md border border-dashed border-indigo-300/30 px-2 py-1.5 text-indigo-200/80">
                + Nuevo agente
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {zones.map((zone, index) => (
          <li key={zone.id}>
            <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              <span className="mr-1.5 text-zinc-400">{index + 1}</span>
              {zone.label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{zone.body}</p>
          </li>
        ))}
      </ul>

      <p className="mt-5 rounded-2xl border border-indigo-500/25 bg-indigo-500/10 px-4 py-3 text-sm leading-relaxed text-indigo-950 dark:text-indigo-100">
        Un agente por problema. Cuando cambia la tarea, se abre un agente nuevo en el listado. El chat
        anterior se queda con su contexto. Reutilizarlo mezcla instrucciones viejas, el agente se
        abruma y responde peor.
      </p>
    </figure>
  )
}
