var warehousingReservation = new Vue({
  el: '#warehousingReservation',
  prop: {},
  data: function () {
    return {
      baseArehouses: window.dbmessage.baseArehouses,
      baseRkType: window.rkType,


      warehousingReservation: [],
      warehousingReservationCombinationDetails: CombinationDetails(),
      warehousingReservationCombination: [],
      multipleSelection: [],
      multipleSelectionCombination: [],
      multiSelect: false,
      date: [null, null],           //主页面 选择日期 搜索
      rkRkdjNo: '',                 //主页面 入库单号 搜索
      bgGoodsNo: '',                //主页面 货品编号 搜索
      rkRwStatus: 0,                //主页面 入库单任务状态 搜索
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

      formLabelWidth: '120px',       //表单 配置
      form: _form(),                  //表单 弹出层 信息集合
      form_rule1: autoValidate(validate_form1()), //表单验证规则
      form_rule2: autoValidate(validate_form2()), //表单验证规则

      rule_warehousingReservationCombinationDetails: autoValidate(validate_warehousingReservationCombinationDetails()), //预约详细验证规则


      dialogFormActive: 0,           //新建 弹出层 steps 当前进度
      dialogFormVisible: false,      //新建 弹出层 是否可见
      submitLoading: false,          //新建 弹出层 提交等待

      dialogExcelVisible: false,     //Excel 弹出层 是否可见
      excelLoading: false,           //Excel 弹出层 提交等待

      formActive: 0,                 //form steps 当前进度

      select: {},                    //搜索 弹出层 信息集合
      dialogSelectVisible: false,
      selectLoading: false,
      fileList: [],

      watchView: false,               //观察状态量-是否为查看
    }
  },
  computed: {
    option: function () {
      return {
        "draw": 1,
        "pageNum": this.currentPage,
        "pageSize": this.pageSize,
        "startTimeParam": tsf_date(this.date[0]),
        "endTimeParam": tsf_date(this.date[1]),
        rkRkdjNo: this.rkRkdjNo,
        "goodsNo": this.bgGoodsNo.trim(),
        rkRwStatus: this.rkRwStatus,
        rkStatus: 1,
        rkArehouseId: this.rkArehouseId
      }
    },

  },
  methods: {
    View: function (index, row) {
      p[8].post({rkRkdjId: row.rkRkdjId}, function (json) {
        var step = _form();
        allPrposCb(step, function (obj, index) {
          if (typeof row[index] !== 'undefined') step[index] = row[index];
        });
        /*<debug>*/
        console.log(row);
        console.log(step);
        /*</debug>*/
        step.title = '查看';
        obj.watchView = true;
        step.rkDocsList = json;
        if (typeof obj.$refs.carousel !== 'undefined') obj.$refs.carousel.setActiveItem(0);
        obj.form = step;
        obj.dialogFormActive = 0;
        obj.dialogFormVisible = true;
      });


    },                                        //行内按钮-观察
    Edit: function (index, row) {
      p[8].post({rkRkdjId: row.rkRkdjId}, function (json) {
        var step = _form();
        allPrposCb(step, function (obj, index) {
          if (typeof row[index] !== 'undefined') step[index] = row[index];
        });
        /*<debug>*/
        console.log(row);
        console.log(step);
        /*</debug>*/
        step.title = '编辑';
        obj.watchView = false;
        step.rkDocsList = json;
        if (typeof obj.$refs.carousel !== 'undefined') obj.$refs.carousel.setActiveItem(0);
        obj.form = step;
        obj.dialogFormActive = 0;
        obj.dialogFormVisible = true;
      });
    },                                        //行内按钮-编辑
    deleteOlder: function (index, row) {
      var _this = this;
      _this.$confirm('此操作将永久删除该入库单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        p[11].post({
          ids: [row.rkRkdjId],
          userId: app.rmsUser.ruUserId
        }, function (json) {
          this.callbackAfter({status: json.status, model: '删除该入库单'}, function () {
            remove(row, _this.warehousingReservation);
          });
        });
      }).catch(function () {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },                                 //行内按钮-删除
    multiSelectClick: function () {
      this.multiSelect = !this.multiSelect;
    },                                      //多选 状态维护
    handleSelectionChange: function (val, row) {
      /*<debug>*/
      console.log(addOrDelete(row, val));
      /*</debug>*/
      if (addOrDelete(row, val)) {
        this.warehousingReservationCombination.push(row);
      } else {
        remove(row, this.warehousingReservationCombination);
      }
      this.multipleSelection = val;
    },                         //多选 选中控制
    handleSelectionChangeAll: function (val) {
      if (val.length > 0) {
        for (var i = 0; i < val.length; i++) {
          if (!addOrDelete(val[i], this.warehousingReservationCombination)) {
            this.warehousingReservationCombination.push(val[i]);
          }
        }
      } else {
        for (var i = 0; i < this.warehousingReservation.length; i++) {
          remove(this.warehousingReservation[i], this.warehousingReservationCombination);
        }
      }
      this.multipleSelection = val;
    },                           //多选 选中控制
    handleSelectionChangeCombination: function (val) {
      /*<debug>*/
      console.log(this.multipleSelectionCombination);
      /*</debug>*/
      this.multipleSelectionCombination = val;
    },                   //Combination 选中控制
    moreOperationDelete: function () {
      /*<debug>*/
      console.log('选中的删除');
      /*</debug>*/
      for (i = 0; i < this.multipleSelectionCombination.length; i++) {
        remove(this.multipleSelectionCombination[i], this.warehousingReservationCombination);
      }
    },                                   //多选 删除
    handleSizeChange: function (val) {
      /*<debug>*/
      console.log('每页' + val + '条');
      /*</debug>*/
      this.pageSize = val;
      p[7].post(this.option);
    },                                   //分页 Size
    handleCurrentChange: function (val) {
      /*<debug>*/
      console.log('当前第' + val + '页');
      /*</debug>*/
      this.currentPage = val;
      p[7].post(this.option);
    },                                //分页 当前页
    newInput: function () {
      var No = this.form.rkRkdjNo;
      var Id = this.form.rkRkdjId;
      obj.form = _form();
      if (No === '' || Id !== '') {
        p[9].post();
      } else if (Id === '') {
        this.form.rkRkdjNo = No;
      }

      if (typeof obj.$refs.carousel !== 'undefined') obj.$refs.carousel.setActiveItem(0);
      obj.dialogFormActive = 0;
      obj.dialogFormVisible = true;
    },                                              //按钮 新建入库单
    importExcel: function () {
      this.dialogExcelVisible = true;
    },                                           //TODO 按钮 导入Excel
    setInterface: function () {
//                this.dialogFormVisible = true;
    },                                          //TODO 按钮 接口设置
    expandChange: function (row, expanded) {
//                if (typeof (row.history) == 'undefined') {
//                    postHistory(row);
//                }
//                console.log(row);
    },                             //下拉 选择
    rowSelection: function (row, selected) {
//                console.log(selected)
    },                             //选中 当前行
    prevForm: function () {
      this.formActive--;
      this.$refs.carouselWaiting.prev();
    },                                              //form 前一个
    nextForm: function () {
      if (this.warehousingReservationCombinationDetails.rkrwNo === "") {
        p[10].post();
      }
      this.warehousingReservationCombinationDetails.rkrwDhrq = new Date();
      this.formActive++;
      this.$refs.carouselWaiting.next();
    },                                              //form 后一个
    submitForm: function () {
      var _this = this;
      this.$refs['ref_warehousingReservationCombinationDetails'].validate(function (valid) {
        if (valid) {
          this.formActive++;
          this.submitLoading = true;
          /*<prod>*/
          var Combination = post_Combination();

          allPrposCb(Combination, function (obj, index) {
            if (typeof _this.warehousingReservationCombinationDetails[index] !== 'undefined') Combination[index] = _this.warehousingReservationCombinationDetails[index];
          });
          Combination.docList = [];
          for (var i = 0; i < warehousingReservation.warehousingReservationCombination.length; i++) {
            Combination.docList.push({rkRkdjId: warehousingReservation.warehousingReservationCombination[i].rkRkdjId});
          }

          Combination.rkrwDhrq = new Date(Combination.rkrwDhrq).toJSON();

          console.log(Combination);


          p[0].post(Combination);

          /*</prod>*/


          /*<debug>*/
          setTimeout(function () {
            _this.submitLoading = false;
            _this.$notify({
              title: '成功',
              message: '保存成功！',
              type: 'success'
            });
//                    _this.$refs['warehousingReservationCombinationDetails'].resetFields();
            _this.warehousingReservationCombinationDetails = CombinationDetails();
            _this.warehousingReservationCombination = [];
            _this.multipleSelection = [];
            _this.multipleSelectionCombination = [];

            _this.formActive = 0;
            _this.$refs.carouselWaiting.setActiveItem(0);
            p[7].post();
          }, 1500);
          /*</debug>*/
        } else {
          return false;
        }
      });
    },                                            //组合 表单提交
    submitUpload: function () {
      console.log('提交')
    },

    prev: function () {
      this.dialogFormActive--;
      this.$refs.carousel.prev();
    },                                                  //新建 弹出层banner控制 前一个
    next: function (ref) {
      this.$refs[ref].validate(function (valid) {
        if (valid) {
          obj.dialogFormActive++;
          obj.$refs.carousel.next();
        } else {
          return false;
        }
      });

    },                                               //新建入库单据 弹出层banner控制 后一个
    submit: function () {
      var _this = this;
      this.dialogFormActive++;
      this.submitLoading = true;

      /*<prod>*/
      var form = post_form();

      allPrposCb(form, function (obj, index) {
        if (typeof _this.form[index] !== 'undefined') form[index] = _this.form[index];
      });

      form.rkCreatetime = new Date().toJSON();
      form.rkDocsList = [];
      for (var i = 0; i < _this.form.rkDocsList.length; i++) {
        var form_rkDocsList = post_form_rkDocsList();
        (function (i, form_rkDocsList) {
          allPrposCb(form_rkDocsList, function (val, index) {
            if (typeof _this.form.rkDocsList[i][index] !== 'undefined') form_rkDocsList[index] = _this.form.rkDocsList[i][index];
          })
        })(i, form_rkDocsList);
        form.rkDocsList.push(form_rkDocsList);
      }
      if (this.form.title === '新建入库单') {
        p[2].post(form);
      } else {
        form.rkUserId = app.rmsUser.ruUserId;
        p[3].post(form);
      }
      /*</prod>*/


      /*<debug>*/
      setTimeout(function () {
        _this.submitLoading = false;
        _this.$notify({
          title: '成功',
          message: '保存成功！',
          type: 'success'
        });
        _this.dialogFormVisible = false;
        _this.form = _form();
        _this.dialogFormActive = 0;
        _this.$refs.carousel.setActiveItem(0);
        p[7].post(warehousingReservation.options);
      }, 1500);
      /*</debug>*/

    },                                                //新建 表单提交
    submitWatchView: function () {
      this.dialogFormActive++;
      this.dialogFormVisible = false;
      this.form = _form();
      this.dialogFormActive = 0;
      this.$refs.carousel.setActiveItem(0);
    },                                       //观察提交


    querySearchAsync_car: function (queryString, cb) {
      postCars(this, {
        bcCph: queryString,
        "pageNum": 1,
        "pageSize": 20,
        "draw": 1
      }, cb);
    },
    CarSelect: function (item) {
      this.warehousingReservationCombinationDetails.selectCar = item.data;
      this.warehousingReservationCombinationDetails.rkrwSjxm=item.data.bcSjxm;
      this.warehousingReservationCombinationDetails.rkrwDh=item.data.bcSjdh;
      obj.$refs['ref_warehousingReservationCombinationDetails'].validateField('rkrwCph', function (valid) {
        return valid;
      });
    },                                        //货品明细控制 选中下拉菜单中的货品


    querySearchAsync: function (queryString, cb) {
      postGoods(this, {
        bgGoodsNo: queryString,
        "pageNum": 1,
        "pageSize": 20,
        "draw": 1
      }, cb);
    },                       //货品异步查询
    GoodSelect: function (item) {
      this.form.selectGood = selectGood();
      this.form.saveARkDocsList = false;
      this.form.deleteARkDocsList = true;
      this.form.selectGood = {
        baseGoods: {
          bgGoodsNo: item.data.bgGoodsNo,
          bgGoodsName: item.data.bgGoodsName
        },
        baseDw: {
          bdDwid: item.data.bgZxdw,
          bdName: item.data.bgZxdw
        },
        rksCount: 0,
        rksDwid: 1,
        rksGoodsId: item.data.bgGoodsId,
        data: item.data
      };
      obj.$refs.ref_rksCount.$el.querySelector('input').focus();
    },                                        //货品明细控制 选中下拉菜单中的货品
    GoodClick: function (item) {
      this.form.saveARkDocsList = true;
      this.form.deleteARkDocsList = false;
      this.form.selectGood = item;
      obj.$nextTick(function () {
        obj.$refs.ref_rksCount.$el.querySelector('input').focus();
      });
    },                                         //货品明细控制 选中form中的货品
    GoodEnter: function () {
      if (this.form.deleteARkDocsList === false) {
        this.form.selectGood = selectGood();
        this.form.saveARkDocsList = true;
        this.form.deleteARkDocsList = true;
        obj.$nextTick(function () {
          obj.$refs.ref_bgGoodsNo.$el.querySelector('input').focus();
        });
      } else if (this.form.saveARkDocsList === false && this.form.selectGood.rksCount !== 0) {
        this.saveDocsList();
      }
    },
    saveDocsList: function () {
      this.$refs['refForm2'].validate(function (valid) {
        if (valid) {
          obj.form.rkDocsList.push(obj.form.selectGood);
          obj.form.selectGood = selectGood();
          obj.form.saveARkDocsList = true;
          obj.$nextTick(function () {
            obj.$refs.ref_bgGoodsNo.$el.querySelector('input').focus();
          });
        } else {
          return false;
        }
      });

    },                                          //货品明细控制 保存
    deleteARkDocsList: function () {
      remove(this.form.selectGood, this.form.rkDocsList);
      this.form.selectGood = selectGood();
      this.form.deleteARkDocsList = true;
    },                                     //货品明细控制 删除

    selectSubmit: function () {
      this.dialogSelectVisible = false;
    },                                          //详细查询 查询提交

    auto_rkArehouseId: function (data, set) {
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
    auto_rkCreatetime: function (value, bool) {
      if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年 MM月 dd日');
      else return dateFormat(new Date(parseInt(value)), 'MM-dd');
    },                          //下单时间/创建方式
    auto_rkType: function (value) {
      return this.baseRkType[value];
    },                                      //
    auto_rkStatus: function (value) {
      var temp = {}
      if (!isNaN(value)) {
        temp = {
          1: '原始状态',
          21: '部分分配',
          22: '全部分配',
          31: '部分收货',
          32: '全部收货 ',
        }
      } else {
        temp = {
          '原始状态': 1,
          '部分分配': 21,
          '全部分配': 22,
          '部分收货': 31,
          '全部收货 ': 32,


        }
      }
      return temp[value];
    },                                    //单据状态
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
    warehousingReservation: function () {

    },
    form: function () {
      if (isNaN(this.form.selectGood.count)) {
        this.saveARkDocsList = false;
      }
    },
    rkRkdjNo: function () {
      /*<debug>*/
      console.log(this.option);
      /*</debug>*/
      p[7].post(this.option);
    },
    bgGoodsNo: function () {
      /*<debug>*/
      console.log(this.option);
      /*</debug>*/
      p[7].post(this.option);
    },
    rkRwStatus: function () {
      /*<debug>*/
      console.log(this.option);
      /*</debug>*/
      p[7].post(this.option);
    },
    rkArehouseId: function () {
      /*<debug>*/
      console.log(this.option);
      /*</debug>*/
      p[7].post(this.option);
    }
  }
});
var obj = warehousingReservation;
var p = [];
// 0 新增-入库预约
p[0] = autoPost({
  urlHock: "../../hock/form/inputOption.json",
  urlProd: "/route/warehousingReservation/0",
  method: 'GET',
  success: function (json) {
    obj = warehousingReservation;
    obj.dialogFormVisible = false;
    obj.submitLoading = false;
    if (json.status > 19999 && json.status < 30000) {
      /*<debug>*/
      obj.$notify({
        title: '成功',
        message: '保存成功',
        type: 'success'
      });
      /*</debug>*/
      /*<prod>*/
      obj.$notify({
        title: '成功',
        message: '保存成功',
        type: 'success'
      });
      /*</prod>*/
      obj.warehousingReservationCombinationDetails = CombinationDetails();
      obj.warehousingReservationCombination = [];
      obj.multipleSelection = [];
      obj.multipleSelectionCombination = [];

      obj.formActive = 0;
      obj.$refs.carouselWaiting.setActiveItem(0);
      p[7].post(warehousingReservation.option);
    } else {
      /*<debug>*/
      obj.$notify({
        title: '失败',
        message: '保存失败',
        type: 'error'
      });
      /*</debug>*/
      /*<prod>*/
      obj.$notify({
        title: '失败',
        message: window.statusConfig[json.status],
        type: 'error'
      });
      /*</prod>*/
    }
  }
});
// 2 新增-入库单
p[2] = autoPost({
  urlHock: "../../hock/form/inputOption.json",
  urlProd: "/route/warehousingReservation/2",
  method: 'GET',
  success: function (json) {
    obj.dialogFormVisible = false;
    obj.submitLoading = false;
    if (json.status > 19999 && json.status < 30000) {
      obj.$notify({
        title: '成功',
        message: '保存成功！',
        type: 'success'
      });
      obj.form = _form();
      obj.dialogFormActive = 0;
      obj.$refs.carousel.setActiveItem(0);
      p[7].post(obj.option);
    } else {
      obj.$notify({
        title: '失败',
        message: json.model,
        type: 'error'
      });
    }
  }
});
// 3 编辑-入库单
p[3] = autoPost({
  urlHock: "../../hock/form/inputOption.json",
  urlProd: "/route/warehousingReservation/3",
  method: 'GET',
  success: function (json) {
    obj.dialogFormVisible = false;
    obj.submitLoading = false;
    if (json.status > 19999 && json.status < 30000) {
      obj.$notify({
        title: '成功',
        message: '保存成功！',
        type: 'success'
      });
      obj.form = _form();
      obj.dialogFormActive = 0;
      obj.$refs.carousel.setActiveItem(0);
      p[7].post(obj.option);
    } else {
      obj.$notify({
        title: '失败',
        message: json.model,
        type: 'error'
      });
    }
  }
});
// 7 入库预约分页查询接口
p[7] = autoPost({
  urlHock: "../../hock/form/inputOption.json",
  urlProd: "/route/warehousingReservation/7",
  success: function (json) {
    obj.dialogFormVisible = false;
    obj.submitLoading = false;
    /*<debug>*/
    console.log(json);
    /*</debug>*/
    obj.$data.warehousingReservation = json.data;
  }
});
// 8 入库单 详细信息
p[8] = autoPost({
  urlHock: "../../hock/form/inputOption.json",
  urlProd: "/route/warehousingReservation/8",
  method: 'GET'
});
// 9 入库任务 单号
p[9] = autoPost({
  urlHock: "/hock/warehousingReservation/rkrwNo.json",
  urlProd: "/route/warehousingReservation/9",
  success: function (json) {
    obj.showLoading = false;
    this.callbackAfter({status: json.status, model: '获取入库单据单号'}, function () {
      obj.form.rkRkdjNo = json.model;
      obj.dialogFormVisible = true;
    });
  }
});
// 10 入库单据 单号
p[10] = autoPost({
  urlHock: "/hock/warehousingReservation/rkdjNo.json",
  urlProd: "/route/warehousingReservation/10",
  success: function (json) {
    obj.showLoading = false;
    this.callbackAfter({status: json.status, model: '获取入库任务单号'}, function () {
      obj.warehousingReservationCombinationDetails.rkrwNo = json.model;
    });
  }
});
// 11 入库单据 单号
p[11] = autoPost({
  urlHock: "/hock/warehousingReservation/rkdjNo.json",
  urlProd: "/route/warehousingReservation/11",
  method: 'GET'
});


//101 查询-入库单号-入库明细
p[101] = autoPost({
  urlHock: "/hock/warehousingTask/docList.json",
  urlProd: "/route/inputOperation/3",
  method: 'GET'
});

function CombinationDetails() {
  return {
    rkrwId: '',         //id
    rkrwNo: '',         //入库任务号
    rkrwDhrq: '',       //预计到货日期
    rkrwDbd: '',        //调拨地
    rkrwCys: '',        //承运商
    rkrwCph: '',        //车牌号
    rkrwSjxm: '',       //司机姓名
    rkrwDh: '',         //司机电话
    rkrwStatus: '',      //任务状态
    selectCar: _selectCar(),
  }
}

function selectGood() {
  return {
    baseGoods: {
      bgGoodsNo: '',
      bgGoodsName: ''
    },
    baseDw: {
      bdDwid: '',
      bdName: ''
    },
    rksCount: 0,
    rksDwid: '',
    rksGoodsId: ''
  }
}

function _selectCar() {
  return {
    "bcId": 3,
    "bcCph": "1",
    "bcSjxm": "21",
    "bcSjdh": "21"
  }
}

function _form() {
  return {
    rkRkdjId: '',

    title: '新建入库单',
    rkRkdjNo: '',
    rkRemarks: '',
    rkDocsList: [],

    rkArehouseId: '',
    rkType: '',

    rkUserId: app.rmsUser.ruUserId,
    rkCreatetime: '',
    rkCreateUserId: app.rmsUser.ruUserId,

    "rkStatus": 1,
    "rkRwStatus": 1,
    "rkZdfs": 1,
    "rkStartwith": 1,

    allCount: 0,
    allTj: 0,

    bgGoodsNo: '',
    selectGood: selectGood(),
    saveARkDocsList: true,
    deleteARkDocsList: true
  };
}

function validate_form1() {
  return {
    rkRkdjNo: 'vNull',
    rkArehouseId: 'vNull',
    rkType: 'vNull'
  }
}
function validate_form2() {
  return {
    rksCount: ['vNull', 'vNumber', 'vNumberZZ', 'vWS4'],
  }
}
function validate_warehousingReservationCombinationDetails() {
  return {
    rkrwNo: 'vNull',
    rkrwDbd: 'vNull',
    rkrwCph: 'vNull',
    rkrwDh: 'vNull',
    rkrwDhrq: 'vNull',
    rkrwCys: 'vNull',
    rkrwSjxm: 'vNull',
  }
}

function post_form() {
  return {
    "rkRkdjId": "",
    "rkRkdjNo": "L0197168",
    "rkType": "1",
    "rkGysmc": "供应商001",
    "rkRemarks": "备注",
    "rkUserId": 1,
    "rkCreatetime": "2017-04-11T06:35:12.029Z",
    "rkCreateUserId": 1,
    "rkZdfs": 1,
    "rkStartwith": 2,
    "rkStatus": 31,
    "rkArehouseId": 1,
    "rkClientId": 1,
    "rkPrintcount": 0,
    "rkRwId": 0,
    "rkRwStatus": "51",
    rkDocsList: []
  }
}

function post_form_rkDocsList() {
  return {
    "rksGoodsId": 9,
    "rksDwid": 1,
    "rksCount": 100,
    "rksStatus": 1
  }
}

function post_Combination() {
  return {
    "rkrwId": 0,
    "rkrwNo": "string",
    "rkrwDhrq": "2017-04-13T08:25:12.866Z",
    "rkrwDbd": "string",
    "rkrwCys": "string",
    "rkrwCph": "string",
    "rkrwSjxm": "string",
    "rkrwDh": "string",
    "rkrwStatus": "string",
    "rkrwArehouseId": 0,
    "rkrwClientId": 0,
    "rkrwCreateUserid": app.rmsUser.ruUserId,
    docList: []
  }
}


// 高级 监视器的 使用方法
warehousingReservation.$watch('date', function () {
  /*<debug>*/
  console.log(this.option);
  /*</debug>*/
  p[7].post(this.option);
}, {deep: true});

warehousingReservation.$watch('form.title', function () {
  if (this.form.title === '查看') this.watchView = true;
  else this.watchView = false;
}, {deep: true});


p[7].post(warehousingReservation.option);
function postGoods(obj, option, cb) {

  /*<debug>*/
  url = "/hock/form/rkGoods.json";
  /*</debug>*/

  /*<prod>*/
  url = "/route/goodsManage/0";
  /*</prod>*/

  $.ajax(url, {
    type: "GET",
    data: option,
    success: function (json) {
      json = json.data;
      if (json[0].bgGoodsNo === obj.form.selectGood.baseGoods.bgGoodsNo) {
        obj.form.selectGood = {
          baseGoods: {
            bgGoodsNo: json[0].bgGoodsNo,
            bgGoodsName: json[0].bgGoodsName
          },
          baseDw: {
            bdDwid: json[0].bgZxdw,
            bdName: json[0].bgZxdw
          },
          rksCount: 0,
          rksDwid: json[0].bgZxdw,
          rksGoodsId: json[0].bgGoodsId,
          data: json[0]
        };
        obj.form.saveARkDocsList = false;
      } else {
        obj.form.selectGood.rksGoodsId = 0;
        obj.form.saveARkDocsList = true;
      }
      var step = [];
      var length = json.length > 20 ? 20 : json.length;
      for (var i = 0; i < length; i++) {
        step.push({data: json[i], value: json[i].bgGoodsNo})
      }
      cb(step);
    },
    complete: function () {

    }
  });
}          // 4 获取货品编号


function postCars(obj, option, cb) {
  $.ajax('/route/carrierVehicleManagement/0', {
    type: "POST",
    data: option,
    success: function (json) {
      json = json.data;
      if(json.length===0)return cb([]);
      if (json[0].bcCph === obj.warehousingReservationCombinationDetails.rkrwCph) {
        obj.warehousingReservationCombinationDetails.selectCar = json[0];
        obj.warehousingReservationCombinationDetails.rkrwSjxm=json[0].bcSjxm;
        obj.warehousingReservationCombinationDetails.rkrwDh=json[0].bcSjdh;
      }
      var step = [];
      var length = json.length > 20 ? 20 : json.length;
      for (var i = 0; i < length; i++) {
        step.push({data: json[i], value: json[i].bcCph})
      }
      cb(step);
    },
    complete: function () {

    }
  });
}