let express = require('express');
let profiles_repo = require('../Repository/profiles_repo');

module.exports = function(){
    let profileRouter = express.Router();

    profileRouter.route("/createProfile")
        .post((req, res) => {

            let username = req.query.username;
            let password = req.query.password;
            let S3_url = req.query.S3_url;

            if(username && password && S3_url){

                if(req.query.username.length > 50){
                    res.status(400).send(JSON.stringify({message: "Username is not less than 50 characters"}));
                }

                if(req.query.password.length > 50){
                    res.status(400).send(JSON.stringify({message: "Password is not less than 50 characters"}));
                }

                profiles_repo.profileExists(username, (err, body) => {
                    if(err){
                        res.status(500).send(JSON.stringify({message: "Server error occurred"}));
                    }else if(body.length > 0){
                        res.status(400).send(JSON.stringify({message: "User with that username already exists"}));
                    }else{

                        profiles_repo.addProfile(username, password, S3_url, (err) => {
                            if(err){
                                res.status(500).send(JSON.stringify({message: "Server error occurred"}));
                            }else {
                                res.status(200).send(JSON.stringify({message: "Profile Added"}));
                            }
                        });
                    }
                });
            }else{
                res.status(400).send(JSON.stringify({message: "A parameter is missing"}));
            }
        });

    profileRouter.route("/login")
        .get((req, res) => {

            let username = req.query.username;
            let password = req.query.password;

            if(username && password){

                profiles_repo.getProfile(username, password, (err, body) => {
                   if(err){
                        res.status(500).send(JSON.stringify({message: "Server error occurred"}));
                   }else if(body.length < 1){
                        res.status(400).send(JSON.stringify({message: "Username or password incorrect"}));
                   }else{
                        res.status(200).send(body);
                   }
                });
            }else{
                res.status(400).send(JSON.stringify({message: "A parameter is missing"}));
            }
        });

    return profileRouter;
};