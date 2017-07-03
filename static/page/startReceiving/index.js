var startReceiving = new Vue({
  el: '#startReceiving',
  prop: {},
  data: function () {
    return {
      baseRkType: window.rkType,
      startReceiving: [],
      multipleSelection: [],
      multiSelect: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      showLoading: false,
      currentPage: 1,
      pageSize: 10,
      currentTotal: 0,

      rkrwNo: '',                           //主页面 任务单号 搜索
      rkrwCph: '',                          //主页面 车牌号 搜索
      rkrwSjxm: '',                         //主页面 司机姓名 搜索
      formLabelWidth: '120px',              //表单配置
      form: _form(),                        //表单 弹出层 信息集合
      dialogFormActive: 0,                  //新建 弹出层 steps 当前进度
      dialogFormVisible: false,             //新建 弹出层 是否可见
      submitLoading: false,                 //新建 弹出层 提交等待
      select: _form(),                      //搜索 弹出层 信息集合,

      printf: [],                           //打印 弹出层 信息集合,
      printfLoading: false,
      printDatas: [],                       // 打印数据
      dialogPrintfVisible: false,

      lists: _lists(),
      dialogListsVisible: false,

      dialogSelectVisible: false,
      selectLoading: false,
    }
  },
  computed: {
    // TODO 表格提交
    option: function () {
      return {
        "draw": 1,
        "pageNum": this.currentPage,
        "pageSize": this.pageSize,
        "rkrwCph": this.rkrwCph.trim(),
        "rkrwNo": this.rkrwNo.trim(),
        "rkrwSjxm": this.rkrwSjxm.trim(),
      }
    },
    form_pop: function () {
      return {
        "draw": 1,
        "pageNum": this.currentPage,
        "pageSize": this.pageSize,
        "startDhrqTimeParam": tsf_date(this.form.rkrwDhrq, 1),
        "rkrwCph": this.form.rkrwCph,
        "rkrwSjxm": this.form.rkrwSjxm,
        "rkrwDbd": this.form.rkrwDbd,
        "rkrwCys": this.form.rkrwCys,
        "rkrwNo": this.form.rkrwNo,
        arehouseId: window.dbmessage.baseArehouses[0].baArehouseId,
      }
    },
    search: function () {
      return {
        "draw": 1,
        "pageNum": this.currentPage,
        "pageSize": this.pageSize,
        "rkrwN": this.form.rkrwN,
        "rkrwCph": this.form.rkrwCph,
        "dds": this.form.dds,
        "pxs": this.form.pxs,
        "rkrwSjxm": this.form.rkrwSjxm,
        "rkrwDhrq": this.form.rkrwDhrq,
        "rkrwDbd": this.form.rkrwDbd,
        "rkrwCys": this.form.rkrwCys,
        "rkrwDh": this.form.rkrwDh,
        arehouseId: window.dbmessage.baseArehouses[0].baArehouseId,
        "rkrwStatus": this.form.rkrwStatus
      }
    },
    distributionForm: function () {
      return {
        distribution: this.distribution
      }
    },                                      //分配 表单
  },
  methods: {
    inlineModify: function (index, row) {
      this.multipleSelection = [row];
      printfCompile(this);
      this.dialogPrintfVisible = !this.dialogPrintfVisible;
    },                                //行内按钮 打印标签页
    inlineStartReceiving: function (index, row) {
      var _this = this;
      _this.$confirm('此操作将开始收货？入库单据：' + row.rkRkdjNo, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        p[6].post({
          "rkKsshsj": new Date().toJSON(),
          "id": row.rkRkdjId
        }, function (json) {
          if (json.status !== 20002) {
            json.model = '添加开始收货时间';
          }
          this.callbackAfter({status:json.status,model:'开始收货'}, function () {
            row.rkKsshsj = 1;
          })
        });
      }).catch(function () {
        _this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },                            //TODO 行内按钮 开始收货
    dblClick: function (row, event) {
      if (row.rkDocsList === null || typeof row.rkDocsList === 'undefined' || row.rkDocsList.length < 1) {
        p[101].post({rkRkdjId: row.rkRkdjId}, function (json) {
          row.rkDocsList = json.rkDocsList;
          obj.lists.data = row.rkDocsList;
          obj.lists.rkRkdjNo = row.rkRkdjNo;
          obj.dialogListsVisible = true;
        })
      } else {
        obj.lists.data = row.rkDocsList;
        obj.lists.rkRkdjNo = row.rkRkdjNo;
        obj.dialogListsVisible = true;
      }
    },                                    //行内按钮 双击查看明细
    multiSelectClick: function () {
      this.multiSelect = !this.multiSelect;
    },                                      //多选 状态维护
    multiSelectionChange: function (val) {
      /*<debug>*/
      console.log(this.multipleSelection);
      /*</debug>*/
      this.multipleSelection = val;
    },                               //多选 选中控制
    moreOperationModify: function () {
      printfCompile(this);
      this.dialogPrintfVisible = !this.dialogPrintfVisible;
    },                                   //多选 打印标签页
    expandChange: function (row, expanded) {
      if (expanded && (typeof (row.docList) === 'undefined' || row.docList.length === 0)) {
        p[102].post({
          rkrwId: row.rkrwId,
          rkArehouseId: window.dbmessage.baseArehouses[0].baArehouseId
        }, function (json) {
          /*<debug>*/
          console.log(json);
          /*</debug>*/
          row.docList = json.data;
        });
      }
      /*<debug>*/
      console.log(row);
      console.log(expanded);
      /*</debug>*/
    },                             //下拉 选择
    handleSizeChange: function (val) {
      /*<debug>*/
      console.log('每页' + val + '条');
      /*</debug>*/
      this.pageSize = val;
      p[0].post((_option ? this.form_pop : this.option));
    },                                   //分页 Size
    handleCurrentChange: function (val) {
      /*<debug>*/
      console.log('当前第' + val + '页');
      /*</debug>*/
      this.currentPage = val;
      p[0].post((_option ? this.form_pop : this.option));
    },                                //分页 当前页
    prev: function () {
      this.dialogFormActive--;
      this.$refs.carousel.prev();
    },                                                  //新建 弹出层banner控制 前一个
    next: function () {
      this.dialogFormActive++;
      this.$refs.carousel.next();
    },                                                  //新建 弹出层banner控制 后一个
    submit: function () {
      var _this = this;
      this.dialogFormActive++;
      this.submitLoading = true;
      //TODO 此处应是ajax请求
      setTimeout(function () {
        _this.submitLoading = false;
        _this.$notify({
          title: '成功',
          message: '保存成功！',
          type: 'success'
        });
        _this.dialogFormVisible = false;
        _this.form = {
          rkRkdjNo: '',
          rkType: '',
          rkRemarks: '',
          rkDocsList: [],
          bgGoodsNo: '',
          selectGood: {
            value: '',
            bgGoodsName: '',
            count: 0,
            bgGoodsId: ''
          },
          saveARkDocsList: true,
          deleteARkDocsList: true
        };
        _this.dialogFormActive = 0;
        _this.$refs.carousel.setActiveItem(0);
        p[0].post();
      }, 1500);
    },                                                //新建 表单提交
    selectSubmit: function () {
      _option = true;
      p[0].post(obj.form_pop);
      this.dialogSelectVisible = !this.dialogSelectVisible;
    },                                          //详细查询 提交
    printfSubmit: function () {
      var datas = [];
      var checkData = startReceiving.$refs.printf.getCheckedNodes();
      for (var i in checkData) {
        if (typeof checkData[i].val2 !== 'undefined') {
          datas.push(checkData[i]);
        }
      }
      this.printDatas = datas;
      this.dialogPelectVisible = !this.dialogPrintfVisible;
      wap.print(this);
    },                                          //打印 提交
    printfCheckChange: function () {

    },                                     //打印 选中维护
    printfLoadNode: function (node, resolve) {
      switch (node.level) {
        case 0:
          return resolve(this.printf);
        case 1:
          postRkrwNo(this, {
            "pageNum": 1,
            "pageSize": 999,
            "draw": 0,
            rkrwId: node.data.rkrwId,
            rkrwDhrq: node.data.rkrwDhrq,
            rkrwNo: node.data.rkrwNo
          }, resolve);
          break;
        case 2:
          postRkdjId(this, {
            "rksRkdjId": node.data.rksRkdjId,
            rkrwDhrq: node.data.rkrwDhrq,
            rkrwNo: node.data.rkrwNo
          }, resolve);
          break;
        case 3:
          return resolve([]);
      }
    },
    auto_rkrwDhrq: function (value, bool) {
      if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年 MM月 dd日 hh时 mm分 ');
      else return dateFormat(new Date(parseInt(value)), 'yyyy-MM-dd');
    },                              //预计到货时间
    auto_rkrwStatus: function (value) {
      if (!isNaN(value)) {
        temp = {
          1: '初始',
          2: '已下发任务',
          3: '已开始收货',
          4: '收货中',
          51: '部分收货',
          52: '全部收货',
          61: '收货完成',
          62: '欠货'
        }
      } else {
        temp = {
          '初始': 1,
          '已下发任务': 2,
          '已开始收货': 3,
          '收货中': 4,
          '部分收货': 51,
          '全部收货': 52,
          '收货完成': 61,
          '欠货': 62
        }
      }
      return temp[value];
    },                                  //任务状态
    auto_rkCreatetime: function (value, bool) {
      if (!bool) return dateFormat(new Date(value), 'yyyy-MM-dd');
      else return dateFormat(new Date(value), 'MM-dd');
    },                          //入库任务中详细信息 - 入库时间
    auto_rkType: function (value) {
      return this.baseRkType[value];
    },                                      //订单类型
    auto_rkStatus: function (value) {
      var temp = {}
      if (!isNaN(value)) {
        temp = {
          1: '原始状态',
          21: '部分分配',
          22: '全部分配',
          31: '部分收货',
          32: '完全收货',
        }
      } else {
        temp = {
          '采购订单': 0,
          '仓间调拨': 1,
          '退货入库': 2
        }
      }
      return temp[value];
    },                                    //入库状态
    auto_rkArehouseId: function (data, set) {
      /*<debug>*/
      //console.log(rkArehouseId);
      /*</debug>*/
      var baArehouse = window.dbmessage.baseArehouses;
      var i;
      if (typeof set !== 'undefined') {
        for (i = 0; i < baArehouse.length; i++) {
          if (baArehouse[i].baName === data) {
            return baArehouse[i].baArehouseId
          }
        }
        return errorTip(this, '不应出现未知的情况仓库');
      } else {
        for (i = 0; i < baArehouse.length; i++) {
          if (baArehouse[i].baArehouseId == data) {
            return baArehouse[i].baName
          }
        }
        return '未知的仓库'
      }
    },                            //入库仓库id 自动匹配
    auto_rkZdfs: function (value) {
      var temp = {}
      if (!isNaN(value)) {
        temp = {
          1: '手动',
          2: '导入',
          3: '接口'
        }
      } else {
        temp = {
          '手动': 1,
          '导入': 2,
          '接口': 3
        }
      }
      return temp[value];
    },                                      //制单方式
  },
  watch: {
    rkrwCph: function () {
      /*<debug>*/
      console.log((_option ? this.form_pop : this.option));
      /*</debug>*/
      p[0].post((_option ? this.form_pop : this.option));
    },
    rkrwNo: function () {
      /*<debug>*/
      console.log((_option ? this.form_pop : this.option));
      /*</debug>*/
      p[0].post((_option ? this.form_pop : this.option));
    },
    rkrwSjxm: function () {
      /*<debug>*/
      console.log((_option ? this.form_pop : this.option));
      /*</debug>*/
      p[0].post((_option ? this.form_pop : this.option));
    },
  }
});
function _form() {
  return {
    rkrwDhrq: '',//模糊查询--到车日期
    rkrwNo: '',//模糊查询--任务号
    rkrwCph: '',//模糊查询--车牌号
    rkrwSjxm: '',//模糊查询--司机姓名
    rkrwDbd: '',//模糊查询--调拨地
    rkrwCys: '',//模糊查询--承运商
  }
}
var obj = startReceiving;
var p = [];
// 0 开始收货 分页查询
p[0] = autoPost({
  urlHock: "../../hock/startReceiving/page.json",
  urlProd: "/route/startReceiving/0",
  success: function (json) {
    obj.$data.startReceiving = json.data;
    obj.$data.currentTotal = json.recordsFiltered;
  }
});
//3 开始打印 状态变化
p[3] = autoPost({
  urlHock: "../../hock/form/inputOption.json",
  urlProd: "/route/startReceiving/3",
  method: 'GET'
});
// 6 开始收货 开始收货-根据入库单ID添加开始收货时间
p[6] = autoPost({
  urlHock: "",
  urlProd: "/route/startReceiving/6",
});

// 101 查询-入库单号-入库明细
p[101] = autoPost({
  urlHock: "/hock/warehousingTask/docList.json",
  urlProd: "/route/warehousingTask/7",
  method: 'GET'
});
// 102 查询-入库任务详情
p[102] = autoPost({
  urlHock: "/hock/warehousingTask/rwDocList.json",
  urlProd: "/route/warehousingTask/9"

});
// 高级 监视器的 使用方法
//    startReceiving.$watch('date', function () {
//        if (!(_option ? this.form_pop : this.option).dateStart)return;
//        /*<debug>*/
//        console.log((_option ? this.form_pop : this.option));
//        /*</debug>*/
//        p[0].post((_option ? this.form_pop : this.option));
//    }, {deep: true});
p[0].post(startReceiving.option);
function _lists() {
  return {
    rkrwNo: '',
    data: []
  }
}
function postRkrwNo(obj, option, resolve) {
  /*<debug>*/
  url = "/hock/startReceiving/rkrwNo.json";
  /*</debug>*/

  /*<prod>*/
  url = "/route/startReceiving/1";
  /*</prod>*/

  $.ajax(url, {
    type: "POST",
    data: option || {
      "draw": 1,                      //* 没有意义
      "pageNum": 1,                   //* 当前页
      "pageSize": 10                  //* 每页大小
    },
    error: function (error) {
      errorTip(obj, error);
    },
    success: function (json) {
      var resoleveStep = [];
      for (var i = 0; i < json.data.length; i++) {
        resoleveStep.push({
          name: json.data[i].rkRkdjNo,
          rksRkdjId: json.data[i].rkRkdjId,
          rkrwDhrq: option.rkrwDhrq,
          rkrwNo: option.rkrwNo
        });
      }
      return resolve(resoleveStep);
    },
    complete: function () {

    }
  });
}          //1 获取任务单号中详细信息
function postRkdjId(obj, option, resolve) {
  /*<debug>*/
  url = "/hock/startReceiving/rkdjId.json";
  /*</debug>*/

  /*<prod>*/
  url = "/route/startReceiving/2";
  /*</prod>*/

  $.ajax(url, {
    type: "GET",
    data: option || {
      "draw": 1,                      //* 没有意义
      "pageNum": 1,                   //* 当前页
      "pageSize": 10                  //* 每页大小
    },
    error: function (error) {
      errorTip(obj, error);
    },
    success: function (json) {
      var resoleveStep = [];
      for (var i = 0; i < json.length; i++) {
        resoleveStep.push({
          name: json[i].baseGoods.bgGoodsNo + '\t' + json[i].baseGoods.bgGoodsName,
          val2: json[i].baseGoods.bgGoodsNo,
          val: dateFormat(new Date(option.rkrwDhrq), 'yyyyMMdd'),
          rwdh: option.rkrwNo,
          dhrq: dateFormat(new Date(option.rkrwDhrq), 'yyyyMMdd'),
          dysj: changeDate(new Date())
        });
      }
      return resolve(resoleveStep);
    },
    complete: function () {

    }
  });
}          //2 获取入库单号中详细信息
function printfCompile(obj) {
  console.log(obj.multipleSelection[0]);
  var resoleveStep = [];
  var ids = [];
  for (var i = 0; i < obj.multipleSelection.length; i++) {
    ids.push(obj.multipleSelection[i].rkrwId);
    resoleveStep.push({
      name: obj.multipleSelection[i].rkrwNo,
      rkrwNo: obj.multipleSelection[i].rkrwNo,
      rkrwDhrq: obj.multipleSelection[i].rkrwDhrq,
      rkrwId: obj.multipleSelection[i].rkrwId
    });
  }
  p[3].post({
    rwIds: ids,
    userId: app.rmsUser.ruUserId
  }, function (json) {
    for (var i = 0; i < obj.multipleSelection.length; i++) {
      obj.multipleSelection[i].rkrwStatus = 3;
    }
//            this.callbackAfter({status:json.status,model:'已经进行标签打印'},function () {
//            })
  });
  obj.printf = resoleveStep;
}
