const express = require('express')
const router = express.Router()
const UserProfileController = require("../controllers/userProfileController")

router.get('/:id', UserProfileController.getUser)
router.put('/:id', UserProfileController.update)
router.get('/', UserProfileController.getUsers)
router.delete('/:id', UserProfileController.deleteUser)

module.exports = router