const express = require('express');
const router = express.Router()
const {createOne, getItem, getItems, updateOne, deleteOne} = require('../controllers/colorController')
const {isAdminAuth} = require('../middleware/auth')
router.post('/create',isAdminAuth, createOne)
router.get('/all',isAdminAuth,getItems)
router.get('/:id',isAdminAuth,getItem)
router.put('/:id',isAdminAuth,updateOne)
router.delete('/:id',isAdminAuth,deleteOne)


module.exports = router 