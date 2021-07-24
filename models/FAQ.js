const mongoose = require('mongoose');
const FAQ = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description: {
        type:String, required: true
    }
},{
    timestamps:true
})
module.exports = mongoose.model('FAQ', FAQ );

