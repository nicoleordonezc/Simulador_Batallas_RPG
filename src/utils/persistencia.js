const fs = require('fs');
const ruta = './data/personajes.json';

function guardar(personajes) {
  fs.writeFileSync(ruta, JSON.stringify(personajes, null, 2));
}

function cargar() {
  if (fs.existsSync(ruta)) {
    return JSON.parse(fs.readFileSync(ruta));
  }
  return [];
}

module.exports = { guardar, cargar };
