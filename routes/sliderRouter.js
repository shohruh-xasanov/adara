const express = require('express');
const router = express.Router()
const slider= require('../controllers/sliderController')
const upload = require('../middleware/fileUploads')
const {isAdminAuth} = require('../middleware/auth')
router.post('/add', isAdminAuth, upload.single('image'), slider.createOne)
router.get('/all',isAdminAuth, slider.getAll)
router.get('/:id',isAdminAuth, slider.getOne)
router.put('/:id',isAdminAuth,  upload.single('image'), slider.updateOne)
router.delete('/:id', isAdminAuth, slider.deleteOne)



module.exports = router