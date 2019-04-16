module.exports = (function(){

    let mysql = require('mysql');
    let config = require('./Utils/config.js');

    let profileConnection = null;
    let carConnection = null;

    function initProfileConnection(){
        try {
            profileConnection = mysql.createConnection({
                host: config.host,
                user: config.user,
                password: config.password,
                database: config.db,
                port: 3306
            });
            profileConnection.connect();
        }catch(err){
            console.log(err);
        }

    }

    function initCarConnection(){
        try{
            carConnection = mysql.createConnection({
                host: config.host,
                user: config.user,
                password: config.password,
                database: "CarDealershipProductionDB"
            });
            carConnection.connect();
        }catch(err){
            console.log(err);
        }
    }

    return {
        getProfileConnection: () => {
            if(profileConnection == null) {
                initProfileConnection();
            }
            return profileConnection;
        },

        getCarConnection: () => {
            if(carConnection == null){
                initCarConnection();
            }
            return carConnection;
        }
    }
}());