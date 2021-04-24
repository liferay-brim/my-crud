const mysql = require("mysql");
const dbConfig = require("./db-config.js");

const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

// open the MySQL connection
try {
    connection.connect(error => {
        if (error) throw error
        else console.log("Success on DB Connection.");
    });
} catch (error) {console.log("Error connecting nodeapp to database: " + error.message)}

module.exports = connection;