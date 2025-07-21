//services/GestorPersonajes.js
const { db } = require('./db.json');

class GestorPersonajes {
  static async agregar(personaje) {
    await db.read();
    db.data.personajes.push(personaje);
    await db.write();
  }

  static async obtenerTodos() {
    await db.read();
    return db.data.personajes;
  }

  static async borrar(nombre) {
    await db.read();
    db.data.personajes = db.data.personajes.filter(p => p.nombre !== nombre);
    await db.write();
  }
}

module.exports = GestorPersonajes;
