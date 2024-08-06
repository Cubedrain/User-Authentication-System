const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    id:{
        required:true,
        type:String
    },
    displayName:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
})

module.exports = mongoose.model('local users',userSchema)