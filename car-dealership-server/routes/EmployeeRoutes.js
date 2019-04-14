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

    return employeeRouter;
};