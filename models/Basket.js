const mongoose = require('mongoose');
const basketSchema = mongoose.Schema({
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
module.exports = mongoose.model('Basket', basketSchema );

