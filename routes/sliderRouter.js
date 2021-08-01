const express = require('express');
const router = express.Router()
const slider= require('../controllers/sliderController')
const upload = require('../middleware/fileUploads')
 
router.post('/add',  upload.single('image'), slider.createOne)
router.get('/all', slider.getAll)
router.get('/:id', slider.getOne)
router.put('/:id',  upload.single('image'), slider.updateOne)
router.delete('/:id',  slider.deleteOne)



module.exports = router