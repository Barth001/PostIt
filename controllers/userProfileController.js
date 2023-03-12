const UserProfileService = require("../services/userProfileService");
const mongoose = require("mongoose")

class UserProfileController {

    // Get all user
    async getUsers(req, res){
        const users = await UserProfileService.getAllUser();
        if(users){
            return res.status(200).send({
                data: users
            })

        } else {
            return res.status(400).send({
                data: "Something went wrong"
            })
        }
    }

    // Get a single user
    async getUser(req, res){
        const user = await UserProfileService.getUserById(req.params.id);
        if(user){
            return res.status(200).send({
                data: user
            })

        } else {
            return res.status(400).send({
                data: "Something went wrong"
            })
        }
    }

    // Get user with their handle eg @test
    async getByUsername(req, res){

        const handle = req.params.username.substring(1)
        const user = await UserProfileService.getUserByUsername(handle);
        if(user && user.deleted === false){
            return res.status(200).send({
                data: user
            })

        } else {
            return res.status(400).send({
                data: "No user with such handle"
            })
        }
    }

    // Update user
    async update(req, res){
        const user = await UserProfileService.getUserById(req.params.id);
        if(user.deleted == true) {return res.status(401).send("Post doesn't exist")}

        if (user) {
            if(req.user._id != new mongoose.Types.ObjectId(user._id).toString()){
                return res.status(422).send("You can only update yourself")
            } else {

                const data = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username
                }
                const updatedUser = await UserProfileService.updateUser(req.params.id, data);
    
                return res.status(200).send({
                success: true,
                message: "User updated successfully",
                data: updatedUser,
                  });
                }
        } else {
            return res.status(400).send({
            success: false,
            message: "Something went wrong",
            });
        }
    }

    // Delete user (soft delete)
    async deleteUser(req, res){
        const user = await UserProfileService.getUserById(req.params.id);

        if(user){
 
            if(req.user._id != new mongoose.Types.ObjectId(user._id).toString()){
                return res.status(422).send("You can only delete yourself")
            } else {

                await UserProfileService.delete(req.params.id, {deleted: true})
                return res.status(200).send({
                success: true,
                message: "successfully deleted"
                });
            }
        } else {
            return res.status(400).send({
            success: false,
            message: "Something went wrong",
            });
        }
    }

}

module.exports = new UserProfileController();