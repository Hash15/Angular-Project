const express = require("express");
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const newUser = require('../models/newUsers');

router.get('/',(req,res)=>{
    newUser.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Error occured:'+JSON.stringify(err,undefined,2));
        }
    })
})

router.post('/',(req,res)=>{
    let usr = new newUser({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone
    });
    usr.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error occured in saving data:'+JSON.stringify(err,undefined,2));
        }
    })
});

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No records with given id ${req.params.id}`);
    }

        let usr = {
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone
        };
        newUser.findByIdAndUpdate(req.params.id,{$set:usr},{new:true},(err,doc)=>{
            if(!err){
                res.send(doc)
            }else{
                console.log('Error occured in update:'+JSON.stringify(err,undefined,2));
            }
        })
})

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No records with given id ${req.params.id}`);
    }

    newUser.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc)
        }else{
           console.log('Error occured in delete:'+JSON.stringify(err,undefined,2));
        }
    })
})

module.exports = router;