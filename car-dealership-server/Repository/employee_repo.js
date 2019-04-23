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
        },

        getEmployeeByName: (username, callback) => {
            return connection.query("SELECT ID FROM Employee WHERE First_name = ?", [username], (err, body) =>{
                callback(err, body[0].ID);
            })
        },

        addEmployeeRating: (comment, date, rating, Employee_FK, Customer_FK, callback) => {
            return connection.query("INSERT INTO Employee_ratings VALUES (NULL, ?, ?, ?, ?, ?)",
                [comment, date, rating, Employee_FK, Customer_FK], (err) => {
                    callback(err);
                });
        }
    }
})();