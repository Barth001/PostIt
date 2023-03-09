const express = require('express')
const router = express.Router()
const PostController = require("../controllers/postContoller")
const Authorization = require("../middleware/authorization")

router.post('/', Authorization.authorize, PostController.create)
router.get('/:id', PostController.getpost)
router.put('/:id', PostController.update)
router.get('/', PostController.getPosts)
router.delete('/:id', PostController.delete)

module.exports = router