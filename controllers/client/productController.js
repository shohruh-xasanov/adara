const Type = require('../../models/Type')
const Product = require('../../models/Products')
const Slider = require('../../models/Slider')
const Category = require('../../models/Category')

exports.productAll = async (req,res,next)=>{
    const user = req.session.user
    const element = req.params.name
    const type = await Type.findOne({"name.uz":element})
    const category = await Category.find({typeID:type._id})
    const slider = await Slider.find().sort({createdAt:-1})
    const result = await Product.find({typeID:type._id}).populate(['categoryID','colorID','brandID','typeID']).sort({createdAt:-1})
    res.render('client/shop-sidebar', {layout:'./client_layout', user, slider,category,result})
}

exports.getProduct = async (req,res,next)=>{
    const user = req.session.user
    const result = await Product.findById(req.params.id).populate(['categoryID','colorID','brandID','typeID'])
    const slider = await Slider.find().sort({createdAt:-1})
    res.render('client/shop-details', {layout:'./client_layout', user,slider, result})
}