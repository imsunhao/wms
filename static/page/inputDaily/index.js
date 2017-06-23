var inputDaily = new Vue({
    el: '#inputDaily',
    prop: {},
    data: function () {
        return {
            watchView: false,
            baseArehouses: window.dbmessage.baseArehouses,
            inputDaily: [],
            multipleSelection: [],
            multiSelect: false,
            pickerOptions: _pickerOptions(),
            showLoading: false,
            currentPage: 1,
            pageSize: 10,
            currentTotal: 0,
            rk_arehouse_id: window.dbmessage.baseArehouses[0].baArehouseId,             //主页面 仓库 搜索
            date: [null, null],                 //主页面 选择日期 搜索
            rk_rkdj_no: '',                       //主页面 入库单号 搜索
            rk_status: '',                       //主页面 单据状态 搜索
            formLabelWidth: '120px',            //表单 配置
            form: _form(),                         //表单 弹出层 信息集合
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
            watchView: false,
        }
    },
    computed: {
        // TODO 表格提交
        option: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "rkRkdjNo": this.rk_rkdj_no.trim(),
                "rkStatus": this.rk_status,
                "startCreateTimeParam": tsf_date(this.date[0]),
                "endCreateTimeParam": tsf_date(this.date[1]),
                "rk_arehouse_id": this.rk_arehouse_id,
            }
        },
        form_pop: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "startCreateTimeParam": tsf_date(this.form.rk_createtime[0]),
                "endCreateTimeParam": tsf_date(this.form.rk_createtime[1]),
                "rkrkSjsj": tsf_date(this.form.rk_sjsj),
                "rkEndTime": tsf_date(this.form.rk_end_time),
                "startMdtSjsj": tsf_date(this.form.mdt_sjsj[0]),
                "entMdtSjsj": tsf_date(this.form.mdt_sjsj[1]),
                "operatorUserName": this.form.ru_user_name,
                "bgGoodsNo": this.form.bg_goods_no,
                "bgGoodsName": this.form.bg_goods_name,
                "rkRkdjNo": this.form.rk_rkdj_no,
                "blLname": this.form.bl_lname,
                "rkStatus": this.form.rk_status,
                "rkZdfs": this.form.rk_zdfs,
                "rkStartwith": this.form.rk_startwith,
                "rk_arehouse_id": this.form.rk_arehouse_id,
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
        inlineModify: function (index, row) {
            obj.$confirm('导出入库单 单据单号：' + row.rk_rkdj_no, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[1].post({
                    ids: [row.rk_rkdj_id]
                }, function (json) {
                    this.callbackAfter({status: json.status, model: "导出入库单"}, function () {
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
            obj.$confirm('确定导出入库单据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                var ids = [];
                for (var i = 0; i < obj.multipleSelection.length; i++) {
                    ids.push(obj.multipleSelection[i].rk_rkdj_id);
                }
                p[1].post({
                    ids: ids
                }, function (json) {
                    json.status = 20000; //TODO
                    this.callbackAfter({status: json.status, model: "导出入库单"}, function () {
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
        },                                   //多选 导出
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
                    rk_rkdj_no: '',
                    rkType: '',
                    rkRemarks: '',
                    rkDocsList: [],
                    bg_goods_no: '',
                    selectGood: {
                        value: '',
                        bg_goods_name: '',
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
            this.dialogSelectVisible = false;

        },                                          //详细查询 提交
        printfSubmit: function () {
            var datas = [];
            var checkData = inputDaily.$refs.printf.getCheckedNodes();
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
            if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年 MM月 dd日');
            else return dateFormat(new Date(parseInt(value)), 'yyyy-MM-dd');
        },                                  //作业时间
        auto_rkrkSjsj: function (value, bool) {
            if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年 MM月 dd日');
            else return dateFormat(new Date(parseInt(value)), 'yyyy-MM-dd');
        },                                  //上架开始时间
        auto_rkEndTime: function (value, bool) {
            if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年 MM月 dd日');
            else return dateFormat(new Date(parseInt(value)), 'yyyy-MM-dd');
        },                                  //上架结束时间
        auto_rkCreatetime: function (value, bool) {
            if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年 MM月 dd日');
            else return dateFormat(new Date(parseInt(value)), 'yyyy-MM-dd');
        },                              //下单时间
        auto_rk_status: function (value) {
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
                    '全部收货': 32
                }
            }
            return temp[value];
        },                                         //单据状态
        auto_rk_zdfs: function (value) {
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
        auto_rk_startwith: function (value) {
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
        },                                         //单据状态
    },
    watch: {
        rk_rkdj_no: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
        rk_status: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
        rk_arehouse_id: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },


    }
});
// 高级 监视器的 使用方法
inputDaily.$watch('date', function () {
    /*<debug>*/
    console.log((_option ? this.form_pop : this.option));
    /*</debug>*/
    p[0].post((_option ? this.form_pop : this.option));
}, {deep: true});


function _form() {
    return {
        rkrwN: '',
        rkrwCph: '',
        dds: '',
        pxs: '',
        rkrwSjxm: '',
        rkrwDhrq: '',
        rkrwDbd: '',
        rkrwCys: '',
        rkrwDh: '',
        rkrwStatus: '',
        rk_createtime: [null, null],//模糊查询--创建时间
        rk_sjsj: null,    //模糊查询 上架时间
        rk_end_time: null,  //模糊查询 下架时间
        rkrkSjsj: [null, null],    //模糊查询--上架时间
        mdt_sjsj: [null, null],     //模糊查询--作业时间
        ru_user_name: '',            //模糊查询--作业人员
        bg_goods_no: '',             //模糊查询--货品编号
        bg_goods_name: '',           //模糊查询--货品名称
        rk_rkdj_no: '',              //模糊查询--入库单号
        bl_lname: '',                //模糊查询--库位
        rk_status: '',               //模糊查询--单据状态
        rk_zdfs: '',                  //模糊查询--制单方式
        rk_startwith: '',             //模糊查询--操作方式
        rk_arehouse_id: window.dbmessage.baseArehouses[0].baArehouseId
    }
}
var obj = inputDaily;
var p = [];
// 0 入库日报 分页查询
p[0] = autoPost({
    urlHock: "/hock/inputDaily/page.json",
    urlProd: "/route/inputDaily/0",
    success: function (json) {
        obj.$data.inputDaily = json.data;
        obj.$data.currentTotal = json.recordsFiltered;
    }
});
// 1 入库日报 导出
p[1] = autoPost({
    urlHock: "",
    urlProd: "/route/inputDaily/1",
    method: 'GET',
    success: function (json) {
    }
});

p[0].post(inputDaily.option);

