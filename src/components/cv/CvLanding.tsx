import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import perfil from "../../assets/perfil.jpeg"
import {
  education,
  inquiryTypes,
  jobs,
  landingNav,
  languages,
  services,
  skillGroups,
} from "../../data/cv"
import { saveContact } from "../../lib/supabase"

function jump(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function LogoMark({ src }: { src: string }) {
  return (
    <span className="flex h-12 w-24 shrink-0 items-center justify-center rounded-lg bg-white p-1.5">
      <img src={src} alt="" className="max-h-full max-w-full object-contain" />
    </span>
  )
}

export function CvLanding() {
  const [openJob, setOpenJob] = useState(jobs[0].id)
  const [serviceId, setServiceId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const service = services.find((item) => item.id === serviceId) ?? null

  useEffect(() => {
    if (!service) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServiceId(null)
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.stopPropagation()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [service])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const inquiry = String(data.get("inquiry") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()
    const next: Record<string, string> = {}
    if (!name) next.name = "Escribe tu nombre."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Escribe un email válido."
    if (!inquiry) next.inquiry = "Elige un tipo de consulta."
    if (!message) next.message = "Escribe un mensaje."
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus("sending")
    setStatusMessage("")
    try {
      await saveContact({ nombre: name, email, mensaje: message })
      form.reset()
      setStatus("success")
      setStatusMessage("Mensaje enviado. Quedó guardado correctamente.")
    } catch (error) {
      setStatus("error")
      setStatusMessage(
        error instanceof Error ? error.message : "No se pudo guardar el mensaje.",
      )
    }
  }

  return (
    <div className="bg-zinc-950 text-zinc-100">
      <nav
        aria-label="Secciones del CV"
        className="sticky top-0 z-30 border-b border-white/10 bg-zinc-950/90 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5 py-2 sm:px-8">
          {landingNav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => jump(item.id)}
              className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <header id="cv-inicio" className="scroll-mt-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-[auto_minmax(0,1fr)] md:py-24">
          <img
            src={perfil}
            alt="Josefina Serrano"
            className="h-44 w-44 rounded-3xl object-cover ring-1 ring-white/15 md:h-56 md:w-56"
          />
          <div>
            <p className="text-sm font-medium text-emerald-300">Josefina Serrano</p>
            <h3 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Data, AI & Automation Specialist | Entrepreneur & Tech Consultant
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">
              Nacida en Buenos Aires, radicada en Barcelona. Transformo procesos complejos y
              datos masivos en soluciones automatizadas de IA y productos digitales de alto
              impacto.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => jump("cv-studio")}
                className="rounded-full bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-emerald-300"
              >
                Servicios de Automatización
              </button>
              <button
                type="button"
                onClick={() => jump("cv-trayectoria")}
                className="rounded-full border border-cyan-400/40 px-4 py-2.5 text-sm font-medium text-cyan-200 hover:bg-cyan-400/10"
              >
                Ver Trayectoria
              </button>
            </div>
          </div>
        </div>
      </header>

      <section id="cv-trayectoria" className="scroll-mt-16 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h3 className="text-2xl font-semibold tracking-tight text-white">Trayectoria</h3>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Siete puestos. Abre cada uno para ver qué se construyó ahí.
          </p>
          <ol className="mt-8 space-y-3">
            {jobs.map((job) => {
              const open = openJob === job.id
              return (
                <li key={job.id} className="rounded-2xl border border-white/10 bg-white/5">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenJob(open ? "" : job.id)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      {job.logo ? <LogoMark src={job.logo} /> : null}
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-white">{job.role}</span>
                        <span className="mt-1 block text-sm text-emerald-300">{job.org}</span>
                      </span>
                    </span>
                    <span className="shrink-0 text-right text-xs text-zinc-400">
                      <span className="block">{job.period}</span>
                      <span className="mt-1 block">{job.place}</span>
                    </span>
                  </button>
                  {open && (
                    <div className="border-t border-white/10 px-5 py-4">
                      <p className="text-sm leading-relaxed text-zinc-300">{job.summary}</p>
                      <ul className="mt-3 space-y-2">
                        {job.points.map((point) => (
                          <li key={point} className="flex gap-2 text-sm leading-relaxed text-zinc-400">
                            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section id="cv-studio" className="scroll-mt-16 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h3 className="text-2xl font-semibold tracking-tight text-white">Serrano Studio</h3>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Freelance desde abril de 2025. El diferencial es traducir lo complejo en algo que se
            puede usar.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {services.map((item) => (
              <li key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h4 className="text-base font-semibold text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.teaser}</p>
                <button
                  type="button"
                  onClick={() => setServiceId(item.id)}
                  className="mt-4 text-sm font-medium text-cyan-300 hover:text-cyan-200"
                >
                  Ver detalle
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="cv-habilidades" className="scroll-mt-16 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            Educación, idiomas y habilidades
          </h3>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {education.map((item) => (
              <li key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                {item.logo ? <LogoMark src={item.logo} /> : null}
                <p className={`text-xs font-medium text-emerald-300 ${item.logo ? "mt-4" : ""}`}>
                  {item.period}
                </p>
                <h4 className="mt-2 text-base font-semibold text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.detail}</p>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2">
            {languages.map((language) => (
              <li
                key={language.name}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-100"
              >
                {language.name}
                <span className="text-cyan-300/80"> · {language.level}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h4 className="text-sm font-semibold text-white">{group.label}</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cv-contacto" className="scroll-mt-16 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h3 className="text-2xl font-semibold tracking-tight text-white">Contacto</h3>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            El mensaje se guarda en Supabase, en la tabla contactos.
          </p>
          {statusMessage && (
            <p
              role="status"
              className={`mt-8 max-w-xl rounded-2xl px-5 py-4 text-sm ${
                status === "success"
                  ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
                  : "border border-rose-400/30 bg-rose-400/10 text-rose-100"
              }`}
            >
              {statusMessage}
            </p>
          )}
          <form onSubmit={submit} noValidate className="mt-8 grid max-w-xl gap-4">
            <Field label="Nombre completo" error={errors.name}>
              <input name="name" autoComplete="name" className={fieldClass} />
            </Field>
            <Field label="Email" error={errors.email}>
              <input name="email" type="email" autoComplete="email" className={fieldClass} />
            </Field>
            <Field label="Tipo de consulta" error={errors.inquiry}>
              <select name="inquiry" defaultValue="" className={fieldClass}>
                <option value="" disabled>
                  Elige una opción
                </option>
                {inquiryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Mensaje" error={errors.message}>
              <textarea name="message" rows={4} className={fieldClass} />
            </Field>
            <button
              type="submit"
              disabled={status === "sending"}
              className="justify-self-start rounded-full bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-emerald-300 disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? "Enviando…" : "Enviar"}
            </button>
          </form>
        </div>
      </section>

      {service && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-950/75 p-3 sm:items-center sm:p-6"
          onClick={() => setServiceId(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-service-title"
            data-cv-modal
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-medium tracking-wide text-emerald-300 uppercase">
              Serrano Studio
            </p>
            <h4 id="cv-service-title" className="mt-2 text-xl font-semibold text-white">
              {service.title}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">{service.body}</p>
            <button
              type="button"
              autoFocus
              onClick={() => setServiceId(null)}
              className="mt-6 rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-cyan-400/60"

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-200">{label}</span>
      <span className="mt-1.5 block">{children}</span>
      {error && <span className="mt-1.5 block text-xs text-rose-300">{error}</span>}
    </label>
  )
}
