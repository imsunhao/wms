// TODO next 用户登录测试

var express = require('express');
var router = express.Router();
var http = require('http');


router.param('_id', function (req, res, next, id) {
    console.log('CALLED ONLY ONCE' + id);
    next();
});

// GET 用户信息
router.get('/', function (req, res, next) {

});

// TODO   登录
router.get('/login', function (req, res, next) {
    /*<debug>*/
    console.log(req.originalUrl);
    /*</debug>*/
    res.render('login');
});

// 提交登录
router.post('/login', function (req, res, next) {
    //TODO      图片验证

    // TODO  now   请求服务器

    /*<debug>*/
    console.log("请求字符串为:");
    console.log(req.body);
    /*</debug>*/
    var server=require('../serverConfig/server/wmsServerHost.json');
    var request=http.request({},function (serverFeedback) {
        if(serverFeedback.statusCode==200){

        }
    });

    var state = 200;
    var json = userInfo;

    switch (json.auth) {
        case 200:
            var User = json.user;
            //不能发布的数据定义
            User.password = null;
            delete User.password;

            //注册 session
            req.session.user = User;

            console.log("用户:\t" + User.name + "\t登录成功");

            if (typeof (req.body.originalUrl) !== 'undefined') {
                return res.send({url: req.body.originalUrl});
            } else return res.send({url: "/"});
            break;
        case 400:
            break;
        default:
            res.next(10086);
    }
});

// TODO   登出测试
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/users/login');
});

module.exports = router;