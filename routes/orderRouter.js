const router = require('express').Router()
const {getProduct,orderCreate,getByNewOrder,
    getAllOrders,updateOrder,
    getStatus,deleteOrder,
    Info,makeSeen,
    Seen,Unseen,getBasket} = require('../controllers/orderController')

router.post('/create', orderCreate)
router.get('/all', getAllOrders)
router.get('/new-orders',getByNewOrder)
router.get('/product/:id', getProduct)
router.get('/status', getStatus)
router.get('/unseen', Unseen)
router.delete('/:id',deleteOrder);
router.get('/seen', Seen)
router.get('/info/:id', Info)
router.put('/:id',updateOrder)
router.put('/makeSeen/:id', makeSeen)
router.get('/all/:id',getBasket)

module.exports = router