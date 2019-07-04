'use strict'

var express = require('express');
var TeacherController = require('../controllers/teacher');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();

//Rutas de profesor
api.post('/loginTeacher', TeacherController.loginTeacher);

//Rutas de actividades
api.post('/saveActivity/:id', md_auth.ensureAuth, TeacherController.saveActivity);
api.put('/updateActivity/:idA/:idB', md_auth.ensureAuth, TeacherController.updateActivity);
api.put('/deleteActivity/:idA/:idB', md_auth.ensureAuth, TeacherController.deleteActivity);
api.get('/listStudentTeacher/:id', md_auth.ensureAuth, TeacherController.listStudentTeacher);
module.exports = api;