const router = require('express').Router()
const {super_admin, login,getOne, updateOne, logout} = require('../controllers/authController')

router.post('/create', super_admin)
router.post('/login', login)
router.get('/logout', logout)
router.get('/getme', getOne)
router.put('/update/:id', updateOne)

module.exports = router