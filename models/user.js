const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstname : String,
  lastname : String,
  username : { type: String, unique : true, required: true},
  password : { type: String, required: true},
  email : { type: String, unique : true, required: true},
  pets : [{ type: Schema.Types.ObjectId, ref : 'Pet'}]
},{timestamps : true})

const User = mongoose.model('User', userSchema)

module.exports = User
