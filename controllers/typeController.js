const Type = require('../models/Type')

exports.createType = async (req,res,next)=>{
    const type = new Type({
        name:req.body.name
    })
    await type.save()
    res.status(201).json({type})
}

exports.getAll = async (req,res,next)=>{
    const type = await Type.find()
    res.status(200).json({type})
}