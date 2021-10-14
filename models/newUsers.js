const mongoose = require("mongoose");

let newUserSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:Number,
    }
});
module.exports = mongoose.model('newuser',newUserSchema);