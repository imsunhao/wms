var express = require('express');
var router = express.Router();
var request = require('request');
var server = require('../serverConfig/server/wmsServerHost.json');

router.param('_url', function (req, res, next, url) {
    if (typeof req.session.user !== 'undefined') {

        var urlName = '';

        switch (url) {
            case 'userManagement':
                switch (parseInt(req.params._status)) {
                    case 0:
                        urlName = '用户管理-加载用户管理页面';
                        req = autoUrl(req, '/user/page', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 1:
                        urlName = '用户管理-新增-配置角色-启用';
                        req = autoUrl(req, '/user', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 2:
                        urlName = '用户管理-启用';
                        req = autoUrl(req, '/user/liveUsersByUids', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 4:
                        urlName = '用户管理-编辑';
                        req = autoUrl(req, '/user', "PUT", function (json) {
                            res.send(json);
                        });
                        break;
                    case 5:
                        urlName = '用户管理-重置密码';
                        req = autoUrl(req, '/user/resetPwd', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 6:
                        urlName = '用户管理-禁用';
                        req = autoUrl(req, '/user/dieUsersByUids', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 7:
                        urlName = '用户管理-判断用户名是否重复';
                        req = autoUrl(req, '/user/isRepeatByUsername/' + req.query.userName, "GET", function (json) {
                            res.send(json);
                        });
                        break;
                    case 8:
                        urlName = '用户管理-判断登录账号是否重复';
                        req = autoUrl(req, '/user/isRepeatByLoginname/' + req.query.loginName, "GET", function (json) {
                            res.send(json);
                        });
                        break;
                    case 9:
                        urlName = '用户管理-设置 用户 角色';
                        req = autoUrl(req, '/user/userAddRoles', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 11:
                        urlName = '用户管理-根据id返回用户角色信息';
                        req = autoUrl(req, '/role/findByUserId/' + req.query.user_id, "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 12:
                        urlName = '用户管理-请求所有角色';
                        req = autoUrl(req, '/role/page', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                }
                break;
            case 'roleManagement':
                switch (parseInt(req.params._status)) {
                    case 0:
                        urlName = '角色管理-加载角色管理页面';
                        req = autoUrl(req, '/role/page', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 1:
                        urlName = '新增-启用-配置仓库-配置客户-配置菜单';// TODO 0
                        req = autoUrl(req, '/user/', "", function (json) {
                            res.send(json);
                        });
                        break;
                    case 2:
                        urlName = '角色管理-启用';
                        req = autoUrl(req, '/role/liveRolesByRids', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 3:
                        urlName = '角色管理-配置仓库';
                        req = autoUrl(req, '/role/roleAddArehouses', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 4:
                        urlName = '角色管理-配置客户';
                        req = autoUrl(req, '/role/roleAddClients', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 5:
                        urlName = '角色管理-配置菜单 ';
                        req = autoUrl(req, '/role/roleAddMenus', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 6:
                        urlName = '角色管理-禁用 ';
                        req = autoUrl(req, '/role/dieRolesByRids', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 7:
                        urlName = '角色管理-编辑';
                        req = autoUrl(req, '/role', "PUT", function (json) {
                            res.send(json);
                        });
                        break;
                    case 8:
                        urlName = '角色管理-角色名称不允许重复';
                        req = autoUrl(req, '/user/resetPwd', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 9:
                        urlName = '角色管理-查询所有仓库';
                        req = autoUrl(req, '/arehouse/page', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 10:
                        urlName = '角色管理-查询所有客户';
                        req = autoUrl(req, '/client/page', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 11:
                        urlName = '角色管理-查询指定角色菜单';
                        req = autoUrl(req, '/menu/findByRoleId/' + req.query.roleId, "GET", function (json) {
                            res.send(json);
                        });
                        break;
                    case 12:
                        urlName = '角色管理-查询指定角色菜单';
                        req = autoUrl(req, '/arehouse/findByRoleId/' + req.query.roleId, "GET", function (json) {
                            res.send(json);
                        });
                        break;
                }
                break;
            case 'warehousingReservation':
                switch (parseInt(req.params._status)) {
                    case 0:
                        urlName = '入库预约-新增-入库预约';
                        req = autoUrl(req, '/mfunrkRwDoc/add', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 2:
                        urlName = '入库预约-新增-入库单';
                        req = autoUrl(req, '/mfunrkDoc/add', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 7:
                        urlName = '入库预约-查询-入库单';
                        req = autoUrl(req, '/mfunrkDoc', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 1:
                        urlName = '入库预约-组合';
                        req = autoUrl(req, '/mfunrkDoc', "POST", function (json) {
                            res.send(json);
                        });
                        break;

                }
                break;
            case 'clientConfiguration':
                switch (parseInt(req.params._status)) {
                    case 0:
                        urlName = '客户管理-加载客户管理页面';
                        req = autoUrl(req, '/client/page', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 1:
                        urlName = '新增-配置货品-配置仓库';
                        req = autoUrl(req, '/client', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 2:
                        urlName = '配置货品';
                        req = autoUrl(req, '/client/clientAddGoods', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 3:
                        urlName = '配置仓库';
                        req = autoUrl(req, '/client/clientAddArehouses', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 4:
                        urlName = '编辑';
                        req = autoUrl(req, '/client', "PUT", function (json) {
                            res.send(json);
                        });
                        break;
                    case 5:
                        urlName = ' 客户名称不允许重复';
                        req = autoUrl(req, '/client', "POST", function (json) {
                            res.send(json);
                        });
                        break;

                }
                break;
            case 'warehousingTask':
                switch (parseInt(req.params._status)) {
                    case 0:
                        urlName = '入库任务管理-加载入库任务管理页面';
                        req = autoUrl(req, '/mfunrkRwDoc', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 1:
                        urlName = '修改';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 2:
                        urlName = '下发';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                }
                break;
            case 'inputLedger':
                switch (parseInt(req.params._status)) {
                    case 0:
                        urlName = '入库台账管理-加载入库台账管理页面';
                        req = autoUrl(req, 't', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 1:
                        urlName = '制作台账';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 2:
                        urlName = '制作台账明细';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 3:
                        urlName = '导出';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 4:
                        urlName = '欠货完结';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 5:
                        urlName = '入库单号不允许重复';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 6:
                        urlName = '数量不允许为负数';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;


                }
                break;
            case 'moduleManagement':
                switch (parseInt(req.params._status)) {
                    case 0:
                        urlName = '模块管理-新增菜单';
                        req = autoUrl(req, '/menu', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                }
                break;
            case 'goodsManage':
                switch (parseInt(req.params._status)) {
                    case 0:
                        urlName = '货品管理-加载货品管理页面';
                        req = autoUrl(req, '/goods', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 1:
                        urlName = '编辑货品';
                        req = autoUrl(req, '/goods', "PUT", function (json) {
                            res.send(json);
                        });
                        break;
                    case 2:
                        urlName = '新增货品';
                        req = autoUrl(req, '/goods/add', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 3:
                        urlName = '查看';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 4:
                        urlName = '货品管理 通过客户id查询一些货品数据';
                        req = autoUrl(req, '/goods/findByClientId/{client_id}', "GET", function (json) {
                            res.send(json);
                        });
                        break;
                    case 5:
                        urlName = '货品管理 通过货品编号查询一些货品数据';
                        req = autoUrl(req, '/goods/findBygoodsNo/{goods_no}', "GET", function (json) {
                            res.send(json);
                        });
                        break;
                    case 6:
                        urlName = '货品管理 软删除多个或单个数据';
                        req = autoUrl(req, '/goods/deleteOfSoft', " POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 7:
                        urlName = '货品管理 软删除多个或单个数据 ';
                        req = autoUrl(req, '/goods/deleteOfSoft', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 8:
                        urlName = '货品管理 通过id删除一条货品数据';
                        req = autoUrl(req, '/goods/{id}', "DELETE", function (json) {
                            res.send(json);
                        });
                        break;
                    case 9:
                        urlName = '货品单号、编号不允许重复';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                }
                break;
            case 'RFManage':
                switch (parseInt(req.params._status)) {
                    case 0:
                        urlName = 'RF管理-加载RF页面';
                        req = autoUrl(req, '/user/page', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 1:
                        urlName = '关联作业区';
                        req = autoUrl(req, '/goods', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 2:
                        urlName = '获取作业区名称';
                        req = autoUrl(req, '/goods/add', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                }
                break;
            case 'operationAreaManage':
                switch (parseInt(req.params._status)) {
                    case 0:
                        urlName = '作业区管理-加载作业区管理页面';
                        req = autoUrl(req, '/locations/page', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 1:
                        urlName = '新增';
                        req = autoUrl(req, '/locations', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 2:
                        urlName = '编辑';
                        req = autoUrl(req, '/locations', "PUT", function (json) {
                            res.send(json);
                        });
                        break;
                    case 3:
                        urlName = '查看';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 4:
                        urlName = '删除';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 5:
                        urlName = '库位名称不允许重复';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;


                }
                break;
            case 'warehouseConfiguration':
                switch (parseInt(req.params._status)) {
                    case 0:
                        urlName = '仓库配置-加载仓库配置页面';
                        req = autoUrl(req, '/arehouse/page', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 1:
                        urlName = '编辑';
                        req = autoUrl(req, '/arehouse', "PUT", function (json) {
                            res.send(json);
                        });
                        break;
                    case 2:
                        urlName = '新增';
                        req = autoUrl(req, '/arehouse', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 3:
                        urlName = '通过client_id查询部分仓库的信息(被客户id绑定的)';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 4:
                        urlName = '删除';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 5:
                        urlName = '库位名称不允许重复';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 6:
                        urlName = '库位名称不允许重复';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 7:
                        urlName = '库位名称不允许重复';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 8:
                        urlName = '库位名称不允许重复';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 9:
                        urlName = '软删除多个或单个数据';
                        req = autoUrl(req, '/arehouse/deleteOfSoft', "POST", function (json) {
                            res.send(json);
                        });
                        break;


                }
                break;
            case 'startReceiving':
                switch (parseInt(req.params._status)) {
                    case 0:
                        urlName = '开始收货-加载开始收货页面';
                        req = autoUrl(req, '/mfunrkRwDoc', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 1:
                        urlName = '获取任务单号中详细信息';
                        req = autoUrl(req, '/mfunrkDoc/byRwid', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 2:
                        urlName = '获取入库单号中详细信息';
                        req = autoUrl(req, '/mfunrkDocs/byDoc', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 3:
                        urlName = '开始打印 状态变化';
                        req = autoUrl(req, '/mfunrkRwDoc/receipt', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 4:
                        urlName = '删除';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 5:
                        urlName = '库位名称不允许重复';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;


                }
                break;
            case 'inputOperation':
                switch (parseInt(req.params._status)) {
                    case 0:
                        urlName = '入库操作-加载入库操作页面';
                        req = autoUrl(req, '/mfunrkDoc', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 1:
                        urlName = '入库操作－历史记录';
                        req = autoUrl(req, '/history/' + 1 + '/mhRkdjId', "GET", function (json) {
                            res.send(json);
                        });
                        break;
                    case 2:
                        urlName = '编辑';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 3:
                        urlName = '查看';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 4:
                        urlName = '删除';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 5:
                        urlName = '库位名称不允许重复';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 6:
                        urlName = '库位名称不允许重复';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;


                }
                break;
            case 'outputAppointment':
                switch (parseInt(req.params._status)) {
                    case 0:
                        urlName = '出库预约 获取 根据分页要求获取没有出库任务的出库单信息';
                        req = autoUrl(req, '/mfunck/selectMfunckDocByPage', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 1:
                        urlName = '出库预约 新增 出库单据/包含出库单明细';
                        req = autoUrl(req, '/mfunck/add', "POST", function (json) {
                            res.send(json);
                        });
                        break;


                }
                break;
             case 'inputDaily':
                switch (parseInt(req.params._status)) {
                    case 0:
                        urlName = '入库日报 分页查询';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                    case 1:
                        urlName = '入库日报 导出';
                        req = autoUrl(req, '', "POST", function (json) {
                            res.send(json);
                        });
                        break;
                }
                break;
        }
        console.log(req.session.user.rmsUser.ruUserName + '\t请求：\t' + urlName + '\t' + req.body.url);
        next();
    }
    else {
        var err = new Error('您没有权限，请您重新登录');
        err.status = 403;
        next(err);
    }
});

function autoUrl(req, url, method, cal) {
    req.body.url = url;
    req.body.method = method;
    req.body.cal = cal;
    return req;
}

//请求java服务器
function java(req, res, next) {
    console.log(JSON.stringify(req.query));
    request({
        url: 'http://' + server.host + ':' + server.port + server.path + req.body.url,
        method: req.body.method,
        json: true,
        headers: {
            "content-type": "application/json"
        },
        body: req.query
    }, function (error, response, json) {
        if (!error && response.statusCode === 200) {
            req.body.cal(json);
            /*<debug>*/
            console.log('------------------');
            /*</debug>*/
        } else {
            return res.send({
                status: 500,
                message: "服务器未响应"
            });
        }
    });

    // switch (req.body.method){
    //     case 'POST':
    //         request.post({
    //             json: true,
    //             url: 'http://' + server.host + ':' + server.port + req.body.url,
    //             form: req.query,
    //             headers: {"Content-Type": 'application/json'}
    //         }, function (error, response, json) {
    //             if (!error && response.statusCode === 200) {
    //                 req.body.cal(json);
    //             } else {
    //                 return res.send({
    //                     status: 500,
    //                     message: "服务器未响应"
    //                 });
    //             }
    //         });
    //         break;
    //     case 'GET':
    //         request.get({
    //             json: true,
    //             url: 'http://' + server.host + ':' + server.port + req.body.url,
    //             form: req.query,
    //             headers: {"Content-Type": 'application/json'}
    //         }, function (error, response, json) {
    //             if (!error && response.statusCode === 200) {
    //                 req.body.cal(json);
    //             } else {
    //                 return res.send({
    //                     status: 500,
    //                     message: "服务器未响应"
    //                 });
    //             }
    //         });
    //         break;
    //     case 'PUT':
    //         request.put({
    //             json: true,
    //             url: 'http://' + server.host + ':' + server.port + req.body.url,
    //             form: req.query,
    //             headers: {"Content-Type": 'application/json'}
    //         }, function (error, response, json) {
    //             if (!error && response.statusCode === 200) {
    //                 req.body.cal(json);
    //             } else {
    //                 return res.send({
    //                     status: 500,
    //                     message: "服务器未响应"
    //                 });
    //             }
    //         });
    //         break;
    //     case 'DELETE':
    //         request.delete({
    //             json: true,
    //             url: 'http://' + server.host + ':' + server.port + req.body.url,
    //             form: req.query,
    //             headers: {"Content-Type": 'application/json'}
    //         }, function (error, response, json) {
    //             if (!error && response.statusCode === 200) {
    //                 req.body.cal(json);
    //             } else {
    //                 return res.send({
    //                     status: 500,
    //                     message: "服务器未响应"
    //                 });
    //             }
    //         });
    //         break;
    // }
}

router.get('/:_url/:_status', java);
router.post('/:_url/:_status', java);

module.exports = router;

