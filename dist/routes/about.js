
// TODO 关于我们

var express = require('express');
var router = express.Router();
var request = require('request');

router.param('_id', function (req, res, next, id) {
    console.log('CALLED ONLY ONCE'+id);
    next();
});

/* GET about page. */
router.get('/', function (req, res, next) {
    request({
        method: "POST",
        json: true,
        data:{
            draw:123,
            rkno:1234,
            status:1,
            startTimeParam:123,
            endTimeParam:"123",
            pageNum:123,
            pageSize:123
        },
        url: 'http://192.168.5.29:8080/wms_cg_web/mfunrkDoc',                         //ceshi/123456
        headers: {"Content-Type": 'application/json'}
    },function (error,response,json) {
        if (!error && response.statusCode == 200) {
            /*<debug>*/
            console.log('------接口数据------\n', json);
            /*</debug>*/
            console.log('------接口数据------\n', json);
        }else{
            return res.send({
                status: 500,
                message: "服务器未响应"
            });
        }
    });
});


module.exports = router;