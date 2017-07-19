var express = require('express');
var router = express.Router();
var request = require('request');
var server = require('../serverConfig/server/wmsServerHost.json');

function dateFormat(date, fmt) {
  var o = {
    "M+": date.getMonth() + 1,                 //月份
    "d+": date.getDate(),                    //日
    "h+": date.getHours(),                   //小时
    "m+": date.getMinutes(),                 //分
    "s+": date.getSeconds(),                 //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}      //转换时间核心

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
            req = autoUrl(req, '/user/userSet', "POST", function (json) {
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
            req = autoUrl(req, '/user/isRepeatByUsername/' + req.query.id, "GET", function (json) {
              res.send(json);
            });
            break;
          case 8:
            urlName = '用户管理-判断登录账号是否重复';
            req = autoUrl(req, '/user/isRepeatByLoginname/' + req.query.id, "GET", function (json) {
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
            req = autoUrl(req, '/role/findByUserId/' + req.query.id, "POST", function (json) {
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
      case 'carrierVehicleManagement':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '承运商车辆管理-POST请求查询承运车辆信息';
            req = autoUrl(req, '/car/page', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '承运商车辆管理-修改承运车辆信息';
            req = autoUrl(req, '/car', "PUT", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '承运商车辆管理-新增承运车辆';
            req = autoUrl(req, '/car', "POST", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '承运商车辆管理-删除多个承运车辆数据';
            req = autoUrl(req, '/car/deleteOfCars', "POST", function (json) {
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
          case 1:
            urlName = '入库预约-组合';
            req = autoUrl(req, '/mfunrkDoc', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '入库预约-新增-入库单';
            req = autoUrl(req, '/mfunrkDoc/add', "POST", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '入库预约-修改-入库单';
            req = autoUrl(req, '/mfunrkDoc', "PUT", function (json) {
              res.send(json);
            });
            break;
          case 7:
            urlName = '入库预约-查询-入库单';
            req = autoUrl(req, '/mfunrkDoc', "POST", function (json) {
              res.send(json);
            });
            break;
          case 8:
            urlName = '入库预约-查询-入库单-详细';
            req = autoUrl(req, '/mfunrkDocs/byDoc/' + req.query.rkRkdjId, "GET", function (json) {
              res.send(json);
            });
            break;
          case 9:
            urlName = '入库预约-入库单据 单号';
            req = autoUrl(req, '/mfunrkDoc/greatRcDocNo', "GET", function (json) {
              res.send(json);
            });
            break;
          case 10:
            urlName = '入库预约-入库任务 单号';
            req = autoUrl(req, '/mfunrkRwDoc/greatRkrwNo', "GET", function (json) {
              res.send(json);
            });
            break;
          case 11:
            urlName = '入库预约-删除 入库单';
            req = autoUrl(req, '/mfunrkDoc/deleteOfSoft', "POST", function (json) {
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
            urlName = '入库任务 查询-入库任务';
            req = autoUrl(req, '/mfunrkRwDoc', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '入库任务 修改';
            req = autoUrl(req, '/mfunrkRwDoc', "PUT", function (json) {
              res.send(json);
            });
            break;
          case 5:
            urlName = '入库任务 下发-入库任务';
            req = autoUrl(req, '/mfunrkRwDoc/issued', "POST", function (json) {
              res.send(json);
            });
            break;
          case 6:
            urlName = '入库任务 查询-入库任务详情';
            req = autoUrl(req, '/mfunrkRwDoc/' + req.query.rkrwId, "GET", function (json) {
              res.send(json);
            });
            break;
          case 7:
            urlName = '入库任务 查询-入库单号-入库明细';
            req = autoUrl(req, '/mfunrkDoc/' + req.query.rkRkdjId, "GET", function (json) {
              res.send(json);
            });
            break;
          case 8:
            urlName = '入库任务 查询-入库单据';
            req = autoUrl(req, '/mfunrkDoc', "POST", function (json) {
              res.send(json);
            });
            break;
          case 9:
            urlName = '通过入库任务信息返回入库单据';
            req = autoUrl(req, '/mfunrkDoc/byRwid', "POST", function (json) {
              res.send(json);
            });
            break;
        }
        break;
      case 'inputLedger':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '入库台账-分页查询入库台账信息';
            req = autoUrl(req, '/mfunrktzDoc', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '入库台账－制作/欠货 修改入库台账信息';
            req = autoUrl(req, '/mfunrktzDoc/updateDocs', 'POST', function (json) {
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
            urlName = '入库台账-导出';
            req = autoUrl(req, '/mfunrktzDoc/exportTzExcel', "POST", function (json) {
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
            req = autoUrl(req, '/goods/deleteOfSoft', "POST", function (json) {
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
            urlName = '货品编号  判断货品编号是否重复';
            req = autoUrl(req, '/goods/isRepeatByBgGoodsNo' + req.query.bgGoodsNo, "GET", function (json) {
              res.send(json);
            });
            break;
          case 10:
            urlName = '货品管理 查询所有单位';
            req = autoUrl(req, '/dw/page', "POST", function (json) {
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
            urlName = 'RF管理-  根据id返回用户信息';
            req = autoUrl(req, '/user/userAddZyq/' + req.query.id + '/' + req.query.firstZyq + '/' + req.query.secondZyq, "GET", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = 'RF管理-根据id返回用户信息';
            req = autoUrl(req, '/user/{id}', "GET", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = 'RF管理- 判断主作业区是否重复';
            req = autoUrl(req, '/user/isRepeatByFirstZyq/' + req.query.firstZyq, "GET", function (json) {
              res.send(json);
            });
            break;
          case 4:
            urlName = 'RF管理- 更新用户信息';
            req = autoUrl(req, '/user', "PUT", function (json) {
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
            urlName = '作业区管理-储位组管理 新增储位组';
            req = autoUrl(req, '/locations', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '作业区管理-储位组管理 更新储位组信息';
            req = autoUrl(req, '/locations', "PUT", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '作业区管理-储位组管理 根据id返回储位组信息';
            req = autoUrl(req, '/locations/' + req.query.id, "GET", function (json) {
              res.send(json);
            });
            break;
          case 4:
            urlName = '作业区管理-储位组管理 通过id删除一条储位组数据';
            req = autoUrl(req, '/locations/' + req.query.id, "/DELETE", function (json) {
              res.send(json);
            });
            break;
          case 5:
            urlName = '作业区管理-判断储位名称是否重复';
            req = autoUrl(req, '/location/isRepeatByBlLname/' + req.query.blLname, "GET", function (json) {
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
      case 'warehouseManage':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '查询-指定仓库信息';
            req = autoUrl(req, '/arehouse/page', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '查询-指定区域下储位信息';
            req = autoUrl(req, '/location/findByRegionId/' + req.query.region_id, "GET", function (json) {
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
            req = autoUrl(req, '/mfunrkRwDoc/Receiving', "POST", function (json) {
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
            req = autoUrl(req, '/mfunrkDocs/byDoc/' + req.query.rksRkdjId, "GET", function (json) {
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
          case 6:
            urlName = '开始收货-根据入库单ID添加开始收货时间';
            req = autoUrl(req, '/mfunrkDoc/editRkKsshsjByRkdjId', "POST", function (json) {
              res.send(json);
            });
            break;


        }
        break;
      case 'inputOperation':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '入库操作-加载入库操作页面';
            req = autoUrl(req, '/mfunrkDoc/selectOperateMfunrkDocByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '入库操作－历史记录';
            req = autoUrl(req, '/history/' + req.query.rkRkdjId + '/mhRkdjId', "GET", function (json) {
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
            urlName = '查询-入库单号-入库明细';
            req = autoUrl(req, '/mfunrkDoc/' + req.query.rkRkdjId, "GET", function (json) {
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
            urlName = '查询-储位';
            req = autoUrl(req, '/location/page', "POST", function (json) {
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
            urlName = '上架';
            req = autoUrl(req, '/mfunrkDoc/shelves', "POST", function (json) {
              res.send(json);
            });
            break;
          case 8:
            urlName = '分配';
            req = autoUrl(req, '/mdt/mfunrkDistributionlist', "POST", function (json) {
              res.send(json);
            });
            break;
          case 9:
            urlName = '取消分配';
            req = autoUrl(req, '/mdt/mfunrkDistributionlist/quXiaoFenPei', "POST", function (json) {
              res.send(json);
            });
            break;
        }
        break;
      case 'outputAppointment':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '出库预约 新增 出库单据/包含出库单明细';
            req = autoUrl(req, '/mfunck/add', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '出库预约-组合';
            req = autoUrl(req, '/mfunck/insertCkrw', "POST", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '出库预约-修改-出库单';
            req = autoUrl(req, '/mfunck/editMfunckDocAndDocs', "PUT", function (json) {
              res.send(json);
            });
            break;
          case 7:
            urlName = '出库预约-查询-出库单';
            req = autoUrl(req, '/mfunck/selectMfunckDocByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 8:
            urlName = '出库预约-查询-出库单-详细';
            req = autoUrl(req, '/mfunck/checkMfunckDocsByCkdjId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 9:
            urlName = '出库预约-查询-出库单-详细         ';
            req = autoUrl(req, '/mfunck/mfunckdocAdd', "GET", function (json) {
              res.send(json);
            });
            break;
          case 10:
            urlName = '出库预约-查询-出库单据-出库单号';
            req = autoUrl(req, '/mfunck/greatCkrwNo', "POST", function (json) {
              res.send(json);
            });
            break;
          case 11:
            urlName = '出库预约-作废-出库单据';
            req = autoUrl(req, '/mfunck/cancelMfunckDocByCkdjId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 12:
            urlName = '出库预约-出库单据-滞留出库';
            req = autoUrl(req, '/mfunck/quxiaozhiliu', "POST", function (json) {
              res.send(json);
            });
            break;


        }
        break;
      case 'outboundTask':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '出库任务-查询-任务单';
            req = autoUrl(req, '/mfunck/selectMfunckRwByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '出库任务-查询-任务单-详细';
            req = autoUrl(req, '/mfunck/checkCkrwInfoByCkrwId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '出库任务-查询-任务单-详细-明细';
            req = autoUrl(req, '/mfunck/selectDocsByckdjId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '出库任务-下发';
            req = autoUrl(req, '/mfunck/issuedCkrw', "POST", function (json) {
              res.send(json);
            });
            break;
          case 4:
            urlName = '出库任务-倒车';
            req = autoUrl(req, '/mfunck/editSJdcsjByCkrwId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 5:
            urlName = '出库任务-修改-任务单';
            req = autoUrl(req, '/mfunck/editCkrw', "POST", function (json) {
              res.send(json);
            });
            break;
          case 6:
            urlName = '出库任务-取消任务';
            req = autoUrl(req, '/mfunck/cancelCkrwByCkrwId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 7:
            urlName = '出库任务-挂起单据';
            req = autoUrl(req, '/mfunck/hangUpCkdocByCkdjId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 8:
            urlName = '出库任务-取消挂起';
            req = autoUrl(req, '/mfunck/cancelHangUpCkdocByCkdjId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 9:
            urlName = '出库任务-修改分拣方式';
            req = autoUrl(req, '/mfunck/editCkDocsFJFSByCkmxId', "POST", function (json) {
              res.send(json);
            });
            break;
        }
        break;
      case 'chooseBill':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '挑选单据-查询-任务单据';
            req = autoUrl(req, '/mfunck/selectChooseCkrwByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '挑选单据-挑选完成';
            req = autoUrl(req, '/mfunck/chooseCompleteByCkrwId', "POST", function (json) {
              res.send(json);
            });
            break;
        }
        break;
      case 'activationBill':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '激活单据-查询-任务单据';
            req = autoUrl(req, '/mfunck/selectActivatedCkrwByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '激活单据-激活任务';
            req = autoUrl(req, '/mfunck/rwJiHuo', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '激活单据-修改-分拣方式';
            req = autoUrl(req, '/mfunck/selectActivatedCkrwByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '激活单据-追加分拣';
            req = autoUrl(req, '/mfunck/bujianById', "POST", function (json) {
              res.send(json);
            });
            break;
          case 4:
            urlName = '激活单据-挂起确认';
            req = autoUrl(req, '/mfunck/guaQiById', "POST", function (json) {
              res.send(json);
            });
            break;
          case 5:
            urlName = '激活单据-激活单据';
            req = autoUrl(req, '/mfunck/fenjianById', "POST", function (json) {
              res.send(json);
            });
            break;
          case 6:
            urlName = '激活单据-修改-分拣明细数量';
            req = autoUrl(req, '/mfunck/xiugaifenjian', "POST", function (json) {
              res.send(json);
            });
            break;
          case 7:
            urlName = '激活单据-查询-分拣明细';
            req = autoUrl(req, '/mfunck/selectfenjiansl', "POST", function (json) {
              res.send(json);
            });
            break;

        }
        break;
      case 'outputOperation':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '出库操作-查询-出库单据';
            req = autoUrl(req, '/mfunck/selectOperateCkDocByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '出库操作-查询-历史记录';
            req = autoUrl(req, '/history/' + req.query.id + '/mhCkdjId', "GET", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '出库操作-下架';
            req = autoUrl(req, '/mfunck/xiajiaById', "POST", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '出库操作-打印分拣单';
            req = autoUrl(req, '/mfunck/dayinfenjiandan', "POST", function (json) {
              res.send(json);
            });
            break;
          case 4:
            urlName = '出库操作-打印组合分拣单';
            req = autoUrl(req, '/mfunck/dayinzuhedan', "POST", function (json) {
              res.send(json);
            });
            break;
          case 5:
            urlName = '出库操作-打印追加分拣单';
            req = autoUrl(req, '/mfunck/dayinzuijiadan', "POST", function (json) {
              res.send(json);
            });
            break;
        }
        break;
      case 'outputShipment':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '出库发运-查询-出库单据';
            req = autoUrl(req, '/mfunck/selectDespatchCkrwByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '出库发运-发运';
            req = autoUrl(req, '/mfunck/ckFayunRw', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '出库发运-修改发运数量';
            req = autoUrl(req, '/mfunck/updateFysl', "POST", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '出库发运-打印承运协议';
            req = autoUrl(req, '/mfunck/dayinChenyun', "POST", function (json) {
              res.send(json);
            });
            break;
        }
        break;
      case 'recoveryArchive':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '回收存档- 分页查询';
            req = autoUrl(req, '/mfunck/selectConserveCkDocByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '回收存档- 欠货补发信息（整单）';
            req = autoUrl(req, '/mfunck/QianHuoBuFaZd', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '回收存档- 欠货补发信息（明细）';
            req = autoUrl(req, '/mfunck/QianHuoBuFaMx', "POST", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '回收存档- 滞留补发信息';
            req = autoUrl(req, '/mfunck/zhiLiuBuFa', "POST", function (json) {
              res.send(json);
            });
            break;
          case 4:
            urlName = '回收存档- 欠货导出';
            req = autoUrl(req, '/mfunck/exportQhdocByExcel', "POST", function (json) {
              res.send(json);
            });
            break;
          case 5:
            urlName = '回收存档- 滞留导出';
            req = autoUrl(req, '/mfunck/exportZldocByExcel', "POST", function (json) {
              res.send(json);
            });
            break;
        }
        break;
      case 'inputDaily':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '入库日报 分页查询';
            req = autoUrl(req, '/mdt/SelectRkRb', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '入库日报 导出';
            req = autoUrl(req, '/mdt/exportRkRbByExcel', "POST", function (json) {
              res.send(json);
            });
            break;
        }
        break;
      case 'outputDaily':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '出库日报 分页查询';
            req = autoUrl(req, '/mfunck/SelectCkRb', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '出库日报 导出';
            req = autoUrl(req, '/mfunck/exportCkRbByExcel', "POST", function (json) {
              res.send(json);
            });
            break;
        }
        break;
      case 'stockSelect':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '库存查询 分页查询';
            req = autoUrl(req, '/repertory/groupPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '库存查询 导出';
            req = autoUrl(req, '/repertory/exportRepertoryByExcel', "POST", function (json) {
              res.send(json);
            });
            break;
        }
        break;
      case 'inputSelect':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '入库单据查询 分页查询';
            req = autoUrl(req, '/mfunrkDoc/findvrkdjcx', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '入库单据查询 查看入库明细信息';
            req = autoUrl(req, '/mfunrkDocs/selectMfunrkDocsInfoByRkdjId', "POST", function (json) {
              res.send(json);
            });
            break;

          case 2:
            urlName = '入库单据查询 根据入库单据id查询储位分配详情';
            req = autoUrl(req, '/mdt/selectMdtInfoByRkdjId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '入库单据查询 根据入库单ID导出入库单据';
            req = autoUrl(req, '/mfunrkDoc/exportMfunrkDocByRkdjIds', "POST", function (json) {
              res.send(json);
            });
            break;
          case 4:
            urlName = '入库单据查询 根据入库单ID导出入库明细';
            req = autoUrl(req, '/mfunrkDocs/exportMfunckDocsByRkdjIds ', "POST", function (json) {
              res.send(json);
            });
            break;
          case 5:
            urlName = '入库单据查询 根据入库单ID导出分配储位明细详情';
            req = autoUrl(req, '/mdt/exportMdtByRkdjIds', "POST", function (json) {
              res.send(json);
            });
            break;
          case 6:
            urlName = '入库单据查询 导出入库';
            req = autoUrl(req, '', "POST", function (json) {
              res.send(json);
            });
            break;

        }
        break;
      case 'outputSelect':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '出库单据查询 分页查询';
            req = autoUrl(req, '/mfunck/findMfunckDocByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '出库单据查询 出库单明细查询';
            req = autoUrl(req, '/mfunck/findMfunckDocsByCkCkdjId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '出库单据查询 分拣明细查询';
            req = autoUrl(req, '/mfunck/findMfunckSortingMxByCkmxId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '出库单据查询 根据出库ID导出出库单';
            req = autoUrl(req, '/mfunck/exportMfunckdocByExcel', "POST", function (json) {
              res.send(json);
            });
            break;
          case 4:
            urlName = '出库单据查询 根据出库单ID导出出库明细';
            req = autoUrl(req, '/mfunck/exportMfunckDocsByExcel', "POST", function (json) {
              res.send(json);
            });
            break;
          case 5:
            urlName = '出库单据查询 根据出库单ID导出分拣明细';
            req = autoUrl(req, '/mfunck/exportMfunckSortingMxByExcel', "POST", function (json) {
              res.send(json);
            });
            break;
          case 6:
            urlName = '出库单据查询 导出出库';
            req = autoUrl(req, '', "POST", function (json) {
              res.send(json);
            });
            break;

        }
        break;
      case 'goodsFlowSelect':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '货品流向查询  分页查询';
            req = autoUrl(req, '/mfunck/selectHplxCx', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '货品流向查询 导出';
            req = autoUrl(req, '/mfunck/exportHplxCxByExcel', "POST", function (json) {
              res.send(json);
            });
            break;
        }
        break;
      case 'aLibraryTransferSelect':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '库位转移查询  分页查询';
            req = autoUrl(req, '/stockZyDoc/selectByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '库位转移查询 库存转移报表导出';
            req = autoUrl(req, '/stockZyDoc/exportStockZyDocByExcel', "POST", function (json) {
              res.send(json);
            });
            break;

        }
        break;
      case 'aLibraryFrozenSelect':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '库位冻结查询  分页获取库存冻结单据';
            req = autoUrl(req, '/stockDjDoc/selectByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '库位冻结查询 库存冻结明细';
            req = autoUrl(req, '/stockDjDoc/selectByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '库位冻结查询 库存冻结报表导出';
            req = autoUrl(req, '/stockDjDoc/exportStockDjDocByExcel', "POST", function (json) {
              res.send(json);
            });
            break;

        }
        break;
      case 'inventorySelect':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '盘点查询  根据查询条件分页查询盘点计划';
            req = autoUrl(req, '/mfunpd/selectMfunpdByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '盘点查询 根据盘点计划ID查询盘点详情';
            req = autoUrl(req, '/mfunpd/selectMfunpdDocsByPdsPdId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '盘点查询 导根据盘点计划ID导出盘点计划及详情出';
            req = autoUrl(req, '/mfunpd/exportMfunpdByExcel', "POST", function (json) {
              res.send(json);
            });
            break;

        }
        break;
      case 'dynamicTouchInventory':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '动碰盘点 动碰盘点分页查询';
            req = autoUrl(req, '/mfunpd/selectDPPDByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '动碰盘点 新增动碰盘点计划及明细';
            req = autoUrl(req, '/mfunpd/insertDPMfunpdDocAndDocs', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '动碰盘点 根据盘点明细id分配任务';
            req = autoUrl(req, '/mfunpd/allocatingTaskByPdsId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '动碰盘点 根据盘点计划id确认盘点信息（修改库存)';
            req = autoUrl(req, '/mfunpd/confirmPdDocByPdId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 4:
            urlName = '动碰盘点 根据盘点明细id重盘（修改状态)';
            req = autoUrl(req, '/mfunpd/againPdByPdsId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 5:
            urlName = '动碰盘点 分配任务页面根据盘点计划ID查询详情';
            req = autoUrl(req, '/mfunpd/selectPdInfoByPdId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 6:
            urlName = '动碰盘点 盘点详情页面根据盘点计划ID查询详情';
            req = autoUrl(req, '/mfunpd/selectPdInfoByPdsPdId', "POST", function (json) {
              res.send(json);
            });
            break;
        }
        break;
      case 'loopInventory':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '循环盘点  循环盘点分页查询';
            req = autoUrl(req, '/mfunpd/selectXHPDByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '循环盘点 新增循环盘点计划及明细';
            req = autoUrl(req, '/mfunpd/insertXHMfunpdDocAndDocs', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '循环盘点 根据盘点明细id重盘（修改状态）';
            req = autoUrl(req, '/mfunpd/againPdByPdsId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '循环盘点 根据盘点明细id分配任务';
            req = autoUrl(req, '/mfunpd/allocatingTaskByPdsId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 4:
            urlName = '循环盘点 根据盘点计划id确认盘点信息（修改库存）';
            req = autoUrl(req, '/mfunpd/confirmPdDocByPdId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 5:
            urlName = '循环盘点 分配任务页面根据盘点计划ID查询详情';
            req = autoUrl(req, '/mfunpd/selectPdInfoByPdId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 6:
            urlName = '循环盘点 盘点详情页面根据盘点计划ID查询详情';
            req = autoUrl(req, '/mfunpd/selectPdInfoByPdsPdId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 7:
            urlName = '循环盘点 根据仓库id查找 所有人员';
            req = autoUrl(req, '/arehouse/belongToWhichUser/' + req.body.id, "GET", function (json) {
              res.send(json);
            });
            break;
        }
        break;
      case 'comprehensiveInventory':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '全面盘点  全面盘点分页查询';
            req = autoUrl(req, '/mfunpd/selectQMPDByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '全面盘点 新增全面盘点计划及明细';
            req = autoUrl(req, '/mfunpd/insertQMMfunpdDocAndDocs', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '全面盘点 根据盘点明细id重盘（修改状态)';
            req = autoUrl(req, '/mfunpd/againPdByPdsId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '全面盘点 根据盘点明细id分配任务';
            req = autoUrl(req, '/mfunpd/allocatingTaskByPdsId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 4:
            urlName = '全面盘点 根据盘点计划id确认盘点信息（修改库存）';
            req = autoUrl(req, '/mfunpd/confirmPdDocByPdId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 5:
            urlName = '全面盘点 分配任务页面根据盘点计划ID查询详情';
            req = autoUrl(req, '/mfunpd/selectPdInfoByPdId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 6:
            urlName = '全面盘点 盘点详情页面根据盘点计划ID查询详情';
            req = autoUrl(req, '/mfunpd/selectPdInfoByPdsPdId', "POST", function (json) {
              res.send(json);
            });
            break;


        }
        break;
      case 'aLibraryTransfer':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '库存转移  分页查询';
            req = autoUrl(req, '/stockZyDoc/page', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '库存转移 新增';
            req = autoUrl(req, '/stockZyDoc', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '库存转移 编辑';
            req = autoUrl(req, '/stockZyDoc', "PUT", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '库存转移 分页 根据货品id 库位id 仓库id 合并获取库存单据';
            req = autoUrl(req, 'repertory/groupPage', "POST", function (json) {
              res.send(json);
            });
            break;

          case 4:
            urlName = '库存转移 软删除多个或单个库存转移数据';
            req = autoUrl(req, '/stockZyDoc/deleteOfSoft', "POST", function (json) {
              res.send(json);
            });
            break;
          case 5:
            urlName = '库存转移 分页获取库存转移单据(包含详细信息)';
            req = autoUrl(req, ' /stockZyDoc/selectByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 6:
            urlName = '库存转移 库存转移过程 通过库存转移单据id删除库存转移单据';
            req = autoUrl(req, '/stockZyDoc/' + req.query.zyId, "DELETE", function (json) {
              res.send(json);
            });
            break;
          case 7:
            urlName = '库存转移 库存转移过程 通过库存转移单据id获取一条库存转移单据';
            req = autoUrl(req, '/stockZyDoc/' + req.query.id, "GET", function (json) {
              res.send(json);
            });
            break;
          case 8:
            urlName = '库存转移 查询 合并后的库存';
            req = autoUrl(req, '/repertory/groupByGoodsIdandLocationIdPage', "POST", function (json) {
              res.send(json);
            });
            break;

        }
        break;
      case 'stockTransferConfirm':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '库存转移确认  分页查询';
            req = autoUrl(req, '/stockZyDoc/page', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '库存转移确认 通过库存转移单据id确认转移一条转移单';
            req = autoUrl(req, '/stockZyDoc/confirmZy', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '库存转移确认 软删除多个或单个库存转移数据';
            req = autoUrl(req, '/stockZyDoc/deleteOfSoft', "POST", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '库存转移确认 分页获取库存转移单据';
            req = autoUrl(req, '/stockZyDoc/page', "POST", function (json) {
              res.send(json);
            });
            break;
          case 4:
            urlName = '库存转移确认 分页获取库存转移单据(包含详细信息)';
            req = autoUrl(req, '/stockZyDoc/deleteOfSoft', "POST", function (json) {
              res.send(json);
            });
            break;
          case 5:
            urlName = '库存转移确认 通过库存转移单据id删除库存转移单据';
            req = autoUrl(req, '/stockZyDoc/deleteOfSoft', "POST", function (json) {
              res.send(json);
            });
            break;
          case 6:
            urlName = '库存转移确认 通过库存转移单据id获取一条库存转移单据';
            req = autoUrl(req, '/stockZyDoc/' + req.query.id, "GET", function (json) {
              res.send(json);
            });
            break;

        }
        break;
      case 'stockFrozenThaw':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '库存冻结/解冻  分页获取库存冻结单据';
            req = autoUrl(req, '/stockDjDoc/page', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '库存冻结/解冻 分页获取库存冻结单据(包含明细)';
            req = autoUrl(req, '/stockDjDoc/selectByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '库存冻结/解冻 新增库存冻结单据/包含库存冻结单明细';
            req = autoUrl(req, '/stockDjDoc', "POST", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '库存冻结/解冻 更新库存冻结数据';
            req = autoUrl(req, '/stockDjDoc', "PUT", function (json) {
              res.send(json);
            });
            break;
          case 4:
            urlName = '库存冻结/解冻 通过库存冻结/解冻单据 冻结/解冻一条或多条库存单';
            req = autoUrl(req, '/stockDjDoc/djAndJd', "POST", function (json) {
              res.send(json);
            });
            break;
          case 5:
            urlName = '库存冻结/解冻通过库存冻结单据id删除库存冻结单据';
            req = autoUrl(req, '/stockDjDoc/' + req.query.djId, "DELETE", function (json) {
              res.send(json);
            });
            break;
          case 6:
            urlName = '库存冻结/解冻 通过库存冻结单据id获取一条库存冻结单据单';
            req = autoUrl(req, '/stockDjDoc/' + req.requery.djId, "GET", function (json) {
              res.send(json);
            });
            break;


        }
        break;
      case 'home':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '主页面 分页获取单据';
            req = autoUrl(req, '/lost/selectLostGoodsNoByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '获取 全局 入库订单类型';
            req = autoUrl(req, '/mfunrkDoc/getRkStatus', "POST", function (json) {
              res.send(json);
            });
            break;
        }
        break;
      case 'reservoirInventory':
        switch (parseInt(req.params._status)) {
          case 0:
            urlName = '库区盘点  库区盘点分页查询';
            req = autoUrl(req, '/mfunpd/selectFQPDByPage', "POST", function (json) {
              res.send(json);
            });
            break;
          case 1:
            urlName = '库区盘点 新增库区盘点计划及明细';
            req = autoUrl(req, '/mfunpd/insertFQMfunpdDocAndDocs', "POST", function (json) {
              res.send(json);
            });
            break;
          case 2:
            urlName = '库区盘点 根据盘点明细id重盘（修改状态)';
            req = autoUrl(req, '/mfunpd/againPdByPdsId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 3:
            urlName = '库区盘点 根据盘点明细id分配任务';
            req = autoUrl(req, '/mfunpd/allocatingTaskByPdsId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 4:
            urlName = '库区盘点 根据盘点计划id确认盘点信息（修改库存）';
            req = autoUrl(req, '/mfunpd/confirmPdDocByPdId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 5:
            urlName = '库区盘点 分配任务页面根据盘点计划ID查询详情';
            req = autoUrl(req, '/mfunpd/selectPdInfoByPdId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 6:
            urlName = '库区盘点 盘点详情页面根据盘点计划ID查询详情';
            req = autoUrl(req, '/mfunpd/selectPdInfoByPdsPdId', "POST", function (json) {
              res.send(json);
            });
            break;
          case 7:
            urlName = '库区盘点 新增盘点计划-查找所有库区';
            req = autoUrl(req, '/arehouseKq/page', "POST", function (json) {
              res.send(json);
            });
            break;
          case 8:
            urlName = '库区盘点 新增盘点计划-查找指定区域下的储位';
            req = autoUrl(req, '/region/'+req.query.id, "GET", function (json) {
              res.send(json);
            });
            break;
          case 9:
            urlName = '盘点 取消盘点计划';
            req = autoUrl(req, '/mfunpd/cancelPdJHByPdId', "POST", function (json) {
              res.send(json);
            });
            break;
        }
        break;
    }
    console.log(req.session.user.rmsUser.ruUserName + ' ' + dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss') + ' 请求：\t' + urlName + '\t' + req.info.url + '\t' + req.info.method);
    next();
  }
  else {
    var err = new Error('您没有权限，请您重新登录');
    err.status = 403;
    next(err);
  }
});

function autoUrl(req, url, method, cal) {
  req.info = {};
  req.info.url = url;
  req.info.method = method;
  req.info.cal = cal;
  return req;
}

//请求java服务器
function java(req, res, next) {
  var query = {};
  var url = req.info.url;
  var method = req.info.method;
  if (req.method !== 'GET') {
    if (typeof req.body.json !== 'undefined') {
      query = JSON.parse(req.body.json);
      console.log(req.body.json);
    } else {
      console.log(JSON.stringify(req.body));
      query = req.body;
    }
  } else {
    console.log(JSON.stringify(req.query));
    query = req.query;
  }
  request({
    url: 'http://' + server.host + ':' + server.port + server.path + url,
    method: method,
    json: true,
    headers: {
      "content-type": "application/json"
    },
    body: query
  }, function (error, response, json) {
    if (!error && response.statusCode === 200) {
      req.info.cal(json);
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