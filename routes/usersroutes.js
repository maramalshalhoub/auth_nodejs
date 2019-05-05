const express = require('express')
const router = express.Router()

// const userrouter = "/user/new"

router.get('/', (req, res)=> {
 // res.send({ users : [] })
 res.render('users/index')
})


module.exports = router