const mongoose = require('mongoose')
const commitSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    userID:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    productID:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Commit', commitSchema)