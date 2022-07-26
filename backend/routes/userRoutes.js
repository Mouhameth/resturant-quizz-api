const router = require('express').Router()
const {registerUser,loginUser,getUsers} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').post(registerUser).get(protect,getUsers)
router.route('/login').post(loginUser)

module.exports = router