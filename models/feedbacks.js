const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true,
        unique:true
    },

    message: {
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema );