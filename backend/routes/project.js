'use strict'
var express = require('express');
var project_controller = require('../controllers/project');
var router = express.Router();

// Middleware
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.post('/save-project', project_controller.saveProject);
router.get('/project/:id?', project_controller.getProject);
router.get('/projects', project_controller.getProjects);
router.put('/update/:id?', project_controller.updateProject);
router.delete('/delete/:id?', project_controller.deleteProject);
router.post('/uploadImage/:id?', multipartMiddleware, project_controller.uploadImage);
router.get('/get-image/:image', project_controller.getImageFile);

module.exports = router;