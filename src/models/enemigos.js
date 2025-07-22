const Personaje = require("./personajes")

class Enemigo extends Personaje{
    static nombres = ["Goblin", "Orco", "Trol", "Esqueleto", "Lobo", "Demonio"];
    constructor(nombre, salud, ataque, defensa) {
        super( nombre, salud, ataque, defensa); // <- Pasa los valores al constructor de Personaje
    }
    static crearAleatorio() {
        const nombre = this.nombres[Math.floor(Math.random() * this.nombres.length)];
        const salud = Math.floor(Math.random() * 30) + 70;
        const ataque = Math.floor(Math.random() * 10) + 10;
        const defensa = Math.floor(Math.random() * 5) + 5;
    
        return new Enemigo(nombre, salud, ataque, defensa);
      }
}

module.exports = Enemigo