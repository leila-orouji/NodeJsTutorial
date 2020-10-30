var express = require('express');
const bodyparser = require('body-parser')
var router = express.Router();
const User = require('../models/users');
router.use(bodyparser.json());
const passport = require("passport");


/* GET users listing. */

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
})

router.post('/signup',  (req, res, next) => {
    User.register(new User({
      username: req.body.username
    }),
      req.body.password,
      (err, user) => {
        if (err) {
          err.status = 500;
          next(err);
        }
        else{
          passport.authenticate('local')(req, res, ()=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Success'})
          })
        }
        // if (user) {
        //   let err = new Error('user name is alredy exist');
        //   err.status = 403 // forbiden 
        //   next(err)
        // }

        // // save anf sing in 
        // let { username, password } = req.body
        // await User.create({
        //   username,
        //   password
        // })
        // return res.redirect('/users')
      })
})

router.post('/login', passport.authenticate('local'), (req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, status: 'You are successfully logged'});

  // try {

  //   if (!req.session.user) {

  //     var authHeader = req.headers.authorization;


  //     if (!authHeader) {
  //       var err = new Error('you are not authenticated!');

  //       res.setHeader('www-Authenticate', 'Basic');
  //       err.status = 401;
  //       return next(err)
  //     }
  //     // auth should be array contain username and password
  //     var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':') // patern for authenticate in header => Basic username:password
  //     var username = auth[0];
  //     var password = auth[1];

  //     let user = await User.findOne({ username: username });
  //     if (!user) {
  //       var err = new Error('information invalid !');
  //       err.status = 403;
  //       return next(err)
  //     } else if (user.password !== password) {
  //       var err = new Error('information invalid !');
  //       err.status = 403;
  //       return next(err)
  //     }
  //     else if (user.username === 'admin' && user.password === password) {
  //       req.session.user = 'authenticated'
  //       res.statusCode = 200;
  //       res.json(user)
  //     }


  //   }
  //   else {
  //     // user alredy set cookie
  //     res.statusCode = 200;
  //     res.setHeader('Content-Type', 'text/plain')
  //     res.end('you are alredy authenticated')
  //   }

  // } catch (error) {
  //   next(error)
  // }
})

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy(); // remove information from server side
    res.clearCookie('remember me')// remove cookie from UI
    res.redirect('/')
  }
  else {
    let err = new Error(' you are not logged in !')
    err.status = 403;
    next(err)
  }

})


module.exports = router;


