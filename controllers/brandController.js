const Brand = require('../models/Brand')

exports.createBrand = async (req,res,next)=>{
    try {
        const brand = new Brand({
            name: {
                uz:req.body.nameuz,
                ru:req.body.nameru
            }
        })
        await brand.save()
        res.redirect('/api/brand/all')
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

exports.getAll = async (req,res,next)=>{
    const brand = await Brand.find()
    const user = req.session.admin
    res.render('admin/brand/index', {layout:'./admin_layout',user, brand})
}
exports.getElementById = async (req,res,next)=>{
    const brand = await Brand.findById({_id:req.params.id})
    const user = req.session.admin
    res.render('admin/brand/update', {layout:'./admin_layout',user, brand})
}

exports.elementDelete = async (req,res,next)=>{
    await Brand.findByIdAndDelete({_id:req.params.id})
    res.redirect('/api/brand/all')
}


exports.updateBrand = async (req,res) => {
    const brand = await Brand.findByIdAndUpdate({_id:req.params.id})
    brand.name.uz = req.body.nameuz
    brand.name.ru = req.body.nameru
    brand.save({validateBeforeSave:false})
    .then(() => {
        res.redirect('/api/brand/all')
    }) 
    .catch((err) => {
        res.status(400).json({message: "Badly", data: error})
    })
}