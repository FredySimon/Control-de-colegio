'use strict'

var express = require('express');
var StudentController = require('../controllers/student');
var api = express.Router();

//Rutas de student
api.post('/loginStudent', StudentController.loginStudent);

module.exports = api;