const router = require('express').Router()
const {createBrand,getAll} = require('../controllers/brandController')

router.post('/create',createBrand)
router.get('/all', getAll)

module.exports = router