'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var admin_routes = require('./routes/admin.js')
var teacher_routes = require('./routes/teacher')
var student_routes = require('./routes/student')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/v1', admin_routes);
app.use('/v2', teacher_routes);
app.use('/v3', student_routes);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();});

app.get('/prueba', (req, res) => {
    res.status(200).send({message: 'Testing our express server'});})

module.exports = app;