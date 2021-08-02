const express = require('express');
const router = express.Router()
const {
createOne,
Unseen,
Seen,
Info,
makeSeen,
deleteOne,
} = require('../controllers/contactController')
const {isAdminAuth} = require('../middleware/auth')
router.post('/add', createOne)
router.get('/unseen',isAdminAuth,Unseen)
router.get('/seen',isAdminAuth,Seen)
router.get('/:id',isAdminAuth,Info)
router.put('/:id',isAdminAuth,makeSeen)
router.delete('/:id',isAdminAuth,deleteOne)


module.exports = router 