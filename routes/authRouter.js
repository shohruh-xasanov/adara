const router = require('express').Router()
const {super_admin} = require('../controllers/authController')

router.post('/create', super_admin)

module.exports = router