const router = require('express').Router()
const {createBrand,getAll,getElementById,elementDelete,updateType} = require('../controllers/typeController')
const {isAdminAuth} = require('../middleware/auth')
router.post('/create',isAdminAuth,createBrand)
router.get('/all',isAdminAuth, getAll)
router.route('/:id')
    .get(isAdminAuth,getElementById)
    .put(isAdminAuth,updateType)
    .delete(isAdminAuth,elementDelete)

module.exports = router