module.exports = (function(){
    let connection = require("../mysqlConnection").getCarConnection();

    return{
        addEmployee: (firstName, lastName, Email, Phone_number, Hire_Date, Number_cars_sold, D_FK, callback) => {
            return connection.query("INSERT INTO Employee VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)",
                [firstName, lastName, Email, Phone_number, Hire_Date, Number_cars_sold, D_FK], (err, res) => {
                    callback(err, res);
                });
        }
    }
})();