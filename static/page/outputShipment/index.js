var outputShipment = new Vue({
  el: '#outputShipment',
  prop: {},
  data: function () {
    return {
      outputShipment: [],
      multipleSelection: [],
      multiSelect: false,
      pickerOptions: _pickerOptions(),
      showLoading: false,
      currentPage: 1,
      pageSize: 10,
      currentTotal: 0,

      date: [null, null],                     //主页面 选择日期 搜索
      ckrwNo: '',                             //主页面 任务号 搜索
      ckrwCph: '',                            //主页面 车牌号 搜索
      formLabelWidth: '120px',                //表单 配置
      form: _form(),                           //表单 弹出层 信息集合

      dialogFormActive: 0,                    //新建 弹出层 steps 当前进度
      dialogFormVisible: false,               //新建 弹出层 是否可见
      submitLoading: false,                   //新建 弹出层 提交等待

      select: _form(),                         //搜索 弹出层 信息集合

      dialogListsVisible: false,              //单据详细 查询
      dialogLists2Visible: false,              //单据详细 查询
      lists: formList(),                      //出库详细 弹出层 信息集合
      lists2: lists2Form(),

      printDatas: _printDatas_p1(),              //打印 承运协议 信息集合

      changeoutputShipment: [],

      dialogSelectVisible: false,
      selectLoading: false
    }
  },
  computed: {
    option: function () {
      return {
        "draw": 1,
        "pageNum": this.currentPage,
        "pageSize": this.pageSize,
        "ckrwNo": this.ckrwNo.trim(),
        "ckrwCph": this.ckrwCph.trim(),
        "ckrwStartGreatTime": tsf_date(this.date[0]),
        "ckrwEndGreatTime": tsf_date(this.date[1]),
        ckArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,
      }
    },
    form_pop: function () {
      return {
        "draw": 1,
        "pageNum": this.currentPage,
        "pageSize": this.pageSize,
        "ckrwStartGreatTime": tsf_date(this.form.ckrwGreatTime[0]),
        "ckrwEndGreatTime": tsf_date(this.form.ckrwGreatTime[1]),
        "ckrwStartYjdcsj": tsf_date(this.form.ckrwYjdcsj[0]),
        "ckrwEndYjdcsj": tsf_date(this.form.ckrwYjdcsj[1]),
        "ckrwStartSjdcsj": tsf_date(this.form.ckrwSjdcsj[0]),
        "ckrwEndSjdcsj": tsf_date(this.form.ckrwSjdcsj[1]),
        "ckrwNo": this.form.ckrwNo,
        "ckrwWls": this.form.ckrwWls,
        "ckrwCph": this.form.ckrwCph,
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
    multiSelectClick: function () {
      this.multiSelect = !this.multiSelect;
    },                                      //多选 状态维护
    multiSelectionChange: function (val) {
      /*<debug>*/
      console.log(this.multipleSelection);
      /*</debug>*/
      this.multipleSelection = val;
    },                               //多选 选中控制
    multiOperationShipment: function () {
      var _this = this;
      _this.$confirm('此操作将此任务单据发运, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        remove(row, _this.warehousingTask);
        postDelete(_this, {
          id: [row.rkdjNo]
        });
      }).catch(function () {
        _this.$message({
          type: 'info',
          message: '已取消发运'
        });
      });
    },                                //多选-发运

    inlineShipment: function (index, row) {
      var _this = this;
      _this.$confirm('此操作将此任务单据发运 任务号：' + row.ckrwNo, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        p[1].post({
          "ids": [row.ckrwId],
          "useId": app.rmsUser.ruUserId,
          "userName": app.rmsUser.ruUserName
        }, function (json) {
          this.callbackAfter({status: json.status, model: '任务单据发运'}, function () {
            p[0].post(obj.option);
          })
        });
      }).catch(function () {
        _this.$message({
          type: 'info',
          message: '已取消发运'
        });
      });
    },                              //行内按钮--发运


    inlinePrintCarrierAgreement: function (index, row) {
      obj.$confirm('打印承运协议 任务号：' + row.ckrwNo, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        p[3].post({
          id: row.ckrwId
        }, function (json) {
          var step = _printDatas_p1_info();
          allPrposCb(step, function (obj2, index) {
            if (typeof json.model[json.model.length - 1][index] !== 'undefined') step[index] = json.model[json.model.length - 1][index];
          });
          obj.printDatas.info = step;
          json.model.pop();
          for (var i = 0; i < json.model.length; i++) {
            json.model[i]['体积'] = json.model[i]['体积'].toFixed(4);
          }
          obj.printDatas.data = json.model;

          wap.print1(obj);
        });
      }).catch(function () {
        obj.$message({
          type: 'info',
          message: '已取消打印'
        });
      });
    },                 //行内按钮-打印承运协议


    expandChange: function (row, expanded) {
      if (expanded && (typeof (row.mfunckDoc) === 'undefined' || row.mfunckDoc === null || row.mfunckDoc.length === 0)) {
        p[102].post({
          id: row.ckrwId,
          arehouseId: window.dbmessage.baseArehouses[0].baArehouseId
        }, function (json) {
          /*<debug>*/
          console.log(json);
          /*</debug>*/
          row.mfunckDoc = json.model;
        });
      }
      /*<debug>*/
      console.log(row);
      console.log(expanded);
      /*</debug>*/
    },
    dblClick: function (row, event) {
      if (row.mfunckDocs === null || typeof row.mfunckDocs === 'undefined' || row.mfunckDocs.length < 1) {
        p[101].post({id: row.ckCkdjId}, function (json) {
          obj.lists = formList();
          row.mfunckDocs = json.model;
          obj.lists.data = row.mfunckDocs;
          obj.lists.ckCkdjNo = row.ckCkdjNo;
          obj.lists.ckRwStatus = row.ckRwStatus;
          obj.dialogListsVisible = true;
        })
      } else {
        obj.lists.data = row.mfunckDocs;
        obj.lists.ckCkdjNo = row.ckCkdjNo;
        obj.lists.ckRwStatus = row.ckRwStatus;
        obj.dialogListsVisible = true;
      }
    },
    dblClick2: function (row, event) {
      if (this.lists.ckRwStatus < 51) {
        this.lists2.row = row;
        this.lists2.cksFyCount = 0;
        this.lists2.cksFyCountMax = row.cksFyCount;
        this.dialogLists2Visible = true;
      }
    },

    submitLists: function () {
      var step = postLists2();

      allPrposCb(step, function (obj2, index) {
        if (typeof obj.lists2.row[index] !== 'undefined') step[index] = obj.lists2.row[index];
      });
      step.cksFyCount = obj.lists2.cksFyCount;
      step.userId = app.rmsUser.ruUserId;

      p[2].post(step, function (json) {
        this.callbackAfter({status: json.status, model: '修改发运数量'}, function () {
          obj.dialogLists2Visible = false;
          obj.lists2.row.cksFyCount = obj.lists2.cksFyCount;
        });
      })
    },
    submitListsCancel: function () {
      this.dialogLists2Visible = false
    },


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
    newInput: function () {
      this.dialogFormVisible = true;

    },                                              //按钮 新建入库单
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
    GoodClick: function (item) {
      if (this.dialogDistributionForm) return;
      this.form.saveARkDocsList = true;
      this.form.deleteARkDocsList = false;
      this.form.selectGood = item;
    },
    cellDblClick: function (row, column, cell, event) {
      console.log(row, column, cell, event);
    },
    auto_ckrwStatus: function (value) {
      var temp = {};
      if (!isNaN(value)) {
        temp = {
          10: '初始',
          11: '已下发',
          21: '已挑选',
          31: '已激活',
          41: '部分出库',
          42: '全部出库',
          51: '部分发运',
          52: '全部发运'
        }
      } else {
        temp = {
          '初始': 10,
          '已下发': 11,
          '已挑选': 21,
          '已激活': 31,
          '部分出库': 41,
          '全部出库': 42,
          '部分发运': 51,
          '全部发运': 52
        }
      }
      return temp[value];
    },                                  //任务状态
    auto_ckrwQhStatus: function (value) {
      var temp = {};
      if (!isNaN(value)) {
        temp = {
          1: '欠货',
          2: '未欠货'
        }
      } else {
        temp = {
          '欠货': 1,
          '未欠货': 2

        }
      }
      return temp[value];
    },                                //欠货状态
    auto_ckrwZlStatus: function (value) {
      var temp = {};
      if (!isNaN(value)) {
        temp = {
          1: '滞留',
          2: '未滞留'
        }
      } else {
        temp = {
          '滞留': 1,
          '未滞留': 2

        }
      }
      return temp[value];
    },                                //滞留状态
    auto_ckStatus: function (value) {
      var temp = {};
      if (!isNaN(value)) {
        temp = {
          1: '原始状态',
          21: '部分分拣',
          22: '部分下架',
          31: '全部分拣',
          32: '全部下架',
          50: '作废',


        }
      } else {
        temp = {
          '原始状态': 1,
          '部分分拣': 21,
          '部分下架': 22,
          '全部分拣': 31,
          '全部下架': 32,
          '作废': 50


        }
      }
      return temp[value];
    },                                   //单据状态

  },
  watch: {
    ckrwNo: function () {
      /*<debug>*/
      console.log((_option ? this.form_pop : this.option));
      /*</debug>*/
      p[0].post((_option ? this.form_pop : this.option));
    },
    ckrwCph: function () {
      /*<debug>*/
      console.log((_option ? this.form_pop : this.option));
      /*</debug>*/
      p[0].post((_option ? this.form_pop : this.option));
    },
  }
});
// 高级 监视器的 使用方法
outputShipment.$watch('date', function () {
  /*<debug>*/
  console.log((_option ? this.form_pop : this.option));
  /*</debug>*/
  p[0].post((_option ? this.form_pop : this.option));
}, {deep: true});

function _form() {
  return {
    ckrwCph: '',                    //模糊查询--车牌号
    ckrwWls: '',                    //模糊查询--物流商
    ckrwNo: '',                    //模糊查询--任务号
    ckrwGreatTime: [null, null], //模糊查询--制作时间
    ckrwYjdcsj: [null, null],      //模糊查询--预计到车时间
    ckrwSjdcsj: [null, null],      //模糊查询--实际到车时间

  }
}

var obj = outputShipment;
var p = [];
// 0 出库发运 分页查询
p[0] = autoPost({
  urlHock: "../../hock/outputShipment/page.json",
  urlProd: "/route/outputShipment/0",
  success: function (json) {
    for (var i = 0; i < json.data.length; i++) {
      json.data[i].mfunckDoc = [];
    }
    obj.$data.outputShipment = json.data;
    obj.$data.currentTotal = json.recordsFiltered;
  }
});
// 1 出库发运 发运
p[1] = autoPost({
  urlHock: "../../hock/outputShipment/page.json",
  urlProd: "/route/outputShipment/1",
  method: 'GET'
});
// 2 出库发运-修改发运数量
p[2] = autoPost({
  urlHock: "../../hock/outputShipment/page.json",
  urlProd: "/route/outputShipment/2"
});
// 3 出库发运-打印承运协议
p[3] = autoPost({
  urlHock: "../../hock/outputShipment/page.json",
  urlProd: "/route/outputShipment/3"
});
// 101 查询-出库单号-出库明细
p[101] = autoPost({
  urlHock: "/hock/warehousingTask/mfunckDoc.json",
  urlProd: "/route/outboundTask/2"
});
// 102 查询-入库任务详情
p[102] = autoPost({
  urlHock: "/hock/warehousingTask/rwmfunckDoc.json",
  urlProd: "/route/outboundTask/1"
});

function selectGood() {
  return {
    baseGoods: {
      bgGoodsNo: '',
      bgGoodsName: ''
    },
    baseDw: {
      bdName: ''
    },
    rksCount: 0,
    bgGoodsId: ''
  }
}
function formList() {
  return {
    data: [],
    ckRwStatus: 0,

    ckCkdjNo: '',
    dialogLocationVisible: false,
    locationLoading: false,

    sort: formListSort()
  }
}
function formListSort() {
  return {
    "cksCkmxId": 1,
    "cksCkfs": "X",  // X K P

    cksLocationId: 1,

    baseLocation: {
      blLocationId: 1,
      blLname: ''
    },
    cksZdpc: auto_time_new(new Date(), 3),
    index: 0
  }
}
function formListChange() {
  return {
    cksCkmxId: '',
    cksGoodsId: '',
    cksGoodsCount: '',
    cksDwid: '',
    cksCkfs: '',
    cksLocationId: '',
    cksStatus: '',
    cksCkdjId: '',
    cksFyCount: ''
  }
}
function lists2Form() {
  return {
    title: '',
    row: {
      cksFyCount: 0,
      baseGoods: {bgGoodsNo: ''}
    },
    cksFyCount: 0,
    cksFyCountMax: 0,
  }
}
function postLists2() {
  return {
    "cksCkmxId": '出库明细ID',
    "cksGoodsId": '货品ID',
    "cksGoodsCount": '货品数量',
    "cksDwid": '单位ID',
    "cksCkfs": '出库方式（分拣方式）',
    "cksLocationId": '货品库存ID',
    "cksStatus": '出库单明细 发货状态',
    "cksCkdjId": '出库单据ID',
    "cksFyCount": '修改后的发运数量'
  }
}
p[0].post(outputShipment.option);

