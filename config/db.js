const mongoose = require('mongoose')
const session = require('express-session')
// const dbUri = 'mongodb://localhost:27017/blurb'
const dbUri = 'mongodb+srv://Shohruh:349672@cluster0.pelmz.mongodb.net/adara?retryWrites=true&w=majority'
const MongoDBSession = require("connect-mongodb-session")(session);
const connectDB = async ()=>{
    const conn = await mongoose.connect(dbUri,{
        useFindAndModify:false,
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true
    }); console.log(`MongoDB connected to ${conn.connection.host}`)
}
const store = MongoDBSession({
    uri:dbUri,
    collection:'mysession'
})

module.exports.connectDB = connectDB
module.exports.store = store