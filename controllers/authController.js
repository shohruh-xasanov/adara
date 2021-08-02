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
        res.redirect('/api/admin/dashboard')
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

exports.login = async (req,res,next)=>{
    const {email, password} = req.body
    if (!email && !password) {
      res.redirect("/api/auth/login");
    }
    await User.findOne({email}, (err,user)=>{
        if(err){
            return res.status(403).redirect("/api/auth/login");
        }
        if(!email){
        return res.status(404).redirect("/api/auth/login");
        }
        user.matchPassword(password, (err, isMatch)=>{
            if(err){
               return res.redirect('/api/auth/login')
            }
            if (!isMatch) {
               return res.status(404).redirect('/api/auth/login')
              }else{
                  req.session.admin = user;
                  req.session.isAuth = true;
                  req.session.save()
                  res.redirect('/api/admin/dashboard')
              }
        });
    })
}

exports.logout = async (req,res,next)=>{
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.redirect('/api/auth//login')
}

exports.getOne = async (req, res, next) => {
  const result = await User.findById({_id:req.params.id})
  const user = req.session.admin; 
  res.render("admin/profile/index", { layout: "./admin_layout",result, user });
}

exports.elementDelete = async (req,res,next)=>{
    await User.findByIdAndDelete({_id:req.params.id})
    res.redirect('/api/admin/dashboard')
}

exports.adminLogin = async (req,res,next)=>{
    if(req.session.admin){
        res.redirect('/api/admin/dashboard')
    }if(req.session.user){
        res.redirect('/')
    }
    res.render('admin/login/index', {layout:false})
}

exports.updateOne = async (req,res,next)=>{
    try {
        const {fullName,email,uuid,password} = req.body;
        await User.findByIdAndUpdate({_id:req.params.id}, {fullName,email,password,uuid})
        .then(user=>{
            req.session.admin = user;
            req.session.save()
        })
        res.redirect('/api/admin/dashboard')
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}