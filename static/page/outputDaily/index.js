var outputDaily = new Vue({
    el: '#outputDaily',
    prop: {},
    data: function () {
        return {
            baseArehouses: window.dbmessage.baseArehouses,
            watchView: false,               //观察状态量-是否为查看
            outputDaily: [],
            multipleSelection: [],
            multiSelect: false,
            pickerOptions: _pickerOptions(),
            showLoading: false,
            currentPage: 1,
            pageSize: 10,
            currentTotal: 0,
            date: [null, null],                 //主页面 选择日期 搜索
            ckCkdjNo: '',                       //主页面 出库单号 搜索
            ckStatus: '',                         //主页面 单据状态 搜索
            ckArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,             //主页面 仓库 搜索
            formLabelWidth: '120px',            //表单 配置
            form: _form(),                           //表单 弹出层 信息集合
            dialogFormActive: 0,                //新建 弹出层 steps 当前进度
            dialogFormVisible: false,           //新建 弹出层 是否可见
            submitLoading: false,               //新建 弹出层 提交等待
            select: _form(),                         //搜索 弹出层 信息集合,
            printf: [],                         //搜索 弹出层 信息集合,
            dialogSelectVisible: false,
            dialogPrintfVisible: false,
            selectLoading: false,
            printfLoading: false,
            printDatas: [],          // 打印数据
        }
    },
    computed: {
        // TODO 表格提交
        option: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "ckStatus": this.ckStatus,
                "ckCkdjNo": this.ckCkdjNo.trim(),
                "ckStartXdsj": tsf_date(this.date[0]),
                "ckEndXdsj": tsf_date(this.date[1]),
                "ckArehouseId":this.ckArehouseId,
            }
        },
        form_pop: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "ckStartXdsj": tsf_date(this.form.ckXdsj[0]),
                "ckEndXdsj": tsf_date(this.form.ckXdsj[1]),
                "mhStartCreateTime": tsf_date(this.form.mhCreatetime[0]),
                "mhEndCreateTime": tsf_date(this.form.mhCreatetime[1]),
                "ckCksj": tsf_date(this.form.ckCksj),
                "ckEndtime": tsf_date(this.form.ckEndtime),
                "msxStartQrsj": tsf_date(this.form.msxQrsj[0]),
                "msxEndQrsj": tsf_date(this.form.msxQrsj[0]),
                "ckStatus": this.form.ckStatus,
                "ckZlStatus": this.form.cksZlStatus,
                "ckIsauto": this.form.ckIsauto,
                "ckStartwith": this.form.ckStartwith,
                "cksQhStatus": this.form.cksQhStatus,
                "ckTel": this.form.ckTel,
                "ckContacts": this.form.ckContacts,
                "ckCkdjClientno": this.form.ckCkdjClientno,
                "ckCkdjClientname": this.form.ckCkdjClientname,
                "ckrwCph": this.form.ckrwCph,
                "ckrwWls": this.form.ckrwWls,
                "ckCkdjType": this.form.ckCkdjType,
                "ckArehouseId": this.form.ckArehouseId,
                "ckClientId": this.form.ckClientId,
                "cksGoodsId": this.form.cksGoodsId,
                "bgGoodsName": this.form.bgGoodsName,
                "msxXjry": this.form.userName,
                "blLname": this.form.blLname,
                "ckAdress": this.form.ckAdress,
                "ckCkdjNo": this.form.ckCkdjNo,
                "ckQhStatus": this.form.ckQhStatus,
                "bgGoodsNo": this.form.bgGoodsNo
            }
        },
        distributionForm: function () {
            return {
                distribution: this.distribution
            }
        },                                      //分配 表单
    },
    methods: {
        inlineExport: function (index, row) {
            obj.$confirm('导出出库单 单据单号：' + row.mfunckDoc.ckCkdjNo, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[1].post({
                    ids: [row.mfunckDoc.ckCkdjId]
                }, function (json) {
                    this.callbackAfter({status: json.status, model: "导出出库单"}, function () {
                        var url = "/static/Excel/" + json.model;
                        window.open(url);
                    })
                });
            }).catch(function () {
                obj.$message({
                    type: 'info',
                    message: '已取消导出'
                });
            });
        },                                //行内按钮 导出
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
            obj.$confirm('确定导出出库单据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                var ids = [];
                for (var i = 0; i < obj.multipleSelection.length; i++) {
                    ids.push(obj.multipleSelection[i].mfunckDoc.ckCkdjId);
                }
                p[1].post({
                    ids: ids
                }, function (json) {
                    json.status = 20000; //TODO
                    this.callbackAfter({status: json.status, model: "导出出库单"}, function () {
                        var url = "/static/Excel/" + json.model;
                        window.open(url);
                    })
                });
            }).catch(function () {
                obj.$message({
                    type: 'info',
                    message: '已取消导出'
                });
            });

        },                                   //多选 打印标签页
        handleSizeChange: function (val) {
            this.pageSize = val;
            p[0].post((_option ? this.form_pop : this.option));
        },
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
            p[0].post(obj.form_pop);
            _option = true;
            this.dialogSelectVisible = false;
        },                                          //详细查询 提交
        auto_ckStatus: function (value) {
            var temp = {};
            if (!isNaN(value)) {
                temp = {
                    1: '初始',
                    21: '部分分拣',
                    22: '部分下架',
                    31: '全部分拣',
                    32: '全部下架',
                    50: '作废'
                }
            } else {
                temp = {
                    '初始': 1,
                    '部分分拣': 21,
                    '部分下架': 22,
                    '全部分拣': 31,
                    '全部下架': 32,
                    '作废': 50

                }
            }
            return temp[value];
        },                                           //单据状态
        auto_cksZlStatus: function (value) {
            var temp = {};
            if (!isNaN(value)) {
                temp = {
                    1: '未到车滞留',
                    2: '到车滞留',
                    3: '未滞留',
                }
            } else {
                temp = {
                    '未到车滞留': 1,
                    '到车滞留': 2,
                    '未滞留': 3,
                }
            }
            return temp[value];
        },                                           //滞留状态
        auto_cksQhStatus: function (value) {
            var temp = {};
            if (!isNaN(value)) {
                temp = {
                    1: '全部欠货',
                    2: '部分欠货',
                    3: '未欠货',
                }
            } else {
                temp = {
                    '全部欠货': 1,
                    '部分欠货': 2,
                    '未欠货': 3,
                }
            }
            return temp[value];
        },                                           //欠货状态
        auto_ckIsauto: function (value) {
            var temp = {};
            if (!isNaN(value)) {
                temp = {
                    1: '手动',
                    2: '导入',
                    3: '接口',
                }
            } else {
                temp = {
                    '手动': 1,
                    '导入': 2,
                    '接口': 3,
                }
            }
            return temp[value];
        },                                           //制作方式
        auto_ckStartwith: function (value) {
            var temp = {};
            if (!isNaN(value)) {
                temp = {
                    1: '电脑端',
                    2: 'PDA',
                }
            } else {
                temp = {
                    '电脑端': 1,
                    'PDA': 2,
                }
            }
            return temp[value];
        }                                           //操作方式


    },
    watch: {
        ckStatus: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
        ckCkdjNo: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
        ckArehouseId: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },

    },
});
// 高级 监视器的 使用方法
outputDaily.$watch('date', function () {
    /*<debug>*/
    console.log((_option ? this.form_pop : this.option));
    /*</debug>*/
    p[0].post((_option ? this.form_pop : this.option));
}, {deep: true});
function _form() {
    return {
        ckXdsj: [null, null],         //模糊查询--下单时间
        mhCreatetime: [null, null],  //模糊查询--分拣时间
        ckCksj: '',                   //模糊查询--下架开始时间
        ckEndtime: '',                //模糊查询--下架开始时间
        msxQrsj: [null, null],        //模糊查询--操作时间
        ckStatus: '',                 //模糊查询--单据状态
        cksZlStatus: '',              //模糊查询--是否滞留
        ckIsauto: '',                //模糊查询--制作方式
        ckStartwith: '',             //模糊查询--操作方式
        cksQhStatus: '',              //模糊查询--是否欠货
        ckTel: '',                     //模糊查询--联系电话
        ckContacts: '',              //模糊查询--联系人
        ckCkdjNo: '',                 //模糊查询--出库单号
        bgGoodsName: '',              //模糊查询--货品名称
        bgGoodsNo: '',              //模糊查询--货品编号
        ckCkdjClientno: '',          //模糊查询--客户编号
        ckCkdjClientname: '',        //模糊查询--客户名称
        userName: '',                  //模糊查询--作业人员
        blLname: '',                //模糊查询--下架库位
        ckAdress: '',                  //模糊查询--客户地址
        ckArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,   //模糊查询 仓库
    }
}
var obj = outputDaily;
var p = [];
// 0 出库日报 分页查询
p[0] = autoPost({
    urlHock: "/hock/outputDaily/page.json",
    urlProd: "/route/outputDaily/0",
    success: function (json) {
        obj.$data.outputDaily = json.data;
        obj.$data.currentTotal = json.recordsFiltered;
    }
});
// 1  出库日报导出
p[1] = autoPost({
    urlHock: "",
    urlProd: "/route/outputDaily/1",
    method: 'GET',
    success: function (json) {
    }
});

p[0].post(outputDaily.option);