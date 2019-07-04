'use strict'

var mongoose = require('mongoose');
var app = require('./app')
var port = process.env.PORT || 3300;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ControlDeColegio', {useNewUrlParser: true})
    .then((err, res)=>{
        console.log('Connection to the database correctly done.');

        app.listen(port, ()=>{
            console.log('The Node and Express server is running.')});})
   
        .catch(err => console.log(err));