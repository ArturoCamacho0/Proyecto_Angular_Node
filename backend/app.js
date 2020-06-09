'use strict'
// Crear el servidor
var express = require('express');
var body_parser = require('body-parser');
var app = express();

// Archivos de las rutas
var project_routes = require('./routes/project');


// Middlewares
/* Configuracion del body-parser */
app.use(body_parser.urlencoded({ extended: false }));
/* Convertir los datos a JSON */
app.use(body_parser.json());


// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Rutas
app.use('/api', project_routes);


// Exportar
module.exports = app;