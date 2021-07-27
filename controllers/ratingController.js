const Rating = require('../models/Rating')

exports.createRating = async (req,res,next)=>{
    const rating = new Rating({
        rating:req.body.rating,
        productID:req.body.productID,
        userID:req.body.userID
    })
    await rating.save()
    res.status(201).json({rating})
}

exports.getAll = async (req,res,next)=>{
    const rating = await Rating()
    res.status(200).json({rating})
}