'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CareerSchema = Schema({
    name: String,
    workingDay: String,
});

module.exports = mongoose.model('Career', CareerSchema);