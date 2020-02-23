const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Bookingdetails = require('../models/bookingdetails');
const router = express.Router();
const auth = require('../auth');


router.post('/booking', auth.verifyUser,(req, res, next) => {
    Bookingdetails.create({
        user:req.user._id,
        staffs: req.body.staffs,
        purpose: req.body.purpose,
        date: req.body.date,
        time: req.body.time,
        hours: req.body.hours,
        }).then((booking) => {
            res.json(booking);
        }).catch(next);
});

router.route('/myBookings')
.get((req,res,next) => {
    Bookingdetails.find({  })
    // Bookingdetails.find({ user: req.user._id })
    .populate('staffs')
    .populate('user')
    .then((booking) => {
    res.json(booking);
    }).catch((err) => next(err));
});

// router.route('/id')
// .delete((req,res,next) => {
//     Bookingdetails.findByIdAndDelete(req.params.id)
//     .then((booking) => {
//         res.json(booking);
//     }).catch((err) => next(err));
// });


module.exports = router;