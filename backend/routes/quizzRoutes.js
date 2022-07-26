const router = require('express').Router()
const {getQuizz,setQuizz,updateQuizz,deleteQuizz} = require('../controllers/quizzController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(getQuizz).post(protect,setQuizz)
router.route('/:id').put(protect,updateQuizz).delete(protect,deleteQuizz)

module.exports = router