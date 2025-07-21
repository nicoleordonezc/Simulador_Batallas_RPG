// src/services/db.js
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

// Ruta del archivo JSON
const file = path.join(__dirname, '/data/db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Inicializa los datos si no existen
async function initDB() {
  await db.read();
  db.data ||= { personajes: [], inventario: [] };
  await db.write();
}

module.exports = { db, initDB };
