const Comment = require("../models/comment");

class CommentService {

    // Add comment
    async addComment(data){
        return await Comment.create(data);
    }

    // Get all comment
    async getComments(postId){

        return await Comment.find({"postId": postId}).populate("userId").sort({createdAt: -1})
    }
    
    // Get single comment
    async getComment(postId, id){
        
        return await Comment.find({"postId": postId, "_id": id}).populate("userId")
    }
    // Update comment
    async updateComment(postId, id, data){
        return await Comment.findOneAndUpdate({"postId": postId, "_id": id}, data)
    }

    async findComment(id){
        return await Comment.findById(id)
    }

}

module.exports = new CommentService();
