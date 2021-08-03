const Category = require('../models/Category')
const Type = require('../models/Type')

exports.addCategory = async (req,res,next)=>{
    try {
        const category = new Category({
            name: {
            uz: req.body.nameuz,
            ru: req.body.nameru
        },
            typeID:req.body.typeID
        })
        await category.save()
        res.redirect('/api/category/all')
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

exports.getAll = async (req,res,next)=>{
    const user = req.session.admin
    const type = await Type.find()
    const category = await Category.find().populate('typeID').sort({createdAt:-1})
    res.render('admin/category/index',{layout:'./admin_layout', type,category,user})
}

exports.getById = async (req,res,next) => {
    const category = await Category.findById({_id:req.params.id})
    const user = req.session.admin; // admin session
    res.render("./admin/category/update", { layout: "./admin_layout", user, category});
}
exports.elemntDelete = async (req,res,next) => {
    await Category.findByIdAndDelete({_id:req.params.id})
    res.redirect('/api/category/all')
}



exports.updateCategory = async (req,res) => {
    const category = await Category.findByIdAndUpdate({_id:req.params.id})
    category.name.uz = req.body.nameuz
    category.name.ru = req.body.nameru
    category.save({validateBeforeSave:false})
    .then(() => {
        res.redirect('/api/category/all')
    }) 
    .catch((err) => {
        res.status(400).json({message: "Badly", data: error})
    })
}