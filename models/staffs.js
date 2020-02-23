const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({

    firstname:{
        type:String,
        require: true

    },
    lastname: {
        type: String,
        required: true
    },
    age: {
        type:Number,
        required:true
    },
    image: {
        type: String
    },
    gender: {
        type:String,
        required: true
    },
    price: {
        type:String,
        required: true
    } 
});

module.exports = mongoose.model('Staff', staffSchema);