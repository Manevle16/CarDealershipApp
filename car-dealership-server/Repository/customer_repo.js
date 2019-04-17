let connection = require('../mysqlConnection').getCarConnection();

module.exports = (function () {

    return {
        getRandom20Customers: (callback) => {
            connection.query("SELECT First_name, Last_name, Manufacturer_preference, Budget FROM Customer " +
                "ORDER BY RAND() LIMIT 15", (err, res) => {
                callback(err, res);
            });
        }
    }
})();
