const Comment = require("../models/comment");

class CommentService {

    // Add comment
    async addComment(data){
        return await Comment.create(data);
    }

    // Update comment
    async updateComment(id, data){
        return await Comment.findByIdAndUpdate(id, data)
    }
}

module.exports = new CommentService();
