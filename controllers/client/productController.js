const Type = require('../../models/Type')
const Product = require('../../models/Products')
const Slider = require('../../models/Slider')
const Category = require('../../models/Category')
const Commit = require('../../models/Commit')
const Collection = require('../../models/Collection')

exports.productAll = async (req,res,next)=>{
    const user = req.session.user
    const element = req.params.name
    const type = await Type.findOne({"name.uz":element})
    const category = await Category.find({typeID:type._id})
    const bestSeller = await Product.find({bestSeller_count:{$gt: 0}}).sort({bestSeller_count:-1}).limit(4)
    const slider = await Slider.find().sort({createdAt:-1})
    const result = await Product.find({typeID:type._id}).populate(['categoryID','colorID','brandID','typeID']).sort({createdAt:-1})
    res.render('client/shop-sidebar', {layout:'./client_layout', user, slider,bestSeller,category,result})
}

exports.getProduct = async (req,res,next)=>{
    const user = req.session.user
    const result = await Product.findById(req.params.id).populate(['categoryID','colorID','brandID','typeID'])
    const bestSeller = await Product.find({bestSeller_count:{$gt: 0}}).sort({bestSeller_count:-1}).limit(5)
    const commit = await Commit.find({productID:result._id}).populate('userID')
    res.render('client/shop-details', {layout:'./client_layout', user,commit,bestSeller, result})
}

exports.getCollection = async (req,res,next)=>{
    const user = req.session.user
    const slider = await Slider.find().sort({createdAt:-1})
    const collection = await Collection.findById(req.params.id).populate({path:'productID',
    populate:[{path:'categoryID'},{path:'brandID'},{path:'typeID'}]})
    res.render('client/collection', {layout:"./client_layout", user,slider, collection})
}

exports.getCategory = async (req,res,next)=>{
    const{id} = req.params
    const user = req.session.user
    const result = await Product.find({categoryID:id})
    console.log(result)
    const bestSeller = await Product.find({bestSeller_count:{$gt: 0}}).sort({bestSeller_count:-1}).limit(4)
    const slider = await Slider.find().sort({createdAt:-1})
    res.render('client/category', {layout:'./client_layout', user, slider,bestSeller,category,result})
}