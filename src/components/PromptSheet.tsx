import { useEffect, useState } from "react"
import { promptGroups } from "../data/workshop"

type PromptSheetProps = {
  open: boolean
  onClose: () => void
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

export function PromptSheet({ open, onClose }: PromptSheetProps) {
  const [tool, setTool] = useState(promptGroups[0].id)
  const [copied, setCopied] = useState<string | null>(null)
  const group = promptGroups.find((item) => item.id === tool) ?? promptGroups[0]

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!copied || copied === "error") return
    const timer = window.setTimeout(() => setCopied(null), 1600)
    return () => window.clearTimeout(timer)
  }, [copied])

  if (!open) return null

  async function copy(id: string, body: string) {
    const copiedWithClipboard = await writeClipboard(body)
    setCopied(copiedWithClipboard ? id : "error")
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-950/70 p-3 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="prompt-sheet-title"
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <div>
            <h2 id="prompt-sheet-title" className="text-lg font-semibold">
              Prompts de ejemplo
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Para proyectar. Copia el texto y pégalo en la herramienta del bloque.
            </p>
          </div>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700"
          >
            Cerrar
          </button>
        </div>

        <div
          role="tablist"
          aria-label="Herramientas"
          className="flex gap-2 overflow-x-auto border-b border-zinc-200 px-5 py-3 dark:border-zinc-800"
        >
          {promptGroups.map((item) => {
            const selected = item.id === tool
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTool(item.id)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-sm ${
                  selected
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                }`}
              >
                {item.tool}
              </button>
            )
          })}
        </div>

        <div className="overflow-y-auto px-5 py-5">
          <p className="text-sm text-zinc-500">{group.hint}</p>
          <ul className="mt-4 space-y-4">
            {group.prompts.map((prompt) => (
              <li
                key={prompt.id}
                className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold">{prompt.title}</h3>
                  <button
                    type="button"
                    onClick={() => copy(prompt.id, prompt.body)}
                    className="shrink-0 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500"
                  >
                    {copied === prompt.id ? "Copiado" : "Copiar"}
                  </button>
                </div>
                <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {prompt.body}
                </pre>
              </li>
            ))}
          </ul>
          {copied === "error" && (
            <p className="mt-4 text-sm text-red-600 dark:text-red-400">
              No se pudo copiar. Selecciona el texto a mano.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
