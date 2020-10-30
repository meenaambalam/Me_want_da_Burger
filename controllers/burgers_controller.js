var express = require("express");
var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Serve index.handlebars to the root route.
router.get("/", function(req, res) {
    burger.all(function(result){
        console.log(result);
        res.render("index", { burgers: result });
    });
});


router.post("/api/burgers", function(req, res) {
    burger.create(["burger_name","devoured"],[req.body.name,0],
     function(result) {
        // Send back the ID of the new burger
        res.json({ id: result.insertId });
      });
});

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

// Update a quote by an id and then redirect to the root route.
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

module.exports = router;