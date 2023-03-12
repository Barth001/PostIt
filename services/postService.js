const Post = require("../models/post");

class PostService {

    // create post
    async createPost(data){
        
        return await Post.create(data);
    }

    // Get all post
    async getPosts(){
        return await Post.find({deleted: false}).sort({createdAt: -1}).select("-deleted")
    }

    // Get a single post
    async getPost(data){
        return await Post.find({ _id: data, deleted: false }).select("-deleted")
    }
    // Get post for update
    async getPostForUpdate(id){
        return await Post.findById(id)
    }

    // Updated a post
    async update(id, data){
        return await Post.findByIdAndUpdate(id, data, {new: true}).select("-deleted")
    }

    // Delete a post (soft delete)
    async delete(id, data){
        return await Post.findByIdAndUpdate(id, data).select("-password")
    }

}

module.exports = new PostService();