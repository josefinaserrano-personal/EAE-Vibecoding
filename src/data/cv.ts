import criteoLogo from "../assets/logos/criteo.svg"
import dendroLogo from "../assets/logos/dendro.jpg"
import despegarLogo from "../assets/logos/despegar.svg"
import mercadoLibreLogo from "../assets/logos/mercadolibre.svg"
import sapLogo from "../assets/logos/sap.svg"
import semrushLogo from "../assets/logos/semrush.svg"
import utdtLogo from "../assets/logos/utdt.svg"

export const cvPath = "/cv"

export const cvExample = {
  kicker: "Hoy van a crear esto",
  title: "Del prompt al CV publicado",
  intro:
    "El prompt y el PRD están acá, plegados. La landing se abre en otra pestaña para proyectarla sola.",
}

export const copyablePrompt = `Actúa como product manager. Voy a pegarte mi trayectoria profesional (experiencia, formación, proyectos y habilidades).

Redacta un Product Requirements Document (PRD) para un CV web personal de una sola página, en español, con estas secciones obligatorias:

1. Objetivo del producto y público (reclutadores y clientes).
2. Secciones de la página: inicio, sobre mí, experiencia, proyectos, habilidades y contacto.
3. Contenido concreto extraído de mi trayectoria. No uses texto genérico de ejemplo ni inventes cargos, empresas o fechas.
4. Tono y personalidad visual.
5. Un formulario de contacto con nombre, email y mensaje.
6. Criterio de éxito: que se entienda quién soy en 10 segundos y que el formulario se pueda conectar después a una base de datos.

Antes de escribir el PRD, hazme solo las preguntas que te falten. Cuando te confirme, entrega el PRD completo, listo para pegarlo en Cursor.

Mi trayectoria:
[pegar aquí]`

export const basePrompt = `Necesito el PRD para mi CV
1. Nacida en Buenos Aires, Argentina.
2. Estudié en UTDT la licenciatura en Economía (2014-2018).
3. Hice un Erasmus en París, donde perfeccioné mi francés, en 2016.
4. Soy bilingüe en español e inglés y hablo francés avanzado.
5. En mi último año de facultad, justo después de mi Erasmus, empecé a trabajar en SAP como pasante en el área de facturación de consultoría. Trabajé allí desde 2017 a 2019.
6. En 2018 comencé mi maestría en Data Analytics + Management para aprender sobre tecnología y datos, ya que era fan de la econometría y su poder para explicar lo que parecía una casualidad.
7. En noviembre de 2019 empecé a trabajar en Despegar (eDreams de Latinoamérica) como analista de Revenue Innovation.
Allí trabajé en varios proyectos cuyo objetivo era maximizar la ganancia de la empresa, que para quienes no saben ronda entre un 1 y un 3 % para los pasajes de avión. Los principales proyectos fueron el cálculo de impacto de variables en la elasticidad del precio (disposición a pagar más) para cada país latinoamericano que servíamos, para saber cuándo podíamos subir más los precios semanalmente, demostrando con datos que no era aleatorio y mejorando el rendimiento de nuestra área. Además armé una calculadora en Excel con macros que nos permitía saber exactamente qué margen aplicar cada semana dependiendo de cambios en la actividad de nuestros compradores en la semana anterior, basándonos en los resultados del proyecto de las elasticidades. Aquí pasé de junior a semi-senior en 6 meses, hasta que llegó la pandemia y no había datos para analizar, ya que no se le permitía viajar a la gente.
8. En junio de 2020 empecé a trabajar en Mercado Libre como analista senior de supply chain, y entré en el momento más emocionante de Mercado Libre, con un aumento en ventas del 300%. Tanta demanda y plata había que querían armar depósitos satélite en Brasil y México, abastecidos por los depósitos en las capitales donde estaban los productores y vendedores. Era mi responsabilidad elegir con modelos estadísticos cuánto y qué productos enviar a cada región del país para aumentar la penetración de Mercado Libre en regiones donde nadie compraba porque el costo de envío era más alto que el producto en sí. Allí trabajé en modelos de predicción de demanda a nivel SKU, sistemas de minimización de costos y maximización de revenue dependiendo de qué productos enviábamos y su probabilidad de venta, y también métodos para identificar productos que se demandarían solo si estaban cerca de nuestros clientes, dado el ratio entre costo de producto y costo de envío.
Además automatizamos los pedidos a los depósitos para que se realicen diariamente envíos de miles de productos a cada rincón del país, dependiendo también de la capacidad del depósito de destino.
9. En julio de 2021 decidí mudarme a Barcelona y empezar a trabajar en Criteo como analista de automatización en Customer Success Management, liderando proyectos de generación de presentaciones para clientes que mostraban los resultados de sus campañas publicitarias en segundos, y plataformas donde otros podían crear herramientas de automatización para compartir con otras áreas.
10. En enero de 2023 co-fundé Dendro, una plataforma tecnológica orientada a sostenibilidad empresarial, que convierte facturas y documentos en información estructurada sobre consumo y emisiones.
Diseñamos un sistema automatizado basado en IA, entrenado específicamente con GPT para interpretar documentos complejos (facturas, contratos, reportes) y extraer los datos clave de consumo asociados a cada fuente de emisión.
Mi rol fue liderar el desarrollo del asistente conversacional inteligente, su entrenamiento con prompts específicos y la definición de lógica de extracción para transformar lenguaje natural en datos ambientales.
Esta solución permitió a las empresas reducir tiempos operativos y medir su huella de carbono con precisión, sin necesidad de interpretación manual.
10. Nov 2024 - Feb 2025 · 4 meses
Semrush · Barcelona · Remote
Customer Retention Data Analyst. Generaba tableros en Tableau para el seguimiento de las acciones de nuestros customer success managers y encontraba las principales razones de churn de nuestro producto.
11. Desarrollo de Aplicaciones y Automatización
Serrano Studio · Freelance
Abr 2025 - Presente · 1 año 6 meses
Spain · Remote
Ayudo a emprendedores y profesionales a automatizar procesos que consumen su tiempo y energía.
Trabajo de forma personalizada diseñando sistemas, flujos y agentes de IA que liberen a mis clientes de tareas operativas para que puedan volver a enfocarse en lo que disfrutan.
Mis servicios incluyen:
* Asesorías para identificar puntos de automatización
* Implementación de herramientas sin código (no-code)
* Diseño de soluciones a medida utilizando inteligencia artificial
Mi diferencial es traducir lo complejo en soluciones simples y accionables, para personas que no vienen del mundo tech.`

export const prdDocument = `# Product Requirements Document (PRD) — Portfolio y CV web

## 1. Objetivo del producto y perfil
Crear una página web interactiva, moderna y profesional que funcione como CV interactivo y portfolio de servicios de Josefina Serrano.
La web debe posicionarme como una profesional híbrida: especialista en datos, inteligencia artificial, automatización y producto digital, con un trasfondo analítico sólido (Economía, Data y Management) y capacidad de liderar startups, automatizaciones empresariales e innovación tecnológica.

## 2. Estilo visual y diseño de interfaz
- Estilo: moderno, tech, limpio y elegante, inspirado en una estética SaaS como Vercel o Linear.
- Paleta: fondo oscuro profundo, con acentos en verde neón y azul eléctrico para destacar métricas e hitos.
- Tipografía: sans-serif moderna, clara y legible.
- Navegación fija: Inicio, Trayectoria profesional, Serrano Studio, Habilidades e idiomas, Contacto.

## 3. Secciones y contenido

### Hero / Presentación
- Nombre: Josefina Serrano
- Titular: Data, AI & Automation Specialist | Entrepreneur & Tech Consultant
- Subtítulo: Nacida en Buenos Aires, radicada en Barcelona. Transformo procesos complejos y datos masivos en soluciones automatizadas de IA y productos digitales de alto impacto.
- Botón principal: Servicios de Automatización, que lleva a Serrano Studio.
- Botón secundario: Ver Trayectoria, que lleva a la línea de tiempo.

### Trayectoria profesional
Cada experiencia es una tarjeta desplegable, con las métricas visibles.

1. Serrano Studio | Desarrollo de Aplicaciones y Automatización (Freelance)
- Período: abr 2025 – presente | Barcelona, España (remote)
- Rol: Founder & Tech Consultant
- Diseña e implementa sistemas, flujos de trabajo y agentes de IA personalizados para liberar a emprendedores y profesionales de tareas operativas.
- Servicios: asesorías estratégicas de automatización, herramientas no-code y low-code, y soluciones a medida con IA generativa.

2. Customer Retention Data Analyst | Semrush
- Período: nov 2024 – feb 2025 | Barcelona, España (remote)
- Tableros en Tableau para seguir las acciones de los customer success managers.
- Identificación de las principales razones de churn del producto.

3. Co-fundadora y Lead Product/AI | Dendro
- Período: ene 2023 – 2024
- Co-fundación de Dendro, una plataforma para convertir facturas y documentos no estructurados en métricas de consumo y emisiones de carbono.
- Sistema de IA entrenado con modelos GPT para interpretar documentos complejos.
- Liderazgo del asistente conversacional y de la ingeniería de prompts para extraer datos ambientales.

4. Automation Analyst, Customer Success Management | Criteo
- Período: jul 2021 – ene 2023 | Barcelona, España
- Proyectos de automatización para generar presentaciones de resultados para clientes en segundos.
- Plataformas internas para que otros equipos construyan y compartan sus propias herramientas de automatización.

5. Senior Supply Chain Analyst | Mercado Libre
- Período: jun 2020 – jul 2021 | Buenos Aires / LatAm
- Gestión del crecimiento logístico durante el pico de demanda por pandemia (+300% en ventas).
- Modelos estadísticos y de predicción de demanda a nivel SKU para abastecer depósitos satélite en Brasil y México.
- Modelos de minimización de costos de envío y maximización de revenue según la relación costo de producto / envío.
- Automatización diaria de pedidos y despacho de miles de productos según la capacidad del depósito de destino.

6. Revenue Innovation Analyst (Junior a Semi-Senior) | Despegar (eDreams LatAm)
- Período: nov 2019 – jun 2020 | Buenos Aires, Argentina
- Modelos de elasticidad de precio por país para optimizar márgenes semanales en pasajes aéreos (industria con márgenes del 1 al 3%).
- Calculadora en Excel con macros para ajustar márgenes según el comportamiento semanal de compra.
- Promoción a Semi-Senior en 6 meses.

7. Consulting Billing Intern | SAP
- Período: 2017 – 2019 | Buenos Aires, Argentina
- Gestión y análisis en el área de facturación de consultoría mientras finalizaba los estudios universitarios.

### Educación e idiomas
- Maestría en Data Analytics + Management (2018 – 2019), enfocada en econometría, ciencia de datos y tecnología aplicada a negocios.
- Licenciatura en Economía, Universidad Torcuato Di Tella (2014 – 2018), Buenos Aires.
- Erasmus (2016), París. Perfeccionamiento de francés y visión internacional.
- Idiomas: español nativo, inglés bilingüe, francés avanzado.

### Habilidades y tecnologías
- Metodologías y negocio: Business Intelligence, Revenue Optimization, Supply Chain Analytics, Product Management, AI Consulting, Prompt Engineering.
- Tecnología: Python, SQL, modelos GPT, Data Analysis, Automation, herramientas no-code, Excel con macros, agentes de IA a medida.

### Formulario de contacto
- Campos: nombre completo, email, tipo de consulta (asesoría, proyecto freelance o contratación) y mensaje.
- Acción: en el producto final se guarda en Supabase. En esta demo se ve la interfaz y la validación.

## 4. Componentes de UI
- Acordeón para el detalle de cada puesto.
- Modal para el detalle de un servicio de Serrano Studio.
- Formulario con validación de campos.
- Chips para habilidades, idiomas y herramientas.`

export type Job = {
  id: string
  role: string
  org: string
  period: string
  place: string
  summary: string
  points: string[]
  logo?: string
}

export const jobs: Job[] = [
  {
    id: "serrano-studio",
    role: "Founder & Tech Consultant",
    org: "Serrano Studio",
    period: "Abr 2025 — presente",
    place: "Barcelona · Remote",
    summary:
      "Diseño sistemas, flujos y agentes de IA para que emprendedores y profesionales dejen las tareas operativas y vuelvan a lo que disfrutan.",
    points: [
      "Asesorías estratégicas de automatización.",
      "Implementación de herramientas no-code y low-code.",
      "Soluciones a medida con IA generativa, traduciendo lo complejo a un lenguaje accionable.",
    ],
  },
  {
    id: "semrush",
    role: "Customer Retention Data Analyst",
    org: "Semrush",
    logo: semrushLogo,
    period: "Nov 2024 — feb 2025",
    place: "Barcelona · Remote",
    summary:
      "Generaba tableros en Tableau para seguir las acciones de los customer success managers y encontrar las principales razones de churn del producto.",
    points: [
      "Tableros en Tableau con el seguimiento de lo que hacían los customer success managers.",
      "Las principales razones de churn del producto, a partir de esos datos.",
    ],
  },
  {
    id: "dendro",
    role: "Co-fundadora y Lead Product/AI",
    org: "Dendro",
    logo: dendroLogo,
    period: "Ene 2023 — 2024",
    place: "Barcelona",
    summary:
      "Dendro convierte facturas y documentos en información estructurada sobre consumo y emisiones.",
    points: [
      "Sistema de IA entrenado con GPT para interpretar facturas, contratos y reportes.",
      "Lideré el asistente conversacional, el entrenamiento con prompts y la lógica de extracción.",
      "Las empresas medían su huella de carbono sin interpretar cada documento a mano.",
    ],
  },
  {
    id: "criteo",
    role: "Automation Analyst, Customer Success",
    org: "Criteo",
    logo: criteoLogo,
    period: "Jul 2021 — ene 2023",
    place: "Barcelona",
    summary:
      "Automatización para que el equipo de Customer Success mostrara resultados de campañas en segundos.",
    points: [
      "Generación automática de presentaciones con los resultados publicitarios de cada cliente.",
      "Plataformas internas para que otras áreas crearan y compartieran sus propias herramientas.",
    ],
  },
  {
    id: "meli",
    role: "Senior Supply Chain Analyst",
    org: "Mercado Libre",
    logo: mercadoLibreLogo,
    period: "Jun 2020 — jul 2021",
    place: "Buenos Aires · LatAm",
    summary:
      "Entré en el pico de la pandemia, con un aumento de ventas del 300%, a decidir qué stock acercar a cada región.",
    points: [
      "Modelos de predicción de demanda a nivel SKU para depósitos satélite en Brasil y México.",
      "Minimización de costos y maximización de revenue según el ratio entre precio del producto y costo de envío.",
      "Pedidos automáticos diarios de miles de productos, respetando la capacidad del depósito de destino.",
    ],
  },
  {
    id: "despegar",
    role: "Revenue Innovation Analyst",
    org: "Despegar (eDreams LatAm)",
    logo: despegarLogo,
    period: "Nov 2019 — jun 2020",
    place: "Buenos Aires",
    summary:
      "De junior a semi-senior en seis meses, optimizando márgenes de una industria que gana entre el 1 y el 3%.",
    points: [
      "Elasticidad de precio por país latinoamericano para decidir cuándo subir tarifas cada semana.",
      "Calculadora en Excel con macros que aplicaba el margen según la actividad de la semana anterior.",
      "La pandemia cortó los datos: la gente no podía viajar.",
    ],
  },
  {
    id: "sap",
    role: "Pasante de facturación de consultoría",
    org: "SAP",
    logo: sapLogo,
    period: "2017 — 2019",
    place: "Buenos Aires",
    summary:
      "Empecé en el último año de la facultad, justo después del Erasmus, en el área de facturación de consultoría.",
    points: [
      "Gestión y análisis de la facturación mientras terminaba la licenciatura.",
    ],
  },
]

export type Education = {
  title: string
  period: string
  detail: string
  logo?: string
}

export const education: Education[] = [
  {
    title: "Maestría en Data Analytics + Management",
    period: "2018 — 2019",
    detail:
      "Econometría, ciencia de datos y tecnología aplicada a negocios. Quería explicar con datos lo que parecía casualidad.",
  },
  {
    title: "Licenciatura en Economía",
    period: "2014 — 2018",
    detail: "Universidad Torcuato Di Tella, Buenos Aires.",
    logo: utdtLogo,
  },
  {
    title: "Erasmus",
    period: "2016",
    detail: "París. Perfeccioné el francés y sumé una mirada internacional.",
  },
]

export const languages = [
  { name: "Español", level: "Nativo" },
  { name: "Inglés", level: "Bilingüe" },
  { name: "Francés", level: "Avanzado" },
]

export const skillGroups = [
  {
    label: "Metodologías y negocio",
    items: [
      "Business Intelligence",
      "Revenue Optimization",
      "Supply Chain Analytics",
      "Product Management",
      "AI Consulting",
      "Prompt Engineering",
    ],
  },
  {
    label: "Tecnología",
    items: [
      "Python",
      "SQL",
      "Modelos GPT",
      "Data Analysis",
      "Automation",
      "No-code",
      "Excel con macros",
      "Agentes de IA",
    ],
  },
]

export const services = [
  {
    id: "asesoria",
    title: "Asesoría de automatización",
    teaser: "Encontramos qué tareas te están comiendo el día.",
    body: "Una sesión para identificar los puntos donde un flujo, una herramienta o un agente de IA devuelve tiempo. El resultado es una lista concreta de qué automatizar primero, no un diagnóstico genérico.",
  },
  {
    id: "nocode",
    title: "Herramientas no-code",
    teaser: "Implementación de herramientas sin escribir código.",
    body: "Armo el flujo en herramientas no-code y low-code para que el equipo lo use sin depender de un desarrollo a medida. Sirve cuando el proceso ya está claro y hay que sacarlo de las planillas.",
  },
  {
    id: "ia",
    title: "Soluciones con IA",
    teaser: "Agentes y sistemas a medida, en lenguaje simple.",
    body: "Diseño soluciones con IA generativa para personas que no vienen del mundo tech. Traduzco el proceso a un sistema que se puede usar: prompts, extracción de datos y agentes que hacen una tarea de principio a fin.",
  },
]

export const inquiryTypes = ["Asesoría", "Proyecto freelance", "Contratación"]

export const landingNav = [
  { id: "cv-inicio", label: "Inicio" },
  { id: "cv-trayectoria", label: "Trayectoria" },
  { id: "cv-studio", label: "Serrano Studio" },
  { id: "cv-habilidades", label: "Habilidades" },
  { id: "cv-contacto", label: "Contacto" },
]
