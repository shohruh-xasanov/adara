const router = require('express').Router()
const {createRating,getAll} = require('../controllers/ratingController')

router.post('/create', createRating)
router.get('/all', getAll)

module.exports = router