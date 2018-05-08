# My Record Collection - April, 2018

This app is a dynamic, virtual Record Collection, and was my AngularJS solo capstone project at Prime Digital Academy.

On the landing page, a user is greeted with a birds-eye view of his or her current collection.

DATABASE TABLE SETUP - QUERY

    CREATE TABLE genres (
    genre_id serial primary key,
    name varchar (80),
    quantity INT
    );

    CREATE TABLE records (
    id serial primary key,
    title varchar (120),
    artist varchar (80),
    genre_id INT REFERENCES genres,
    release_year INT,
    run_time INT,
    album_img varchar (200),
    is_favorite BOOLEAN,
    );
