const User = require('../models/User')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')

exports.register= async (req,res,next)=>{
    try {
        const {fullName,email,password,phone,uuid,role} = req.body
        const uid = uuidv4()
    const user = new User({fullName,email,password,phone,address,uuid:uid,role})
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
            return res.status(403).json({msg:err.message})
        }
        if(!email){
        return res.status(404).json({msg:"Bunaqa foydalanuvchi mavjud emas"})
        }
        user.matchPassword(password, (err, isMatch)=>{
            if(err) throw err;
            if (!isMatch) {
                res.status(404).json({msg:"Password xato"})
              }else{
                  req.session.admin = user;
                  req.session.isAuth = true;
                  req.session.save()
                  res.status(200).json(user)
              }
        });
    })
}

exports.logout = async (req,res,next)=>{
    req.session.destroy();
    res.clearCookie("connectid.sid");
    res.redirect('/user/login')
}

exports.getOne = async (req, res, next) => {
  const result = await User.findById(req.params.id)
  const user = req.session.admin; 
  res.status(200).json({result,user})
}

exports.deleteUser = async (req, res, next) => {
    await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ success: true, data: [] });
  };

exports.updateOne = async (req,res,next)=>{
    try {
        const {fullName,email,password,phone,addressrole} = req.body;
        await User.findById({_id:req.params.id}, {fullName,email,password,phone,addressrole})
        .save()
        .then(user=>{
            req.session.admin = user;
            req.session.save()
        })
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}
