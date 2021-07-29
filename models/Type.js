const mongoose = require('mongoose')
const typeSchema = new mongoose.Schema({
    name:{
        uz:{type:String, required:true},
        ru:{type:String, required:true}
    },
},{
    timestamps:true
})

module.exports = mongoose.model('Type', typeSchema)