const FAQ = require('../../models/FAQ')
const Basket = require('../../models/Basket')
const Brand = require('../../models/Brand')
const Category = require('../../models/Category')
const Product = require('../../models/Products')
const Slider = require('../../models/Slider');
const Type = require('../../models/Type')
const Chegirma = require('../../models/Chegirma')

exports.getAll = async (req,res)=>{
    const chegirma = await Product.find({chegirma: {$gt:0}}).sort({createdAt:-1})
    const type = await Type.find()
    const basket = await Basket.find().limit(4).sort({createdAt:-1})
    const product = await Product.find().populate(['categoryID','colorID','brandID','typeID']).sort({createdAt:-1})
    const {...men} = await product.filter(item=>item.gender==='man')
    const {...women} = await product.filter(item=>item.gender==='woman')
    const {...shoes} = await product.filter(item=>item.typeID.name.uz==='Shoes')
    const {...clothing} = await product.filter(item=>item.typeID.name.uz==='Clothing')
    res.render('client/index',{layout:'./client_layout',product,chegirma,shoes,clothing,type,men,women,basket})
}
exports.faq = async (req, res) => {
  const result = await FAQ.find()
  const user = req.session.user; // user session
  res.render("./client/faq", {title: "Hamroh", layout: "./client", user,result });
};

exports.about = async (req, res) => {
  const type = await Type.find()
  const slider = await Slider.find().sort({createdAt:-1})
  res.render('client/about-us',{layout:"./client_layout",slider,type});
};

exports.contact = async (req,res)=>{
  const slider = await Slider.find().sort({createdAt:-1})
  const type = await Type.find()
  res.render('client/contact',{layout:"./client_layout",slider,type})
}

exports.login = async (req, res) => {
  const user = req.session.user; // user session
  res.render("./client/login", {title: "Hamroh", layout: "./client", user });
};
exports.register = async (req, res) => {
  const user = req.session.user; // user session
  res.render("./client/register", {title: "Hamroh", layout: "./client", user });
};
exports.profil = async (req, res) => {
  const user = req.session.user; // user session
  res.render("./client/profil", {title: "Hamroh", layout: "./client", user });
};


