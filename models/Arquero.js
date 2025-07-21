import Personaje from './Personaje.js';

export default class Arquero extends Personaje {
  constructor(nombre) {
    super(nombre, 'Arquero', 100, 20, 7);
  }
}
