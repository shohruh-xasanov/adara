const Basket = require('../models/Basket')

exports.addBasket = async (req,res,next)=>{
    try {
        const {userID,productID} = req.body;
        const basket = new Basket({userID,productID})
        await basket.save()
        res.status(201).json({basket})
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

exports.getAll = async (req,res,next)=>{
    const basket = await Basket.find()
    res.status(200).json({basket})
}