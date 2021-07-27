const Replay = require('../models/Replay')

exports.createReplay = async (req,res,next)=>{
    const replay = new Replay({
        message:req.body.message,
        userID:req.body.userID,
        commentID:req.body.commentID
    })
    await replay.save()
    res.status(201).json({replay})
}

exports.getAll = async (req,res,next)=>{
    const replay = await Replay.find()
    res.status(200).json({replay})
}