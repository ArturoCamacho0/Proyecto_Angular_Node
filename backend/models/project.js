'use strict'
// Creando el modelo
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Molde para crear los esquemas
var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

module.exports = mongoose.model('Project', ProjectSchema);