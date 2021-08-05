const Order = require('../models/Order')
const Slider = require('../models/Slider')

exports.getAll = async (req,res,next)=>{
    const slider = await Slider.find().sort({createdAt:-1}).limit(3)
    const user = req.session.user
    res.render('client/checkout',{layout:'./client_layout',slider, user})
}