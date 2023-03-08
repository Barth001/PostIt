const User = require("../models/userModel");

class UserProfileService {
    // Get all users
    async getAllUser(){
        return await User.find({});
    }

    // Get user by id
    async getUserById(id){
        return await User.findById(id);
    }

    // update user
    async updateUser(id, data){
        return await User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })
    }

    // delete user
    async deleteUser(id){
        return await User.findByIdAndRemove(id)
    }

}

module.exports = new UserProfileService();