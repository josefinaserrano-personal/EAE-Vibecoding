import { createClient, type SupabaseClient } from "@supabase/supabase-js"

export type ContactoInsert = {
  nombre: string
  email: string
  mensaje: string
  created_at: string
}

let client: SupabaseClient | null = null

function getClient() {
  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !anonKey) {
    throw new Error(
      "Faltan VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY. Añádelas en .env y reinicia el servidor.",
    )
  }
  client ??= createClient(url, anonKey)
  return client
}

function readableError(message: string, code?: string) {
  const missingTable =
    /contactos/i.test(message) && /schema cache|does not exist|not find/i.test(message)
  if (code === "PGRST205" || code === "42P01" || missingTable) {
    return "La tabla contactos no existe en Supabase. Créala en el SQL Editor y vuelve a enviar."
  }
  if (code === "42501" || /row-level security|permission denied/i.test(message)) {
    return "Supabase rechazó el envío. Activa la política que permite insertar en contactos."
  }
  return "No se pudo guardar el mensaje. Revisa la conexión e inténtalo de nuevo."
}

export async function saveContact(input: { nombre: string; email: string; mensaje: string }) {
  const row: ContactoInsert = {
    nombre: input.nombre,
    email: input.email,
    mensaje: input.mensaje,
    created_at: new Date().toISOString(),
  }
  const { error } = await getClient().from("contactos").insert(row)
  if (error) throw new Error(readableError(error.message, error.code))
}
