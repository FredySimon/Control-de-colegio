'use strict'
var Teacher = require('../models/teacher.js');
var Activity = require('../models/activity');
var Student = require('../models/student');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt.js');

function loginTeacher(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    Teacher.findOne({email: email.toLowerCase()}, (err, teacher)=>{
        if(err){
            res.status(500).send({message: 'Error, when trying to login.'});
        }else{
            if(teacher){
                bcrypt.compare(password, teacher.password, (err, check)=>{
                    if(check){
                        if(params.gettoken){
                            res.status(200).send({token: jwt.createTokenTeacher(teacher)});
                        }else{
                            res.status(200).send({teacher: teacher})
                        }
                    }else{
                        res.status(404).send({message: "The teacher could not log in correctly."});
                    }
                });
            }else{
                res.status(404).send({message: 'The teacher can not be found.'})
            }
        }
    });
}

function saveActivity(req, res){
    var activity = new Activity();
    var params = req.body;
    var teacherID = req.params.id;

    if(teacherID != req.teacher.sub){
        res.status(500).send({message: 'You do not have permission to add activity.'});
    }else{
        if(params.name && params.dateOfDelivery && params.weighing){
            activity.name = params.name;
            activity.dateOfDelivery = params.dateOfDelivery;
            activity.weighing = params.weighing;

            Activity.findOne({name: activity.name.toLowerCase()}, (err, issetactivity)=>{
                if(err){
                    res.status(500).send({message: 'Error, the activity already exists.' });
                }else{
                    if(!issetactivity){
                        activity.save((err, activityStored)=>{
                            if(err){
                                res.status(500).send({message: 'Failed to save the activity.'});
                            }else{
                                if(!activityStored){
                                    res.status(404).send({message: 'The activity could not be registered.'});
                                }else{
                                    res.status(200).send({activity: activityStored});
                                }
                            }
                        })
                    }else{
                        res.status(200).send({message: 'The activity can not register.'});
                    }
                }
            })
        }else{
            res.status(200).send({message: 'Enter the data correctly.'});
        }
    }
}

function updateActivity(req, res){
    var teacherID = req.params.idA;
    var activityID = req.params.idB;
    var update = req.body;

    if(teacherID != req.teacher.sub){
        res.status(500).send({message: 'You do not have permission to update the activity.'});
    }else{
        Activity.findByIdAndUpdate(activityID, update, {new: true}, (err, activityUpdate)=>{
            if(err){
                res.status(500).send({message: 'Error updating the activity.'});
            }else{
                if(!activityUpdate){
                    res.status(500).send({message: 'The activity could not be updated.'});
                }else{
                    res.status(200).send({activity: activityUpdate});
                }
            }
        })
    }
}

function deleteActivity(req, res){
    var teacherID = req.params.idA;
    var activityID = req.params.idB;

    if(teacherID != req.teacher.sub){
        res.status(500).send({message: 'You do not have permission to delete the activity.'});
    }else{
        Activity.findByIdAndDelete(activityID, (err, activityDelete)=>{
            if(err){
                res.status(500).send({message: 'Error deleting the activity.'});
            }else{
                if(!activityDelete){
                    res.status(500).send({message: 'The activity could not be deleted.'});
                }else{
                    res.status(200).send({message: 'Remove.'});
                }
            }
        });
    }
}

function listStudentTeacher(req, res){
    var teacherID = req.params.id;

    if(teacherID != req.teacher.sub){
        res.status(500).send({message: 'You do not have permission to make a teacher report with your students '})
    }else{
        Student.find({teacher: teacherID}, (err, student)=>{
            if(err){
                res.status(500).send({message: 'Error showing the report'})
            }else{
                if(!student){
                    res.status(200).send({message: 'The teacher does not have students assigned'})
                }else{
                    res.status(200).send({student: student})
                }
            }
        })
    }
}

module.exports = {
    loginTeacher,
    saveActivity,
    updateActivity,
    deleteActivity,
    listStudentTeacher
}