const User = require('../../models/User')
const Product = require('../../models/Products')
const Order = require('../../models/Order')

exports.dashboard = async (req, res, next) => {
  const product = await Product.find().countDocuments()
  const order = await Order.find().countDocuments()
  const orders = await Order.find()
  let totalSum =0
  let totalN = 0
  for(item of orders){
   totalSum += item.totalPrice
   totalN += item.totalNum
  }
  const user = req.session.admin; 
  const admins = await User.find({role:'admin'})
  res.render("./admin/dashboard", { layout: "./admin_layout",product,totalN,totalSum,order, user,admins});
};