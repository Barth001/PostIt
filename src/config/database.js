const mongoose = require('mongoose');
require("dotenv").config();

class DatabaseConnection {

    // MongodDB local connection
    connectDBLocally(){
        mongoose.connect(process.env.LOCAL_DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        }).then(() => {
            console.log('Connected to the database')
        }).catch(() => {
            console.log('There was an error connecting to your database')
        });
    }

    // MongodDB Atlas connection
    connectDB(){
        mongoose.connect(process.env.DATABASE_URI)
        .then(() => {
        console.log('Connected to the database')
        }).catch(() => {
            console.log('There was an error connecting to your database')
        })
    }
}

module.exports = new DatabaseConnection();