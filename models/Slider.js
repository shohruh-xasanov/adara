const mongoose = require('mongoose')
const sliderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Slider', sliderSchema)