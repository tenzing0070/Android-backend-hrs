const mongoose = require('mongoose');

const bookingdetailsSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    staffs:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Staff'
    },
    purpose:{
        type: String,
        required: true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    hours:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Bookingdetails', bookingdetailsSchema);