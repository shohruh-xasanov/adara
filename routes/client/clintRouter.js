const router = require('express').Router()
const {getAll,about,contact} = require('../../controllers/client/index')
const {isUserAuth} = require('../../middleware/auth')

router.get('/', getAll)
router.get('/contact', contact)
router.get('/about', about)

module.exports = router