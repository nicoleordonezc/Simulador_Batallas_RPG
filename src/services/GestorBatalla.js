const inquirer = require("inquirer");
const Enemigo = require("../models/enemigos");

class GestorBatalla {
    constructor(jugador, enemigo) {
        this.jugador = jugador;
        this.enemigo = enemigo;
    }

    iniciar() {
        console.log(`🔔 ¡Comienza la batalla entre ${this.jugador.nombre} y ${this.enemigo.nombre}!\n`);

        // Lógica simple de combate por turnos
        while (this.jugador.salud > 0 && this.enemigo.salud > 0) {
            // Turno del jugador
            const dañoJugador = Math.max(0, this.jugador.ataque - this.enemigo.defensa);
            this.enemigo.salud -= dañoJugador;
            console.log(`🗡️ ${this.jugador.nombre} ataca a ${this.enemigo.nombre} causando ${dañoJugador} de daño.`);
            if (this.enemigo.salud <= 0) {
                console.log(`💀 ${this.enemigo.nombre} ha sido derrotado.`);
                break;
            }

            // Turno del enemigo
            const dañoEnemigo = Math.max(0, this.enemigo.ataque - this.jugador.defensa);
            this.jugador.salud -= dañoEnemigo;
            console.log(`👹 ${this.enemigo.nombre} ataca a ${this.jugador.nombre} causando ${dañoEnemigo} de daño.`);

            // Mostrar salud actual
            console.log(`🩸 Salud de ${this.jugador.nombre}: ${this.jugador.salud}`);
            console.log(`🩸 Salud de ${this.enemigo.nombre}: ${this.enemigo.salud}`);
            console.log("-----------------------------------");
        }

        // Resultado
        if (this.jugador.salud > 0) {
            console.log(`🏆 ¡${this.jugador.nombre} ha ganado la batalla!\n`);
        } else {
            console.log(`☠️ ${this.jugador.nombre} ha sido derrotado por ${this.enemigo.nombre}...\n`);
        }
    }
}

module.exports = GestorBatalla;

async function iniciarBatalla(personajes) {
    if (!personajes.length) {
        console.log("No hay personajes disponibles para la batalla.");
        return;
    }

    const { elegido } = await inquirer.prompt([
        {
            type: "list",
            name: "elegido",
            message: "¿Con qué personaje quieres luchar?",
            choices: personajes.map((p, index) => ({
                name: `${p.nombre} (Nivel ${p.nivel})`,
                value: index
            }))
        }
    ]);

    const jugador = personajes[elegido];

    // Crear enemigo aleatorio
    const enemigo = Enemigo.crearAleatorio();

    
    // Iniciar la batalla
    const batalla = new GestorBatalla(jugador, enemigo);
    console.log(`⚔️  Te enfrentarás contra un ${enemigo.nombre} (Salud: ${enemigo.salud}, Ataque: ${enemigo.ataque}, Defensa: ${enemigo.defensa})\n`);
    batalla.iniciar();
}

module.exports = iniciarBatalla;
