const User = require('../models/User')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const Type = require('../models/Type')

exports.register= async (req,res,next)=>{
    try {
        const {name,email,password} = req.body
        const uid = uuidv4()
    const user = new User({name,email,password,uuid:uid})
    await user.save()
    req.session.user = user;
    req.session.isAuth = true;
    req.session.save();
        res.status(201).redirect('/')
    } catch (error) {
        return res.redirect('/api/user/sign')
    }
}

exports.login = async (req,res,next)=>{
    const {email, password} = req.body
    if (!email || !password) {
      res.redirect("/api/user/sign");
    }
    await User.findOne({email}, (err,user)=>{
        if(err){
            return res.redirect("/api/user/sign");
        }
        if(!email){
        return res.redirect("/api/user/sign");
        }
        user.matchPassword(password, (err, isMatch)=>{
            if(err){
                res.redirect("/api/user/sign");
            }
            if (!isMatch) {
                res.status(404).redirect("/api/user/sign");
              }else{
                  req.session.user = user;
                  req.session.isAuth = true;
                  req.session.save()
                  res.redirect('/')
              }
        });
    })
}

exports.userLogin = async (req,res,next)=>{
    const user = req.session.user
    const type = await  Type.find()
    res.render('client/sign',{layout:"./client_layout",user,type})
}

exports.logout = async (req,res,next)=>{
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.redirect('/')
}

exports.getOne = async (req, res, next) => {
    const type = await Type.find()
  const user = await User.findById(req.params.id)
  res.render('client/account', {layout:'./client_layout',type, user})
}

exports.deleteUser = async (req, res, next) => {
    await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ success: true, data: [] });
  };

exports.updateOne = async (req,res,next)=>{
    const result = await User.findById(req.params.id)
    try {
         const {name,email,password, password1} = req.body;
         await User.findByIdAndUpdate({_id:req.params.id}, {name,email,password})
        .then(user=>{
            req.session.user = user
            req.session.save()
        })
        res.redirect('/')
    } catch (error) {
        return res.redirect(`/api/user/getme/${result._id}`)
    }
}
