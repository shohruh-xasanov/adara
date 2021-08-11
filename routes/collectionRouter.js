const router = require('express').Router()
const {createCollection, getAll,elementById,elemenDelete} = require('../controllers/collectionController')
const {isAdminAuth} = require('../middleware/auth')
router.post('/create', isAdminAuth, createCollection)
router.get('/all',isAdminAuth, getAll)
router.route('/:id')
    .get(isAdminAuth,elementById)
    .delete(isAdminAuth,elemenDelete)
module.exports = router