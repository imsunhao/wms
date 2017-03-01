
// TODO 关于我们

var express = require('express');
var router = express.Router();

router.param('_id', function (req, res, next, id) {
    console.log('CALLED ONLY ONCE'+id);
    next();
});

/* GET about page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: '主页',
        user: req.session.user
    });
});


module.exports = router;