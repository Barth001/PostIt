const express = require('express')
const router = express.Router()
const UserProfileController = require("../controllers/userProfileController")
const Authorization = require("../middleware/authorization")

router.get('/:id', Authorization.authorize, UserProfileController.getUser)
router.put('/:id', Authorization.authorize, UserProfileController.update)
router.get('/', Authorization.authorize, UserProfileController.getUsers)
router.delete('/:id', Authorization.authorize, UserProfileController.deleteUser)
router.get('/handle/:username', Authorization.authorize, UserProfileController.getByUsername)

module.exports = router