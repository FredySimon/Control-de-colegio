'use strict'

var Student = require('../models/student.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt.js');

function loginStudent(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    Student.findOne({email: email.toLowerCase()},(err, student)=>{
        if(err){
            res.status(500).send({message: 'Error, when trying to login.'});
        }else{
            if(student){
                bcrypt.compare(password, student.password, (err, check)=>{
                    if(check){
                        if(params.gettoken){
                            res.status(200).send({token: jwt.createTokenStudent(student)});
                        }else{
                            res.status(200).send({student: student})
                        }
                    }else{
                        res.status(404).send({message: 'The student could not log in correctly.'});
                    }
                });
            }else{
                res.status(404).send({message: 'The student can not be found.'})
            }
        }
    });
}

module.exports = {
    loginStudent
};