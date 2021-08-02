const User = require('../../models/User')

exports.dashboard = async (req, res, next) => {
  const user = req.session.admin; 
  const admins = await User.find({role:'admin'})
  res.render("./admin/dashboard", { layout: "./admin_layout", user,admins});
};