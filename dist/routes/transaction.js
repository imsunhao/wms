
// TODO 业务处理

var express = require('express');
var router = express.Router();


/*Set routerParam*/
router.param('_id', function (req, res, next, id) {
    console.log('CALLED ONLY ONCE'+id);
    next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: '主页',
        user: req.session.user
    });
});

module.exports = router;