import { useEffect, useRef, useState } from "react"

const PRESETS = [
  { minutes: 10, label: "10 min", hint: "Explicación" },
  { minutes: 20, label: "20 min", hint: "Práctica" },
] as const

function formatRemaining(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 1000))
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

function ringBell(context: AudioContext) {
  const now = context.currentTime
  const strikes = [0, 0.45, 0.9]
  for (const offset of strikes) {
    ;[
      [784, 0.22],
      [1175, 0.08],
      [1568, 0.04],
    ].forEach(([frequency, peak]) => {
      const osc = context.createOscillator()
      const gain = context.createGain()
      osc.type = "sine"
      osc.frequency.value = frequency
      const start = now + offset
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(peak, start + 0.015)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.8)
      osc.connect(gain)
      gain.connect(context.destination)
      osc.start(start)
      osc.stop(start + 1.9)
    })
  }
}

export function WorkshopTimer() {
  const [open, setOpen] = useState(false)
  const [minutes, setMinutes] = useState("10")
  const [remainingMs, setRemainingMs] = useState<number | null>(null)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const endAt = useRef<number | null>(null)
  const audio = useRef<AudioContext | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  function ensureAudio() {
    if (!audio.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Ctx) return null
      audio.current = new Ctx()
    }
    void audio.current.resume()
    return audio.current
  }

  function start(nextMinutes: number) {
    if (!Number.isFinite(nextMinutes) || nextMinutes <= 0 || nextMinutes > 120) return
    ensureAudio()
    endAt.current = Date.now() + nextMinutes * 60 * 1000
    setRemainingMs(nextMinutes * 60 * 1000)
    setRunning(true)
    setDone(false)
    setOpen(false)
  }

  function stop() {
    endAt.current = null
    setRunning(false)
    setDone(false)
    setRemainingMs(null)
    setOpen(false)
  }

  useEffect(() => {
    if (!running) return
    const tick = () => {
      if (endAt.current == null) return
      const left = endAt.current - Date.now()
      if (left <= 0) {
        endAt.current = null
        setRemainingMs(0)
        setRunning(false)
        setDone(true)
        const context = audio.current
        if (context) {
          void context.resume().then(() => ringBell(context))
        }
        return
      }
      setRemainingMs(left)
    }
    tick()
    const id = window.setInterval(tick, 200)
    return () => window.clearInterval(id)
  }, [running])

  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onPointer)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const custom = Number(minutes)
  const label = done ? "Tiempo" : running && remainingMs != null ? formatRemaining(remainingMs) : "Timer"

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-live="polite"
        onClick={() => setOpen((current) => !current)}
        className={`rounded-lg border px-2.5 py-2 text-xs font-medium tabular-nums ${
          done
            ? "animate-pulse border-amber-400 bg-amber-400 text-zinc-950"
            : "border-zinc-300 text-zinc-700 hover:bg-zinc-200 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        }`}
      >
        {label}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-xs font-semibold text-zinc-950 dark:text-zinc-50">Temporizador</p>
          <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
            Al terminar suena una campana.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.minutes}
                type="button"
                onClick={() => start(preset.minutes)}
                className="rounded-lg bg-zinc-950 px-2 py-2 text-left text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                <span className="block text-xs font-semibold">{preset.label}</span>
                <span className="block text-[10px] opacity-70">{preset.hint}</span>
              </button>
            ))}
          </div>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault()
              start(custom)
            }}
          >
            <label className="min-w-0 flex-1">
              <span className="sr-only">Minutos</span>
              <input
                type="number"
                min={1}
                max={120}
                inputMode="numeric"
                value={minutes}
                onChange={(event) => setMinutes(event.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-transparent px-2 py-2 text-xs text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
              />
            </label>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-500"
            >
              Empezar
            </button>
          </form>
          {running && (
            <button
              type="button"
              onClick={stop}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Detener
            </button>
          )}
        </div>
      )}
    </div>
  )
}
