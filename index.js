const inquirer = require('inquirer');
const Personaje = require('./src/models/personajes');
const { Objeto, Inventario } = require('./src/models/inventario');
const { guardar, cargar } = require('./src/utils/persistencia');
const GestorBatalla = require('./src/services/GestorBatalla');

let personajes = cargar(); // Carga personajes guardados

// Reconstruir instancias reales del inventario
personajes.forEach(p => {
    const inventarioReal = new Inventario();
    p.inventario.objetos.forEach(obj => inventarioReal.agregar(obj));
    p.inventario = inventarioReal;
});


async function menu() {
  while (true) {
    const { opcion } = await inquirer.prompt({
      type: 'list',
      name: 'opcion',
      message: '¿Qué deseas hacer?',
      choices: ['Crear personaje', 'Ver personajes', 'Iniciar batalla', 'Salir']
    });

    if (opcion === 'Crear personaje') {
      const datos = await inquirer.prompt([
        { type: 'input', name: 'nombre', message: 'Nombre del personaje:' },
        { type: 'number', name: 'nivel', message: 'Nivel del personaje:', default: 1 },
        { type: 'number', name: 'ataque', message: 'Ataque del personaje:', default: 10 },
        { type: 'input', name: 'habilidadNombre', message: 'Nombre de una habilidad:' },
        { type: 'number', name: 'habilidadDanio', message: 'Daño de la habilidad:' },
        { type: 'input', name: 'objetoNombre', message: 'Nombre de un objeto:' },
        { type: 'input', name: 'objetoTipo', message: 'Tipo de objeto (curativo, ofensivo, etc):' },
      ]);

      const nuevo = new Personaje(datos.nombre, datos.nivel);
      nuevo.ataque = datos.ataque;

      // Agregar habilidad
      const habilidad = {
        nombre: datos.habilidadNombre,
        efecto: (usuario, objetivo) => {
          const danio = datos.habilidadDanio;
          const resultado = objetivo.recibirDanio(danio);
          return `${usuario.nombre} usó ${datos.habilidadNombre} e hizo ${resultado} de daño a ${objetivo.nombre}`;
        }
      };
      nuevo.habilidades.push(habilidad);

      // Agregar objeto
      const efectoObjeto = (personaje) => {
        personaje.vida += datos.objetoValor;
        if (personaje.vida > personaje.vidaMax) personaje.vida = personaje.vidaMax;
        console.log(`${personaje.nombre} usó ${datos.objetoNombre} y recuperó ${datos.objetoValor} de vida.`);
      };
      const objeto = new Objeto(datos.objetoNombre, datos.objetoTipo, efectoObjeto);
      nuevo.inventario.agregar(objeto);

      personajes.push(nuevo);
      guardar(personajes); // Guardar al archivo
      console.log(`✅ Personaje ${nuevo.nombre} creado y guardado con éxito.`);
    }

    else if (opcion === 'Ver personajes') {
      if (personajes.length === 0) {
        console.log("⚠️ No hay personajes aún.");
      } else {
        personajes.forEach(p => {
          console.log(`\n🧝 Nombre: ${p.nombre}`);
          console.log(`📈 Nivel: ${p.nivel}`);
          console.log(`❤️ Vida: ${p.vida}/${p.vidaMax}`);
          console.log(`🗡️ Ataque: ${p.ataque}`);
          console.log("✨ Habilidades:");
          p.habilidades.forEach((h, i) => {
            console.log(`   ${i + 1}. ${h.nombre}`);
          });
          console.log("🎒 Inventario:");
          p.inventario.listar();
        });
      }
    }

    else if (opcion === 'Iniciar batalla') {
      if (personajes.length < 2) {
        console.log("⚠️ Necesitas al menos dos personajes para iniciar una batalla.");
      } else {
        await iniciarBatalla(personajes);
        guardar(personajes); // Guardar después de la batalla
      }
    }

    else if (opcion === 'Salir') {
      console.log("👋 ¡Hasta luego!");
      break;
    }
  }
}

menu();
