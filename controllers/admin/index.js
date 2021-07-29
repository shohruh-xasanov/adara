const User = require('../../models/User')

exports.dashboard = async (req, res, next) => {
  const user = req.session.admin; 
  const admins = await User.find({role:'admin'})
  res.render("./admin/dashboard", { layout: "./admin_layout", user,admins});
};
exports.login = async (req, res, next) => {
  res.render("./admin/login/index", { layout: "./admin/login/layout" });
};
