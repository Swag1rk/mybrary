if (process.env.NODE_ENV !== 'production') {

    require('dotenv').config();

}

const path=require("path")
const express = require('express')
const app = express()
const mongoose=require("mongoose")


//Route inititalization
const indexRouter= require("../routes/index")

var expressLayouts = require('express-ejs-layouts');

// views engine and directory
app.set("view-engine","ejs")
app.set('views', path.join(__dirname, '../views'))

app.set("layout","layout/layout")
app.use(expressLayouts);
app.use(express.static("public"))


mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true , useUnifiedTopology: true 
})
const db=mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>
    console.log("Connected to Mongoose")
)

app.use('/',indexRouter)
app.listen(process.env.PORT || 5000)


