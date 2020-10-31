// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  //Invole ORM "all" that gets all the records from table "burger" ordered by column "id"
  all: function(cb) {
    orm.all("burgers", "id", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  // Invoke ORM "create" that inserts a record into table "burgers" with cols and respective values passed to this model function
  create: function(cols, vals, cb) {
    orm.create("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  // Invoke ORM "update" that updates table "burgers" by setting the "devoured" column to 1, where the column "id" matches to the id value passed to this model function
  update: function(condition, cb) {
    orm.update("burgers", "devoured", 1, "id", condition, function(res) {
      cb(res);
    });
  },
  // Invoke ORM "delete" that deletes record in table "burgers" where the column "id" matches to the id value passed to this model function
  delete: function(condition, cb) {
    orm.delete("burgers", "id", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;