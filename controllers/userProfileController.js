const UserProfileService = require("../services/userProfileService");

class UserProfileController {

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

    async update(req, res){
        const user = await UserProfileService.getUserById(req.params.id);

        if (user) {
            if(req.user_id != user._id){
                return res.status(422).send("You can only update yourself")
            } else {

                const updatedUser = await UserProfileService.updateUser(req.params.id, req.body);
    
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

    async deleteUser(req, res){
        const user = await UserProfileService.getUserById(req.params.id);
        console.log(user);

        if(user){
            console.log(req.user._id);
            console.log(user._id);
            if(req.user._id != user._id){
                return res.status(422).send("You can only delete yourself")
            } else {

                await UserProfileService.deleteUser(req.params.id)
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