'use strict'
// Conectar la Base de Datos
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

// Promesa
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
    .then(() =>{
        console.log("La conexión a la Base de Datos se ha establecido con exito!");

        // Creación del servidor
        app.listen(port, () => {
            console.log("Servidor corriendo correctamente en la URL localhost:3700");
        });

    }).catch(err => console.log(err));