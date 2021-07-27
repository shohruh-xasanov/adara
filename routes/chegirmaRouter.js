const router = require('express').Router()
const {addChegirma,getAll,deleteChegirma} = require('../controllers/chegirmaController')

router.post('/create', addChegirma)
router.get('/all', getAll)
router.delete('/delete', deleteChegirma)

module.exports = router