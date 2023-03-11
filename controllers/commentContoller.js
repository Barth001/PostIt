const mongoose = require("mongoose")
const joiValidator = require("../utilities/commentValidator");
const CommentService = require("../services/commentService");
const PostService = require("../services/postService");


class CommentController {

    // Add comment
    async create(req, res){

        try {
            const postId = req.params.postId;
            if(!mongoose.Types.ObjectId.isValid(postId)){
                return res.status(400).send("Invalid postId")
            }

            const post = await PostService.getPost(postId);
            if(!post){
                return res.status(400).send({
                    message: "No post found",
                    data: {}
                })
            } else {

                // Validating post input data
                const {error, value} = joiValidator.validate(req.body);
                if(error){
                    return res.status(422).send("Invalid input")
                }
            }

            const postComment = {
                "comment": req.body.comment,
                "postId": postId,
                "userId": req.user._id
            }

            const data = await CommentService.addComment(postComment);

            await PostService.update(postId, {$push: {postComments: data._id}});

            return res.status(201).send({
                message: "You commented on this post",
                data: data
            })
            
        } catch (err) {
            return res.status(400).send({
                message: "error occur",
                data: err
            })
        }     
        
    }

    // Get all comment
    async getAllComment(req, res){
            
        try {
            const postId = req.params.postId;
            if(!mongoose.Types.ObjectId.isValid(postId)){
                return res.status(400).send("Invalid postId")
            }

            const post = await PostService.getPost(postId);
            if(!post){
                return res.status(400).send({
                    message: "No post found",
                    data: {}
                })
            } else {

                const comments = await CommentService.getComments(postId)
                return res.status(200).send({
                    message: "All comment fetched successfully",
                    data: comments
                });
            }
            
        } catch (err) {
            return res.status(400).send({
                message: "error occur",
                data: err
            })
        }
    }

    // Get single comment
    async getComment(req, res){
            
        try {
            const postId = req.params.postId;
            const commentId = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(postId)){
                return res.status(400).send("Invalid postId")
            }

            const post = await PostService.getPost(postId);
            if(!post){
                return res.status(400).send({
                    message: "No post found",
                    data: {}
                })

            } else {

                const comments = await CommentService.getComment(postId, commentId)
                return res.status(200).send({
                    message: "comment fetched successfully",
                    data: comments
                });
            }
            
        } catch (err) {
            return res.status(400).send({
                message: "error occur",
                data: err
            })
        }
    }

    // Update comment
    async update(req, res){
            
        try {
            const postId = req.params.postId;
            const commentId = req.params.id;
            
            if(!mongoose.Types.ObjectId.isValid(postId)){
                return res.status(400).send("Invalid postId")
            }

            const post = await PostService.getPost(postId);
            if(!post){
                return res.status(400).send({
                    message: "No post found",
                    data: {}
                })

            } else {
                const current_user = req.user;
                const commentNow = await CommentService.findComment(commentId)
                if(commentNow.userId != current_user._id){
                    return res.status(422).send({
                        message: "You can only update your comment",
                        
                    })
                } else {
                    const comment = await CommentService.updateComment(postId, commentId, req.body)
                    return res.status(201).send({
                        message: "comment updated successfully",
                        data: comment
                    });
                }
            }
            
        } catch (err) {
            return res.status(400).send({
                message: "error occur",
                data: err
            })
        }
    }

    // delete  comment
    async delete(req, res){
            
        try {
            const commentId = req.params.id;
            
            if(!mongoose.Types.ObjectId.isValid(commentId)){
                return res.status(400).send("Invalid postId")
            }

            const comment = await CommentService.findComment(commentId);
            if(!comment){
                return res.status(400).send({
                    message: "No post found",
                    data: {}
                })

            } else {
                const current_user = req.user;
                const commentNow = await CommentService.findComment(commentId)
                if(commentNow.userId != current_user._id){
                    return res.status(422).send({
                        message: "You can only delete your comment",
                    })
                } else {
                    await CommentService.deleteComment(commentId)
                    return res.status(200).send({
                        message: "comment deleted successfully",
                        
                    });
                }
            }
            
        } catch (err) {
            return res.status(400).send({
                message: "error occur",
                data: err
            })
        }
    }
}

module.exports = new CommentController();