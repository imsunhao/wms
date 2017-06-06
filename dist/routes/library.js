// TODO 库内管理

var express = require('express');
var router = express.Router();
var request = require('request');
var server = require('../serverConfig/server/wmsServerHost.json');

router.get('/reg/:_path', function (req, res, next) {
    request({
        url: 'http://' + server.host + ':' + server.port + server.path + '/lost/editExportPath',
        method: 'POST',
        json: true,
        headers: {
            "content-type": "application/json"
        },
        body: {
            "path": req.params._path,
            "pathUserId": 1
        }
    }, function (error, response, json) {
        if (!error && response.statusCode === 200) {
            res.send(json);
            //{status:20000,model:'修改成功！'}
            /*<debug>*/
            console.log('ok');
            /*</debug>*/
        } else {
            return res.send({
                status: 500,
                message: "服务器未响应"
            });
        }
    });
});


module.exports = router;