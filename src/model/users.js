const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:6,
    },
    fullName:{
        type:String,
        required: false,
    },
    email:{
        type:String,
        required:true,
        min:8
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    phoneNumber:{
        type:Number,
        required:true,
        min:8,
    },
    alamat:{
        type:String,
    }
},{ timestamps : true})

module.exports = mongoose.model("User", User)
