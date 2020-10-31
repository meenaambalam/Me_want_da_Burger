var connection = require("../config/connection.js");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection
var orm = {
  //orm to select all records ordered by given column in ascending order
  all: function(tableSelect, orderByCol,cb) {
    var queryString = "SELECT * FROM ?? ORDER BY ?? ASC";
    connection.query(queryString, [tableSelect,orderByCol], function(err, result) {
      if (err) throw err;
      console.log(result);
      cb(result);
    });
  },
  //orm to create a new record.
  create: function(tableInsert,[burgerCol1, burgerCol2],[burgerVal1, burgerVal2],cb) {
    var queryString = "INSERT INTO ?? (??) VALUES (?)";
    connection.query(queryString, [tableInsert,[burgerCol1,burgerCol2],[burgerVal1,burgerVal2]], function(err, result) {
      if (err) throw err;
      console.log(result);
      cb(result);
    });
  },
  //orm to update a particular column where a column is matching to specific value
  update: function(tableUpdate,burgerCol,burgerVal,matchCol, matchColVal,cb) {
    var queryString = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    connection.query(queryString, [tableUpdate,burgerCol,burgerVal,matchCol,matchColVal], function(err, result) {
      if (err) throw err;
      console.log(result);
      cb(result);
    });
  },
  //orm to delete the record where a column is matching to specific value
  delete: function(tableUpdate, matchCol, matchColVal,cb) {
    var queryString = "DELETE FROM ?? WHERE ?? = ?";
    connection.query(queryString, [tableUpdate,matchCol,matchColVal], function(err, result) {
      if (err) throw err;
      console.log(result);
      cb(result);
    });
  }  
};

// Export the ORM functions for the models (burger.js)
module.exports = orm;
