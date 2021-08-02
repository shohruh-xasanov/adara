const router = require('express').Router()
const {super_admin,adminLogin, login,getOne, updateOne, elementDelete, logout} = require('../controllers/authController')
const {isAdminAuth} = require('../middleware/auth')
router.post('/create',isAdminAuth, super_admin)
router.route('/login')
    .get(adminLogin)
    .post(login)
router.get('/logout', logout)
router.get('/getme/:id',isAdminAuth, getOne)
router.put('/update/:id',isAdminAuth, updateOne)
router.delete('/delete/:id', isAdminAuth,elementDelete)

module.exports = router