const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

let UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:'name is required'
    },
    email:{
        type:String,
        required:'Email is required'
    },
    phone:{
        type:Number,
        required:'Phone is required'
    },
    password:{
        type:String,
        required:'Password is required',
    }
});

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserbyId = function(id,callback){
    User.findById(id,callback);
}

module.exports.getUserbyUsername = function(name,callback){
    const query = {name:name};
    User.findOne(query,callback);
}

module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch);
    })
}