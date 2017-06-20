var goodsFlowSelect = new Vue({
    el: '#goodsFlowSelect',
    prop: {},
    data: function () {
        return {
            baseArehouses: window.dbmessage.baseArehouses,
            goodsFlowSelect: [],
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
            currentTotal:0,
            date: [null, null],                 //主页面 选择日期 搜索
            bgGoodsNo: '',                       //主页面 货品编号 搜索
            bgGoodsName: '',                       //主页面 货品名称 搜索
            ckArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,             //主页面 仓库 搜索
            ckCkdjClientname: '',              //主页面 客户名称 搜索
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
            printDatas: [],                             // 打印数据
            watchView: false,                           //观察状态量-是否为查看
        }
    },
    computed: {
        // TODO 表格提交
        option: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "bgGoodsName": this.bgGoodsName.trim(),
                "bgGoodsNo": this.bgGoodsNo.trim(),
                "ckCkdjClientname": this.ckCkdjClientname.trim(),
                "ckArehouseId":this.ckArehouseId,
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
        form_pop: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "bgGoodsNo": this.form.bgGoodsNo,
                "bgGoodsName": this.form.bgGoodsName,
                "ckCkdjClientname": this.form.ckCkdjClientname,
                "ckAdress": this.form.ckAdress,
                "ckContacts": this.form.ckContacts,
                "ckTel": this.form.ckTel,
                "ckCkdjClientno": this.form.ckCkdjClientno,
                "ckCkdjNo": this.form.ckCkdjNo,
                "ckArehouseId": this.form.ckArehouseId,
                "blLname": this.form.blLname,
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
                    ids: [row.mfunckDocs.cksCkmxId]
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
        },                                //行内按钮 打印标签页
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
            obj.$confirm('确定导出货品流向单据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                var ids = [];
                for (var i = 0; i < obj.multipleSelection.length; i++) {
                    ids.push(obj.multipleSelection[i].mfunckDocs.cksCkmxId);
                }
                p[1].post({
                    ids: ids
                }, function (json) {
                    json.status = 20000; //TODO
                    this.callbackAfter({status: json.status, model: "导出货品流向单"}, function () {
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
            this.dialogSelectVisible = false;
            p[0].post(obj.form_pop);
        },                                          //详细查询 提交
        printfSubmit: function () {
            var datas = [];
            var checkData = goodsFlowSelect.$refs.printf.getCheckedNodes();
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
            console.log(node.data);
            switch (node.level) {
                case 0:
                    return resolve(this.printf);
                case 1:
                    postRkrwNo(this, {
                        rkrwNo: node.data.rkrwNo,
                        rkrwDhrq: node.data.rkrwDhrq
                    }, resolve);
                    break;
                case 2:
                    console.log(node.data.name);
                    postRkdjId(this, {
                        rkrwNo: node.data.rkrwNo,
                        rkrwDhrq: node.data.rkrwDhrq
                    }, resolve);
                    break;
                case 3:
                    return resolve([]);
            }
        },
        auto_mdtSjsj: function (value, bool) {
            if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年-MM月-dd日');
            else return dateFormat(new Date(parseInt(value)), 'MM-dd');
        },                                  //作业时间
        auto_rkrkSjsj: function (value, bool) {
            if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年-MM月-dd日');
            else return dateFormat(new Date(parseInt(value)), 'MM-dd');
        },                                  //上架开始时间
        auto_rkEndTime: function (value, bool) {
            if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年-MM月-dd日');
            else return dateFormat(new Date(parseInt(value)), 'MM-dd');
        },                                  //上架结束时间
        auto_rkCreatetime: function (value, bool) {
            if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年-MM月-dd日');
            else return dateFormat(new Date(parseInt(value)), 'MM-dd');
        },                                  //下单时间
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
                    '原始状态': 1,
                    '部分分配': 21,
                    '全部分配': 22,
                    '部分收货': 31,
                    '完全收货': 32
                }
            }
            return temp[value];
        },                                         //入库状态
        auto_rkZdfs: function (value) {
            var temp = {}
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
        },                                         //操作方式
        auto_rkStartwith: function (value) {
            var temp = {}
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
        },                                         //入库状态


    },
    watch: {
        bgGoodsName: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
        bgGoodsNo: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
        ckCkdjClientname: function () {
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

    }
});
function _form() {
    return {
        bgGoodsName: '',//模糊查询--货品名称
        bgGoodsNo: '',//模糊查询--货品编号
        ckCkdjClientname: '',//模糊查询--客户名称
        ckAdress: '',//模糊查询--客户地址
        ckContacts: '',//模糊查询--联系人
        ckTel: '',//模糊查询--联系电话
        ckCkdjClientno: '',//模糊查询--客户编号
        ckCkdjNo: '',//模糊查询--出库单号
        ckArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,//模糊查询--仓库
    }
}
var obj = goodsFlowSelect;
var p = [];
// 0 货品流向查询 分页查询
p[0] = autoPost({
    urlHock: "/hock/goodsFlowSelect/page.json",
    urlProd: "/route/goodsFlowSelect/0",
    success: function (json) {
        obj.$data.goodsFlowSelect = json.data;
        obj.$data.currentTotal = json.recordsFiltered;
    }
});
// 1 货品流向查询 导出
p[1] = autoPost({
    urlHock: "",
    urlProd: "/route/goodsFlowSelect/1",
    method: 'GET',
    success: function (json) {
    }
});


// 高级 监视器的 使用方法
//    goodsFlowSelect.$watch('date', function () {
//        if (!(_option ? this.form_pop : this.option).dateStart)return;
//        /*<debug>*/
//        console.log((_option ? this.form_pop : this.option));
//        /*</debug>*/
//        post(this, (_option ? this.form_pop : this.option));
//    }, {deep: true});

p[0].post(goodsFlowSelect.option);

