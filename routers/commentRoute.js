const express = require('express')
const router = express.Router()
const CommentController = require("../controllers/commentContoller")
const Authorization = require("../middleware/authorization")

router.post('/:postId/comment', Authorization.authorize, CommentController.create)
router.get('/:postId/comment/:id', Authorization.authorize, CommentController.getComment)
router.get('/:postId/comment', CommentController.getAllComment)
// router.put('/:id', PostController.update)
// router.delete('/:id', PostController.delete)

module.exports = router