const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name:{
        type: String,
        required:true
    }, 
    email:{
        type:String,
        required: true,
        unique: true
    },
    age:{
        type: Number,
        required: true
    },
    contact:{
        type: Number,
        required: true,
        unique: true
    },

})

const User = mongoose.model('User', userSchema)

module.exports = User