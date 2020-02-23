const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstname:{
        type:String,
        require: true

    },
    lastname: {
        type: String,
        required: true
    },

    address: {
        type:String,
        required: true
    },

    age: {
        type:Number,
        required:true
    },

    phone: {
        type:Number,
        required: true,
        unique:true
    },

    email: {
        type:String,
        required: true,
        unique: true
    },

    gender: {
        type:String,
        required: true
    },

    username: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },

    admin: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('User', userSchema);