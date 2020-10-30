const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("./models/users");

exports.local = passport.use( new LocalStrategy( Users.authenticate()));

//support session for passport by using serializeUser
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());