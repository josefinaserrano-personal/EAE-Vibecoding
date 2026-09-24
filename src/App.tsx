import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { BlockSection } from "./components/BlockSection"
import { CvDoor } from "./components/cv/CvDoor"
import { CvLanding } from "./components/cv/CvLanding"
import { Header } from "./components/Header"
import { PromptSheet } from "./components/PromptSheet"
import { Timeline } from "./components/Timeline"
import { blocks } from "./data/workshop"
import { cvPath } from "./data/cv"

const sectionIds = blocks.map((block) => block.id)

function readTheme(): "dark" | "light" {
  try {
    return localStorage.getItem("theme") === "light" ? "light" : "dark"
  } catch {
    return "dark"
  }
}

function isCvPage() {
  return window.location.pathname.replace(/\/+$/, "") === cvPath
}

export default function App() {
  if (isCvPage()) return <CvPage />
  return <Workshop />
}

function CvPage() {
  useEffect(() => {
    document.title = "CV · Josefina Serrano"
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <CvLanding />
    </div>
  )
}

function Workshop() {
  const [theme, setTheme] = useState<"dark" | "light">(readTheme)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [promptsOpen, setPromptsOpen] = useState(false)
  const lockRef = useRef<string | null>(null)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    try {
      localStorage.setItem("theme", theme)
    } catch {
      /* ignore private mode */
    }
  }, [theme])

  const goTo = useCallback((id: string) => {
    lockRef.current = id
    setActiveId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    const unlock = () => {
      lockRef.current = null
      window.removeEventListener("scrollend", unlock)
    }
    window.addEventListener("scrollend", unlock)
    window.setTimeout(unlock, 1200)
  }, [])

  useEffect(() => {
    const visible = new Set<string>()
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        if (lockRef.current) return
        const next = sectionIds.find((id) => visible.has(id))
        setActiveId(next ?? null)
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (promptsOpen) return
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return
      }
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return
      if (document.querySelector("[data-cv-modal]")) return
      event.preventDefault()
      const index = sectionIds.indexOf(activeId ?? "")
      const current = index < 0 ? (event.key === "ArrowRight" ? -1 : 0) : index
      const next =
        event.key === "ArrowRight"
          ? Math.min(current + 1, sectionIds.length - 1)
          : Math.max(current - 1, 0)
      goTo(sectionIds[next])
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [activeId, goTo, promptsOpen])

  const closePrompts = useCallback(() => setPromptsOpen(false), [])

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Timeline
        blocks={blocks}
        activeId={activeId}
        theme={theme}
        onSelect={goTo}
        onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        onOpenPrompts={() => setPromptsOpen(true)}
      />
      <Header />
      <main>
        {blocks.map((block) => (
          <Fragment key={block.id}>
            <BlockSection block={block} />
            {block.id === "bloque-1" && <CvDoor />}
          </Fragment>
        ))}
      </main>
      <footer className="mx-auto max-w-6xl px-5 py-10 text-sm text-zinc-500 sm:px-8">
        EAE Barcelona · Josefina Serrano Minetto · Vibecoding · 4 horas
      </footer>
      <PromptSheet open={promptsOpen} onClose={closePrompts} />
    </div>
  )
}
