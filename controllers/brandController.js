const Brand = require('../models/Brand')

exports.createBrand = async (req,res,next)=>{
    const brand = new Brand({
        name:req.body.name
    })
    await brand.save()
    res.status(201).json({brand})
}

exports.getAll = async (req,res,next)=>{
    const all = await Brand.find()
    res.status(200).json({all})
}