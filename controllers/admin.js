'use strict'

var Admin = require('../models/admin.js');
var Student = require('../models/student.js');
var Teacher = require('../models/teacher.js');
var Career = require('../models/career.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt.js');

function saveAdmin(req, res){
    var admin = new Admin();
    var params = req.body;

    if(params.password && params.name && params.surname && params.email){
        admin.name = params.name;
        admin.surname = params.surname;
        admin.email = params.email;
        admin.role = 'ADMIN'

        Admin.findOne({email: admin.email.toLowerCase()}, (err, issetadmin)=>{
            if(err){
                res.status(500).send({message: 'Error, the administrator already exists.'});
            }else{
                if(!issetadmin){
                    bcrypt.hash(params.password, null, null, function(err, hash){
                        admin.password = hash;

                        admin.save((err, adminStored)=>{
                            if(err){
                                res.status(500).send({message: 'Error saving the administrator.'});
                            }else{
                                if(!adminStored){
                                    res.status(404).send({message: 'The administrator could not be registered.'});
                                }else{
                                    res.status(200).send({ admin: adminStored});
                                }
                            }
                        })
                    });
                }else{
                    res.status(200).send({ message: 'The administrator can not register.'});
                }
            }
        });
    }else{
        res.status(200).send({ message: 'Enter the data correctly'});
    }
}

function loginAdmin(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    Admin.findOne({email: email.toLowerCase()}, (err, admin) =>{
        if(err){
            res.status(500).send({message: 'Error, when trying to login.'});
        }else{
            if(admin){
                bcrypt.compare(password, admin.password, (err, check)=>{
                    if(check){
                        if(params.gettoken){
                            res.status(200).send({token: jwt.createTokenAdmin(admin)});
                        }else{
                            res.status(200).send({admin: admin})
                        }
                    }else{
                        res.status(404).send({message: 'The administrator could not log in correctly.'});
                    }
                });
            }else{
                res.status(404).send({message: 'The administrator can not be found.'});
            }
        }
    });
}

function updateAdmin (req, res){
    var adminID = req.params.id;
    var update = req.body;

    if(adminID != req.admin.sub){
        res.status(500).send({message: 'You do not have permission to update the administrator.'});
    }

    Admin.findByIdAndUpdate(adminID, update,{new: true},(err, adminUpdate)=> {
        if(err){
            res.status(500).send({message: 'Error updating the administrator.'});
        }else{
            if(!adminUpdate){
                res.status(500).send({message: 'The administrator could not be updated.'});
            }else{
                res.status(200).send({admin: adminUpdate});
            }
        }
    });
}

function deleteAdmin(req, res) {
    var adminId = req.params.id;

    if (adminId != req.admin.sub) {
        res.status(500).send({ message: 'You do not have permission to delete the administrator.' });
    }

    Admin.findByIdAndDelete(adminId, (err, adminDelete) => {
        if (err) {
            res.status(500).send({ message: 'Failed to remove the administrator.' });
        } else {
            if (!adminDelete) {
                res.status(404).send({ message: 'The administrator could not be deleted.' })
            } else {
                res.status(200).send({ message: 'Removed.' });
            }
        }
    })
}

function listAdmin(req, res){
    Admin.find({},(err, admin)=>{
        res.status(200).send(admin);
    });
}

function saveTeacher(req, res){
    var teacher = new Teacher();
    var params = req.body;
    var adminID = req.params.id;

    if(adminID != req.admin.sub){
        res.status(500).send({message: 'You do not have permission to add teachers.'});
    }else{
        if(params.password && params.name && params.surname && params.email && params.course){
            teacher.name = params.name;
            teacher.surname = params.surname;
            teacher.email = params.email;
            teacher.course = params.course;
            teacher.role = 'TEACHER';

            Teacher.findOne({email: teacher.email.toLowerCase()}, (err, issetteacher)=>{
                if(err){
                    res.status(500).send({message: 'Error, the teacher already exists.'});
                }else{
                    if(!issetteacher){
                        bcrypt.hash(params.password, null, null, function(err, hash){
                            teacher.password = hash;

                            teacher.save((err, teacherStored)=>{
                                if(err){
                                    res.status(500).send({message: 'Failed to save the teacher.'});
                                }else{
                                    if(!teacherStored){
                                        res.status(404).send({message: 'The teacher could not be registered.'});
                                    }else{
                                        res.status(200).send({teacher: teacherStored});
                                    }
                                }
                            })
                        });
                    }else{
                        res.status(200).send({message: 'The teacher can not register.'})
                    }
                }
            });
        }else{
            res.status(200).send({message: 'Enter the data correctly.'})
        }
    }
}

function updateTeacher(req, res){
    var adminID = req.params.idA;
    var teacherID = req.params.idB;
    var update = req.body;

    if(adminID != req.admin.sub){
        res.status(500).send({message: 'You do not have permission to update the teacher.'});
    }else{
        Teacher.findByIdAndUpdate(teacherID, update, {new: true}, (err, teacherUpdate)=>{
            if(err){
                res.status(500).send({message: 'Error updating the teacher.'});
            }else{
                if(!teacherUpdate){
                    res.status(500).send({message: 'The teacher could not be updated.'});
                }else{
                    res.status(200).send({teacher: teacherUpdate});
                }
            }
        });
    }
}

function deleteTeacher(req, res){
    var adminID = req.params.idA;
    var teacherID = req.params.idB;

    if(adminID != req.admin.sub){
        res.status(500).send({message: 'You do not have permission to eliminate the teacher.'});
    }else{
        Teacher.findByIdAndDelete(teacherID, (err, teacherDelete)=>{
            if(err){
                res.status(500).send({message: 'Error deleting the teacher.'});
            }else{
                if(!teacherDelete){
                    res.status(500).send({message: 'The teacher could not be deleted.'});
                }else{
                    res.status(200).send({message: 'Removed.'});
                }
            }
        });
    }
}

function listTeacher(req, res){
    var adminID = req.params.id;
    if(adminID != req.admin.sub){
        res.status(500).send({message: 'You do not have permission to make a teacher report.'});
    }else{
        Teacher.find({}, (err, teacher)=>{
            res.status(200).send(teacher);
        });
    }
}

function saveStudent(req, res){
    var student = new Student();
    var params = req.body;
    var adminID = req.params.idA;
    var teacherId = req.params.idB;
    var careerID = req.params.idC;
    
   if(adminID != req.admin.sub){
        res.status(500).send({message: 'You do not have permission to add students.'});
    }else{
        if(params.password && params.name && params.surname && params.email && params.license){
            student.name = params.name;
            student.surname = params.surname;
            student.email = params.email;
            student.license = params.license;
            student.teacher = teacherId;
            student.career = careerID;
            student.role = 'STUDENT';

            Student.findOne({email: student.email.toLowerCase()}, (err, issetstudent)=>{
                if(err){
                    res.status(500).send({message: 'Error, the student already exists.'});
                }else{
                    if(!issetstudent){
                        bcrypt.hash(params.password, null, null, function(err, hash){
                            student.password = hash;

                            student.save((err, studentStored)=>{
                                if(err){
                                     res.status(500).send({message: 'Failed to save the student.'});
                                }else{
                                    if(!studentStored){
                                        res.status(404).send({message: 'The student could not be registered.'});
                                    }else{
                                        res.status(200).send({ student: studentStored});
                                    }
                                }
                            })
                        });
                    }else{
                        res.status(200).send({ message: 'The student can not register.'});
                    }
                }
            });
        }else{
            res.status(200).send({message: 'Enter the data correctly.'})
        }
    }
}

function updateStudent(req, res){
    var adminID = req.params.idA;
    var studentID = req.params.idB;
    var update = req.body;

    if(adminID != req.admin.sub){
        res.status(500).send({message: 'You do not have permission to update the student.'});
    }else{
        Student.findByIdAndUpdate(studentID, update, {new: true}, (err, studentUpdate)=>{
            if(err){
                res.status(500).send({message: 'Error updating the student.'});
            }else{
                if(!studentUpdate){
                    res.status(500).send({message: 'The student could not be update.'})
                }else{
                    res.status(200).send({student: studentUpdate});
                }
            }
        });
    }
}

function deleteStudent(req, res){
    var adminID = req.params.idA;
    var studentID = req.params.idB;

    if(adminID != req.admin.sub){
        res.status(500).send({message: 'you do not have permission to delete the student.'});
    }else{
        Student.findOneAndDelete(studentID, (err, studentDelete)=>{
            if(err){
                res.status(500).send({message: 'Failed to remove the student.'});
            }else{
                if(!studentDelete){
                    res.status(500).send({message: 'The student could not be deleted.'});
                }else{
                    res.status(200).send({message: 'Removed.'});
                }
            }
        });
    }
}

function listStudent(req, res){
    var adminID = req.params.id;
    if(adminID != req.admin.sub){
        res.status(500).send({message: 'You do not have permission to make a student report.'});
    }else{
        Student.find({}, (err, student)=>{
            res.status(200).send(student);
        });
    } 
}

function saveCareer(req, res){
    var career = new Career();
    var params = req.body;
    var adminID = req.params.id;

    if(adminID != req.admin.sub){
        res.status(500).send({message: 'You do not have permission to add career.'});
    }else{
        if(params.name && params.workingDay){
            career.name = params.name;
            career.workingDay = params.workingDay;

            Career.findOne({name: career.name.toLowerCase()}, (err, issetcareer)=>{
                if(err){
                    res.status(500).send({message: 'Error, the career already exists.'});
                }else{
                    if(!issetcareer){
                        career.save((err, careerStored)=>{
                            if(err){
                                res.status(500).send({message: 'Failed to save the career.'});
                            }else{
                                if(!careerStored){
                                    res.status(404).send({message: 'The career could not be registered.'});
                                }else{
                                    res.status(200).send({ career: careerStored});
                                }
                            }
                        })
                    }else{
                        res.status(200).send({message: 'The career can not register'});
                    }
                }
            });
        }else{
            res.status(200).send({message: 'Enter the data correctly.'});
        }
    }
}

function updateCareer(req, res){
    var adminID = req.params.idA;
    var careerID = req.params.idB;
    var update = req.body;

    if(adminID != req.admin.sub){
        res.status(500).send({message: 'You do not have permission to update the career.'});
    }else{
        Career.findByIdAndUpdate(careerID, update, {new:true}, (err, careerUpdate)=>{
            if(err){
                res.status(500).send({message: 'Error updating the career.'});
            }else{
                if(!careerUpdate){
                    res.status(500).send({message: 'The career could not be update.'});
                }else{
                    res.status(200).send({career: careerUpdate});
                }
            }
        });
    }
}

function deleteCareer(req, res){
    var adminID = req.params.idA;
    var careerID = req.params.idB;

    if(adminID != req.admin.sub){
        res.status(500).send({message: 'you do not have permission to delete the career.'});
    }else{
        Career.findByIdAndDelete(careerID, (err, careerDelete)=>{
            if(err){
                res.status(500).send({message: 'Failed to remove the career.'});
            }else{
                if(!careerDelete){
                    res.status(500).send({message: 'The career could not be deleted.'});
                }else{
                    res.status(200).send({message: 'Removed.'});
                }
            }
        });
    }
}

function listTeacherWithStudent(req, res){
    var adminID = req.params.id;
    var teacherID = Student;
    var student = teacherID

    if(adminID != req.admin.sub){
        res.status(500).send({message: 'you do not have permission to make report to the teachers with your students.'});
    }else{
            Teacher.find({student}, (err, teacher)=>{
            res.status(200).send(teacher);
            
        });
    }
}

module.exports = {
    saveAdmin,
    loginAdmin,
    listAdmin,
    updateAdmin,
    deleteAdmin,
    saveStudent,
    updateStudent,
    deleteStudent,
    listStudent,
    saveTeacher,
    updateTeacher,
    deleteTeacher,
    listTeacher,
    saveCareer,
    updateCareer,
    deleteCareer,
    listTeacherWithStudent
};

