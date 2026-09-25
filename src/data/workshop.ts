import { copyablePrompt } from "./cv"

export type Link = {
  href: string
  label: string
}

export type AccordionItem = {
  title: string
  body: string
}

export type Point = {
  heading: string
  body: string
  items?: string[]
  link?: Link
  accordion?: AccordionItem[]
}

export type PracticeStep = string | {
  text: string
  link?: Link
  prompt?: string
  promptLabel?: string
  accordion?: AccordionItem[]
}

export type BlockExtra = "showcase" | "architecture" | "cursor"

export type CaseBeat = {
  heading: string
  body: string
}

export type CaseStudy = {
  anchor: string
  title: string
  videoSrc: string
  videoLabel: string
  beats: CaseBeat[]
}

export type Block = {
  id: string
  number: number
  start: string
  end: string
  title: string
  explanationMinutes: string
  practiceMinutes: string
  explanation: Point[]
  practice: PracticeStep[]
  extra?: BlockExtra
  caseStudy?: CaseStudy
  kind?: "bonus"
  chip?: string
  kicker?: string
}

export type PromptItem = {
  id: string
  title: string
  body: string
}

export type PromptGroup = {
  id: string
  tool: string
  hint: string
  prompts: PromptItem[]
}

export const workshop = {
  title:
    "Vibecoding: Desarrollo de aplicaciones y webs mediante IA para NO programadores",
  teacher: "Josefina Serrano Minetto",
  badge: "Workshop Práctico • EAE Barcelona • 4 Horas",
  subtitle:
    "Cómo transformar tus notas de relevamiento en un prototipo funcional rápidamente sin escribir código.",
}

export const supabaseFormPrompt = `Conecta el formulario de contacto a Supabase.

- Al enviar, guarda en la tabla "contactos" estos campos: nombre, email, mensaje y created_at.
- Muestra un mensaje claro de éxito o de error, sin recargar la página.
- Lee la URL y la clave pública desde variables de entorno: VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY. No escribas las claves dentro del código.
- Si la tabla no existe, dame el SQL exacto para crearla en el editor de Supabase.`

export const githubRepoPrompt = `Crea un repositorio en mi cuenta de GitHub y sube este proyecto.

Reglas de acceso, obligatorias:
- No me pidas la contraseña, un token, un personal access token ni ninguna clave en el chat.
- No escribas secretos en archivos, comandos ni en el historial.
- Usa la sesión que ya exista con GitHub CLI (gh) o con Git.
- Si no hay sesión, detente y dime que ejecute gh auth login en la terminal y que autorice en el navegador. No sigas hasta que eso esté hecho.

Después:
- Crea el repositorio en la cuenta autenticada, con el nombre de esta carpeta.
- Si todavía no hay commit, haz el primero y sube la rama principal.
- Al terminar, dame solo la URL del repositorio.`

export const vercelDeployPrompt = `Publica este proyecto en Vercel y dame la URL pública.

Reglas de acceso, obligatorias:
- No me pidas la contraseña, un token ni ninguna clave en el chat.
- No escribas secretos en archivos, comandos ni en el historial.
- Usa la sesión que ya exista con Vercel CLI (vercel).
- Si no hay sesión, detente y dime que ejecute vercel login en la terminal y que autorice en el navegador. No sigas hasta que eso esté hecho.

Después:
- Despliega este proyecto de Vite en la cuenta autenticada, en producción.
- Si el formulario necesita VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY, indícame que las cargue yo en el panel de Vercel. No me las pidas por el chat.
- Al terminar, dame solo la URL pública.`

export const blocks: Block[] = [
  {
    id: "bloque-1",
    number: 1,
    start: "00:00",
    end: "00:30",
    title:
      "El Valor del Vibecoding como Herramienta de Comunicación y Setup",
    explanationMinutes: "10 min",
    practiceMinutes: "20 min",
    explanation: [
      {
        heading: "Por qué Vibecoding",
        body: "No busca reemplazar a ingenieros de sistemas ni desarrolladores, sino dotar a perfiles no técnicos de un canal de comunicación de alta fidelidad.",
      },
      {
        heading: "Prototipado rápido vs. Servilleta",
        body: "En lugar de esquematizar ideas en papel, permite pasar de las notas de un relevamiento a un prototipo funcional e interactivo en 30 minutos.",
      },
      {
        heading: "Alineación de expectativas",
        body: "Validar ideas visualmente con clientes antes de contratar o iniciar desarrollos complejos.",
      },
      {
        heading: "Setup inicial",
        body: "Verificación de instalación de Cursor y creación o validación de cuenta en GitHub.",
        link: {
          href: "https://cursor.com/es/download",
          label: "Descargar Cursor",
        },
      },
    ],
    practice: [
      {
        text: "Verificación de la instalación de Cursor en los equipos de los alumnos.",
        link: {
          href: "https://cursor.com/es/download",
          label: "Descargar Cursor",
        },
      },
      {
        text: "Registro, inicio de sesión y configuración básica en GitHub.",
        link: {
          href: "https://github.com/signup",
          label: "Crear cuenta en GitHub",
        },
      },
    ],
    caseStudy: {
      anchor: "Por qué Vibecoding",
      title: "De la reunión a la demo en 30 minutos",
      videoSrc: "/evaluacion-proveedores.mp4",
      videoLabel:
        "Demo del módulo de evaluación de proveedores para una empresa de control documental",
      beats: [
        {
          heading: "Credenciales",
          body: "Hace 2 años trabajo como freelancer en diseño de experiencia de usuario y desarrollo frontend. También lidero equipos que construyen aplicaciones complejas a partir de mis diseños.",
        },
        {
          heading: "De idea a producto",
          body: "El vibecoding me ayudó a pasar de una idea a un producto en minutos.",
        },
        {
          heading: "El encargo",
          body: "Este video es un diseño para una empresa de control documental: el módulo de evaluación de proveedores. Mi cliente se reunió con su cliente ese mismo día, me envió los requisitos y armé la demo en 30 minutos con lo que habían conversado.",
        },
        {
          heading: "El efecto",
          body: "Mostrar esta demo el mismo día aumenta de forma exponencial las probabilidades de que contraten a mi cliente para este desarrollo.",
        },
      ],
    },
  },
  {
    id: "bloque-2",
    number: 2,
    start: "00:30",
    end: "01:00",
    title: "Referencias Visuales, PRD e Ingeniería de Prompts con Gemini",
    explanationMinutes: "10 min",
    practiceMinutes: "20 min",
    explanation: [
      {
        heading: "Explorar ejemplos",
        body: "En Dribbble hay templates de CVs. Sáquenle fotos al diseño que les guste y péguenlas en Cursor junto con el PRD.",
        link: {
          href: "https://dribbble.com/tags/resume-landing-page",
          label: "Ver ejemplos en Dribbble",
        },
      },
      {
        heading: "Product Requirements Document (PRD)",
        body: "Concepto de PRD en desarrollo de producto digital: el documento que describe qué se va a construir, para quién y con qué criterio de éxito.",
      },
      {
        heading: "Ingeniería de Prompts con Gemini",
        body: "Cómo guiar a la IA para redactar un PRD estructurado a partir de la trayectoria profesional del alumno. Sirve Gemini o el modelo de lenguaje que cada persona prefiera.",
      },
      {
        heading: "El Prompt Inicial",
        body: "Un prompt vago genera plantillas genéricas inservibles. Un PRD bien estructurado garantiza una interfaz personalizada y precisa.",
      },
    ],
    practice: [
      {
        text: "Redacción del PRD en interacción directa con Gemini.",
        prompt: copyablePrompt,
        promptLabel: "Prompt base",
      },
      "Asistencia personalizada en la formulación y refinamiento del PRD de cada alumno.",
      {
        text: "Pedirle a Cursor que corra el proyecto en local.",
        prompt: `Corre este proyecto en local para que pueda verlo en mi navegador.

- Instala lo que falte y arranca el servidor de desarrollo.
- Cuando esté listo, dime la dirección local y déjala abierta.
- No lo publiques y no me pidas contraseñas.`,
      },
    ],
  },
  {
    id: "bloque-3",
    number: 3,
    chip: "Lovable",
    kicker: "Bloque 3 • Lovable • 01:00 – 01:10",
    start: "01:00",
    end: "01:10",
    title: "Lovable",
    explanationMinutes: "5 min",
    practiceMinutes: "5 min",
    explanation: [
      {
        heading: "Demo en vivo (5 min)",
        body: "Demostración en pantalla de cómo prototipar rápido en la nube usando Lovable: qué es y cuándo conviene usarlo.",
        link: {
          href: "https://lovable.dev",
          label: "lovable.dev",
        },
        accordion: [
          {
            title: "¿Qué es?",
            body: "Lovable es una herramienta no-code para desarrollos simples y veloces. Tiene una base de diseños muy amplia y, para mí, es la que mejor diseña estilos. Al hacer clic en Publish, el diseño queda publicado y te dan un enlace para compartir directamente. No tienes que preocuparte por hostear la página en ningún lado.",
          },
          {
            title: "Cuándo conviene usarlo",
            body: "Para comenzar un proyecto, para rebotar ideas con otra persona que puede ver los cambios publicados al instante, y cuando no tienes mucho tiempo y quieres un diseño veloz.",
          },
          {
            title: "Cuándo no conviene usarlo",
            body: "Cuando la aplicación es muy compleja, tiene backend o una base de datos grande con muchas tablas: se empieza a confundir y usa muchos tokens, más de los que usa Cursor. También cuando creas muchas páginas. Cursor tiene un límite de tokens mucho mayor y es más difícil agotar la suscripción de 20 dólares.",
          },
        ],
      },
    ],
    practice: [],
  },
  {
    id: "bloque-3-cursor",
    number: 3,
    chip: "Cursor",
    kicker: "Bloque 3 • Cursor • 01:10 – 01:30",
    start: "01:10",
    end: "01:30",
    title: "Cursor",
    explanationMinutes: "5 min",
    practiceMinutes: "15 min",
    extra: "cursor",
    explanation: [
      {
        heading: "Por qué seguimos en Cursor",
        body: "Construiremos en Cursor por el control total, la edición local y el despliegue directo, sin intermediarios.",
      },
      {
        heading: "La pantalla de Cursor",
        body: "Antes del primer prompt, recorremos la pantalla con la chuleta. Son cinco zonas: los archivos, la ventana central (código o navegador), la terminal, el chat y, a la derecha del chat, el listado de agentes. Cada una hace una sola cosa.",
      },
      {
        heading: "Un agente por problema",
        body: "Abrimos un agente nuevo cada vez que cambia el problema. Si seguimos en el mismo chat, arrastra todo lo anterior: mezcla instrucciones viejas, se confunde y gasta más. Un agente por problema empieza limpio y solo ve lo que necesita para esa tarea.",
      },
      {
        heading: "Modos de trabajo en Cursor",
        body: "El chat de Cursor tiene varios modos y se cambia desde el selector. El primer prompt del proyecto se manda en modo Plan. Leemos lo que escribió y, si está bien, hacemos Build.",
        accordion: [
          {
            title: "Agente",
            body: "Construye. Busca en la carpeta, edita archivos y ejecuta comandos. Se usa cuando ya está claro qué hay que hacer y queremos que lo escriba.",
          },
          {
            title: "Ask",
            body: "Solo responde. Lee el proyecto y explica, pero no cambia archivos. Se usa para entender algo antes de tocarlo.",
          },
          {
            title: "Plan",
            body: "Piensa antes de escribir código. Investiga, hace las preguntas que le faltan y deja un plan para revisar. El primer prompt del CV se manda en este modo. Después de leer lo que escribió, hacemos Build.",
          },
          {
            title: "Debug",
            body: "Investiga un fallo. Se usa cuando algo no funciona y no está claro por qué, antes de pedir un arreglo a ciegas.",
          },
          {
            title: "Multitask",
            body: "Reparte el trabajo en varias tareas a la vez. Sirve cuando hay piezas independientes que pueden avanzar en paralelo. El primer CV es una sola tarea: no lo usamos ahí.",
          },
        ],
      },
      {
        heading: "Primer Prompt en Cursor",
        body: "Creamos la carpeta del proyecto y pegamos el PRD en modo Plan. Revisamos el plan y recién entonces hacemos Build para generar la primera versión del CV.",
      },
      {
        heading: "Localhost no es una URL",
        body: "Al abrir el proyecto, el navegador muestra algo como http://localhost:5173. Localhost quiere decir «este ordenador»: solo se ve en tu máquina, y solo mientras el programa está encendido. Nunca se comparte como si fuera un enlace. Mandarlo por WhatsApp o por mail delata que no sabes programar. Más adelante publicamos la web en Vercel, un servicio de hosting, y ahí sí hay una URL a la que puede entrar todo el mundo.",
      },
    ],
    practice: [
      {
        text: "Elegir el modelo antes del primer prompt. Al principio usamos Grok: es el más económico y el que más rinde. Si algo no funciona y no se entiende por qué, y la tarea es muy compleja, pasamos a Opus o Fable. Los modelos más caros quedan para lo específico.",
        accordion: [
          {
            title: "Grok",
            body: "Es el más económico y el que más rinde. Lo usamos al empezar y para la mayor parte del trabajo.",
          },
          {
            title: "Opus o Fable",
            body: "Cuando algo no funciona y no se entiende por qué, y la tarea es muy compleja. Ahí conviene cambiar a Opus o a Fable, y no antes.",
          },
        ],
      },
      "Creación del proyecto local en Cursor por parte de los alumnos.",
      "Pegar el PRD en modo Plan, revisar lo que escribió Cursor y hacer Build para generar la primera versión del CV web.",
    ],
  },
  {
    id: "bloque-4",
    number: 4,
    start: "01:30",
    end: "02:00",
    title: "Vocabulario de UI y Modificación Visual en Cursor",
    explanationMinutes: "10 min",
    practiceMinutes: "20 min",
    extra: "showcase",
    explanation: [
      {
        heading: "Componentes de UI",
        body: "Elementos web que vamos a reconocer por su nombre para poder pedírselos a la IA con precisión.",
        items: [
          "Modales",
          "Dropdowns",
          "Ventanas y pestañas",
          "Sidebars",
          "Acordeones",
          "Selección simple y múltiple",
          "Buscadores",
        ],
      },
      {
        heading: "Instrucciones de UI a la IA",
        body: "Cómo pedirle a Cursor, en lenguaje natural, que agregue o modifique estos componentes específicos.",
      },
    ],
    practice: [
      "Modificación del diseño en Cursor mediante prompts directos.",
      "Incorporación deliberada de al menos 2 elementos de UI (por ejemplo, un acordeón para la trayectoria laboral y un modal para el detalle de proyectos).",
    ],
  },
  {
    id: "bloque-5",
    number: 5,
    start: "02:00",
    end: "02:30",
    title: "Arquitectura Web (Frontend, Backend y Base de Datos)",
    explanationMinutes: "10 min",
    practiceMinutes: "20 min",
    extra: "architecture",
    explanation: [
      {
        heading: "Las 3 capas de una aplicación web",
        body: "Toda aplicación web se puede explicar con tres piezas. Hoy las vemos en el diagrama. El código lo escribe Cursor.",
        items: [
          "Frontend: lo que el usuario ve e interactúa (HTML, CSS y JS). Es lo que estamos construyendo en Cursor.",
          "Backend: la lógica de negocio, las reglas y los servidores detrás de escena.",
          "Base de datos: el almacenamiento persistente de la información.",
        ],
      },
      {
        heading: "Landing Page vs. Web App",
        body: "Una landing estática muestra información y no recuerda nada. Una aplicación interactiva, además, persiste datos. Eso queda como tarea para el hogar, con el formulario del CV.",
      },
    ],
    practice: [
      "Inspección guiada de la estructura de archivos en Cursor para comprender el Frontend de forma conceptual.",
      "Refinamiento de estilos, colores e información en el proyecto mediante prompts.",
    ],
  },
  {
    id: "bloque-6",
    number: 6,
    start: "02:30",
    end: "03:00",
    title: "Repositorios en GitHub, Debugging e Iteración",
    explanationMinutes: "10 min",
    practiceMinutes: "20 min",
    explanation: [
      {
        heading: "¿Qué es un repositorio?",
        body: "La caja fuerte, o el historial en la nube, donde vive el código fuente.",
      },
      {
        heading: "Subida a GitHub desde Cursor",
        body: "Vinculación y publicación del proyecto local hacia un repositorio en GitHub. La cuenta se autoriza en el navegador: no se pegan contraseñas en el chat.",
        link: {
          href: "https://github.com/signup",
          label: "Crear cuenta en GitHub",
        },
      },
      {
        heading: "Ciclo de Debugging",
        body: "Cómo copiar mensajes de error o comportamientos no deseados y dárselos a Cursor para que los corrija de forma autónoma.",
      },
    ],
    practice: [
      {
        text: "Publicación del código local hacia un repositorio en GitHub directamente desde Cursor.",
        link: {
          href: "https://github.com/signup",
          label: "Crear cuenta en GitHub",
        },
        prompt: githubRepoPrompt,
      },
      "Resolución asistida de fallos de diseño o integración usando el agente de Cursor.",
    ],
  },
  {
    id: "bloque-7",
    number: 7,
    start: "03:00",
    end: "03:30",
    title: "Despliegue en Producción con Vercel Gratuito",
    explanationMinutes: "10 min",
    practiceMinutes: "20 min",
    explanation: [
      {
        heading: "Publicación (Deployment)",
        body: "Vercel es un servicio de hosting: publica el proyecto y entrega una URL pública, en el plan gratuito, a la que puede entrar cualquiera. Localhost se queda en tu ordenador; esta dirección es la que se comparte. La cuenta se autoriza en el navegador: no se pegan contraseñas en el chat.",
        link: {
          href: "https://vercel.com/signup",
          label: "Crear usuario en Vercel",
        },
      },
      {
        heading: "De localhost a una URL pública",
        body: "Localhost solo funciona en tu ordenador. La URL de Vercel es la que se comparte y se abre también desde el teléfono.",
      },
      {
        heading: "Verificación",
        body: "Obtención y prueba de la URL pública definitiva.",
      },
    ],
    practice: [
      {
        text: "Conexión de GitHub con Vercel y despliegue en vivo por parte de cada alumno.",
        link: {
          href: "https://vercel.com/signup",
          label: "Crear usuario en Vercel",
        },
        prompt: vercelDeployPrompt,
      },
      "Verificación del sitio final publicado desde teléfonos móviles y cierre de la jornada.",
    ],
  },
  {
    id: "bonus-qa",
    number: 0,
    kind: "bonus",
    chip: "QA",
    kicker: "Bonus • QA • 03:30 – 04:00",
    start: "03:30",
    end: "04:00",
    title: "QA",
    explanationMinutes: "10 min",
    practiceMinutes: "10 min",
    explanation: [
      {
        heading: "Qué es el QA",
        body: "QA es Quality Assurance: revisar la página como si no la hubieras hecho. Sirve para encontrar errores, botones que no hacen lo que dicen y pasos que una persona nueva no logra completar.",
      },
      {
        heading: "Por qué es necesario",
        body: "Quien construye la página ya sabe dónde está cada cosa. Quien entra por primera vez, no. Si solo la pruebas tú, esos huecos se quedan.",
      },
      {
        heading: "Haz caso a quien revisa",
        body: "A veces nos enojamos porque la otra persona no entendió, o porque un botón nos parece clarísimo y no lo encuentra. Hoy nadie lee manuales. La aplicación o la página web tiene que entenderse de forma intuitiva. Si quien revisa se pierde, el problema está en la página, no en esa persona.",
      },
    ],
    practice: [
      "Intercambia el link de tu CV con la persona que tienes al lado.",
      "Revisa los botones del CV de la otra persona: errores, textos que no se entienden y acciones que no se encuentran.",
      "Anota lo que no pudo hacer sin ayuda y corrígelo. No defiendas el diseño: si no lo encontró, no estaba claro.",
    ],
  },
  {
    id: "bonus-supabase",
    number: 0,
    kind: "bonus",
    chip: "Tarea",
    kicker: "Tarea para el hogar",
    start: "Casa",
    end: "Casa",
    title: "Persistencia de Datos con Supabase",
    explanationMinutes: "10 min",
    practiceMinutes: "20 min",
    explanation: [
      {
        heading: "Tarea para el hogar",
        body: "Esto no se hace en clase. En casa, el formulario del CV deja de ser solo visual y guarda el mensaje.",
      },
      {
        heading: "Casos de uso real",
        body: "Formularios de contacto o captación de leads: «Hablemos» o «Solicitar reunión».",
      },
      {
        heading: "Introducción a Supabase (Free Tier)",
        body: "Creación de una base de datos en la nube para almacenar registros, en el plan gratuito. Si el CV ya está en Vercel, las claves se cargan después en el panel, sin pegarlas en el chat.",
        link: {
          href: "https://supabase.com/dashboard/sign-up",
          label: "Crear usuario en Supabase",
        },
      },
      {
        heading: "Prompteo de integración",
        body: "Cómo pedirle a Cursor que conecte el formulario de contacto del CV con Supabase.",
      },
    ],
    practice: [
      {
        text: "Registro en Supabase y creación de la tabla de contactos.",
        link: {
          href: "https://supabase.com/dashboard/sign-up",
          label: "Crear usuario en Supabase",
        },
      },
      {
        text: "Integración del formulario mediante prompts en Cursor y prueba de envío de un mensaje hacia Supabase.",
        prompt: supabaseFormPrompt,
      },
    ],
  },
]

export const promptGroups: PromptGroup[] = [
  {
    id: "gemini",
    tool: "Gemini",
    hint: "Bloque 2 · redactar el PRD del CV",
    prompts: [
      {
        id: "gemini-prd",
        title: "PRD del CV a partir de la trayectoria",
        body: `Actúa como product manager. Voy a pegarte mi trayectoria profesional (experiencia, formación, proyectos y habilidades).

Redacta un Product Requirements Document (PRD) para un CV web personal de una sola página, en español, con estas secciones obligatorias:

1. Objetivo del producto y público (reclutadores y clientes).
2. Secciones de la página: inicio, sobre mí, experiencia, proyectos, habilidades y contacto.
3. Contenido concreto extraído de mi trayectoria. No uses texto genérico de ejemplo ni inventes cargos, empresas o fechas.
4. Tono y personalidad visual.
5. Un formulario de contacto con nombre, email y mensaje.
6. Criterio de éxito: que se entienda quién soy en 10 segundos y que el formulario se pueda conectar después a una base de datos.

Antes de escribir el PRD, hazme solo las preguntas que te falten. Cuando te confirme, entrega el PRD completo, listo para pegarlo en Cursor.

Mi trayectoria:
[pegar aquí]`,
      },
    ],
  },
  {
    id: "cursor",
    tool: "Cursor",
    hint: "Bloques 3 a 6 · construir, ajustar y corregir",
    prompts: [
      {
        id: "cursor-generar",
        title: "Generar el CV desde el PRD",
        body: `Crea en esta carpeta un CV web de una sola página a partir del PRD que pego abajo.

Requisitos:
- React y Tailwind CSS.
- Diseño oscuro, profesional y personal. No uses una plantilla genérica.
- Secciones: inicio, sobre mí, experiencia, proyectos, habilidades y contacto.
- Usa exactamente la información del PRD. No inventes cargos, empresas ni fechas.
- El formulario de contacto puede ser solo visual por ahora. Lo conectaremos después.
- Al terminar, dime cómo abrirlo en el navegador. Aclara que localhost solo funciona en este ordenador y que no se comparte como si fuera una URL pública.

PRD:
[pegar el PRD de Gemini]`,
      },
      {
        id: "cursor-ui",
        title: "Acordeón de experiencia y modal de proyectos",
        body: `Modifica el CV sin cambiar el contenido textual.

1. Muestra la experiencia laboral en un acordeón: cada puesto se abre y se cierra al hacer clic, y solo uno está abierto a la vez.
2. Cada proyecto abre un modal con el problema, lo que hice y el resultado. El modal se cierra con la tecla Escape, con un botón de cerrar y al pulsar fuera.
3. Mantén el diseño actual y haz que funcione bien en el móvil.`,
      },
      {
        id: "cursor-estilos",
        title: "Refinar colores y aire visual",
        body: `Ajusta solo el aspecto visual del CV:
- Paleta sobria, fondo oscuro y un único color de acento.
- Más aire entre secciones y una tipografía más grande en el inicio.
- No cambies los textos ni la estructura de los componentes.`,
      },
      {
        id: "cursor-github",
        title: "Crear el repositorio en GitHub",
        body: githubRepoPrompt,
      },
      {
        id: "cursor-debug",
        title: "Pegar un error para que lo corrija",
        body: `Esto no funciona como espero. No cambies el diseño salvo que sea necesario para corregir el fallo.

Qué debería pasar:
[describe el comportamiento esperado]

Qué pasa en realidad:
[describe lo que ves]

Error o captura:
[pegar el mensaje de error completo]`,
      },
    ],
  },
  {
    id: "supabase",
    tool: "Supabase",
    hint: "Tarea para el hogar · tabla de contactos",
    prompts: [
      {
        id: "supabase-form",
        title: "Conectar el formulario a Supabase",
        body: supabaseFormPrompt,
      },
      {
        id: "supabase-sql",
        title: "SQL de la tabla de contactos",
        body: `create table contactos (
  id bigint generated always as identity primary key,
  nombre text not null,
  email text not null,
  mensaje text not null,
  created_at timestamptz not null default now()
);

alter table contactos enable row level security;

create policy "cualquiera puede enviar un contacto"
on contactos
for insert
to anon
with check (true);`,
      },
      {
        id: "supabase-prompt",
        title: "Pedirle a Cursor el SQL si falta la tabla",
        body: `Estoy en Supabase, plan gratuito. Necesito una tabla llamada contactos con nombre, email, mensaje y fecha de creación.

Dame el SQL listo para pegar en el SQL Editor, con una política que permita insertar desde la web pública y que impida leer los mensajes desde el navegador.`,
      },
    ],
  },
  {
    id: "vercel",
    tool: "Vercel",
    hint: "Bloque 7 · publicar el CV",
    prompts: [
      {
        id: "vercel-deploy",
        title: "Publicar el CV en Vercel",
        body: vercelDeployPrompt,
      },
      {
        id: "vercel-checklist",
        title: "Checklist de despliegue",
        body: `Checklist de despliegue en Vercel (plan gratuito):

1. En vercel.com, elige Add New Project e importa el repositorio de GitHub del CV.
2. Framework: Vite. Deja el comando de build que propone Vercel.
3. Pulsa Deploy.
4. Abre la URL pública y comprueba que se ve el CV.
5. Abre la misma URL desde el teléfono.`,
      },
      {
        id: "vercel-env",
        title: "Revisar variables de entorno con Cursor",
        body: `Revisa que el formulario use solo VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY, que el archivo .env esté en .gitignore y que exista un .env.example con los nombres de las variables y sin valores secretos.`,
      },
    ],
  },
]
