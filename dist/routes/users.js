// 用户登录 测试成功

var express = require('express');
var router = express.Router();
var request = require('request');


router.param('_id', function (req, res, next, id) {
    console.log('CALLED ONLY ONCE' + id);
    next();
});

// GET 用户信息
router.get('/', function (req, res, next) {

});

//   登录
router.get('/login', function (req, res, next) {
    /*<debug>*/
    console.log(req.originalUrl);
    /*</debug>*/
    res.render('login');
});

// 提交登录
router.post('/login', function (req, res, next) {
    //TODO      图片验证

    //请求java服务器
    /*<debug>*/
    console.log("请求字符串为:");
    console.log(req.body);
    /*</debug>*/
    var server = require('../serverConfig/server/wmsServerHost.json');
    var data = req.body.username + '/' + req.body.password;

    /*<debug>*/
    console.log("url:\t"+server.url + data);
    /*</debug>*/
    request({
        method: "GET",
        json: true,
        url: server.url + data,                         //ceshi/123456
        headers: {"Content-Type": 'application/json'}
    },function (error,response,json) {
        if (!error && response.statusCode == 200) {
            /*<debug>*/
            console.log('------接口数据------\n', json);
            /*</debug>*/
            var status = require('../serverConfig/statusConfig.js');
            var message = status[json.status];
            switch (json.status) {
                case 1:
                    var User = json.rmsUser;
                    //不能发布的数据定义
                    User.loginPassword = null;
                    delete User.loginPassword;

                    //注册 session
                    req.session.user = User;

                    console.log("用户:\t" + User.name + "\t登录成功");

                    if (typeof (req.body.originalUrl) !== 'undefined') {
                        return res.send({status: json.status,url: req.body.originalUrl});
                    } else return res.send({status: json.status,url: "/"});
                case 0:
                case 2:
                case 3:
                    return res.send({
                        status: status,
                        message: message
                    });
                default:
                    return res.send({
                        status: 500,
                        message: "服务器未响应"
                    });
            }
        }else{
            return res.send({
                status: 500,
                message: "服务器未响应"
            });
        }
    });


});

// TODO   登出测试
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/users/login');
});

module.exports = router;