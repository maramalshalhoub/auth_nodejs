require('dotenv').config()
const PORT = process.env.PORT
const localDB = process.env.DB

const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')

const userRoutes = require('./routes/usersroutes')

mongoose.connect(localDB, {useNewUrlParser : true})
.then(()=> console.log('mongodb connected'),
(err) => console.log(err))

mongoose.set('useCreateIndex', true)

app.use(express.json())

app.set('view engine', 'ejs')
app.use(expressLayout)

app.use('/users', userRoutes)

app.get('*', (req, res)=> {
 res.send({ message : "oops! sorry"})
})


app.listen(PORT, ()=> console.log(`running on ${PORT}`))
