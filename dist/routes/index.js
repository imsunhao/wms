
// TODO 首页

var express = require('express');
var router = express.Router();

router.param('_id', function (req, res, next, id) {
    console.log('CALLED ONLY ONCE'+id);
    next();
});
router.param('_pageName', function (req, res, next, id) {
    console.log('CALLED ONLY ONCE'+id);
    next();
});

router.get('/', function (req, res, next) {
    res.render('index', {
        title: '主页',
        user: req.session.user
    });
});

//  TODO 动态加载页面

router.get('page/:_pageName', function (req, res, next) {

    var option={};

    switch (req.body.params._pageName){
        default:
            option={};
    }
    res.render('page/'+req.body.params._pageName, option);
});

module.exports = router;