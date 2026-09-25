import { workshop } from "../data/workshop"

export function Header() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.16),transparent_58%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <p className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium tracking-wide text-indigo-700 dark:text-indigo-200">
          {workshop.badge}
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl md:leading-[1.05] dark:text-white">
          {workshop.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
          “{workshop.subtitle}”
        </p>
        <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
          Docente{" "}
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {workshop.teacher}
          </span>
          <span className="mx-2 text-zinc-300 dark:text-zinc-700">·</span>
          7 bloques · 30 minutos cada uno · QA al cierre · Supabase en casa
        </p>
      </div>
    </section>
  )
}
