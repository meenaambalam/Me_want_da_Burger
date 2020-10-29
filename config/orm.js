var connection = require("./connection.js");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection
var orm = {
  selectAll: function(tableSelect,orderByCol) {
    var queryString = "SELECT * FROM ?? ORDER BY ?? ASC";
    connection.query(queryString, [tableSelect,orderByCol], function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  },
  insertOne: function(tableInsert,[burgerCol1, burgerCol2],[burgerVal1, burgerVal2],) {
    var queryString = "INSERT INTO ?? (??) VALUES (?)";
    connection.query(queryString, [tableInsert,[burgerCol1,burgerCol2],[burgerVal1,burgerVal2]], function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  },
  updateOne: function(tableUpdate,burgerCol,burgerVal,matchCol, matchColVal) {
    var queryString = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    connection.query(queryString, [tableUpdate,burgerCol,burgerVal,matchCol,matchColVal], function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  }  
};

module.exports = orm;
