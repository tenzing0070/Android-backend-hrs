const express = require('express');
const Staff = require('../models/staffs');
const router = express.Router();

router.route('/postStaff')
.post((req,res,next) => {
    let staff = new Staff(req.body);
    staff.save()
    .then((staff) => {
        res.statusCode = 201;
        res.json(staff);
    }).catch(next);
});

    router.route('/staffdetails')
    .get((req,res,next) => {
        Staff.find({})
        .then((staffs) => {
            res.json(staffs);
        }).catch((err) => next(err));
    });

    router.route('/staffdetails/:id')
    .get((req,res,next) => {
        Staff.findById(req.params.id)
        .then((staffs) => {
            res.json(staffs);
        }).catch((err) => next(err));
    });
    
    router.route('/staffdetails/:id')
    .put((req,res,next)=>{
        Staff.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true})
        .then((staffs)=>{
            res.json(staffs);
   
        })
        .catch((err)=> next(err));
    })
    

    router.route('/staffdetails/:id')
    .delete((req, res, next) => {
        Staff.findByIdAndDelete(req.params.id)
        .then((staffs)=>{
            res.json(staffs);
        })
        .catch((err)=> next(err));
    });


    router.put('/:id', (req, res, next)=>{
    bookstaff={
        booked_by:req.user,
        booking_status:true,
        purpose:req.body.purpose
    }
        Staff.findByIdAndUpdate(req.params.id, {$set:bookstaff}, {new:true})
        .then((reply)=>{
            if(reply==null) throw new Error("staffs not found");
            res.json(reply);
        }).catch(next);
    });


module.exports = router;