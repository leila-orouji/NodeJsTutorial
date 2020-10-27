const express = require('express')
const homeRouter = express.Router()

/* GET home page. */
homeRouter.get('/', function(req, res, next) {
    res.render('home', { title: 'Express' });
  });

module.exports = homeRouter;