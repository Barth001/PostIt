const PostService = require("../services/postService");
const joiValidator = require("../utilities/postValidator");
const Post = require("../models/post")
const mongoose = require("mongoose")

class PostController {

    // Create post
    async create(req, res){

        // Validating post input data
        const {error, value} = joiValidator.validate(req.body);
        if(error){
            return res.status(422).send("Invalid input")
        }

        try {
            const newData = {
                "title": req.body.title,
                "body": req.body.body,
                "createdBy": req.user._id
            };
            const data = await PostService.createPost(newData);
            return res.status(201).send({
                message: "A post created successfully",
                data: data
            })
        } catch (err) {
            return res.status(400).send("Something went wrong")
        }
    }

    // Get all post
    async getPosts(req, res){
        const posts = await PostService.getPosts();

        if(posts){
            return res.status(200).send({
                message: "successful",
                data: posts
            })
        } else {
            return res.status(400).send({
                data: "Something went wrong"
            })
        }
    }

    // Get a single post
    async getpost(req, res){
        try {
            
            const post = await PostService.getPost(req.params.id);
    
            if(post){
                return res.status(200).send({
                    message: "successful",
                    data: post
                })  
            } else {
                return res.status(500).send({
                    data: "Error"
                })
            }
        } catch (error) {
            return res.status(400).send({
                data: "No post found"
            })
        }
    }

    // Update a post
    async update(req, res){

        const post = await PostService.getPost(req.params.id)

        if(req.user._id != new mongoose.Types.ObjectId(post.createdBy).toString()){
            return res.status(422).send("You can only update yourself")
        } else {

            const newPost = await PostService.update(req.params.id, req.body);
    
            if (!newPost) {
                return res.status(400).send({
                    success: false,
                    message: "Something went wrong",
                });
            } else {
                return res.status(201).send({
                    success: true,
                    message: "Post updated successfully",
                    data: newPost,
                }); 
            }
        }
    }

    // Delete user
    async delete(req, res){

        const thePost = await PostService.getPost(req.params.id)

        if(req.user._id != new mongoose.Types.ObjectId(thePost.createdBy).toString()){
            return res.status(422).send("You can only delete yourself")
        } else {

            const post = await PostService.delete(req.params.id);
            if(post){
                return res.status(200).send({
                    success: true,
                    message: "Post deleted successfully",
                }); 
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Something went wrong",
                });
            }
        }
    }

}

module.exports = new PostController();