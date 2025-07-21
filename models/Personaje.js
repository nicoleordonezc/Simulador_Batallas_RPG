export default class Personaje {
  constructor(nombre, clase, salud, ataque, defensa) {
    this.nombre = nombre;
    this.clase = clase;
    this.salud = salud;
    this.ataque = ataque;
    this.defensa = defensa;
    this.nivel = 1;
    this.experiencia = 0;
  }

  mostrarDetalles() {
    return `
${this.nombre} (Clase: ${this.clase})
Salud: ${this.salud}
Ataque: ${this.ataque}
Defensa: ${this.defensa}
Nivel: ${this.nivel}
Experiencia: ${this.experiencia}
    `.trim();
  }

  subirNivel() {
    this.nivel++;
    this.salud += 10;
    this.ataque += 5;
    this.defensa += 3;
    console.log(`${this.nombre} ha subido al nivel ${this.nivel}!`);
  }
}
