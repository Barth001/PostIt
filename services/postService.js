const Post = require("../models/post");

class PostService {

    // create post
    async createPost(data){
        
        return await Post.create(data);
    }

    // Get all post
    async getPosts(){
        return await Post.find().sort({createdAt: -1})
    }

    // Get a single post
    async getPost(id){
        return await Post.findById(id)
    }

    // Updated a post
    async update(id, data){
        return await Post.findByIdAndUpdate(id, data)
    }

    // Delete a post
    async delete(id){
        return await Post.findByIdAndRemove(id).select("-password")
    }
}

module.exports = new PostService();