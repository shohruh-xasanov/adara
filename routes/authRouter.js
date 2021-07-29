const router = require('express').Router()
const {super_admin, login,getOne, updateOne, elementDelete, logout} = require('../controllers/authController')

router.post('/create', super_admin)
router.post('/login', login)
router.get('/logout', logout)
router.get('/getme/:id', getOne)
router.put('/update/:id', updateOne)
router.delete('/delete/:id', elementDelete)

module.exports = router