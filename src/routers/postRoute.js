const express = require('express')
const router = express.Router()
const PostController = require("../controllers/postContoller")
const Authorization = require("../middleware/authorization")

router.post('/', Authorization.authorize, PostController.create)
router.get('/:id', Authorization.authorize, PostController.getpost)
router.put('/:id', Authorization.authorize, PostController.update)
router.get('/', Authorization.authorize, PostController.getPosts)
router.delete('/:id', Authorization.authorize, PostController.delete)

module.exports = router