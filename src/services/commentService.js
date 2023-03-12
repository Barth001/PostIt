const Comment = require("../models/comment");

class CommentService {

    // Add comment
    async addComment(data){
        return await Comment.create(data);
    }

    // Get all comment
    async getComments(id){

        return await Comment.find({postId: id, deleted: false}).sort({createdAt: -1}).select("-deleted")
    }
    
    // Get single comment
    async getComment(postId, id){
        
        return await Comment.findOne({postId: postId, _id: id, deleted: false}).select("-deleted")
    }
    // Update comment
    async updateComment(postId, id, data){
        return await Comment.findOneAndUpdate({"postId": postId, "_id": id, deleted: false}, data, {new: true})
    }

    async findComment(id){
        return await Comment.findById(id)
    }

    // Delete comment
    async deleteComment(id){
        return await Comment.findByIdAndUpdate(id, {deleted: true})
    }

}

module.exports = new CommentService();
