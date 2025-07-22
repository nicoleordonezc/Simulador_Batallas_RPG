# 🛡️ Batalla de Personajes - Node.js

## 🎯 Descripción del Proyecto

Este es un proyecto de consola desarrollado en Node.js que simula una batalla entre personajes creados por el usuario y enemigos generados aleatoriamente. El objetivo es aplicar conceptos fundamentales de JavaScript moderno, clases, herencia, uso de librerías como `inquirer`, y lógica de interacción en consola.

## 👥 Integrantes del equipo

* Nicole Ordoñez
* Santiago Pedraza
* Nicolas Espitia

## 🛠️ Tecnologías utilizadas

* [Node.js](https://nodejs.org/)
* [Inquirer.js](https://www.npmjs.com/package/inquirer)

## 📂 Estructura del Proyecto

```
📁 models/
    ├── personajes.js     # Clase base Personaje
    ├── enemigos.js       # Clase Enemigo que extiende Personaje

📁 services/
    ├── gestorBatalla.js  # Clase GestorBatalla que maneja el combate

📁 utils/
    ├── persistencia.json   # Persistencia de los datos guardados

📁 data/
    ├── personajes.json   # Base de datos simple de personajes creados

📄 index.js               # Archivo principal del menú del juego
```

## ⚙️ Funcionalidades

* Crear personajes personalizados con nombre, nivel, salud, ataque y defensa.
* Iniciar una batalla contra un enemigo generado aleatoriamente.
* El sistema determina al ganador basándose en un sistema simple de turnos.
* Mensajes dinámicos y visuales en consola.

## ▶️ Cómo ejecutar el proyecto

1. Clona el repositorio:

   ```bash
   git clone https://github.com/nicoleordonezc/Simulador_Batallas_RPG
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta la aplicación:

   ```bash
   node index.js
   ```

## 📽️ Video de Presentación

🔗[Ver video presentación](https://drive.google.com/drive/folders/1yDqNEpIaC258ntdtb30e8e8IV9RiXJqY?usp=sharing)

---
