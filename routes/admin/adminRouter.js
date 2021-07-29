const {dashboard,login} = require('../../controllers/admin/index')
const router = require('express').Router()

router.post('/login', login)
router.get('/dashboard', dashboard)

module.exports = router