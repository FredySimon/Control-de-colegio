'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Contrasenia_Secreta_Del_Proyecto'

exports.createTokenAdmin = function(admin){
    var payload = {
        sub: admin._id,
        name: admin.name,
        surname: admin.surname,
        email: admin.email,
        role: admin.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(payload, secret);
}

exports.createTokenStudent = function(student){
    var payload = {
        sub: student._id,
        name: student.name,
        surname: student.surname,
        email: student.email,
        license: student.license,
        teacher: teacher.name,
        career: career.career,
        role: student.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(payload, secret);
}

exports.createTokenTeacher = function(teacher){
    var payload = {
        sub: teacher._id,
        name: teacher.name,
        surname: teacher.surname,
        email: teacher.email,
        course: teacher.course,
        role: teacher.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(payload, secret);
}

exports.createTokenCareer = function(career){
    var payload = {
        sub: career._id,
        name: career.name,
        workingDay: career.workingDay,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(payload, secret);
}

exports.createTokenActivity = function(activity){
    var payload = {
        sub: activity._id,
        name: activity.name,
        workingDay: activity.workingDay,
    };
    return jwt.encode(payload, secret);
}