const router = require('express').Router()
const {register, login,getOne,deleteUser, updateOne, logout} = require('../controllers/userController')

router.post('/create', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/getme', getOne)
router.put('/update/:id', updateOne)
router.delete('/delete/:id', deleteUser)
module.exports = router