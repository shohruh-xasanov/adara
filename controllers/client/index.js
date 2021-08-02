const FAQ = require('../../models/FAQ')
const Basket = require('../../models/Basket')
const Brand = require('../../models/Brand')
const Category = require('../../models/Category')
const Product = require('../../models/Products')
const Slider = require('../../models/Slider');
const Type = require('../../models/Type')
const Chegirma = require('../../models/Chegirma')

exports.getAll = async (req,res,next)=>{
    const chegirma = await Product.find({chegirma: {$gt:0}})
    const category = await Category.find()
    const slider = await Slider.find().sort({date:-1})
    const brand = await Brand.find().sort({date:-1})
    const basket = await Basket.find().limit(4).sort({date:-1})
    const product = await Product.find().populate(['categoryID','colorID','brandID','typeID'])
    const {...men} = await product.filter(item=>item.gender==='man')
    const {...women} = await product.filter(item=>item.gender==='woman')
    const {...shoes} = await product.filter(item=>item.typeID.name.uz==='shoes')
    const {...clothing} = await product.filter(item=>item.typeID.name.uz==='clothing')
    const {...watching} = await product.filter(item=>item.typeID.name.uz==='watching')
    res.render('client/index',{layout:'./client_layout',category,product,chegirma,shoes,watching,clothing,slider,men,women,brand,basket})
}
exports.faq = async (req, res) => {
  const result = await FAQ.find()
  const user = req.session.user; // user session
  res.render("./client/faq", {title: "Hamroh", layout: "./client", user,result });
};

exports.contact = async (req, res) => {
  const user = req.session.user; // user session
  res.render("./client/contact", {title: "Hamroh", layout: "./client", user });
};

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


