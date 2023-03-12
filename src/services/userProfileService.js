const User = require("../models/user");

class UserProfileService {
    // Get all users
    async getAllUser(){
        return await User.find({deleted: false}).select("-password").select("-deleted");
    }

    // Get user by id
    async getUserById(id){
        return await User.findById(id).select("-password").select("-deleted");
    }

    // Get user with handle eg @username
    async getUserByUsername(username){
        return await User.findOne({username: username}).select("-password").select("deleted");
    }

    // update user
    async updateUser(id, data){
        return await User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        }).select("-password").select("-deleted")
    }

    // Delete a user (soft delete)
    async delete(id, data){
        return await User.findByIdAndUpdate(id, data).select("-password")
    }

}

module.exports = new UserProfileService();