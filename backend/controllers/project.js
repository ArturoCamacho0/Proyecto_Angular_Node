'use strict'
var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {
    // Guardar en la base de datos
    saveProject: function(req, res){
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.langs = params.langs;
        project.year = params.year;
        project.image = null;

        project.save((err, projectStored) => {
            if(err) return res.status(500).send({ message: 'Error en la petición al guardar: ' + err });

            if(!projectStored) return res.status(404).send({ message: 'No se ha podido guardar el proyecto' })

            return res.status(200).send({ project: projectStored });
        });
    },

    // Mostrar el archivo por su ID
    getProject: function(req, res){
        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({ message: 'El proyecto no existe' });

        Project.findById(projectId, (err, project) => {

            if(err) return res.status(500).send({ message: 'Error en la petición: ' + err });

            if(!project) return res.status(404).send({ message: 'El proyecto no existe' });

            return res.status(200).send({ message: project });
        });
    },

    // Listar proyectos guardados
    getProjects: function(req, res){
        Project.find({}).sort('-year').exec((err, projects) =>{
            if(err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if(!projects) return res.status(404).send({ message: 'No hay proyectos que mostrar' });

            return res.status(200).send({ projects: projects });
        });
    },

    // Actualizar datos
    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdated) => {
            if(err) return res.status(500).send({ message: 'Error al actualizar' });

            if(!projectUpdated) return res.status(404).send({ message: 'No existe el proyecto '});

            return res.status(200).send({ project: projectUpdated });
        });
    },

    // Borrar archivos
    deleteProject: function(req, res){
        var projectId = req.params.id;

        Project.findByIdAndDelete(projectId, (err, projectDeleted) => {
            if(err) return res.status(500).send({ message: 'No se ha podido borrar el proyecto' });

            if(!projectDeleted) return res.status(404).send({ message: 'No existe el proyecto' });

            return res.status(200).send({ project: projectDeleted });
        })
    },


    // Subir imagenes
    uploadImage: function(req, res){
        var projectId = req.params.id;
        var fileName = "Imágen no subida";

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                Project.findByIdAndUpdate(projectId, { image: fileName }, {new: true}, (err, projectUpdated) => {
                    if(err) return res.status(500).send({ message: 'La imagen no se ha subido' });

                    if(!projectUpdated) return res.status(404).send({ message: 'El proyecto no existe' });

                    return res.status(200).send({ project: projectUpdated });
                });
            }else{
                fs.unlink(filePath, (err) => {
                    return res.status(500).send({ message: "El archivo no es valido" });
                });
            }

        }else{
            return res.status(404).send({ message: fileName });
        }
    },

    getImageFile: function(req, res){
        var file = req.params.image;
        var path_file = './uploads/' + file;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(404).send({ message: 'No existe el archivo' });
            }
        });
    }
};

module.exports = controller;