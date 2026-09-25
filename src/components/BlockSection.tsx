import { useEffect, useState } from "react"
import type { AccordionItem, Block, Link as ResourceLink, PracticeStep } from "../data/workshop"
import { ArchitectureDiagram } from "./ArchitectureDiagram"
import { CaseStudy } from "./CaseStudy"
import { CursorCheatSheet } from "./CursorCheatSheet"
import { UiShowcase } from "./UiShowcase"

function PointAccordion({ items }: { items: AccordionItem[] }) {
  const [openTitle, setOpenTitle] = useState<string | null>(null)

  return (
    <div className="mt-3 space-y-2">
      {items.map((item) => {
        const open = openTitle === item.title
        return (
          <div
            key={item.title}
            className="rounded-xl border border-zinc-200 dark:border-zinc-700"
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenTitle(open ? null : item.title)}
              className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left"
            >
              <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                {item.title}
              </span>
              <span
                aria-hidden
                className={`inline-block text-lg leading-none text-zinc-400 ${open ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            {open && (
              <p className="border-t border-zinc-200 px-3 py-3 text-sm leading-relaxed text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                {item.body}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

async function writeClipboard(body: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await Promise.race([
        navigator.clipboard.writeText(body),
        new Promise((_, reject) => {
          window.setTimeout(() => reject(new Error("timeout")), 700)
        }),
      ])
      return true
    }
  } catch {
    /* fallback below */
  }
  try {
    const area = document.createElement("textarea")
    area.value = body
    area.setAttribute("readonly", "")
    area.style.position = "fixed"
    area.style.opacity = "0"
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand("copy")
    area.remove()
    return ok
  } catch {
    return false
  }
}

function CopyPrompt({ text, label = "Prompt para Cursor" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState<"ok" | "error" | null>(null)

  useEffect(() => {
    if (copied !== "ok") return
    const timer = window.setTimeout(() => setCopied(null), 1600)
    return () => window.clearTimeout(timer)
  }, [copied])

  return (
    <div className="mt-3 rounded-xl border border-zinc-200 dark:border-zinc-700">
      <div className="flex items-center justify-between gap-3 px-3 py-2">
        <span className="text-xs font-semibold text-zinc-500">{label}</span>
        <button
          type="button"
          onClick={async () => setCopied((await writeClipboard(text)) ? "ok" : "error")}
          className="shrink-0 rounded-lg bg-zinc-950 px-3 py-1.5 text-xs font-medium text-white dark:bg-white dark:text-zinc-950"
        >
          {copied === "ok" ? "Copiado" : "Copiar"}
        </button>
      </div>
      {copied === "error" && (
        <p className="px-3 pb-2 text-xs text-rose-600 dark:text-rose-300">
          No se pudo copiar. Selecciona el texto a mano.
        </p>
      )}
      <pre className="max-h-64 overflow-auto border-t border-zinc-200 px-3 py-3 text-sm leading-relaxed whitespace-pre-wrap text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
        {text}
      </pre>
    </div>
  )
}

function practiceStep(item: PracticeStep) {
  return typeof item === "string" ? { text: item } : item
}

function ResourceAnchor({ link, tone }: { link: ResourceLink; tone: "indigo" | "emerald" }) {
  const color =
    tone === "indigo"
      ? "text-indigo-700 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-100"
      : "text-emerald-800 hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-emerald-100"
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`mt-2 inline-flex text-sm font-medium underline underline-offset-2 ${color}`}
    >
      {link.label}
    </a>
  )
}

export function BlockSection({ block }: { block: Block }) {
  return (
    <section
      id={block.id}
      aria-labelledby={`${block.id}-title`}
      className="scroll-mt-24 border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
          {block.kind === "bonus"
            ? `Bonus • ${block.start} – ${block.end} • si quieres probarlo`
            : `Bloque ${block.number} • ${block.start} – ${block.end}`}
        </p>
        <h2
          id={`${block.id}-title`}
          className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl dark:text-white"
        >
          {block.title}
        </h2>

        {block.caseStudy && <CaseStudy study={block.caseStudy} />}

        <div className={`mt-10 grid gap-5 ${block.extra === "cursor" ? "" : "lg:grid-cols-2"}`}>
          <article className="rounded-2xl border border-zinc-200 border-t-4 border-t-indigo-500 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-800 uppercase dark:text-indigo-200">
                Explicación
              </span>
              <span className="text-xs font-medium text-zinc-500 tabular-nums">
                {block.explanationMinutes}
              </span>
            </div>
            <ul className="mt-6 space-y-5">
              {block.explanation.map((point) => (
                <li key={point.heading}>
                  <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                    {point.heading}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {point.body}
                  </p>
                  {point.link && <ResourceAnchor link={point.link} tone="indigo" />}
                  {point.accordion && <PointAccordion items={point.accordion} />}
                  {point.items && (
                    <ul className="mt-3 space-y-1.5">
                      {point.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                        >
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            {block.extra === "cursor" && <CursorCheatSheet />}
          </article>

          <article className="rounded-2xl border border-zinc-200 border-t-4 border-t-emerald-500 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-800 uppercase dark:text-emerald-200">
                Práctica asistida
              </span>
              <span className="text-xs font-medium text-zinc-500 tabular-nums">
                {block.practiceMinutes}
              </span>
            </div>
            <ol className="mt-6 space-y-4">
              {block.practice.map((item, index) => {
                const step = practiceStep(item)
                return (
                  <li key={step.text} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-semibold text-emerald-800 dark:text-emerald-200">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {step.text}
                      </p>
                      {step.link && <ResourceAnchor link={step.link} tone="emerald" />}
                      {step.prompt && <CopyPrompt text={step.prompt} label={step.promptLabel} />}
                    </div>
                  </li>
                )
              })}
            </ol>
          </article>
        </div>

        {block.extra === "showcase" && <UiShowcase />}
        {block.extra === "architecture" && <ArchitectureDiagram />}
      </div>
    </section>
  )
}
