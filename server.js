var orm = require("./config/orm.js");
var exphbs = require("express-handlebars");
var express = require("express");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Serve index.handlebars to the root route.
app.get("/", function(req, res) {
    orm.selectAll("burgers", "id", function(result){
        console.log(result);
        res.render("index", { burgers: result });
    });
});

// Show the user the individual quote and the form to update the quote.
app.get("/:id", function(req, res) {
  connection.query("SELECT * FROM quotes where id = ?", [req.params.id], function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    console.log(data);
    res.render("single-quote", data[0]);
  });
});

app.post("/api/quotes", function(req, res) {
  connection.query("INSERT INTO quotes (author, quote) VALUES (?, ?)", [req.body.author, req.body.quote], function(
    err,
    result
  ) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }

    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

app.delete("/api/quotes/:id", function(req, res) {
  connection.query("DELETE FROM quotes WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Update a quote by an id and then redirect to the root route.
app.put("/api/quotes/:id", function(req, res) {
  connection.query(
    "UPDATE quotes SET author = ?, quote = ? WHERE id = ?",
    [req.body.author, req.body.quote, req.params.id],
    function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
      else if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});




//Select all the ordered burgers from the burgers table, ordered by Id column.
// orm.selectAll("burgers","id", function(result){
//     console.log(result);
// });

//Insert a burger record into burger table
//orm.insertOne("burgers", ["burger_name","devoured"], ["Me_Burger",false]);

//Update the devoured column in the burger table
//orm.updateOne("burgers", "devoured", true, "id",3);
