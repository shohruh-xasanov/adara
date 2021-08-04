const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const store = require('./config/db').store
const connectDB = require('./config/db').connectDB
const layout = require('express-ejs-layouts')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const session = require('express-session')
const ejs = require('ejs')
const methodOverride = require('method-override')
const app = express()
const compression = require('compression')
connectDB()

app.use(
    session({
        secret: "this_is_session_secret_key_07565434546",
        saveUninitialized:false,
        resave:false,
        store:store,

        cookie:{
            httpOnly:true,
            maxAge:1000*60*60*24,
            sameSite:'strict'
        }
    })
)

app.use(bodyParser.json())
app.locals.moment = require("moment");
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method',{
    methods:['POST', 'GET']
}))
app.use(compression())
app.use(cookieParser())
app.use(cors())
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(layout);

app.use('/public',express.static('public'));
app.use(express.static(path.join(__dirname + "/public/admin1")))
app.use(express.static(path.join(__dirname + "/public/client")))

app.use('/', require('./routes/client/clintRouter'))
app.use('/product', require('./routes/client/productRouter'))


app.use('/api/admin', require('./routes/admin/adminRouter'))
app.use('/api/category', require('./routes/categoryRouter'))
app.use('/api/collection', require('./routes/collectionRouter'))
app.use('/api/brand', require('./routes/brandRouter'))
app.use('/api/type', require('./routes/typeRouter'))
app.use('/api/user', require('./routes/userRouter'));
app.use('/api/auth', require('./routes/authRouter'));
app.use('/api/product', require('./routes/productRouter'));
// app.use('/api/order', require('./routes/orderRouter'));
app.use('/api/faq', require('./routes/faqRouter'));
app.use('/api/color', require('./routes/colorRouter'));
app.use('/api/contact', require('./routes/contactRouter'));
app.use('/api/slider', require('./routes/sliderRouter'));
app.use('/api/comment', require('./routes/commitRouter'));
app.use('/api/chegirma', require('./routes/chegirmaRouter'));

app.listen(PORT, ()=>{
    console.log('Server is running to localhost')
})

app.get('/checkout', (req,res)=>{
    res.render('client/checkout',{layout:"./client_layout"})
})
app.get('/cart', (req,res)=>{
    res.render('client/cart',{layout:"./client_layout"})
})
app.get('/shop', (req,res)=>{
    res.render('client/shop',{layout:"./client_layout"})
})