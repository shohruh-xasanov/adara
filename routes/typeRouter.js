const router = require('express').Router()
const {createType, getAll} = require('../controllers/typeController')

router.post('/create', createType)
router.get('/add', getAll)

module.exports = router