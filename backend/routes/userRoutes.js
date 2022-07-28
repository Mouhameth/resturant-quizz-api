const router = require('express').Router()
const {registerUser,loginUser,getUsers,updateUser} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').post(registerUser).get(protect,getUsers).put(protect, updateUser)
router.route('/login').post(loginUser)

module.exports = router