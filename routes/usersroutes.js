const express = require('express')
const router = express.Router()


const User = require('../models/user')

router.get('/', (req, res)=> {
 User.find()
 .then(users => {
  res.send({ users : users })
 }).catch(err => console.log(err))
 // res.send({ users : [] })
 // res.render('users/index')
})

router.post('/register',(req, res)=> {
  let user = new User(req.body)

  user.save()
  .then(() => {
   res.send({message: "user saved!", user: user})
  })
  .catch(err => {
   console.log(err)
  })

})


module.exports = router