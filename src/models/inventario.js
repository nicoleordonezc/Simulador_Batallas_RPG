class Objeto {
    constructor(nombre,tipo,efecto){
        this.nombre = nombre;
        this.tipo = tipo;
        this.efecto = efecto;
    }

    usar(personaje){
        this.efecto (personaje);
    }
}

class Inventario{
    constructor(){
        this.objetos = [];
    }

    agregar(objeto){
        this.objetos.push(objeto);
    }

    usar(nombre,personaje){
        const index = this.objetos.findIndex(obj => obj.nombre === nombre);
        if (index !== -1){
            this.objetos[index].usar(personaje);
            this.objetos.splice(index, 1);
        }else{
            console.log(`No tienes un objeto llamado ${nombre}`)
        }
    }

    eliminar(nombre){
        this.objetos = this.objetos.filter(obj => obj.nombre !== nombre);
    }

    listar(){
        console.log("Inventario");
        this.objetos.forEach(obj => console.log(`- ${obj.nombre} (${obj.tipo})`));

    }
}

module.exports = { Objeto, Inventario };