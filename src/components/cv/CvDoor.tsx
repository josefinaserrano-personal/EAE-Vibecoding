import { useEffect, useState } from "react"
import { basePrompt, copyablePrompt, cvExample, cvPath, prdDocument } from "../../data/cv"

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

export function CvDoor() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [copied, setCopied] = useState<"ok" | "error" | null>(null)

  useEffect(() => {
    if (copied !== "ok") return
    const timer = window.setTimeout(() => setCopied(null), 1600)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function copyPrompt() {
    const ok = await writeClipboard(copyablePrompt)
    setCopied(ok ? "ok" : "error")
  }

  return (
    <section className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
              {cvExample.kicker}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              {cvExample.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {cvExample.intro}
            </p>
          </div>
          <a
            href={cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Abrir el CV
          </a>
        </div>

        <div className="mt-6 space-y-3">
          <article className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center gap-3 px-5 py-4">
              <button
                type="button"
                aria-expanded={openId === "prompt"}
                onClick={() => setOpenId(openId === "prompt" ? null : "prompt")}
                className="flex min-w-0 flex-1 items-center justify-between gap-3 text-left"
              >
                <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                  Prompt base para copiar
                </span>
                <Chevron open={openId === "prompt"} />
              </button>
              <button
                type="button"
                onClick={copyPrompt}
                className="shrink-0 rounded-lg bg-zinc-950 px-3 py-1.5 text-xs font-medium text-white dark:bg-white dark:text-zinc-950"
              >
                {copied === "ok" ? "Copiado" : "Copiar"}
              </button>
            </div>
            {copied === "error" && (
              <p className="px-5 pb-3 text-xs text-rose-600 dark:text-rose-300">
                No se pudo copiar. Selecciona el texto a mano.
              </p>
            )}
            {openId === "prompt" && (
              <pre className="max-h-80 overflow-auto border-t border-zinc-200 px-5 py-4 text-sm leading-relaxed whitespace-pre-wrap text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
                {copyablePrompt}
              </pre>
            )}
          </article>

          <article className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
            <button
              type="button"
              aria-expanded={openId === "shared"}
              onClick={() => setOpenId(openId === "shared" ? null : "shared")}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                Ejemplo de lo que le compartí a Gemini
              </span>
              <Chevron open={openId === "shared"} />
            </button>
            {openId === "shared" && (
              <pre className="max-h-80 overflow-auto border-t border-zinc-200 px-5 py-4 text-sm leading-relaxed whitespace-pre-wrap text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
                {basePrompt}
              </pre>
            )}
          </article>

          <article className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
            <button
              type="button"
              aria-expanded={openId === "prd"}
              onClick={() => setOpenId(openId === "prd" ? null : "prd")}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                PRD resultante
              </span>
              <Chevron open={openId === "prd"} />
            </button>
            {openId === "prd" && (
              <div className="max-h-80 overflow-auto border-t border-zinc-200 px-5 py-4 dark:border-zinc-800">
                <PrdView source={prdDocument} />
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-block text-lg leading-none text-zinc-400 ${open ? "rotate-45" : ""}`}
    >
      +
    </span>
  )
}

function PrdView({ source }: { source: string }) {
  const blocks = parsePrd(source)
  return (
    <div className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
      {blocks.map((block, index) => {
        if (block.type === "h1") {
          return (
            <h3 key={index} className="text-lg font-semibold text-zinc-950 dark:text-white">
              <Rich text={block.text} />
            </h3>
          )
        }
        if (block.type === "h2") {
          return (
            <h4 key={index} className="pt-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
              <Rich text={block.text} />
            </h4>
          )
        }
        if (block.type === "h3") {
          return (
            <h5 key={index} className="pt-1 font-semibold text-zinc-900 dark:text-zinc-100">
              <Rich text={block.text} />
            </h5>
          )
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="space-y-1.5 pl-1">
              {block.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>
                    <Rich text={item} />
                  </span>
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={index}>
            <Rich text={block.text} />
          </p>
        )
      })}
    </div>
  )
}

function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index} className="font-semibold text-zinc-950 dark:text-zinc-50">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  )
}

type PrdBlock =
  | { type: "h1" | "h2" | "h3" | "p"; text: string }
  | { type: "ul"; items: string[] }

function parsePrd(source: string): PrdBlock[] {
  const blocks: PrdBlock[] = []
  let list: string[] | null = null

  function closeList() {
    if (list) {
      blocks.push({ type: "ul", items: list })
      list = null
    }
  }

  for (const raw of source.split("\n")) {
    const line = raw.trim()
    if (!line) {
      closeList()
      continue
    }
    if (line.startsWith("- ")) {
      list = list ?? []
      list.push(line.slice(2))
      continue
    }
    closeList()
    if (line.startsWith("### ")) blocks.push({ type: "h3", text: line.slice(4) })
    else if (line.startsWith("## ")) blocks.push({ type: "h2", text: line.slice(3) })
    else if (line.startsWith("# ")) blocks.push({ type: "h1", text: line.slice(2) })
    else blocks.push({ type: "p", text: line })
  }
  closeList()
  return blocks
}
