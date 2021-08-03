const router = require('express').Router()
const {addChegirma,getAll,deleteChegirma} = require('../controllers/chegirmaController')
const {isAdminAuth} = require('../middleware/auth')
router.post('/create',isAdminAuth, addChegirma)
router.get('/all',isAdminAuth, getAll)
router.delete('/:id', isAdminAuth,deleteChegirma)

module.exports = router