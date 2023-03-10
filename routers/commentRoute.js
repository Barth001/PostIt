const express = require('express')
const router = express.Router()
const CommentController = require("../controllers/commentContoller")
const Authorization = require("../middleware/authorization")

router.post('/:postId/comment', Authorization.authorize, CommentController.create)
router.get('/:postId/comment/:id', Authorization.authorize, CommentController.getComment)
router.put('/:postId/comment/:id', Authorization.authorize, CommentController.update)
router.get('/:postId/comment', Authorization.authorize, CommentController.getAllComment)
// router.delete('/:id', PostController.delete)

module.exports = router