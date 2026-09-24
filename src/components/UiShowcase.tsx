import { useEffect, useRef, useState } from "react"

const demos = [
  {
    id: "modal",
    label: "Modal",
    description:
      "Una ventana que se superpone al contenido para mostrar un detalle sin cambiar de página.",
  },
  {
    id: "dropdown",
    label: "Dropdown",
    description:
      "Una lista que se despliega al pulsar un botón y deja elegir una sola opción.",
  },
  {
    id: "accordion",
    label: "Acordeón",
    description:
      "Bloques que se abren y se cierran para mostrar mucho texto sin alargar la página.",
  },
  {
    id: "tabs",
    label: "Pestañas",
    description: "Varias vistas en el mismo espacio. Solo una está visible.",
  },
  {
    id: "sidebar",
    label: "Sidebar",
    description: "Un menú lateral fijo para saltar entre secciones de la página.",
  },
  {
    id: "multiselect",
    label: "Selección múltiple",
    description: "Permite marcar varias opciones a la vez. La selección simple marca solo una.",
  },
  {
    id: "search",
    label: "Buscador",
    description: "Filtra una lista mientras se escribe, sin recargar la página.",
  },
] as const

type DemoId = (typeof demos)[number]["id"]

export function UiShowcase() {
  const [demo, setDemo] = useState<DemoId>("modal")
  const current = demos.find((item) => item.id === demo) ?? demos[0]

  return (
    <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
            Para proyectar
          </p>
          <h3 className="mt-1 text-lg font-semibold text-zinc-950 dark:text-white">
            Componentes de UI en vivo
          </h3>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Componentes de interfaz"
        className="timeline-scroll mt-5 flex gap-2 overflow-x-auto"
      >
        {demos.map((item) => {
          const selected = item.id === demo
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setDemo(item.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm ${
                selected
                  ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                  : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:text-zinc-950 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:text-white"
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {current.description}
      </p>

      <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
        {demo === "modal" && <ModalDemo />}
        {demo === "dropdown" && <DropdownDemo />}
        {demo === "accordion" && <AccordionDemo />}
        {demo === "tabs" && <TabsDemo />}
        {demo === "sidebar" && <SidebarDemo />}
        {demo === "multiselect" && <MultiSelectDemo />}
        {demo === "search" && <SearchDemo />}
      </div>
    </div>
  )
}

function ModalDemo() {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <div className="relative h-80 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="p-5">
        <p className="text-xs text-zinc-500">Proyecto</p>
        <p className="mt-1 font-medium">Rediseño del onboarding</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Ver detalle
        </button>
      </div>
      {open && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-zinc-950/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-5 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            onClick={(event) => event.stopPropagation()}
          >
            <h4 id="demo-modal-title" className="text-lg font-semibold">
              Rediseño del onboarding
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Problema: el alta tardaba doce días. Qué hice: simplifiqué el flujo a tres pasos.
              Resultado: el alta bajó a cuatro días.
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="mt-5 rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function DropdownDemo() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("Producto")
  const rootRef = useRef<HTMLDivElement>(null)
  const options = ["Producto", "Operaciones", "Marketing"]

  useEffect(() => {
    if (!open) return
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener("mousedown", onPointer)
    return () => window.removeEventListener("mousedown", onPointer)
  }, [open])

  return (
    <div ref={rootRef} className="relative h-80">
      <p className="text-sm text-zinc-500">Área del puesto</p>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="mt-2 flex min-w-52 items-center justify-between rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
      >
        {value}
        <span aria-hidden className="text-zinc-400">
          ▾
        </span>
      </button>
      {open && (
        <ul className="absolute z-10 mt-1 w-52 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-950">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  setValue(option)
                  setOpen(false)
                }}
                className={`block w-full px-3 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                  option === value ? "font-medium text-indigo-600 dark:text-indigo-300" : ""
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-sm text-zinc-500">
        Selección simple: <span className="text-zinc-900 dark:text-zinc-100">{value}</span>
      </p>
    </div>
  )
}

const jobs = [
  {
    role: "Directora de operaciones",
    place: "Empresa Norte · 2022–2025",
    detail: "Coordiné equipos de tres países y bajé el tiempo de entrega un 30%.",
  },
  {
    role: "Responsable de producto",
    place: "Estudio Atlas · 2019–2022",
    detail: "Lancé dos líneas de servicio y definí el roadmap con el equipo comercial.",
  },
  {
    role: "Consultora",
    place: "Firma Delta · 2016–2019",
    detail: "Acompañé relevamientos con clientes y traduje notas en propuestas.",
  },
]

function AccordionDemo() {
  const [open, setOpen] = useState(0)

  return (
    <div className="divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
      {jobs.map((job, index) => {
        const expanded = open === index
        return (
          <div key={job.role}>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
            >
              <span>
                <span className="block text-sm font-medium">{job.role}</span>
                <span className="block text-xs text-zinc-500">{job.place}</span>
              </span>
              <span aria-hidden className="text-zinc-400">
                {expanded ? "–" : "+"}
              </span>
            </button>
            {expanded && (
              <p className="px-4 pb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {job.detail}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

const tabPanels = {
  Experiencia: "Tres puestos, del más reciente al más antiguo, con una línea de impacto cada uno.",
  Proyectos: "Dos o tres proyectos. El detalle largo vive en un modal, no en la página.",
  Contacto: "Un formulario corto: nombre, email y mensaje. En el bonus se puede conectar a Supabase.",
}

function TabsDemo() {
  const names = Object.keys(tabPanels) as (keyof typeof tabPanels)[]
  const [tab, setTab] = useState<(typeof names)[number]>("Experiencia")

  return (
    <div>
      <div role="tablist" aria-label="Secciones del CV" className="flex gap-1 border-b border-zinc-200 dark:border-zinc-800">
        {names.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={tab === name}
            onClick={() => setTab(name)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm ${
              tab === name
                ? "border-indigo-500 font-medium text-zinc-950 dark:text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      <p role="tabpanel" className="pt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {tabPanels[tab]}
      </p>
    </div>
  )
}

function SidebarDemo() {
  const items = ["Inicio", "Experiencia", "Proyectos", "Contacto"]
  const [open, setOpen] = useState(true)
  const [item, setItem] = useState(items[0])

  return (
    <div className="flex h-72 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      {open && (
        <aside className="w-40 shrink-0 border-r border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="px-2 text-[11px] font-semibold tracking-wide text-zinc-500 uppercase">
            Menú
          </p>
          <ul className="mt-2 space-y-1">
            {items.map((entry) => (
              <li key={entry}>
                <button
                  type="button"
                  onClick={() => setItem(entry)}
                  className={`w-full rounded-md px-2 py-1.5 text-left text-sm ${
                    item === entry
                      ? "bg-white font-medium shadow-sm dark:bg-zinc-800"
                      : "text-zinc-600 hover:bg-white/70 dark:text-zinc-400 dark:hover:bg-zinc-900"
                  }`}
                >
                  {entry}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      )}
      <div className="flex-1 p-4">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs dark:border-zinc-700"
        >
          {open ? "Ocultar sidebar" : "Mostrar sidebar"}
        </button>
        <p className="mt-6 text-sm text-zinc-500">Sección activa</p>
        <p className="mt-1 text-xl font-semibold">{item}</p>
      </div>
    </div>
  )
}

const skills = ["Liderazgo", "Producto", "Datos", "Negociación", "Excel", "IA"]

function MultiSelectDemo() {
  const [selected, setSelected] = useState<string[]>(["Producto", "IA"])

  function toggle(skill: string) {
    setSelected((current) =>
      current.includes(skill) ? current.filter((item) => item !== skill) : [...current, skill],
    )
  }

  return (
    <div>
      <p className="text-sm text-zinc-500">Habilidades. Puedes marcar varias.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((skill) => {
          const on = selected.includes(skill)
          return (
            <button
              key={skill}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(skill)}
              className={`rounded-full px-3 py-1.5 text-sm ${
                on
                  ? "bg-emerald-600 text-white"
                  : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              }`}
            >
              {skill}
            </button>
          )
        })}
      </div>
      <p className="mt-5 text-sm text-zinc-600 dark:text-zinc-300">
        Selección: {selected.length > 0 ? selected.join(", ") : "ninguna"}
      </p>
    </div>
  )
}

const catalog = [
  "Dirección de producto",
  "Operaciones",
  "Marketing",
  "Finanzas",
  "Recursos humanos",
  "Consultoría",
  "Transformación digital",
]

function SearchDemo() {
  const [query, setQuery] = useState("")
  const normalized = query.trim().toLowerCase()
  const results = catalog.filter((item) => item.toLowerCase().includes(normalized))

  return (
    <div>
      <label htmlFor="ui-search" className="text-sm text-zinc-500">
        Buscar un área
      </label>
      <input
        id="ui-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Escribe, por ejemplo, producto"
        className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950"
      />
      <ul className="mt-3 divide-y divide-zinc-200 overflow-hidden rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
        {results.length === 0 && (
          <li className="px-3 py-2 text-sm text-zinc-500">Sin resultados</li>
        )}
        {results.map((item) => (
          <li key={item} className="px-3 py-2 text-sm">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
