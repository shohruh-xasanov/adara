const mongoose = require('mongoose')
const ratingSchema = new mongoose.Schema({
    rating:{
        type:Number,
        enum:[1,2,3,4,5],
        required:[true, 'Please add a rating between 1 and 5']
    },
    productID:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true,
    },
    userID:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Rating', ratingSchema)