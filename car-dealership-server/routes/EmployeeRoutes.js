let express = require('express');
let employeeRepo = require('../Repository/employee_repo');

module.exports = function(){
    let employeeRouter = express.Router();

    employeeRouter.route("/addEmployee")
        .post((req, res) => {
            let username = req.query.username;
             if(username){
                 let date = new Date();
                 let timestamp =  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
                     ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

                 employeeRepo.addEmployee(username, "none", "fake@gmail.com", 8888888888, timestamp, 0, 1, function(err){
                     if(err){
                         res.status(400).send(JSON.stringify({message: "Server error adding profile"}));
                         console.log(err);
                     }else{
                         res.status(200).send(JSON.stringify({message: "Employee added"}));
                     }
                 })
             }else{
                 res.status(400).send(JSON.stringify({message: "A parameter is missing"}));
             }
        });

    employeeRouter.route("/updateEmployee")
        .post((req, res) => {
           let username = req.query.username;
           let carsSold = req.query.carsSold;
           let key = req.query.key;

           if(key !== "EmployeePass"){
               res.status(400).send(JSON.stringify({message: "Nice try"}));
           }

           if(username && carsSold != null){
                employeeRepo.updateEmployee(username, carsSold, (err) => {
                    if(err){
                        res.status(400).send(JSON.stringify({message: "Server error saving profile"}));
                        console.log(err);
                    }else{
                        res.status(200).send(JSON.stringify({message: "Employee updated"}));
                    }
                })
           }else{
               res.status(400).send(JSON.stringify({message: "A parameter is missing"}));
           }
        });

    employeeRouter.route("/addEmployeeRating")
        .post((req, res) => {
            let username = req.query.username;
            let comment = req.query.comment;
            let rating = req.query.rating;
            let custID = req.query.custID;

            if(username && comment && rating && custID){
                employeeRepo.getEmployeeByName(username, (err, employeeID) => {
                    if(err){
                        res.status(400).send(JSON.stringify({message: "Server error rating employee"}));
                        console.log(err);
                    }else{
                        let date = new Date();
                        let timestamp =  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
                            ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                        employeeRepo.addEmployeeRating(comment, timestamp, rating, employeeID, custID, (err) => {
                            if(err){
                                res.status(400).send(JSON.stringify({message: "Server error rating employee"}));
                                console.log(err);
                            }else{
                                res.status(200).send(JSON.stringify({message: "Employee rated"}));
                            }
                        });
                    }
                })
            }
        });
    return employeeRouter;
};