var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Serve index.handlebars to the root route.
// route that recieves the ajax get request from front-end and invokes the appropriate model function to get to ORM and get all the burger data from DB to display in front-end
router.get("/", function(req, res) {
    burger.all(function(result){
        console.log(result);
        res.render("index", { burgers: result });
    });
});

// route that recieves the ajax post request from front-end and invokes the appropriate model function to get to ORM and insert new burger data into the DB and communicate respective message to front end
router.post("/api/burgers", function(req, res) {
    burger.create(["burger_name","devoured"],[req.body.name,0],
     function(result) {
        // Send back the ID of the new burger
        res.json({ id: result.insertId });
      });
});

// route that recieves the ajax delete request from front-end and invokes the appropriate model function to get to ORM and delete the matchign burger data from the DB and communicate respective message to front end
router.delete("/api/burgers/:id", function(req, res) {
    var condition = req.params.id;
    burger.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
});

// route that recieves the ajax put request from front-end and invokes the appropriate model function to get to ORM and updates the burger data in the DB and communicate respective message to front end
router.put("/api/burgers/:id", function(req, res) {
    var condition = req.params.id;
    console.log("condition", condition);
    burger.update(condition, function(result) {
        if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
        } else {
            res.status(200).end();
        }
  });
});

// Export the routes created by the controller to server.js
module.exports = router;