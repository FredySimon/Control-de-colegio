'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = Schema({
    name: String,
    dateOfDelivery: Date,
    weighing: String, 
});

module.exports = mongoose.model('Activity', ActivitySchema);