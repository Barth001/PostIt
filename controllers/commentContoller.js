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
                    data: {
                        comments: comments,
                        
                    }
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

                const comments = await CommentService.getComments(postId, commentId)
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
}

module.exports = new CommentController();