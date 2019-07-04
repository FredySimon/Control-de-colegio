'use strict'

var express = require('express');
var AdminController = require('../controllers/admin');
var md_auth = require('../middlewares/authenticated.js');
var api = express.Router();

//Rutas de administrador
api.post('/saveAdmin', AdminController.saveAdmin);
api.post('/loginAdmin', AdminController.loginAdmin);
api.put('/updateAdmin/:id', md_auth.ensureAuth, AdminController.updateAdmin);
api.put('/deleteAdmin/:id', md_auth.ensureAuth, AdminController.deleteAdmin);
api.get('/listAdmin', AdminController.listAdmin);

//Rutas de profesor
api.post('/saveTeacher/:id', md_auth.ensureAuth, AdminController.saveTeacher);
api.put('/updateTeacher/:idA/:idB', md_auth.ensureAuth, AdminController.updateTeacher);
api.put('/deleteTeacher/:idA/:idB', md_auth.ensureAuth, AdminController.deleteTeacher);
api.get('/listTeacher/:id', md_auth.ensureAuth, AdminController.listTeacher);

//Rutas de estudiante
api.post('/saveStudent/:idA/:idB/:idC', md_auth.ensureAuth, AdminController.saveStudent);
api.put('/updateStudent/:idA/:idB', md_auth.ensureAuth, AdminController.updateStudent);
api.put('/deleteStudent/:idA/:idB', md_auth.ensureAuth, AdminController.deleteStudent);
api.get('/listStudent/:id', md_auth.ensureAuth, AdminController.listStudent);

//Rutas de carrera
api.post('/saveCareer/:id', md_auth.ensureAuth, AdminController.saveCareer);
api.put('/updateCareer/:idA/:idB', md_auth.ensureAuth, AdminController.updateCareer);
api.put('/deleteCareer/:idA/:idB', md_auth.ensureAuth, AdminController.deleteCareer);

//Ruta de profesor con estudiante
api.get('/listTeacherWithStudent/:id', md_auth.ensureAuth, AdminController.listTeacherWithStudent)
module.exports = api;