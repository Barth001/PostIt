const express = require("express");
const bodyParser = require('body-parser');
const DatabaseConnection = require("./config/database");
const cors = require('cors')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

require("dotenv").config();

app.use(cors())

DatabaseConnection.connectDBLocally();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`The server is runinnig at ${PORT}`);
})