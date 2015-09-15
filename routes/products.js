var express = require('express');
var router = express.Router();

// Set up a new product
router.get('/_new', function(req, res, next) {
  res.render('newproduct', { title: 'New Product' });
});


// Set up a new product
router.post('/', function(req, res, next) {
  console.log(req.body)
  res.send('respond with a resource');
});

module.exports = router;

