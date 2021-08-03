const Contact = require('../models/Contact');

exports.createOne = async (req, res, next) => {
        try {
       const result = new Contact({
            message: req.body.message,
            tel: req.body.tel,
            name: req.body.name,
            email:req.body.email,
            subject: req.body.subject
        })
        result.save()
        res.status(201).redirect('/contact')     
        } catch (error) {
              return res.status(500).redirect('/contact') 
        }
        
}
exports.deleteOne = async (req, res, next) => {
        await Contact.findByIdAndDelete({ _id: req.params.id });
        res.redirect('/api/contact/seen') 
} 
exports.Info = async (req, res,next ) => {
        const result = await Contact.findById({_id:req.params.id})
        const user = req.session.admin; // admin session
        res.render("./admin/contact/info", { layout: "./admin_layout", user, result});
}
exports.makeSeen = async (req, res,next ) => {
        const result = await Contact.findByIdAndUpdate({_id:req.params.id})
        result.process = "seen"
        result.save()
        const user = req.session.admin; // admin session
        res.redirect('/api/contact/unseen')
}
exports.Seen = async (req, res,next ) => {
        const result = await Contact.find({process: {$in: "seen"}})
        const user = req.session.admin; // admin session
        res.render("./admin/contact/seen", { layout: "./admin_layout", user, result});
}
exports.Unseen = async (req, res,next ) => {
        const result = await Contact.find({process: {$in: "unseen"}})
        const user = req.session.admin; // admin session
        res.render("./admin/contact/unseen", { layout: "./admin_layout", user, result});
}