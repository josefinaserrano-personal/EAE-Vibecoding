import type { CaseStudy as CaseStudyData } from "../data/workshop"

export function CaseStudy({ study }: { study: CaseStudyData }) {
  return (
    <section
      aria-labelledby="caso-vibecoding"
      className="mt-10 rounded-2xl border border-zinc-200 border-t-4 border-t-indigo-500 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-800 uppercase dark:text-indigo-200">
          {study.anchor}
        </span>
        <span className="text-xs font-medium text-zinc-500">Ejemplo real · 30 min</span>
      </div>
      <h3
        id="caso-vibecoding"
        className="mt-4 max-w-3xl text-xl font-semibold tracking-tight text-zinc-950 md:text-2xl dark:text-white"
      >
        {study.title}
      </h3>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <ol className="space-y-4">
          {study.beats.map((beat, index) => (
            <li key={beat.heading} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-xs font-semibold text-indigo-800 dark:text-indigo-200">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                  {beat.heading}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {beat.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <video
          controls
          playsInline
          preload="metadata"
          aria-label={study.videoLabel}
          className="aspect-video w-full rounded-xl bg-black"
        >
          <source src={study.videoSrc} type="video/mp4" />
        </video>
      </div>
    </section>
  )
}
