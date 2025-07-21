import inquirer from 'inquirer';
import chalk from 'chalk';

import { initDB } from './src/services/db.js';
import GestorPersonajes from './src/services/GestorPersonajes.js';

import Guerrero from './models/Guerrero.js';
import Mago from './models/Mago.js';
import Arquero from './models/Arquero.js';

(async () => {
  await initDB();
  await mostrarMenu();
})();

async function mostrarMenu() {
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: '¿Qué deseas hacer?',
      choices: [
        'Crear personaje',
        'Ver personajes',
        'Iniciar batalla (no implementado)',
        'Salir',
      ],
    },
  ]);

  switch (opcion) {
    case 'Crear personaje':
      await crearPersonaje();
      break;
    case 'Ver personajes':
      await verPersonajes();
      break;
    case 'Iniciar batalla (no implementado)':
      console.log(chalk.yellow('\nFuncionalidad en construcción...\n'));
      break;
    case 'Salir':
      console.log(chalk.green('\n¡Hasta luego!\n'));
      return;
  }

  await mostrarMenu();
}

async function crearPersonaje() {
  const { nombre, clase } = await inquirer.prompt([
    {
      type: 'input',
      name: 'nombre',
      message: 'Nombre del personaje:',
    },
    {
      type: 'list',
      name: 'clase',
      message: 'Selecciona una clase:',
      choices: ['Guerrero', 'Mago', 'Arquero'],
    },
  ]);

  let personaje;

  switch (clase) {
    case 'Guerrero':
      personaje = new Guerrero(nombre);
      break;
    case 'Mago':
      personaje = new Mago(nombre);
      break;
    case 'Arquero':
      personaje = new Arquero(nombre);
      break;
  }

  await GestorPersonajes.agregar(personaje);
  console.log(chalk.green('\n¡Personaje creado exitosamente!\n'));
}

async function verPersonajes() {
  const personajes = await GestorPersonajes.obtenerTodos();

  if (personajes.length === 0) {
    console.log(chalk.red('\nNo hay personajes creados aún.\n'));
    return;
  }

  console.log(chalk.cyan('\nLista de personajes:\n'));
  personajes.forEach((p, i) => {
    console.log(`#${i + 1}:`, `${p.nombre} | Clase: ${p.clase} | Nivel: ${p.nivel} | Vida: ${p.vida}`);
  });
  console.log('');
}
