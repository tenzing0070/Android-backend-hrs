const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Feedback = require('../models/feedbacks');
const router = express.Router();

router.post('/feed', (req,res,next) => {
    Feedback.create({
        email:req.body.email,
        message:req.body.message
    }).then((feedback) => {
        let token = jwt.sign({_id:feedback._id}, process.env.SECRET);
        res.json({status: "Update Success", feedback:feedback._id, token: token});
    }).catch(next);

});

module.exports = router;
