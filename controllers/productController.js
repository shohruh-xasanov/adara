const Product = require('../models/Products')
const sharp = require('sharp')
const Category = require('../models/Category')
const Color = require('../models/Color')
const fs = require('fs')
const path = require('path')


exports.addProduct = async (req,res,next)=>{
        const files = req.files;
        let urls = [];
        let orginal=`/public/uploads/org/${files[0].filename}`
        for(let i = 1; i < files.length; i++){
            const {filename} = files[i];
            await sharp(path.join(path.dirname(__dirname) + `/public/uploads/org/${filename}`) ).resize(500,500)
             .jpeg({
                    quality: 60
                })
                .toFile(path.join(path.dirname(__dirname) + `/public/uploads/thumb/${filename}`), (err)=>{
                    if(err) {
                        throw err
                    }
                    fs.unlink(path.join(path.dirname(__dirname) + `/public/uploads/org/${filename}`)  ,(error)=>{
                        if (error) res.send(error)
                    })
                })
            urls.push({
                url:`/public/uploads/thumb/${filename}`
            })
        }
        
        const product = new Product({
            name:{
                uz:req.body.nameuz,
                ru:req.body.nameru
            },
            typeID:req.body.typeID,
            description:{
                uz:req.body.descriptionuz,
                ru:req.body.descriptionru
            },
            poster:orginal,
            designerID:req.body.designerID,
            categoryID:req.body.categoryID,
            colorID:req.body.colorID,
            price:req.body.price,
            delverTime:req.body.delverTime,
            gender:req.body.gender,
            prev_payment:req.body.prev_payment,
            images:urls
        })
        await product.save()
        res.status(201).send(product)
}

exports.getAll = async (req,res,next)=>{
    const product = await Product.find()
    res.status(200).send(product)
}