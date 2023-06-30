const express = require("express");
const bodyParser = require('body-parser');
const DatabaseConnection = require("./src/config/database");
const routers = require("./src/routers/indexRoute")
const cors = require('cors')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

require("dotenv").config();

app.use(cors())
app.use("/api/v1", routers);

DatabaseConnection.connectDB();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`The server is runinnig at ${PORT}`);
})