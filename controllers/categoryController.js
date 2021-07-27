const Category = require('../models/Category')

exports.addCategory = async (req,res,next)=>{
    try {
        const category = new Cayegory({
            name: {
            uz: req.body.nameuz,
            ru: req.body.nameru
        }
        })
        await category.save()
        res.status(201).json({category})
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

exports.getAll = async (req,res,next)=>{
    const category = await Category.finf()
    res.status(200).json({category})
}

exports.getById = async (req,res) => {
    const category = await Category.findById(req.params.id)
    const user = req.session.admin; // admin session
    res.render("./admin/category/update", { layout: "./admin_layout", user, category});
}


exports.updateCategory = async (req,res) => {
    const category = await Category.findByIdAndUpdate(req.params.id)
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