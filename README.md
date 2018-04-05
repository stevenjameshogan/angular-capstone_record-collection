# angular-capstone_record-collection

CREATE TABLE records (
id serial primary key,
title varchar (120),
artist varchar (80),
genre varchar (80),
release_year INT,
run_time INT,
album_img varchar (200)
);

CREATE TABLE genres (
id serial primary key,
name varchar (80),
quantity INT
);

TASK LIST

[x] - Install dependencies (node, express, angular, )
[x] - Create file structure and basic files (w/exception of routes, services)
[x] - Create database and tables, add starting records
[x] - Setup server and connect to postgresql (w/exception of routes)
[x] - Create basic HTML wireframe
[x] - Angular setup
    [x] - Create on client.js
    [x] - Link to HTML
    [x] - Genre, Collection views and controllers
    [x] - Setup service, ensure connection to controllers
    [x] - Nav bar
    [x] - Source into index.html
[] - Create server GET request (first test in Postico), ensure getting data from db
[] - Create client GET request, show on DOM
[] - Create server POST request (first test in Postico)
[] - Create client POST request (add HTML inputs), ensure it makes it to db
[] - Shift server to route, ensure it works
[] - Create server side DELETE route 
[] - Create client side DELETE route (add html buttons)
[] - Polish all routes
    [] - ng-repeat of Records on collection view, as "cards"
    [] - ng-repeat of Genres on genre view, as "table"
[] - Create Genre view (SQL joins to see total in Genre - test first in Postico)
