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
[x] - Create server GET RECORDS request (first test in Postico), ensure getting data from db
[x] - Create client GET RECORDS request, show on DOM
[x] - Create server GET GENRES request (first test in Postico), ensure getting data from db
[x] - Create client GET GENRES request, show on DOM
[x] - Create server POST RECORDS request (first test in Postico)
[x] - Create client POST RECORDS request (add HTML inputs), ensure it makes it to db
[x] - Create server POST GENRES request (first test in Postico)
[x] - Create client POST GENRES request (add HTML inputs), ensure it makes it to db
[X] - Shift server to route, ensure it works
[x] - Create server side DELETE route 
[x] - Create client side DELETE route (add html buttons)
[x] - Polish all routes
    [x] - ng-repeat of Records on collection view, as "cards"
    [x] - ng-repeat of Genres on genre view, as "table"
[x] - Create Genre view (SQL joins to see total in Genre - test first in Postico)
