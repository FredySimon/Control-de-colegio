'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    license: String,
    teacher: {type: Schema.ObjectId, ref: "teacher"},
    career: {type: Schema.ObjectId, ref:"career"},
    role: String,
});

module.exports = mongoose.model('Student', StudentSchema);