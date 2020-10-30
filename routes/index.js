var express = require('express');
var router = express.Router();


var dishRouter = require('./dishes');
var commentRouter = require('./comments')
const app = require('../app');

// var homeRouter = require('./home');
// var usersRouter = require('./users');
// router.use('/', homeRouter);
// router.use('/users', usersRouter);
router.use('/dishes', dishRouter);
router.use('/dishes', commentRouter);




module.exports = router;
