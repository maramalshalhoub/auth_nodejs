const express = require('express')
const router = express.Router()

const passport = require('../helpers/passport')

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
  //  res.send({message: "user saved!", user: user})
    res.redirect('/users')
  })
  .catch(err => {
   console.log(err)
  })

})


router.get('/register',(req, res)=>{
  res.render('users/register')
})

router.get('/login',(req, res)=>{
  res.render('users/login')
})

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


module.exports = router