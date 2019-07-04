'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret ='Contrasenia_Secreta_Del_Proyecto';

exports.ensureAuth = function(req,res,next){
    if(!req.headers.authorization){
        return res.status(404).send({message: "the request of the header does not have authentication"})
    }
var token =req.headers.authorization.replace(/['"]+/g,'');

try{
    var payload =jwt.decode(token, secret);
    if (payload.exp <= moment().unix()){
        return res.status(404).send({message: "The token has expired"});
    }
}catch(exp){
    res.status(404).send({
        message: 'The token is not valid'
    });
}

req.admin = payload;
req.student = payload;
req.teacher = payload;
req.career = payload;
req.activity = payload;

next();
};