const express = require("express");
const bodyParser = require('body-parser');
const DatabaseConnection = require("./config/database");
const routers = require("./routers/indexRoute")
const cors = require('cors')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

require("dotenv").config();

app.use(cors())
app.use("/api/v1", routers);

DatabaseConnection.connectDB();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`The server is runinnig at ${PORT}`);
})