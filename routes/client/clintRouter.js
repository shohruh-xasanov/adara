const router = require('express').Router()
const {getAll} = require('../../controllers/client/index')
const {isUserAuth} = require('../../middleware/auth')

router.get('/', getAll)

module.exports = router