import Personaje from './Personaje.js';

export default class Guerrero extends Personaje {
  constructor(nombre) {
    super(nombre, 'Guerrero', 120, 15, 10);
  }
}
