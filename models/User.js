const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
 
const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    },
    email: {
        type:String,
        unique: true
    },
    address:{
        type:String,
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    isActive:{
        type:Boolean,
        default:false
    },
    uid:{
        type:Number,
        required:true,
        unique:true
    },
    role:{
        type:String,
        role:{type:String, enum:["admin", "user"], default:'user'},
    },
},{
    timestamps:true
})

// Encrypt password using bcrypt
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) {
        next()
    };
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
});

//  Match user entered password to hashed password in database
userSchema.methods.matchPassword = async (enteredPassword)=>{
    return await  bcrypt.compare( enteredPassword, this.password);
}