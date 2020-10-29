var orm = require("./config/orm.js");

//Select all the ordered burgers from the burgers table, ordered by Id column.
orm.selectAll("burgers","id");

//Insert a burger record into burger table
//orm.insertOne("burgers", ["burger_name","devoured"], ["Me_Burger",false]);

//Update the devoured column in the burger table
//orm.updateOne("burgers", "devoured", true, "id",3);
