const express = require('express')
const router = express.Router()

const passport = require('../helpers/passport')
const User = require('../models/user')


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }else{
    res.redirect('/users/login')
  }
}

router.get('/', (req, res)=> {
 User.find()
 .then(users => {
  res.send({ users : users })
 }).catch(err => console.log(err))
 // res.send({ users : [] })
 // res.render('users/index')
})

router.get('/profile', isLoggedIn, (req, res)=>{
  console.log(req.user)
  res.send("you are in!")
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
  passport.authenticate('local', 
    { 
      successRedirect : '/users/profile',
      failureRedirect: '/users/login' 
    }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', (req, res)=>{
  req.logout()
  res.redirect('/users/login')
})

module.exports = router