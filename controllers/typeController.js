const Type = require('../models/Type')

exports.createBrand = async (req,res,next)=>{
    try {
        const type = new Type({
            name: {
                uz:req.body.nameuz,
                ru:req.body.nameru
            }
        })
        await type.save()
        res.redirect('/api/brand/all')
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

exports.getAll = async (req,res,next)=>{
    const type = await Type.find()
    const user = req.session.admin
    res.render('admin/type/index', {layout:'./admin_layout',user, type})
}
exports.getElementById = async (req,res,next)=>{
    const type = await Type.findById({_id:req.params.id})
    const user = req.session.admin
    res.render('admin/type/update', {layout:'./admin_layout',user, type})
}

exports.elementDelete = async (req,res,next)=>{
    await Type.findByIdAndDelete({_id:req.params.id})
    res.redirect('/api/type/all')
}


exports.updateType = async (req,res) => {
    const type = await Type.findByIdAndUpdate({_id:req.params.id})
    type.name.uz = req.body.nameuz
    type.name.ru = req.body.nameru
    type.save({validateBeforeSave:false})
    .then(() => {
        res.redirect('/api/type/all')
    }) 
    .catch((err) => {
        res.status(400).json({message: "Badly", data: error})
    })
}