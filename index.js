const inquirer = require('inquirer');
const { Guerrero } = require('./src/models/Guerrero');
const GestorBatalla = require('./src/services/GestorBatalla');
const { guardar, cargar } = require('./src/utils/persistencia');

let personajes = cargar();

async function menu() {
  const opciones = await inquirer.prompt({
    type: 'list',
    name: 'accion',
    message: '¿Qué deseas hacer?',
    choices: ['Crear personaje', 'Ver personajes', 'Iniciar batalla', 'Salir']
  });

  switch (opciones.accion) {
    case 'Crear personaje':
      const { nombre } = await prompt({ name: 'nombre', message: 'Nombre del guerrero:' });
      const nuevo = new Guerrero(nombre);
      personajes.push(nuevo);
      guardar(personajes);
      break;

    case 'Ver personajes':
      if (personajes.length === 0) {
        console.log('No hay personajes creados aún.');
      } else {
        personajes.forEach(p => console.log(`${p.nombre} - Nivel: ${p.nivel} - Salud: ${p.salud}`));
      }
      break;

    case 'Iniciar batalla':
      if (personajes.length === 0) {
        console.log('Primero crea un personaje para iniciar la batalla.');
        break;
      }
      const enemigo = new Guerrero('Orco');
      const batalla = new GestorBatalla(personajes[0], enemigo);
      batalla.iniciarBatalla();
      break;

    case 'Salir':
      console.log('Hasta la próxima aventura...');
      process.exit();
  }

  menu();
}

menu();
