const FAQ = require('../models/FAQ');


exports.createOne = async (req, res, next) => {
    const result = new FAQ({
        title: req.body.title,
        description: req.body.description
    })
    result.save() 
    .then(() => {
        res.redirect('/api/faq/all')
    })
    .catch((error) => {
        res.status(400).json({message: "Data is not created", data: error})
    })
}

exports.updateOne = async (req, res, next) => {
    const result = await FAQ.findByIdAndUpdate(req.params.id)
    result.title = req.body.title
    result.description = req.body.description

    result.save()
    .then(() => {
        res.redirect('/api/faq/all')
    })
    .catch((error) => {
        res.status(400).json({message: "Badly", data: error})
    })
}
exports.deleteOne = async (req, res, next) => {
    await FAQ.findByIdAndDelete({ _id: req.params.id });
    res.redirect('/api/faq/all')
}

exports.getItem = async (req, res,next ) => {
    const result = await FAQ.findById(req.params.id)
    const user = req.session.admin; // admin session
    res.render("./admin/faq/update", { layout: "./admin_layout", user, result});
}
exports.getItems = async (req, res,next ) => {
    const result = await FAQ.find()
    const user = req.session.admin; // admin session
res.render("./admin/faq/index", { layout: "./admin_layout", user, result});
}