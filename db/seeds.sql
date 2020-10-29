/*

To run this file, we do the following in our Terminal:

1. Go to the directory of this sql file.

2. Get into our mysql console.

3. Run "source seeds.sql"

*/
-- Insert a set of records.
INSERT INTO burgers (burger_name, devoured) VALUES ('Hamburger', true);
INSERT INTO burgers (burger_name, devoured) VALUES ('Beyond Meat Burger', false);
INSERT INTO burgers (burger_name, devoured) VALUES ('Fish Burger', false);