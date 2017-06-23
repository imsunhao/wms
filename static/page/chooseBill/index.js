function form() {
    return {
        ckrwId: '',
        title: "新建入库任务",
        ckrwN: '',
        ckrwCph: '',
        dds: '',
        pxs: '',
        ckrwSjxm: '',
        ckrwDhrq: '',
        ckrwDbd: '',
        ckrwCys: '',
        ckrwDh: '',
        ckrwStatus: '',
        ckrwCph: '',//模糊查询--车牌号
        ckrwNo: '',//模糊查询--任务号
        ckrwHistoryCzsj: [null, null],//模糊查询--制作时间
    }
}
var chooseBill = new Vue({
    el: '#chooseBill',
    prop: {},
    data: function () {
        return {
            chooseBill: [],
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
            date: [null, null],                 //主页面 选择日期 搜索
            ckrwNo: '',                         //主页面 任务号 搜索
            ckrwCph: '',                         //主页面 车牌号 搜索

            formLabelWidth: '120px',            //表单 配置
            form: form(),                       //表单 弹出层 信息集合
            dialogFormActive: 0,                //新建 弹出层 steps 当前进度
            dialogFormVisible: false,           //新建 弹出层 是否可见
            submitLoading: false,               //新建 弹出层 提交等待


            dialogListsVisible: false,              //单据详细 查询
            lists: formList(),                      //出库详细 弹出层 信息集合


            select: form(),                     //搜索 弹出层 信息集合,
            dialogSelectVisible: false,
            selectLoading: false
        }
    },
    computed: {
        // TODO 表格提交
        option: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "ckrwNo": this.ckrwNo.trim(),
                "ckrwCph": this.ckrwCph.trim(),
                "ckrwStartGreatTime": tsf_date(this.date[0]),
                "ckrwEndGreatTime": tsf_date(this.date[1]),
                ckArehouseId:window.dbmessage.baseArehouses[0].baArehouseId,
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
        inlineSelectFinish: function (index, row) {
            var _this = this;
            _this.$confirm('此操作将这单任务单据挑选完成, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[1].post({
                    "ids": [row.ckrwId],
                    "userName": app.rmsUser.ruUserName
                });
            }).catch(function () {
                _this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },                      //TODO 行内按钮 挑选完成
        multiSelectClick: function () {
            this.multiSelect = !this.multiSelect;
        },                                      //多选 状态维护
        multiSelectionChange: function (val) {
            /*<debug>*/
            console.log(this.multipleSelection);
            /*</debug>*/
            this.multipleSelection = val;
        },                               //多选 选中控制
        multiOperationSelectFinish: function () {
            var _this = this;
            _this.$confirm('此操作将这些任务单据挑选完成, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                var ids = [];
                for (var i = 0; i < obj.multipleSelection.length; i++) {
                    ids.push(obj.multipleSelection[i].ckrwId);
                }
                p[1].post({
                    "ids": ids,
                    "userName": app.rmsUser.ruUserName
                });
            }).catch(function () {
                _this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });

        },                            //TODO 多选 挑选完成

        handleSizeChange: function (val) {
            /*<debug>*/
            console.log('每页' + val + '条');
            /*</debug>*/
            this.pageSize = val;
            p[0].post(this.option);
        },                                   //分页 Size
        handleCurrentChange: function (val) {
            /*<debug>*/
            console.log('当前第' + val + '页');
            /*</debug>*/
            this.currentPage = val;
            p[0].post(this.option);
        },                                //分页 当前页

        expandChange: function (row, expanded) {
            if (expanded && (typeof (row.mfunckDoc) === 'undefined' || row.mfunckDoc === null || row.mfunckDoc.length === 0)) {
                p[102].post({id: row.ckrwId,arehouseId:window.dbmessage.baseArehouses[0].baArehouseId}, function (json) {
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
                    row.mfunckDocs = json.model;
                    obj.lists.data = row.mfunckDocs;
                    obj.lists.ckCkdjNo = row.ckCkdjNo;
                    obj.dialogListsVisible = true;
                })
            } else {
                obj.lists.data = row.mfunckDocs;
                obj.lists.ckCkdjNo = row.ckCkdjNo;
                obj.dialogListsVisible = true;
            }
        },

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
            this.dialogSelectVisible = !this.dialogSelectVisible;
            p[0].post({});
        },                                          //详细查询 提交
        auto_ckrwYjdcsj: function (value, bool) {
            if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年 MM月 dd日');
            else return dateFormat(new Date(parseInt(value)), 'yyyy-MM-dd');
        },                            //预计到车时间
        auto_ckrwSjdcsj: function (value, bool) {
            if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年 MM月 dd日');
            else return dateFormat(new Date(parseInt(value)), 'yyyy-MM-dd');
        },                            //实际到车时间
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
        },                                     //任务状态
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
        },                                   //欠货状态
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
        },                                   //滞留状态


        auto_fjfs: function (value) {
            switch (value) {
                case 'k':
                case 'K':
                    return '指定储位';
                case 'p':
                case 'P':
                    return '指定批次';
                case 'x':
                case 'X':
                    return '先进先出';
            }
        }


    },
    watch: {
        ckrwNo: function () {
            /*<debug>*/
            console.log(this.option);
            /*</debug>*/
            p[0].post(this.option);
        },
        ckrwCph: function () {
            /*<debug>*/
            console.log(this.option);
            /*</debug>*/
            p[0].post(this.option);
        }
    },
});
chooseBill.$watch('date', function () {
    /*<debug>*/
    console.log(this.option);
    /*</debug>*/
    p[0].post(this.option);
}, {deep: true});
var obj = chooseBill;
var p = [];
// 0 挑选单据 分页查询
p[0] = autoPost({
    urlHock: "../../hock/chooseBill/page.json",
    urlProd: "/route/chooseBill/0",
    success: function (json) {
        for (var i = 0; i < json.data.length; i++) {
            json.data[i].mfunckDoc = [];
        }
        obj.$data.chooseBill = json.data;
        obj.$data.currentTotal = json.recordsFiltered;
    }
});
// 1 挑选单据 挑选完成
p[1] = autoPost({
    urlHock: "../../hock/chooseBill/page.json",
    urlProd: "/route/chooseBill/1",
    method: 'GET',
    success: function (json) {
        this.callbackAfter({status: json.status, model: "挑选单据"}, function () {
            p[0].post(obj.option);
        })
    }
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

function formList() {
    return {
        data: [],

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
p[0].post(chooseBill.option);
