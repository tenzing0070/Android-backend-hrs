const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const router = express.Router();
const auth = require('../auth');
router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            throw new Error('Could not hash!');
        }
        User.create({
           
            firstname: req.body.firstname,
            lastname:req.body.lastname,
            address:req.body.address,
            age:req.body.age,
            phone:req.body.phone,
            email:req.body.email,
            gender:req.body.gender,
            image:req.body.image,
            username: req.body.username,
            password: hash
            
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ status: "SignUp success", user: user._id, token: token });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: "Login Successful", token: token });
                    }).catch(next);
            }
        }).catch(next);
});


router.post('/adminLogin', (req, res, next) => {
    User.findOne({ username: req.body.username , admin:true})
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: "Login Successful", token: token });
                    }).catch(next);
            }
        }).catch(next);
});


router.get('/me', auth.verifyUser, (req, res, next) => {
    res.json({ _id: req.user._id,
        firstname: req.user.firstname,
        lastname:req.user.lastname,
        address:req.user.address ,
        age:req.user.age,
        phone: req.user.phone,
        email: req.user.email,
        gender:req.user.gender,
        username:req.user.username,
        password:req.user.password,
        image:req.user.image
     });
});


router.put('/me', auth.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            // res.json( {_id: user._id, fullname: req.user.fullname, username: req.user.username,  contact: user.contact, email: user.email, birthyear: user.birthyear, gender: user.gender });
        res.json(req.body);
        }).catch(next);
});


router.route('/userdetails')
.get((req,res,next) => {
    User.find({})
    .then((users) => {
        res.json(users);
    }).catch((err) => next(err));
});





module.exports = router;