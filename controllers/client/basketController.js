const Basket = require('../../models/Basket')
const Slider = require('../../models/Slider')
const Product = require('../../models/Products')

exports.createBasket = async (req,res,next)=>{
    try {
        const {userID, productID} = req.body
        const user = req.session.user
        const basket = new Basket({userID,productID})
        await basket.save()
        res.redirect(`/api/basket/${user._id}`)
    } catch (error) {
        return res.status('/')
    }
}
exports.getAll = async (req,res,next)=>{
    const id = req.params.id
    const slider = await Slider.find().sort({createdAt:-1}).limit(1)
    const user = req.session.user
    const basket = await Basket.find({userID:id}).sort({createdAt:-1}).populate('productID')
    res.render('client/cart',{layout:"./client_layout",user, slider,basket})  
}

exports.deleteBasket = async (req,res,next) =>{
    const user = req.session.user
    await Basket.findByIdAndDelete(req.params.id)
    res.redirect(`/api/basket/${user._id}`)
}