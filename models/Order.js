const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    totalNum:{
        type:Number,
        required:true
    },
    order_id:{
        type:Number,
        required:true
    },
    products:[
        {
            productID:{
                type:mongoose.Schema.ObjectId,
                ref:'Product',
                required:true
            },
            productNum:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            color:{String},
            size:{String}
        }
    ],
    status:{
        type:String,
        enum:['active', 'noactive'],
        default:'noactive'
    },
    userID:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    process:{
        type:String,
        enum:['seen', 'unseen'],
        default:'unseen'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Order', orderSchema)