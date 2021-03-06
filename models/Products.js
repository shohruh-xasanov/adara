const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        uz:{type:String, required:true},
        ru:{type:String, required:true}
    },
    typeID:{
        type:mongoose.Schema.ObjectId,
        ref:'Type',
        required:true
    },
    bestSeller_count:{
        type:Number,
        default:0
    },
    chegirma:{
        type:Number,
        default:0
    },
    size:{
        type:String,
    },
    description:{
        ru: { type: String, required: true },
        uz: { type: String, required: true },
    },
    poster:{
        type:String,
        required:true
    },
    brandID:{
        type:mongoose.Schema.ObjectId,
        ref:'Brand',
    },
    categoryID:{
            type:mongoose.Schema.ObjectId,
            ref: 'Category',
            required: true 
    },
    colorID:[{
        type:mongoose.Schema.ObjectId,
        ref:'Color'
    }],
    price: {
        type: Number,
         required: true
    },
    delverTime :
    {
        type: String, required:false
    },
    gender:{
        type:String,
        enum:['man', 'woman','0'],
        default:'0'
    },
    prev_payment: {
        type:Number,
        default:0
    },
    images:[
    { url: {
            type:String,
            required:true
        } }
    ]
},{
    timestamps:true
});

module.exports = mongoose.model('Product', productSchema)