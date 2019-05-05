const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10

const userSchema = new Schema({
  firstname : String,
  lastname : String,
  username : { type: String, unique : true, required: true},
  password : { type: String, required: true},
  email : { type: String, unique : true, required: true},
  pets : [{ type: Schema.Types.ObjectId, ref : 'Pet'}]
},{timestamps : true})


userSchema.pre('save', function(next){
 let user = this

  if(user.password && user.isModified()){
   bcrypt.hash(user.password, saltRounds).then( hash =>{
    user.password = hash
    next()
   }).catch(err => console.log(err))
 }
})

const User = mongoose.model('User', userSchema)
module.exports = User
