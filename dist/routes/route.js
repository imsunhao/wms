var express = require('express');
var router = express.Router();
var request = require('request');
var server = require('../serverConfig/server/wmsServerHost.json');


router.param('_url', function (req, res, next, url) {
    if (typeof req.session.user !== 'undefined') {

        var urlName = '';

        switch (url) {
            case '':
                switch (req.params._status) {
                    case 0:
                        urlName = '入库预约-加载入库单号';
                        autoUrl(req,'warehousingReservation',{},"GET",function () {

                        });
                        break;
                }
                break;
        }

        console.log(req.session.user.ruUserName + '\t请求：\t' + urlName + '\t' + url);
        next();
    }
    else {
        var err = new Error('您没有权限，请您重新登录');
        err.status = 403;
        next(err);
    }
});


function autoUrl(req, url, data, method, cal) {
    req.url = url;
    req.data = data;
    req.method = method;
    req.cal = cal;
}

//请求java服务器
router.get('/:_url/:_status', function (req, res, next) {
    request({
        method: req.method,
        json: true,
        url: server.host + '/' + server.port + req.url,
        data: req.data,
        headers: {"Content-Type": 'application/json'}
    }, function (error, response, json) {
        if (!error && response.statusCode == 200) {
            req.cal();
        } else {
            return res.send({
                status: 500,
                message: "服务器未响应"
            });
        }
    });
});

module.exports = router;

