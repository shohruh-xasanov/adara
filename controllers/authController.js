const User = require('../models/User')
const { v4: uuidv4 } = require('uuid');

exports.super_admin = async (req,res,next)=>{
    try {
        const {fullName,phone,email,address,password,isActive,role} = req.body
        const uid = uuidv4()
    const user = new User({fullName,phone,email,address,password,isActive,uuid:uid,role})
    await user.save()
    req.session.admin = user;
    req.session.save();
    req.session.isAuth = true;
        res.status(201).json({ success: "Success", data: user });
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}