module.exports = (function(){
    let connection = require('../mysqlConnection').getProfileConnection();

    return{
        addProfile: function(username, password, S3_url, callback){
            return connection.query(
                "Insert INTO profile VALUES (?, ?, ?)",
                [username, password, S3_url],
                (err, res) =>{
                    callback(err, res);
                });
        },

        profileExists: function(username, callback){
            return connection.query(
                "Select * From profile Where username = ?",
                [username],
                (err, res) => {
                    callback(err, res);
                });
        },

        getProfile: function(username, password, callback){
            return connection.query(
                "Select * From profile Where username = ? AND password = ?",
                [username, password],
                (err, res) => {
                    callback(err, res);
                });
        }
    }
})();