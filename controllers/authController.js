const User = require('../models/User')
const { v4: uuidv4 } = require('uuid');

exports.super_admin = async (req,res,next)=>{
    try {
        const {fullName,email,password,uuid,role} = req.body
        const uid = uuidv4()
    const user = new User({fullName,email,password,uuid:uid,role})
    await user.save()
    req.session.admin = user;
    req.session.isAuth = true;
    req.session.save();
        res.status(201).json({ success: "Success", data: user });
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

exports.login = async (req,res,next)=>{
    const {email, password} = req.body
    if (!email || !password) {
      res.redirect("/admin/login");
    }
    await User.findOne({email}, (err,user)=>{
        if(err){
            return res.status(403).redirect("/admin/login");
        }
        if(!email){
        return res.status(404).redirect("/admin/login");
        }
        const isMatch = user.matchPassword(password);
        if (!isMatch) {
          res.status(404).redirect("/admin/login");
        }else{
            req.session.admin = user;
            req.session.isAuth = true;
            req.session.save()
            res.status(200).json(user)
        }
    })
}

exports.logout = async (req,res,next)=>{
    req.session.destroy();
    res.clearCookie("connectid.sid");
    res.redirect('/admin/login')
}

exports.getOne = async (req, res, next) => {
  const result = await User.findById(req.params.id)
  const user = req.session.admin; 
  res.render("./admin/profile/index", { layout: "./admin_layout",result, user });
}

exports.updateOne = async (req,res,next)=>{
    try {
        const {fullName,email,uuid,password,role} = req.body;
        await User.findById({_id:req.params.id}, {fullName,email,password,uuid,role})
        .save()
        .then(user=>{
            req.session.admin = user;
            req.session.save()
        })
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}