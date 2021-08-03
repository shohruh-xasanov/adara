const Collection = require('../models/Collection')
const Product = require('../models/Products')
exports.createCollection = async (req,res,next)=>{
    try{
        
    const {nameuz,nameru, productID} = req.body
    const collection = new Collection({name:{uz:nameuz, ru:nameru}, productID})
    await collection.save()
    res.redirect('/api/collection/all')
    } catch{
        return res.status(500).json({msg:error.msg})
    }
}

exports.getAll = async (req,res,next)=>{
    const result = await Collection.find()
    const product = await Product.find()
    const user = req.session.admin
    res.render('admin/collection/index', {layout:'./admin_layout', user, product, result})
}

exports.elementById = async (req,res,next)=>{
    const collection = await Collection.findById(req.params.id)
    const user = req.session.admin
    res.render('admin/collection/update', {layout:'./admin_layout', user, collection})
}
exports.elemenDelete = async (req,res,next)=>{
    await Collection.findByIdAndDelete(req.params.id)
    res.redirect('/api/collection/all')
}
exports.elementUpdate = async (req,res,next)=>{
    const collection = await Collection.findByIdAndUpdate(req.params.id)
    collection.name.uz = req.body.nameuz
    collection.name.ru = req.body.nameru
    await collection.save()
    res.redirect('/api/collection/all')
}