const Chegirma = require('../models/Chegirma')
const Product = require('../models/Products')

exports.addChegirma = async (req,res,next)=>{
    try {
        const result = new Chegirma({
            productID: req.body.productID,
            amount: req.body.amount,
          });
          const product = await Product.findByIdAndUpdate(result.productID);
          product.prev_payment = product.price 
          product.chegirma = result.amount
          product.price = result.amount
          product.save();
        
          await result.save()
          res.redirect('/api/chegirma/all')
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

exports.getAll = async (req,res,next)=>{
    const result = await Chegirma.find() 
        .populate({
        path: "productID",
        select: ["prev_payment", "price", "name"],
      })
      .sort({createdAt:-1})
    const user = req.session.admin
    const product = await Product.find()
    res.render('admin/chegirma/index',{layout:'./admin_layout', user, product, result})
}

exports.deleteChegirma = async (req,res,next)=>{
    const result = await Chegirma.findById({_id:req.params.id})
  .populate({
    path: "productID",
    select: ["prev_payment", "price", "title"],
  });
  const course = await Product.findByIdAndUpdate(result.productID._id);
  course.price = course.prev_payment 
  course.prev_payment = 0
  course.chegirma = 0
  course.save()
  await Chegirma.findByIdAndDelete({ _id: req.params.id })
  res.redirect('/api/chegirma/all')
}