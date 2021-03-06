const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user');
const config = require('./database');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
opts.secretOrKey = config.secret;

module.exports = function(passport){
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    //console.log(jwt_payload)
    User.getUserbyId(jwt_payload.data._id, (err, user)=> {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}))
}
//User.findOne({id: jwt_payload.sub}, function(err, user)