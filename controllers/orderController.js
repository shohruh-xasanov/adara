const Order = require('../models/Order')
const Slider = require('../models/Slider')
const Product = require('../models/Products')
const Basket = require('../models/Basket')


exports.orderCreate = async (req,res,next)=>{
    try {
            const {total_num,phone,user,uuid,product,color,address} = req.body
            let id = product.split(',')
            let arr=[]
            let totalP=0
            for(let i=0; i<id.length; i++){
             const {...prod}= await Product.find({_id:id[i]})
             bestSeller_count=parseInt(prod[0].bestSeller_count)+parseInt(total_num)
                await Product.findByIdAndUpdate({_id:id[i]},{bestSeller_count:bestSeller_count})
             totalP=prod[0].price+totalP
                arr.push({
                    productID:id[i],
                    price:prod[0].price,
                    size:prod[0].size,
                    productNum:total_num,
                    color:color
                })
            }
        const order = new Order({
            phone,address,totalPrice:totalP,
            totalNum:total_num,order_id:uuid,
            products:arr,
            userID:user
        })
        await order.save()
        res.redirect(`/api/basket/${user}`)
    } catch (error) {
        return res.status(500).json({msg:error.message})
        // new Error(message('order saqlanmadi'))
    }
}

exports.getProduct = async (req,res,next)=>{
    const product = await Product.findById({_id:req.params.id}).populate(['categoryID','colorID','brandID','typeID'])
    const slider = await Slider.find().sort({createdAt:-1})
    const user = req.session.user
    res.render('client/checkout', {layout:'./client_layout',slider,product,user})
}
exports.getBasket = async (req,res,next)=>{
    const id = req.params.id
    const user = req.session.user
    const product = await Basket.find({userID:id}).sort({createdAt:-1}).populate({path:'productID',
    populate:[{path:'categoryID'},{path:'brandID'},{path:'typeID'}]})
    const slider = await Slider.find().sort({createdAt:-1})
    res.render('client/basketChekout', {layout:'./client_layout',slider,product,user})
}

exports.getByNewOrder = async (req, res)=> {
    try{
        const orders = await Order.find(status === "noactive")
            .sort({date: -1})
        res.status(200).json(orders)
    }catch (e){
        res.status(400).json({message: "Data is not created", data: error})
    }
}



exports.getAllOrders = async (req,res) => {
    try{
        const order = await Order
            .find()
            .populate(['products.productID','products.categoryID', 'userID'])
            .sort({date: -1})
            const user = req.session.admin; // admin session
            res.render('./admin/order/index', {
                layout: "./admin_layout",
                order: order,
                user:user
            })
          //  res.json(orders)
    } catch (e) {
        res.status(400).json({message: "Data is not created", data: error})
    }
};


exports.updateOrder = async(req, res,next) => {

        const order = await Order.findByIdAndUpdate(req.params.id);

        order.status = 'active';

         await order.save({validateBeforeSave: false})
        .then(()=>{
            res.redirect('/api/order/all')
        })
        .catch((err)=>{
            res.status(400).json({message: "Badly", data: err})
        })
};

exports.getStatus = async (req, res)=> {
    let sum=0;
    try{
        const orders = await Order.find({status : "active"})
        res.status(200).json(orders.countDocuments())
    }catch (e){
        res.status(400).json({message: "Data is not created", data: error})
    }
}

exports.deleteOrder = async (req,res,next) => {
   await Order.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
          res.redirect('/api/order/seen')
         // res.send("uchdi")
        } else {
            res.status(400).json({message: "Data is not created", data: err})
        }
    });
}



exports.Info = async (req, res,next ) => {
    const result = await Order.findById(req.params.id)
    .populate(['products.productID','products.categoryID', 'userID'])
    const user = req.session.admin; // admin session
    res.render("./admin/order/info", { layout: "./admin_layout", user, result});
}
exports.makeSeen = async (req, res,next ) => {
    const result = await Order.findByIdAndUpdate(req.params.id)
    result.process = "seen"
    result.save()
    const user = req.session.admin; // admin session
    res.redirect('/api/order/unseen')
}
exports.Seen = async (req, res,next ) => {
    const result = await Order.find({process: {$in: "seen"}})
    .populate(['products.productID','products.categoryID', 'userID'])
    const user = req.session.admin; // admin session
    res.render("./admin/order/seen", { layout: "./admin_layout", user, result});
}
exports.Unseen = async (req, res,next ) => {
    const result = await Order.find({process: {$in: "unseen"}})
    .populate(['products.productID','products.categoryID', 'userID'])
    const user = req.session.admin; // admin session
    res.render("./admin/order/unseen", { layout: "./admin_layout", user, result});
  //res.json(result)
}