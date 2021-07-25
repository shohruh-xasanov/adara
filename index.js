const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const store = require('./config/db').store
const connectDB = require('./config/db').connectDB
const layout = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const session = require('express-session')
const ejs = require('ejs')
const methodOverride = require('method-override')
const app = express()
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

app.use(cookieParser())
app.use(cors())
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(layout);

app.use('/', require('./routes/authRouter'))

app.listen(PORT, ()=>{
    console.log('Server is running to localhost')
})