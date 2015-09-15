var express = require('express');
var router = express.Router();
var app = express();
var db = app.get('db');

var productAttributes = [ 
    { label: 'Name', name: 'name' },
    { label: 'Description', name: 'description' },
    { label: 'Dimensions', name: 'dimensions' }
];

// Find products
router.get('/', function(req, res, next) {
  if(!req.query.q) {
    res.render('products', {
      tab: 'products',
      title: 'Find Products'
    });
  } else {
    req.app.get('db').product.searchDoc({
      keys: productAttributes.map(function(v) { return v.name }),
      term: req.query.q
    }, function(err,docs) {
      console.log(err);
      console.log(docs);
      res.render('products', { 
        tab: 'products', 
        title: 'Find Products',
        q: req.query.q,
        attributes: productAttributes,
        results: docs 
      });
    });
  }
});

// Render new product page
router.get('/_new', function(req, res, next) {
  res.render('new-product', { 
    tab: 'new-product', 
    title: 'New Product', 
    attributes: productAttributes
  });
});

// Show product detail
router.get('/:id', function(req,res,next) {
  req.app.get('db').product.findDoc(parseInt(req.params.id), function(err,result) {
    if(err) {
      console.log("Error finding product "+req.params.id+" in database: "+err);
      res.sendStatus(500);
    } else {
      res.render('product-detail', {
        tab: 'products',
        title: 'Product: '+result.name,
        product: result,
        attributes: productAttributes 
      })
    }
  });

});


// Create a new product
router.post('/', function(req, res, next) {
  req.app.get('db').saveDoc("product",req.body, function(err,result) {
    if(err) {
        console.log(err);
        res.sendStatus(500);
    } else {
        console.log("Saved: "+req.body);
        console.log("Response: "+JSON.stringify(result));
        console.log("Redirecting to /products/"+result.id)
        res.redirect("/products/"+result.id);
    }
  })
});

module.exports = router;

