'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeacherSchema = Schema({
    name: String,
    surname: String,
    email: String,
    course: String,
    password: String
});

module.exports = mongoose.model('Teacher', TeacherSchema);