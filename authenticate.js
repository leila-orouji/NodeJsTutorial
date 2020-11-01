const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("./models/users");
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const config = require('./config/index');

exports.local = passport.use( new LocalStrategy( Users.authenticate()));

//support session for passport by using serializeUser
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

exports.getToken = function (user){
    return jwt.sign(user, 
        config.secretKey, 
        {expiresIn: 3600}
    );
}

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use( new JWTStrategy(
                                                     opts,
                                                     (jwt_payload, done)=>{
                                                        console.log("jwt_payload: ",jwt_payload);
                                                        Users.findOne({ 
                                                            _id: jwt_payload._id},
                                                           (err, user)=>{
                                                               if(err){
                                                                   return done(err, false); // needs3 parameters: 1-have an error, 2- whether user exist 3- extra information
                                                               }
                                                               else if (user){
                                                                   return done(null, user);
                                                               }
                                                               else{
                                                                   return done(null, false)
                                                               }
                                                        })
                                                     }));
exports.verifyUser = passport.authenticate('jwt', {session: false}); // applicatoins dont support session