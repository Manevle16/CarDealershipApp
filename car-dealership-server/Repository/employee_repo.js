module.exports = (function(){
    let connection = require("../mysqlConnection").getCarConnection();

    return{
        addEmployee: (firstName, lastName, Email, Phone_number, Hire_Date, Number_cars_sold, D_FK, callback) => {
            return connection.query("INSERT INTO Employee VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)",
                [firstName, lastName, Email, Phone_number, Hire_Date, Number_cars_sold, D_FK], (err) => {
                    callback(err);
                });
        },

        updateEmployee: (username, carsSold, callback) => {
            return connection.query("UPDATE Employee SET Number_cars_sold = ? WHERE First_name = ?",
                [carsSold, username], (err) => {
                    callback(err);
                })
        }
    }
})();