var recoveryArchive = new Vue({
    el: '#recoveryArchive',
    prop: {},
    data: function () {
        return {
            baseArehouses: window.dbmessage.baseArehouses,
            recoveryArchive: [],
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
            rule_retention: autoValidate(validate_form()), //滞留补发信息验证规则
            showLoading: false,
            currentPage: 1,
            pageSize: 10,
            currentTotal: 0,
            date: [null, null],                   //主页面 选择日期 搜索
            date2: [null, null],                  //主页面 制作时间 搜索
            ckCkdjNo: '',                         //主页面 出库单号 搜索
            ckArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,             //主页面 仓库 搜索

            formLabelWidth: '120px',              //表单 配置
            dialogFormActive: 0,                  //新建 弹出层 steps 当前进度
            dialogFormVisible: false,             //新建 弹出层 是否可见
            submitLoading: false,                 //新建 弹出层 提交等待

            reissue: formReissue(),               //欠货补发信息 弹出层 信息集合
            dialogReissueVisible: false,          //欠货补发信息 弹出层 是否可见

            retention: formRetention(),           //滞留补发信息 弹出层 信息集合
            dialogRetentionVisible: false,        //滞留补发信息 弹出层 是否可见


            dialogList2Visible: false,        //滞留补发信息 弹出层 是否可见
            list2: _list2(),

            dialogSelectVisible: false,
            selectLoading: false,
            watchView: false,               //观察状态量-是否为查看
        }
    },
    computed: {
        option: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "ckCkdjNo": this.ckCkdjNo.trim(),
                "ckStartXdsj": tsf_date(this.date[0]),
                "ckEndXdsj": tsf_date(this.date[1]),
                "mhStartCreateTime": tsf_date(this.date2[0]),
                "mhEndCreateTime": tsf_date(this.date2[1]),
                "ckArehouseId": this.ckArehouseId,
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
        list2Submit: function () {
            p[obj.list2.number].post({
                    "startCkXdsj": tsf_date(obj.list2.CkXdsj[0]),
                    "endCkXdsj": tsf_date(obj.list2.CkXdsj[1])
                }
                , function (json) {
                    this.callbackAfter({status: json.status, model: "导出欠货单"}, function () {
                        var url = "/static/Excel/" + json.model;
                        window.open(url);
                        obj.dialogList2Visible = false;
                        obj.list2 = _list2();
                    })
                });
        },
        inlineExportOutstanding: function () {
            this.list2.number = 4;
            this.list2.title = '导出欠货';
            this.dialogList2Visible = true;


        },                     //导出欠货
        inlineExportRetention: function () {
            this.list2.number = 5;
            this.list2.title = '导出滞留';
            this.dialogList2Visible = true;
        },                       //导出滞留

        multiSelectClick: function () {
            this.multiSelect = !this.multiSelect;
        },                                      //多选 状态维护
        multiSelectionChange: function (val) {
            /*<debug>*/
            console.log(this.multipleSelection);
            /*</debug>*/
            this.multipleSelection = val;
        },                               //多选 选中控制
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
        outstandingInformation: function (index, row, number) {
            this.reissue = formReissue();
            if (number) {
                this.reissue.cksCkmxId = row.cksCkmxId;
            } else {
                this.reissue.ckdjId = row.ckCkdjId;
            }
            this.dialogReissueVisible = true;
        },                                //行内按钮-欠货补发信息
        retentionInformation: function (index, row) {
            this.retention = formRetention();
            this.retention.ckdjIds.push(row.ckCkdjId);
            this.dialogRetentionVisible = true;
        },                                  //行内按钮-滞留补发信息
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


        expandChange: function (row, expanded) {
            if (expanded && row.mfunckDocs.length === 0) {
                p[101].post({id: row.ckCkdjId}, function (json) {
                    row.mfunckDocs = json.model;
                })

            }
        },                             //下拉 选择

        reissueSubmit: function () {
            if (this.reissue.cksCkmxId) {
                p[2].post(this.reissue, function (json) {
                    this.callbackAfter(json, function () {
                        p[0].post(obj.option);
                        obj.dialogReissueVisible=false;
                    })
                })
            } else {
                p[1].post(this.reissue, function (json) {
                    this.callbackAfter(json, function () {
                        p[0].post(obj.option);
                        obj.dialogReissueVisible=false;
                    })
                })
            }


        },                                         //TODO 欠货补发信息-保存
        retentionSubmit: function () {
            this.$refs['ref_retention'].validate(function (valid) {
                if (valid) {
                    p[3].post(obj.retention, function (json) {
                        this.callbackAfter({status: json.status, model: '滞留补发信息'}, function () {
                            obj.dialogRetentionVisible=false;
                            p[0].post(obj.option);
                        })
                    })
                } else {
                    return false;
                }
            });

        },                                       //TODO 滞留补发信息-保存

        auto_ckIsauto: function (value) {
            var temp = {};
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
        },                                    //制单方式

        auto_ckQhStatus: function (value) {
            var temp = {};
            if (!isNaN(value)) {
                temp = {
                    1: '整单欠货',
                    2: '部分欠货',
                    3: '未欠货',
                }
            } else {
                temp = {
                    '整单欠货': 1,
                    '部分欠货': 2,
                    '未欠货': 3,
                }
            }
            return temp[value];
        },                               //欠货状态
        auto_ckZlStatus: function (value) {
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
        },                               //滞留状态
        auto_cksCkfs: function (value) {
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
        }                                   //分拣方式
    },
    watch: {
        ckCkdjNo: function () {
            /*<debug>*/
            console.log(this.option);
            /*</debug>*/
            p[0].post(this.option);
        },
        ckArehouseId: function () {
            /*<debug>*/
            console.log(this.option);
            /*</debug>*/
            p[0].post(this.option);
        }
    }
});

function _list2() {
    return {
        title: '',
        CkXdsj: "",
        number: 0
    }
}
// 高级 监视器的 使用方法
recoveryArchive.$watch('date', function () {
    /*<debug>*/
    console.log(this.option);
    /*</debug>*/
    p[0].post(this.option);
}, {deep: true});
recoveryArchive.$watch('date2', function () {

    /*<debug>*/
    console.log(this.option);
    /*</debug>*/
    p[0].post(this.option);
}, {deep: true});

var obj = recoveryArchive;
var p = [];
// 0 回收存档- 分页查询
p[0] = autoPost({
    urlHock: "../../hock/recoveryArchive/page.json",
    urlProd: "/route/recoveryArchive/0",
    success: function (json) {
        obj.$data.recoveryArchive = json.data;
        obj.$data.currentTotal = json.recordsFiltered;
    }
});

// 1 回收存档- 欠货补发信息（整单）
p[1] = autoPost({
    urlHock: "../../hock/recoveryArchive/page.json",
    urlProd: "/route/recoveryArchive/1"
});

// 2 回收存档- 欠货补发信息（明细）
p[2] = autoPost({
    urlHock: "../../hock/recoveryArchive/page.json",
    urlProd: "/route/recoveryArchive/2"
});

// 3 回收存档- 滞留补发信息
p[3] = autoPost({
    urlHock: "../../hock/recoveryArchive/page.json",
    urlProd: "/route/recoveryArchive/3",
    method: 'GET'
});

// 4 回收存档- 欠货导出
p[4] = autoPost({
    urlHock: "../../hock/recoveryArchive/page.json",
    urlProd: "/route/recoveryArchive/4",
    method: 'GET',
});

// 5 回收存档- 滞留导出
p[5] = autoPost({
    urlHock: "../../hock/recoveryArchive/page.json",
    urlProd: "/route/recoveryArchive/5",
    method: 'GET',
});


// 101 查询-出库单号-出库明细
p[101] = autoPost({
    urlHock: "/hock/warehousingTask/mfunckDoc.json",
    urlProd: "/route/outboundTask/2"
});

function formReissue() {
    return {


        "ckdjId": 0,

        cksBfNo: "",             //补发单号
        cksQhbfInfo: "",             //补发情况
        cksQhRemarks: "",             //欠货备注

        cksBfStatus: 1,              //补发状态  1.已补发  2.已赔付 3.需跟进

        cksCkmxId: 0,
        //ckrwNo: "string",

        //"ckdjIds": [0],
        "useId": app.rmsUser.ruUserId,
    }
}

function formRetention() {
    return {
        ckrwNo: '',                         //补发单号

        "ckdjIds": [],                      //出库单据ID （多个）

        "useId": app.rmsUser.ruUserId       // 操作员ID
    }
}

function validate_form() {
    return {
        ckrwNo: 'vNull',
    }
}

// 高级 监视器的 使用方法
//    recoveryArchive.$watch('date', function () {
//        if (!this.option.dateStart)return;
//        /*<debug>*/
//        console.log(this.option);
//        /*</debug>*/
//        post(this, this.option);
//    }, {deep: true});
p[0].post(recoveryArchive.option);
