const fs = require('fs');
const ruta = './data/personajes.json';

function guardar(personajes) {
  fs.writeFileSync(ruta, JSON.stringify(personajes, null, 2));
}

function cargar() {
  if (!fs.existsSync(ruta)) return []; // ✅ Si el archivo no existe, devuelve un arreglo vacío
  const data = fs.readFileSync(ruta, 'utf-8');
  try {
    const json = JSON.parse(data);
    return Array.isArray(json) ? json : []; // ✅ Asegura que se devuelva un arreglo
  } catch (error) {
    console.error('Error al leer personajes:', error.message);
    return [];
  }
}

module.exports = { guardar, cargar };
