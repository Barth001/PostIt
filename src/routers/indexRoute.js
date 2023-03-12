const express = require('express');
const router = express.Router();

const authRoute = require("./authRoute");
const userProfileRoute = require("./userProfileRoute")
const PostRoute = require("./postRoute")
const CommentRoute = require("./commentRoute")

// Authorization route
router.use("/auth", authRoute);
// User route
router.use("/user", userProfileRoute);
// Post route
router.use("/post", PostRoute);
// Comment route
router.use("/post", CommentRoute);

module.exports = router;