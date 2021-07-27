const router = require('express').Router()
const {addCategory, getAll} = require('../controllers/categoryController')

router.post('/create', addCategory)
router.get('/all',getAll)
module.exports = router