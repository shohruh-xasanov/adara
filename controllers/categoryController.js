const Category = require('../models/Category')

exports.addCategory = async (req,res,next)=>{
    try {
        const category = new Category({
            name: {
            uz: req.body.nameuz,
            ru: req.body.nameru
        }
        })
        await category.save()
        res.redirect('/api/category/all')
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

exports.getAll = async (req,res,next)=>{
    const user = req.session.admin
    const category = await Category.find()
    res.render('admin/category/index',{layout:'./admin_layout', category,user})
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