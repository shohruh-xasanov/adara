const router = require('express').Router()
const {super_admin,adminLogin, login,getOne, updateOne, elementDelete, logout} = require('../controllers/authController')

router.post('/create', super_admin)
router.route('/login')
    .get(adminLogin)
    .post(login)
router.get('/logout', logout)
router.get('/getme/:id', getOne)
router.put('/update/:id', updateOne)
router.delete('/delete/:id', elementDelete)

module.exports = router