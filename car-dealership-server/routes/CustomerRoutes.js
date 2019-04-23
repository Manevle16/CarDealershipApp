let express = require('express');
let cutomerRepo = require('../Repository/customer_repo');
let employeeRepo = require('../Repository/employee_repo');
let carRepo = require("../Repository/car_repo");

module.exports = function() {

    let customerRouter = express.Router();

        customerRouter.route("/getRandom20Customers")
            .get((req, res) => {

                cutomerRepo.getRandom20Customers((err, body) => {
                    if(err){
                        res.status(500).send(JSON.stringify({message: "Server error occurred"}));
                    }else{
                        res.status(200).send(JSON.stringify(body));
                    }
                });
            });
        customerRouter.route("/sellCar")
            .post((req, res) => {

                let price = req.query.price;
                let username = req.query.username;
                let custID = req.query.custID;
                let type = Math.floor(Math.random() * 3) + 1;
                let carId = req.query.carID;
                console.log(req.query);
                if(price && username && custID && carId){
                    employeeRepo.getEmployeeByName(username, (err, employeeID) => {
                        if(err){
                            res.status(400).send(JSON.stringify({message: "Server error selling car"}));
                            console.log(err);
                        }else{
                            let date = new Date();
                            let timestamp =  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
                                ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                            carRepo.sellCar(timestamp, price, employeeID, custID, type, carId, (err) => {
                                if(err){
                                    res.status(400).send(JSON.stringify({message: "Server error selling car"}));
                                    console.log(err);
                                }else{
                                    res.status(200).send(JSON.stringify({message: "Car successfully sold"}));
                                }
                            });
                        }
                    })
                }else{
                    res.status(400).send(JSON.stringify({message: "A parameter is missing"}));
                }
            });
    return customerRouter;
};