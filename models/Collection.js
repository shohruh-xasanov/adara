const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema({
    name:{
        uz:{type:String, required:true},
        ru:{type:String, required:true}
    },
    productID:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Collection", collectionSchema)