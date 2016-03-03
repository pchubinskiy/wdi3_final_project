var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Last.ichecked' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Last.ichecked' });
});

module.exports = router;
