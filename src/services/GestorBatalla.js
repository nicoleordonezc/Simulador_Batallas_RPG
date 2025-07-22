// Importar libreria 'chalk' para aplicar colores al texto mostrado por consola 
const chalk = require('chalk');

// Define las clase para manejar una batalla entre dos personajes
class GestorBatalla {
    // constructor que recibe los personajes  y define el tuno principal
    constructor(personaje1, personaje2) {
        this.p1 = personaje1;
        this.p2 = personaje2;
        this.turno = 0; // contador de turnos (empieza en 0)
    }
    // Metodo para iniciar la batalla
    iniciar() {
        // Condicion: Mientras ambos personajes esten vivos,la batalla continuara 
        while (this.p1.estaVivo() && this.p2.estaVivo()) {
            // Determina quien ataca y quieen defiende dependiendo si el turno es paer o impar 
            const atacante = this.turno % 2 === 0 ? this.p1 : this.p2;
            const defensor = this.turno % 2 === 0 ? this.p2 : this.p1;

            // Imprime el turno de el atacante con color azul
            console.log(chalk.blue(`Turno de ${atacante.nombre}`));

            // Si es cada 3 turnos  y el atacante tiene habilidades disponibles
            const usarHabilidad = this.turno % 3 === 0 && atacante.habilidades.length> 0;
            if (usarHabilidad) {
                // Usa la primera habilidad del atacante sobre el defensor 
                const resultado = atacante.usarHabilidad(0, defensor);
                // Imprime el resultado de la habilidad con solor magenta
                console.log(chalk.magenta(resultado));
            } else {
                // Si no se usa habilidad, realiza un ataque normal 
                const danio = defensor.recibirDanio(atacante.ataque);
                // Muestra cuanto daño se le a hecho
                console.log(`${atacante.nombre} ataca a ${defensor.nombre} y causa ${danio} de daño`);
            }

            // Llama el metodo para mostrar los puntos de vida actuales de ambos personajes 
            this.mostrarEstado();

            // Incrementar el turno para el siguiente ciclo
            this.turno++;
        }

        // Deteremina quien gano la batalla segun quien sigue vivo
        const ganador = this.p1.estaVivo() ? this.p1.nombre : this.p2.nombre;
        // Imprime el ganador de la batalla con color verde
        console.log(chalk.green(`La batalla ha terminado. El ganador es ${ganador}`));
    }

    // Metodo para mostrar el estado actual de los personajes
    mostrarEstado() {
        console.log(`${this.p1.nombre}: ${this.p1.vida}/${this.p1.vidaMax} HP`);
        console.log(`${this.p2.nombre}: ${this.p2.vida}/${this.p2.vidaMax} HP`);
    }

}

// exportar la clase de GestorBatlla 
module.exports = GestorBatalla;