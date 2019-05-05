require('dotenv').config()
const PORT = process.env.PORT
const localDB = process.env.DB

const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')

const userRoutes = require('./routes/usersroutes')

mongoose.connect(localDB, {useNewUrlParser : true})
.then(()=> console.log('mongodb connected'),
(err) => console.log(err))

mongoose.set('useCreateIndex', true)

app.use(express.urlencoded({ extended : false}))//for form data
app.use(express.json())// for json data
app.set('view engine', 'ejs')
app.use(expressLayout)

app.use(session({
 secret : process.env.SESSION_SECRET,
 resave: false,
 saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())


app.use('/users', userRoutes)

app.get('*', (req, res)=> {
 res.send({ message : "oops! sorry"})
})


app.listen(PORT, ()=> console.log(`running on ${PORT}`))
