const FAQ = require('../../models/FAQ')

exports.index = async (req, res) => {
  const user = req.session.user; // user session
  res.render("./client/index", {title: "Hamroh", layout: "./client", user });
};

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


