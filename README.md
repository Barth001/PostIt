# PostIt
Post App API

# DATA BASE MODEL LINK
https://dbdesigner.page.link/zmQeqZTx6c9sfhkEA

## COMMENT FOR DATABASE
Database modelling of this app was done using sql structure, 
but database used in this app is NonSql (mongodb)

# Live URL Link

# Documentation URL


# Starting the app Locally on your machine

    clone the repository

    install the dependencies: using npm i
    
    create a new file named .env in root folder of the project.

    Mongo DB atlas is advised for the DATABASE_URL key, 
    but local database url is fine. 
    Start the server in development by running: npm start. 
    Read the output from the terminal to be sure the server is running and the database is connected.

# API LOCAL URL ROUTES

# Auth routes

[POST] http://localhost:8080/api/v1/auth/register

[POST] http://localhost:8080/api/v1/auth/login

# User routes

[GET] http://localhost:8080/api/v1/user/:id

[GET] http://localhost:8080/api/v1/user

[PUT] http://localhost:8080/api/v1/user/:id

[DELETE] http://localhost:8080/api/v1/user/:id

# Post routes

[GET] http://localhost:8080/api/v1/post

[POST] http://localhost:8080/api/v1/post

[GET] http://localhost:8080/api/v1/post/:id

[PUT] http://localhost:8080/api/v1/post/:id

[DELETE] http://localhost:8080/api/v1/post/:id

# Comment routes

[GET] http://localhost:8080/api/v1/post/:postId/comment/:id

[POST] http://localhost:8080/api/v1/post/:postId/comment

[GET] http://localhost:8080/api/v1/post/:postId/comment

[PUT] http://localhost:8080/api/v1/post/:postId/comment/:id

[DELETE] http://localhost:8080/api/v1/post/comment/:id

# User handle

[GET] http://localhost:8080/api/v1/user/handle/:username
