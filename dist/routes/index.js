
// TODO 首页

var express = require('express');
var router = express.Router();

router.param('_id', function (req, res, next, id) {
    console.log('CALLED ONLY ONCE'+id);
    next();
});
router.param('_pageName', function (req, res, next, pageName) {
    if(typeof req.session.user!=='undefined') {
        console.log(req.session.user.ruUserName+'\t动态加载页面\t'+pageName);
        next();
    }
    else {
        var err = new Error('您没有权限');
        err.status = 403;
        next(err);
    }
});

router.get('/', function (req, res, next) {
    // var data=req.session.user;
    // delete data.rmsUser.ruLoginPassword;
    // req.session.user=data.rmsUser;
    res.render('index', {
        title: '主页',
        data: req.session.user
    });
});

// 动态加载页面

router.get('/page/:_pageName', function (req, res, next) {

    var option={};

    switch (req.params._pageName){
        //TODO 适配参数
        default:
            option={};
    }
    /*<debug>*/
    console.log("--------------------------------------");
    /*</debug>*/
    res.render('page/'+req.params._pageName, option);
});

module.exports = router;




//  要做的工作 imzhangxing
// json=jsonChange(json);
//
// var User = json.rmsUser;
// //不能发布的数据定义
// User.loginPassword = null;
// delete User.loginPassword;
//
// //注册 session
// //zhangxing
// function jsonChange(json) {
//
//     return json;
// }