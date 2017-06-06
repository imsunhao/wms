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
            return;
        }

        var step = {};
        extendDeepCopy(req.session.user.rmsUser, step);
        step.ruPortrait = path;

        request({
            url: 'http://' + server.host + ':' + server.port + server.path + '/user',
            method: "PUT",
            json: true,
            headers: {
                "content-type": "application/json"
            },
            body: step
        }, function (error, response, json) {
            if (!error && response.statusCode === 200) {
                var oldPortrait = req.session.user.rmsUser.ruPortrait;
                if (oldPortrait !== '' && oldPortrait !== 'base1.png' && oldPortrait !== 'base2.png') fs.unlink('../public/static/images/users/' + req.session.user.rmsUser.ruPortrait);
                req.session.user.rmsUser.ruPortrait = step.ruPortrait;
                res.end(JSON.stringify({status: 200, ruPortrait: req.session.user.rmsUser.ruPortrait}));
            } else {
                fs.unlink(files.file[0].path);
                return res.send({
                    status: 500,
                    message: "服务器未响应"
                });
            }
        });
    });
});


function extendDeepCopy(obj, newObj) {
    var newObj = newObj || {};
    for (var i in obj) {
        newObj[i] = obj[i];
        // if (typeof obj[i] === 'object') {
        //     newObj[i] = (obj[i].constructor === Array) ? [] : {};
        //     extendDeepCopy(obj[i], newObj[i]);
        // } else {
        //
        // }
    }
    return newObj;
}     //深克隆


module.exports = router;