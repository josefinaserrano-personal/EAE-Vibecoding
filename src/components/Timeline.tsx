import { Fragment, useEffect, useRef } from "react"
import { cvPath } from "../data/cv"
import type { Block } from "../data/workshop"
import { WorkshopTimer } from "./WorkshopTimer"

type TimelineProps = {
  blocks: Block[]
  activeId: string | null
  theme: "dark" | "light"
  onSelect: (id: string) => void
  onToggleTheme: () => void
  onOpenPrompts: () => void
}

export function Timeline({
  blocks,
  activeId,
  theme,
  onSelect,
  onToggleTheme,
  onOpenPrompts,
}: TimelineProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const core = blocks.filter((block) => block.kind !== "bonus")
  const activeIndex = core.findIndex((block) => block.id === activeId)
  const onBonus = blocks.some((block) => block.id === activeId && block.kind === "bonus")
  const progress = onBonus ? 100 : activeIndex < 0 ? 0 : ((activeIndex + 1) / core.length) * 100

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller || !activeId) return
    const chip = scroller.querySelector<HTMLButtonElement>(`[data-block="${activeId}"]`)
    if (!chip) return
    const left = chip.offsetLeft - scroller.clientWidth / 2 + chip.clientWidth / 2
    scroller.scrollTo({ left, behavior: "smooth" })
  }, [activeId])

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-zinc-50/85 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/85">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2 sm:px-5">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hidden shrink-0 text-left sm:block"
        >
          <span className="block text-sm font-semibold tracking-tight">Vibecoding</span>
          <span className="block text-[11px] text-zinc-500">EAE · 4 h</span>
        </button>

        <nav aria-label="Bloques del workshop" className="min-w-0 flex-1">
          <div
            ref={scrollerRef}
            className="timeline-scroll flex gap-1 overflow-x-auto"
          >
            {blocks.map((block, index) => {
              const active = block.id === activeId
              return (
                <Fragment key={block.id}>
                  <button
                    type="button"
                    data-block={block.id}
                    title={block.title}
                    aria-current={active ? "true" : undefined}
                    onClick={() => onSelect(block.id)}
                    className={`shrink-0 rounded-lg px-2.5 py-1.5 text-left transition-colors ${
                      active
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                        : "text-zinc-500 hover:bg-zinc-200/70 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    }`}
                  >
                    <span className="block text-[11px] font-semibold leading-none">
                      {block.kind === "bonus" ? "Bonus" : `Bloque ${block.number}`}
                    </span>
                    <span
                      className={`mt-1 block text-[10px] tabular-nums leading-none ${
                        active ? "opacity-80" : "opacity-70"
                      }`}
                    >
                      {block.start}
                    </span>
                  </button>
                  {index === 0 && (
                    <a
                      href={cvPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-block="cv"
                      title="Abrir el CV en otra pestaña"
                      className="shrink-0 rounded-lg px-2.5 py-1.5 text-left text-zinc-500 transition-colors hover:bg-zinc-200/70 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    >
                      <span className="block text-[11px] font-semibold leading-none">Hoy</span>
                      <span className="mt-1 block text-[10px] leading-none opacity-70">CV</span>
                    </a>
                  )}
                </Fragment>
              )
            })}
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <p className="mr-1 hidden text-[11px] text-zinc-400 lg:block">← →</p>
          <WorkshopTimer />
          <button
            type="button"
            onClick={onOpenPrompts}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-500"
          >
            Prompts
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className="rounded-lg border border-zinc-300 px-2.5 py-2 text-xs text-zinc-700 hover:bg-zinc-200 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            {theme === "dark" ? "Claro" : "Oscuro"}
          </button>
        </div>
      </div>
      <div className="h-0.5 bg-zinc-200 dark:bg-zinc-800" aria-hidden>
        <div
          className="h-full bg-indigo-500 transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  )
}
