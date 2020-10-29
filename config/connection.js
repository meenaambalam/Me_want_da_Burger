var mysql = require("mysql");

// Heroku has its own instance of Database which we get with the JAWSDBSQL addon on Heroku for the App....
// This is what will be used when someone outside the locahost connects to our App
// It is important to create the table in the Heroku DB instance
if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "burgers_db"
  });
}

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
