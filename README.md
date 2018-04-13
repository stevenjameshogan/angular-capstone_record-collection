# angular-capstone_record-collection

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