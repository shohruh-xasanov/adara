const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    name:{
        uz:{type:String, required:true},
        ru:{type:String, required:true}
    },
    typeID:{
        type:mongoose.Schema.ObjectId,
        ref:'Type',
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Category', categorySchema)