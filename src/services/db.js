import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// Necesario para obtener __dirname en ESModules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Ruta a la base de datos
const file = join(__dirname, '../../data/db.json')

// 👉 SOLUCIÓN: pasar data predeterminada al constructor
const adapter = new JSONFile(file)
const defaultData = { personajes: [] }
const db = new Low(adapter, defaultData) // 💥 aquí está el cambio importante

// Inicializa la base de datos (asegura estructura mínima)
export async function initDB() {
  await db.read()
  db.data ||= { personajes: [] }
  await db.write()
}

export { db }
