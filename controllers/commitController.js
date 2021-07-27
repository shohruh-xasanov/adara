const Commit = require ('../models/Commit')
exports.addComment = async (req,res) => {
    const comment = new Commit({
        message: req.body.message,
        userID : req.body.userID,
        productID : req.body.productID
    }) ;
    await comment.save()
    .then(()=> {
        res.status(201).json({
            success : true,
            comment :comment
        })
    })
    .catch((error) => {
        res.send(error)
    })
}

exports.getComment = async (req,res) => {
    const comment = await Commit.find()
    .sort({data : -1})
    res.send(comment)
}

exports.getById = async (req,res) => {
    const comment = await Commit.findById(req.params.id)
    res.status(200).json({
        success : true,
        comment : comment
    }) 
}
 
exports.updateComment = async (req,res) => {
    const comment = await Commit.findByIdAndUpdate(req.params.id)
    comment.message = req.body.message 
    comment.userID = req.body.userID
    comment.productID = req.body.productID
    comment.save({validateBeforeSave:false})
    .then(() => {
        res.status(200).json({
            success:true ,
            data: comment
        })
    }) 
    .catch((err) => {
        res.status(500).json({
            success:false,
            err
        })
    })
}

exports.getByUserID = async(req,res) => {
    const result = await Commit.find({userID:req.params.userID})
    .sort({data:-1})
    res.status(200).json({
        success : true,
        data : result
    })
}

exports.getByProductID = async(req,res) => {
    const result = await Commit.find({productID:req.params.productID})
    .sort({data:-1})
    res.status(200).json({
        success : true,
        data : result
    })
}


exports.deleteComment = async(req,res) => {
    const comment =await Commit.findByIdAndDelete({_id: req.params.id})
    res.status (200).json({
        success : true ,
        comment: comment
    })
}