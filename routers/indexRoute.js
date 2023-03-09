const express = require('express');
const router = express.Router();

const authRoute = require("./authRoute");
const userProfileRoute = require("./userProfileRoute")
const PostRoute = require("../routers/postRoute")

router.use("/auth", authRoute);
router.use("/user", userProfileRoute);
router.use("/post", PostRoute);

module.exports = router;