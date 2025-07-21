import Personaje from './Personaje.js';

export default class Mago extends Personaje {
  constructor(nombre) {
    super(nombre, 'Mago', 80, 25, 5);
  }
}
