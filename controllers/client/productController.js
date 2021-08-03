const Type = require('../../models/Type')
const Product = require('../../models/Products')
const Slider = require('../../models/Slider')
const Category = require('../../models/Category')

exports.productAll = async (req,res,next)=>{
    const type = await Type.find()
    const category = await Category.find({typeID:req.params.typeID})
    const slider = await Slider.find().sort({createdAt:-1})
    const result = await Product.find({typeID:req.params.typeID}).populate(['categoryID','colorID','brandID','typeID']).sort({createdAt:-1})
    res.render('client/shop-sidebar', {layout:'./client_layout', type, slider,category,result})
}