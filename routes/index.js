var express = require('express');
var router = express.Router();

var homeRouter = require('./home');
var usersRouter = require('./users');
var dishRouter = require('./dishes');
var commentRouter = require('./comments')
const app = require('../app');

router.use('/users', usersRouter);
router.use('/dishes', dishRouter);
router.use('/dishes', commentRouter);
router.use('/', homeRouter);



module.exports = router;
