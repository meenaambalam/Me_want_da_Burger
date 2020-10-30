var connection = require("../config/connection.js");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection
var orm = {
  all: function(tableSelect, orderByCol,cb) {
    var queryString = "SELECT * FROM ?? ORDER BY ?? ASC";
    connection.query(queryString, [tableSelect,orderByCol], function(err, result) {
      if (err) throw err;
      console.log(result);
      cb(result);
    });
  },
  create: function(tableInsert,[burgerCol1, burgerCol2],[burgerVal1, burgerVal2],cb) {
    var queryString = "INSERT INTO ?? (??) VALUES (?)";
    connection.query(queryString, [tableInsert,[burgerCol1,burgerCol2],[burgerVal1,burgerVal2]], function(err, result) {
      if (err) throw err;
      console.log(result);
      cb(result);
    });
  },
  update: function(tableUpdate,burgerCol,burgerVal,matchCol, matchColVal,cb) {
    var queryString = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    connection.query(queryString, [tableUpdate,burgerCol,burgerVal,matchCol,matchColVal], function(err, result) {
      if (err) throw err;
      console.log(result);
      cb(result);
    });
  },
  delete: function(tableUpdate, matchCol, matchColVal,cb) {
    var queryString = "DELETE FROM ?? WHERE ?? = ?";
    connection.query(queryString, [tableUpdate,matchCol,matchColVal], function(err, result) {
      if (err) throw err;
      console.log(result);
      cb(result);
    });
  }  
};

module.exports = orm;
