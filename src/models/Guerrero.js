const Personaje = require("./personajes")

// Subclase: Guerrero
class Guerrero extends Personaje {
    constructor(nombre, nivel=1){
        super(nombre,nivel);
        this.ataque += 5; // Guerrero tiene más ataque base
        // Agrega una habilidad especial de Guerrero
        this.habilidades.push({
            nombre: "Golpe Poderoso",
            efecto: (usuario, enemigo) => {
                const danio = usuario.ataque * 1.5;
                enemigo.recibirDanio(danio);
                return `${usuario.nombre} usa Golpe poderoso y causa ${danio.toFixed(1)} de daño a ${enemigo.nombre}`;
            }
        });
    }
}
module.exports = {Guerrero}