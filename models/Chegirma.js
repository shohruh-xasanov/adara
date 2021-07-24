const mongoose = require('mongoose')
const chegirmaSchema = new mongoose.Schema({
    productID:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Chegirma', chegirmaSchema)