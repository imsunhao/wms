/*<debug>*/
(function () {
  window.dbmessage = {};
  window.dbmessage.baseArehouses = JSON.parse('[{"baArehouseId":4,"baName":"无限极济阳仓A91","baAddr":"济南市济阳县","baScity":"齐河","baScontacts":"联系人1","baPhone":"13112345678","baAcreage":"222","baCtype":"22","baHumidity":"222","baFax":"2222","baPostoffice":"test","baIsti":1,"baStatus":1,"baClientId":3,"baRemarks":"test","baCreatetime":1487233193000,"baPgroupinfo":"eeeeeeeeeeeee","arehouseKqs":[]},{"baArehouseId":5,"baName":"九阳济南仓A02","baAddr":"济南市济阳278号","baScity":"齐河","baScontacts":"联系人1","baPhone":"13012345678","baAcreage":"222","baCtype":"111","baHumidity":"222","baFax":"2222","baPostoffice":"test","baIsti":2,"baStatus":1,"baClientId":1,"baRemarks":"test","baCreatetime":1487838047000,"baPgroupinfo":"eeeeeeeeeeeee","arehouseKqs":[]}]');
})();
/*</debug>*/
var inputOperation = new Vue({
  el: '#inputOperation',
  prop: {},
  data: function () {
    return {
      baseArehouses: window.dbmessage.baseArehouses,
      baseRkType: window.rkType,
      validateRkRkdjNo: function (rule, value, callback) {
        if (validateRule.a.exec(value)) {
          callback(new Error('不允许存在特殊字符!'));
        }
        else {
          callback();
        }
      },                  //validate 入库单号
      inputOperation: [],
      multipleSelection: [],
      location: [],
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

      date: [null, null],                 //主页面 选择日期 搜索
      rkRkdjNo: '',                       //主页面 入库单号 搜索
      rkStatus: '',                       //主页面 状态 搜索
      formLabelWidth: '120px',            //表单 配置
      form: form(),                       //表单 弹出层 信息集合
      rule_form: autoValidate(validate_form()), //关联验证规则
      dialogFormActive: 0,                //新建 弹出层 steps 当前进度
      dialogFormVisible: false,           //新建 弹出层 是否可见
      submitLoading: false,               //新建 弹出层 提交等待

      dialogDistributionForm: false,      //分配 弹出层 是否可见
      dialogLocationVisible: false,       //关联 弹出层 是否可见
      select: {},                         //搜索 弹出层 信息集合
      dialogSelectVisible: false,
      selectLoading: false,
      locationLoading: false
    }
  },
  computed: {
    option: function () {
      return {
        "draw": 1,
        "pageNum": this.currentPage,
        "pageSize": this.pageSize,
        "rkRkdjNo": this.rkRkdjNo.trim(),
        "startTimeParam": tsf_date(this.date[0]),
        "endTimeParam": tsf_date(this.date[1]),
        rkArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,
        rkStatus: this.rkStatus
      }
    },
    distributionForm: function () {
      return {
        distribution: this.distribution
      }
    },                                      //分配 表单
  },
  methods: {
    distributionBtn: function (index, row) {
      var step = form();
      obj.location = [];
      allPrposCb(step, function (obj2, index) {
        if (typeof row[index] !== 'undefined') step[index] = row[index];
      });
      /*<debug>*/
      console.log(row);
      console.log(step);
      /*</debug>*/
      step.title = '分配\t:' + row.rkRkdjNo;
      this.form = step;
      this.dialogDistributionForm = true;
      this.dialogFormActive = 1;
      if (this.form.rkStatus === 1) {
        for (var i = 0; i < this.form.rkDocsList.length; i++) {
          this.form.rkDocsList[i].rksKyCount = this.form.rkDocsList[i].rksCount
        }
      }
      if (typeof (this.form.rkDocsList) === 'undefined') {
        postGoods({rkRkdjNo: row.rkRkdjNo}, function (json) {
          obj.form.rkDocsList = json;
          obj.dialogFormVisible = true;
        });
      } else {
        obj.dialogFormVisible = true;
      }
    },                             //分配 行内按钮
    inlineCancelAllocation: function (index, row) {
      var obj = this;
      obj.$confirm('此操作将这单任务单据取消分配, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        p[9].post({
          "ids": [row.rkRkdjId],
          "useId": app.rmsUser.ruUserId
        }, function (json) {
          this.callbackAfter({status: json.status, model: "取消分配"}, function () {
            p[0].post(obj.option);
          })
        })
      }).catch(function () {
        obj.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },                      //行内按钮 取消分配
    inlineGrounding: function (index, row) {
      var obj = this;
      obj.$confirm('此操作将这单任务单据上架, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        p[7].post({
          ids: [row.rkRkdjId],
          userId: app.rmsUser.ruUserId
        }, function (json) {
          this.callbackAfter({status: json.status, model: "上架"}, function () {
            p[0].post(obj.option);
          })
        })
      }).catch(function () {
        obj.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },                             //行内按钮 上架
    distributionBtnSubmit: function () {
      var obj = this;
      this.dialogFormActive++;
      this.submitLoading = true;
      var distributionlists = [];
      for (var i = 0; i < obj.location.length; i++) {
        var step = postDistributionLists();
        step.mdtRkdjId = obj.location[i].selectGood.rksRkdjId;
        step.mdtRkmxId = obj.location[i].selectGood.rksRkmxId;
        step.mdtBatch = obj.location[i].mdtBatch;
        step.mdtLocationId = obj.location[i].mdtLocationId;
        step.mdtDwid = obj.location[i].selectGood.baseDw.bdDwId;
        step.mdtCount = obj.location[i].selectGood.rksCount;
        distributionlists.push(step);
      }
      p[8].post({
        "distributionlists": distributionlists
      }, function (json) {
        obj.submitLoading = false;
        this.callbackAfter({status: json.status, model: '分配'}, function () {
          obj.dialogFormVisible = false;
          obj.form = form();
          obj.dialogFormActive = 0;
          obj.dialogDistributionForm = false;
          p[0].post(obj.option);
        })
      });
    },
    distributionBtnLocation: function (index, row) {
      var step = selectGood();
      allPrposCb(step, function (obj2, index) {
        if (typeof row[index] !== 'undefined') step[index] = row[index];
      });
      this.form.location.selectGood = step;
      this.form.location.index = index;
      this.dialogLocationVisible = true;
    },
    distributionBtnLocationDelete: function (index, row) {
      obj.$confirm('此操作将删除该条库存储位信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        for (var i = 0; i < obj.form.rkDocsList.length; i++) {
          if (obj.form.rkDocsList[i].rksRkmxId === row.selectGood.rksRkmxId) {
            obj.form.rkDocsList[i].rksKyCount += row.selectGood.rksCount;
          }
        }
        remove(row, obj.location);
        obj.$message({
          type: 'success',
          message: '已删除'
        });
      }).catch(function () {
        obj.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    locationSubmit: function () {
      this.$refs['ref_form'].validate(function (valid) {
        if (valid) {
          this.locationLoading = true;
          p[5].post({
            "pageNum": 1,
            "pageSize": 1,
            "draw": 0,
            blLName: obj.form.location.blLname,
            arehouseId: window.dbmessage.baseArehouses[0].baArehouseId
          }, function (json) {
            if (json.data.length === 1 && json.data[0].blLocationId === obj.form.location.blLocationId) {

            } else if (json.data.length === 1) {
              console.log(json.data);
              obj.form.location.mdtLocationId = json.data[0].blLocationId;
            } else {
              obj.$notify({
                title: '失败',
                message: '储位未能找到！',
                type: 'error'
              });
              return false;
            }
            obj.locationLoading = false;
            obj.$notify({
              title: '成功',
              message: '关联成功！',
              type: 'success'
            });
            var step = locationFather();
            allPrposCb(step, function (obj2, index) {
              if (typeof obj.form.location[index] !== 'undefined') step[index] = obj.form.location[index];
            });
            console.log(step);
            obj.location.push(step);
            obj.form.rkDocsList[obj.form.location.index].rksKyCount -= step.selectGood.rksCount;
            obj.form.location = newLocation();
            obj.dialogLocationVisible = false;
          });
        } else {
          return false;
        }
      });

    },                                        //关联 表单提交
    locationSelect: function (item) {
      this.form.saveARkDocsList = false;
      this.form.deleteARkDocsList = true;
      this.form.selectGood = {
        baseGoods: {
          bgGoodsNo: item.data.bgGoodsNo,
          bgGoodsName: item.data.bgGoodsName
        },
        baseDw: {
          bdName: item.data.bgZxdw
        },
        rksCount: 0,
        bgGoodsId: item.data.bgGoodsId,
        data: item.data
      };
    },
    locationClick: function (item) {
      if (!this.dialogLocationVisible) return;
      this.form.saveARkDocsList = true;
      this.form.deleteARkDocsList = false;
      this.form.selectGood = item;
      console.log(item);
    },
    dialogFormActiveOpen: function () {

    },
    handleDelete: function (index, row) {
      console.log(index, row);
    },                                //测试 行内按钮
    filteRrkStatus: function (value, row) {
      return row.rkStatus == value;
    },                              //状态 过滤函数
    rkStatusWatch: function (rkStatus) {
      var str = '';
      switch (rkStatus) {
        case 1:
          str = 'info';
          break;
        case 21:
          str = 'danger';
          break;
        case 22:
          str = 'warning';
          break;
        case 31:
          str = 'success';
          break;
        case 32:
          str = 'primary';
          break;
      }
      return str;
    },                                 //状态 标签颜色
    typeWatch: function (rkType) {
      var str = '';
      switch (rkType) {
        case 0:
          str = 'primary';
          break;
        case 1:
          str = 'success';
          break;
        case 2:
          str = 'warning';
          break;
      }
      return str;
    },                                         //单据 标签颜色
    filterType: function (value, row) {
      return row.type == value;
    },                                  //单据 过滤函数
    multiSelectClick: function () {
      this.multiSelect = !this.multiSelect;
    },                                      //多选 状态维护
    handleSelectionChange: function (val) {
      /*<debug>*/
      console.log(this.multipleSelection);
      /*</debug>*/
      this.multipleSelection = val;
    },                              //多选 选中控制
    multiOperationCancelAllocation: function () {
      var obj = this;
      obj.$confirm('此操作将这些入库单据取消分配, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        var step = [];
        for (var i = 0; i < obj.multipleSelection.length; i++) {
          step.push(obj.multipleSelection[i].rkRkdjId);
        }
        p[9].post({
          "ids": step,
          "useId": app.rmsUser.ruUserId
        }, function (json) {
          this.callbackAfter({status: json.status, model: "取消分配"}, function () {
            p[0].post(obj.option);
          })
        });
      }).catch(function () {
        obj.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },                        //TODO 多选 取消分配
    multiOperationGrounding: function () {
      var obj = this;
      obj.$confirm('此操作将这些入库单据上架, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        var step = [];
        for (var i = 0; i < obj.multipleSelection.length; i++) {
          step.push(obj.multipleSelection[i].rkRkdjId);
        }
        p[7].post({ids: step, userId: app.rmsUser.ruUserId}, function (json) {
          this.callbackAfter({status: json.status, model: "上架"}, function () {
            p[0].post(obj.option);
          })
        });
      }).catch(function () {
        obj.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },                               //TODO 多选 上架
    moreOperationDelete: function () {
      /*<debug>*/
      console.log('选中的删除');
      /*</debug>*/
      var listID = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        remove(this.multipleSelection[i], this.inputOperation);
        listID.push(this.inputOperation.rkdjNo);
      }
      postDelete({
        id: listID
      })

    },                                   //多选 删除
    handleSizeChange: function (val) {
      /*<debug>*/
      console.log('每页' + val + '条');
      /*</debug>*/
      this.pageSize = val;
      p[0].post(obj.option);
    },                                   //分页 Size
    handleCurrentChange: function (val) {
      /*<debug>*/
      console.log('当前第' + val + '页');
      /*</debug>*/
      this.currentPage = val;
      p[0].post(obj.option);
    },                                //分页 当前页
    newInput: function () {
      this.dialogFormVisible = true;
//                this.$msgbox({
//                    title: '消息',
//                    message: 'sadgasd',
//                    showCancelButton: true,
//                    confirmButtonText: '确定',
//                    cancelButtonText: '取消',
//                    beforeClose: function (action, instance, done) {
//                        done();
//                    }
//                });

    },                                              //按钮 新建入库单
    expandChange: function (row, expanded) {
      if (expanded && row.history.length === 0) {
        postHistory({rkRkdjId: row.rkRkdjId}, row);
        p[3].post({rkRkdjId: row.rkRkdjId}, function (json) {
          row.rkDocsList = json.rkDocsList;
        })
      }
    },                             //下拉 选择
    rowSelection: function (row, selected) {
//                console.log(selected)
    },                             //选中 当前行
    prev: function () {
      this.dialogFormActive--;
      this.$refs.carousel.prev();
    },                                                  //新建 弹出层banner控制 前一个
    next: function () {
      this.dialogFormActive++;
      this.$refs.carousel.next();
    },                                                  //新建 弹出层banner控制 后一个
    submit: function () {
      var obj = this;
      this.dialogFormActive++;
      this.submitLoading = true;
      //TODO 此处应是ajax请求
      setTimeout(function () {
        obj.submitLoading = false;
        obj.$notify({
          title: '成功',
          message: '保存成功！',
          type: 'success'
        });
        obj.dialogFormVisible = false;
        obj.form = form();
        obj.dialogFormActive = 0;
        this.dialogDistributionForm = false;
        //post(inputOperation);
      }, 1500);
    },                                                //新建 表单提交
    formValidateField: function (formName) {
//                console.log(inputOperation.$refs[formName]);
//                console.log(inputOperation.$refs);
//                setTimeout(function () {
//                    return inputOperation.$refs[formName].validate(function (valid) {
//                        console.log(valid);
//                        return valid;
//                    })
//                },0);
    },                             //表单 string验证
    querySearchAsync: function (queryString, cb) {
      postGoods({bgGoodsNo: queryString}, cb);
    },
    queryLocationAsync: function (queryString, cb) {
      p[5].post({
        "pageNum": 1,
        "pageSize": 10,
        "draw": 0,
        blLName: queryString,
        arehouseId: window.dbmessage.baseArehouses[0].baArehouseId
      }, function (json) {
        json = json.data;
        var step = [];
        var length = json.length > 20 ? 20 : json.length;
        for (var i = 0; i < length; i++) {
          step.push({data: json[i], value: json[i].blLname})
        }
        cb(step);
      });
    },
    handleSelect: function (item) {
      console.log(item);
      obj.form.location.mdtLocationId = item.data.blLocationId;
      obj.$refs.ref_form.validate(function (valid) {
        return valid;
      });
    },
    GoodSelect: function (item) {
      this.form.saveARkDocsList = false;
      this.form.deleteARkDocsList = true;
      this.form.selectGood = {
        baseGoods: {
          bgGoodsNo: item.data.bgGoodsNo,
          bgGoodsName: item.data.bgGoodsName
        },
        baseDw: {
          bdName: item.data.bgZxdw
        },
        rksCount: 0,
        bgGoodsId: item.data.bgGoodsId,
        data: item.data
      };
    },
    GoodClick: function (item) {
      if (this.dialogDistributionForm) return;
      this.form.saveARkDocsList = true;
      this.form.deleteARkDocsList = false;
      this.form.selectGood = item;
    },
    saveARkDocsList: function () {
      this.form.rkDocsList.push(this.form.selectGood);
      this.form.selectGood = selectGood();
      this.form.saveARkDocsList = true;
    },
    deleteARkDocsList: function () {
      remove(this.form.selectGood, this.form.rkDocsList);
      this.form.selectGood = selectGood();
    },
    selectSubmit: function () {
      this.dialogSelectVisible = false;
      console.log('select!');
    },
    deleteOlder: function (index, row) {
      var obj = this;
      obj.$confirm('此操作将永久删除该入库单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        remove(row, obj.inputOperation);
        postDelete({
          id: [row.rkdjNo]
        });
      }).catch(function () {
        obj.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
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
    auto_rkCreatetime: function (value, bool) {
      if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年 MM月 dd日 ');
      else return dateFormat(new Date(parseInt(value)), 'yyyy-MM-dd');
    },                          //创建时间/下单时间
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
          32: '全部收货',
        }
      } else {
        temp = {
          '原始状态': 1,
          '部分分配': 21,
          '全部分配': 22,
          '部分收货': 31,
          '全部收货': 32,
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
    rkRkdjNo: function () {
      /*<debug>*/
      console.log(this.option);
      /*</debug>*/
      p[0].post(obj.option);
    },
    rkStatus: function () {
      /*<debug>*/
      console.log(this.option);
      /*</debug>*/
      p[0].post(obj.option);
    }
  }
});
// 高级 监视器的 使用方法
inputOperation.$watch('form.selectGood.rksCount', function () {
  if (!this.form.deleteARkDocsList)return;
  var valid = false;
  inputOperation.$refs['newForm'].validate(function (_valid) {
    valid = _valid;
  });
  valid ?
    this.form.saveARkDocsList = false :
    this.form.saveARkDocsList = true
});
inputOperation.$watch('date', function () {
  /*<debug>*/
  console.log(this.option);
  /*</debug>*/
  p[0].post(obj.option);
}, {deep: true});
function form() {
  return {
    title: '新建入库单',
    rkRkdjNo: '',
    rkType: '',
    rkRemarks: '',
    rkDocsList: [],
    bgGoodsNo: '',
    rkArehouseId: '',
    rkStatus: '',
    selectGood: selectGood(),
    location: newLocation(),
    saveARkDocsList: true,
    deleteARkDocsList: true
  };
}
var obj = inputOperation;
var p = [];
// 0 入库操作 分页查询
p[0] = autoPost({
  urlHock: "../../hock/userControl/page.json",
  urlProd: "/route/inputOperation/0",
  success: function (json) {
    var temp = [];
    for (var i = 0; i < json.data.length; i++) {
      temp[i] = json.data[i];
      temp[i].history = [];
      temp[i].historyLoading = false;
      temp[i].historyLength = 0;
    }
    obj.$data.inputOperation = json.data;
    obj.$data.currentTotal = json.recordsFiltered;
  }
});
//3 查询-入库单号-入库明细
p[3] = autoPost({
  urlHock: "/hock/warehousingTask/docList.json",
  urlProd: "/route/inputOperation/3",
  method: 'GET'
});
//5 查询-储位
p[5] = autoPost({
  urlHock: "/hock/inputOption/location.json",
  urlProd: "/route/inputOperation/5"
});
//7 上架
p[7] = autoPost({
  urlHock: "/hock/inputOption/location.json",
  urlProd: "/route/inputOperation/7",
  method: 'GET'
});
//8 分配
p[8] = autoPost({
  urlHock: "/hock/inputOption/location.json",
  urlProd: "/route/inputOperation/8",
  method: 'GET'
});
//9 取消分配
p[9] = autoPost({
  urlHock: "/hock/inputOption/location.json",
  urlProd: "/route/inputOperation/9",
  method: 'GET'
});
function validate_form() {
  return {
    blLname: 'vNull',
    mdtBatch: 'vNull',
  }
}
function locationFather() {
  return {
    selectGood: {
      baseGoods: {
        bgGoodsNo: "",
        blLname: ""
      },
      rksCount: ''
    },
    blLname: '',
    mdtBatch: '',
    mdtLocationId: '',
    rksRkdjId: '',
    rksRkmxId: ''
  }
}
function postDistributionLists() {
  return {
    "mdtRkdjId": 2,
    "mdtRkmxId": 3,
    "mdtBatch": "20170508-A001",
    "mdtDwid": 2,
    "mdtLocationId": 1,
    "mdtCount": 50,
    "mdtUserId": app.rmsUser.ruUserId,
    "mdtArehouseId": obj.form.rkArehouseId
  }
}
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
    rksKyCount: 0,
    rksRkdjId: '',
    rksRkmxId: '',
    bgGoodsId: ''
  }
}
function newLocation() {
  return {
    "blLocationId": 0,
    "blLname": "",
    "blRegionId": 0,
    "blLtray": 0,
    "blLorder": 0,
    "blStatus": 0,
    "blArehouseId": 0,
    selectGood: selectGood(),
    mdtBatch: auto_time_new(new Date(), 3)
  }
}
p[0].post(obj.option);
function postHistory(option, row) {
  obj.historyLoading = true;

  /*<debug>*/
  url = "/hock/form/inputOptionDetialHistory.json";
  /*</debug>*/

  /*<prod>*/
  url = "/route/inputOperation/1";
  /*</prod>*/

  $.ajax(url, {
    type: "GET",
    data: option || {
      "id": 1                        //* 入库单号id
    },
    error: function (error) {
      errorTip(obj, error);
    },
    success: function (json) {
      var temp = {
        1: '创建出库单(出库)',
        2: '分拣(出库)',
        3: '下架(出库)',
        4: '编辑(出库)',
        5: '删除(出库)',
        6: '追加分拣(出库)',
        7: 'PDA上架(入库)',
        8: 'PDA修改分拣明细数量（出库）',
        9: 'PDA下架(出库)',
        10: '创建入库单(入库)',
        11: '编辑入库单(手工制作可以编辑)(入库)',
        12: '作废入库单(手工制作可以作废)(入库)',
        13: '分配入库单(入库)',
        14: '取消分配(入库)',
        15: '上架(入库)',
        16: '再次收货(入库)',
        17: '欠货完结(入库)',
        18: '欠货补发(出库)',
        19: '滞留补发(出库)',
        20: '挂起单据(出库)',
        21: '制作台帐(入库)',
        22: '出库发运（出库）',
        24: '取消挂起（出库）',
        25: '挂起确认（出库）',
        26: '修改分拣明细数量（出库）'
      };
      json = json.reverse();
      for (var i = 0; i < json.length; i++) {
        json[i].createTime = dateFormat(new Date(json[i].mhCreatetime), 'MM-dd hh:mm');
        json[i].description = "由 " + json[i].rmsUser.ruUserName + " " + temp[json[i].mhStatus]
      }
      row.history = json;
      row.historyLength = json.length;
      obj.historyLoading = false;
    },
    complete: function () {
    }
  });
}    //1 历史记录
function postDelete(option) {
  //TODO 删除后重新post
  if (option.id.length < 1)return;
  obj.showLoading = true;

  /*<debug>*/
  url = "/hock/form/inputOptoionDelete.json";
  /*</debug>*/

  /*<prod>*/
  url = "/data/inputOption/delete" + option;
  /*</prod>*/

  $.ajax(url, {
    type: "GET",
    data: option | {
      "id": 1                        //* 入库单号id
    },
    error: function (error) {
      errorTip(obj, error);
    },
    success: function (json) {
      if (json.status == 1) {
        obj.$notify({
          title: '提示',
          type: 'success',
          message: obj.$createElement(
            'p',
            '删除完成'
          )
        });
      }
    },
    complete: function () {
      obj.showLoading = false;
    }
  });
}
function postGoods(option, cb) {
  //TODO 此处应为AJAX请求,待完善 querySearchAsync

  /*<debug>*/
  url = "/hock/form/rkGoods.json";
  /*</debug>*/

  /*<prod>*/
  url = "/data/inputOption/delete" + option;
  /*</prod>*/

  $.ajax(url, {
    type: "GET",
    data: option | {
      "id": 1                        //* 入库单号id
    },
    error: function (error) {

    },
    success: function (json) {
      json = json.data;
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
}
