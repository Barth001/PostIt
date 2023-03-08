const express = require('express');
const router = express.Router();

const authRoute = require("./authRoute");
const userProfileRoute = require("./userProfileRoute")

router.use("/user", authRoute);
router.use("/user", userProfileRoute);

module.exports = router;