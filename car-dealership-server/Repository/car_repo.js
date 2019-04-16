let connection = require('../mysqlConnection').getCarConnection();
module.exports = (function(){

    return{
        getRandom15Cars: (callback) => {
            return connection.query("SELECT Color, Mileage, Price, Car_type, Manufacturer, Model, Year, Capacity FROM Car, Model_type " +
                "WHERE Car.Model_FK = Model_type.ID ORDER BY RAND() LIMIT 15", (err, res) => {
                callback(err, res);
            });
        }
    }
})();
