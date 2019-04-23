let connection = require('../mysqlConnection').getCarConnection();
module.exports = (function(){

    return{
        getRandom15Cars: (callback) => {
            return connection.query("SELECT Car.ID, Color, Mileage, Price, Car_type, Manufacturer, Model, Year, Capacity FROM Car, Model_type " +
                "WHERE Car.Model_FK = Model_type.ID ORDER BY RAND() LIMIT 15", (err, res) => {
                callback(err, res);
            });
        },

        sellCar: (Date_sold, Price_sold, Employee_FK, Cutstomer_FK, Payment_type_FK, Car_FK, callback) => {
            return connection.query("INSERT INTO Sold_Car VALUES (NULL, ?, ?, ?, ?, ?, ?)",
                [Date_sold, Price_sold, Employee_FK, Cutstomer_FK, Payment_type_FK, Car_FK], (err) => {
                    callback(err);
                });
        }
    }
})();
