const {dashboard} = require('../../controllers/admin/index')
const router = require('express').Router()
const {isAdminAuth} = require('../../middleware/auth')
router.get('/dashboard',isAdminAuth, dashboard)

module.exports = router