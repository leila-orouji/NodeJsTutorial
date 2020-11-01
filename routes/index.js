var express = require('express');
var router = express.Router();
var homeRouter = require('./home');
var usersRouter = require('./users');
var homeRouter = require('./home');
var usersRouter = require('./users');
var dishRouter = require('./dishes');
var commentRouter = require('./comments');
var uploadRouter = require('./upload');
// const app = require('../app');




router.use('/', homeRouter);
router.use('/users', usersRouter);
router.use('/dishes', dishRouter);
router.use('/dishes', commentRouter);
router.use('/upload', uploadRouter);




module.exports = router;
