// TODO 关于我们

var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
var path = require("path");
var request = require('request');
var server = require('../serverConfig/server/wmsServerHost.json');

router.post('/', function (req, res, next) {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: '../public/static/images/users/'});
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var url = files.file[0].originalFilename.split('.');
        var path = files.file[0].path.split('\\')[5];
        if (err) {
            console.log('parse error: ' + err);
        } else {
            if(req.session.user.rmsUser.ruPortrait!=='') fs.unlink('../public' + req.session.user.rmsUser.ruPortrait);
        }
        req.session.user.rmsUser.ruPortrait = '/static/images/users/' + path;

        request({
            url: 'http://' + server.host + ':' + server.port + server.path + '/user',
            method: "PUT",
            json: true,
            headers: {
                "content-type": "application/json"
            },
            body: req.session.user.rmsUser
        }, function (error, response, json) {
            if (!error && response.statusCode === 200) {
                res.end(JSON.stringify({status: 200, ruPortrait: req.session.user.rmsUser.ruPortrait}));
            } else {
                return res.send({
                    status: 500,
                    message: "服务器未响应"
                });
            }
        });
    });
});

module.exports = router;