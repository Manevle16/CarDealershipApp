module.exports = (function(){

    let mysql = require('mysql');
    let config = require('./Utils/config.js');

    let connection = null;

    let connected = false;

    function initConnection(){
        if(!connected ){
            try {
                connection = mysql.createConnection({
                    host: config.host,
                    user: config.user,
                    password: config.password,
                    database: config.db,
                    port: 3306
                });
                connection.connect();
                connected = true;
            }catch(err){
                console.log(err);
            }
        }
    }

    return {
        getConnection: function getConnection() {
            if(connection == null) {
                initConnection();
            }
            return connection;
        }
    }
}());