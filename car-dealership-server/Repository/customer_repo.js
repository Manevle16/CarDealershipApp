let connection = require('../mysqlConnection').getCarConnection();

module.exports = (function () {

    return {
        getRandom20Customers: (callback) => {
            connection.query("SELECT ID, First_name, Last_name, Manufacturer_preference, Budget FROM Customer " +
                "ORDER BY RAND() LIMIT 20", (err, res) => {
                callback(err, res);
            });
        }
    }
})();
