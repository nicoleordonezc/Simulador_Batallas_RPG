// src/services/GestorPersonajes.js
import { db } from '../utils/db.js'

class GestorPersonajes {
  static async agregar(personaje) {
    await db.read();
    db.data ||= { personajes: [] }; // <--- aquí
    db.data.personajes.push(personaje);
    await db.write();
  }

  static async obtenerTodos() {
    await db.read();
    db.data ||= { personajes: [] }; // <--- aquí también
    return db.data.personajes;
  }

  static async borrar(nombre) {
    await db.read();
    db.data ||= { personajes: [] }; // <--- y aquí
    db.data.personajes = db.data.personajes.filter(p => p.nombre !== nombre);
    await db.write();
  }
}

export default GestorPersonajes;
