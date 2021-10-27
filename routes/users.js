const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require("jsonwebtoken");
const config = require('../config/database')

const User = require('../models/user');

router.post('/register',(req,res,next)=>{
    let newUser = new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password
    })

    User.addUser(newUser,(err,user)=>{
        if(err){
            res.json({success:false,msg:'failed to regitser user'});
            console.log(err)
        }else{
            res.json({success:true,msg:'user registered'});
        }
    })
});

router.post('/authenticate',(req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    
    User.getUserbyUsername(name, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false,msg: 'User not found'});
        }
    User.comparePassword(password,user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
          const token = jwt.sign({data:user}, config.secret, {
              expiresIn: 604800 // 1 Week
          });
    
        res.json({
            success: true,
            token: 'JWT '+token,
            user: {
                id: user._id,
                name:user.name,
                email: user.email,
                phone:user.phone
            }
        });
        } else {
            return res.json({success: false, msg: 'Wrong password'});
        } 
        });
    });
});

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    //res.send('Profile');
    res.json({user:req.user});
   
});

// app.post('/profile', passport.authenticate('jwt', { session: false }),
//     function(req, res) {
//         res.send(req.user.profile);
//     }
// );

module.exports = router;