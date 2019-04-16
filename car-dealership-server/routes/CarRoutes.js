let express = require('express');
let carRepo = require('../Repository/car_repo');

module.exports = function(){
    let carRoutes = express.Router();

    carRoutes.route("/getRandom15Cars")
        .get((req, res) => {
            carRepo.getRandom15Cars((err, body) => {
                if(err){
                    res.status(500).send(JSON.stringify({message: "Server error occurred"}));
                }else{
                    res.status(200).send(JSON.stringify(body));
                }

            });
        });

    return carRoutes;
};