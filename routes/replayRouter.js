const router = require('express').Router()
const {createReplay, getAll} = require('../controllers/replayController')
router.post('/create', createReplay)
router.get('/all', getAll)

module.exports = router