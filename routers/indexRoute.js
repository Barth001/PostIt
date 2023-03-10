const express = require('express');
const router = express.Router();

const authRoute = require("./authRoute");
const userProfileRoute = require("./userProfileRoute")
const PostRoute = require("../routers/postRoute")
const CommentRoute = require("../routers/commentRoute")

router.use("/auth", authRoute);
router.use("/user", userProfileRoute);
router.use("/post", PostRoute);
router.use("/post", CommentRoute);

module.exports = router;