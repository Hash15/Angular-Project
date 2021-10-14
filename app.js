const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport');
const mongoose = require("mongoose");
const config = require("./config/database");
const session = require("express-session");


mongoose.connect(config.database);

mongoose.connection.on('Connected',()=>{
    console.log(`Connected to database ${config.database}`)
})

mongoose.connection.on('error',(err)=>{
    console.log(`Database error $ ${err}`)
})

const app = express();
const users = require("./routes/users");
const newUserRoutes = require('./routes/newUserRoutes')
const newUser = require("./models/newUsers");
const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname,'public')));

app.use(express.json());

app.use(passport.initialize());
//app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

app.use('/newusers',newUserRoutes);

app.get('/',(req,res)=>{
    res.send("Hello there!!");
})

app.listen(port,()=>{
    console.log(`Server strated on port ${port}`);
})