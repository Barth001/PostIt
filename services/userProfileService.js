const User = require("../models/user");

class UserProfileService {
    // Get all users
    async getAllUser(){
        return await User.find({}).select("-password");
    }

    // Get user by id
    async getUserById(id){
        return await User.findById(id).select("-password");
    }

    // update user
    async updateUser(id, data){
        return await User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        }).select("-password")
    }

    // delete user
    async deleteUser(id){
        return await User.findByIdAndRemove(id)
    }

}

module.exports = new UserProfileService();