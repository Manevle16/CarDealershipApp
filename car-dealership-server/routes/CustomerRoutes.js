let express = require('express');
let cutomerRepo = require('../Repository/customer_repo');

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
    return customerRouter;
};