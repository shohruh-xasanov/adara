const Product = require('../models/Products')
const Slider = require('../models/Slider')

exports.searchProduct = async(req,res)=>{
    let searchExpression_name = new RegExp(req.query.name)
    const result = await Product.find().or([
        {['name.uz']:{ $regex: searchExpression_name, $options: 'i'}},
        {['name.ru']:{ $regex: searchExpression_name, $options: 'i'}},
        {['description.uz']:{ $regex: searchExpression_name, $options: 'i'}},
        {['description.ru']:{ $regex: searchExpression_name, $options: 'i'}},
    ]);
    const user = req.session.user
    const slider = await Slider.find().sort({createdAt:-1})
    res.render("client/search", {
        layout: "./client_layout",
        result,user,slider
      });
}