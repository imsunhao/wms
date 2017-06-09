var stockSelect = new Vue({
    el: '#stockSelect',
    prop: {},
    data: function () {
        return {
            baseArehouses: window.dbmessage.baseArehouses,
            watchView: false,                           //观察状态量-是否为查看
            stockSelect: [],
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
            blLname: '',                       //主页面 库位名称 搜索
            bgGoodsNo: '',                       //主页面 货品编号 搜索
            bgGoodsName: '',                     //主页面 货品编号 搜索
            mrArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,             //主页面 仓库 搜索
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
                "blLname": this.blLname.trim(),
                "bgGoodsNo": this.bgGoodsNo.trim(),
                "bgGoodsName": this.bgGoodsName.trim(),
                "mrArehouseId":this.mrArehouseId,
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
                "startTimeParam": tsf_date(this.form.mrKcydsj[0]),
                "endTimeParam": tsf_date(this.form.mrKcydsj[1]),
                "bgGoodsNo": this.form.bgGoodsNo,
                "bgGoodsName": this.form.bgGoodsName,
                "mrGoodsBatch": this.form.mrGoodsBatch,
                "blLname": this.form.blLname,
                "mrArehouseId": this.form.mrArehouseId,
                "mrDjStatus": this.form.mrDjStatus,
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
            obj.$confirm('导出库存单 库位名称：' + row.baseLocation.blLname, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[1].post({
                    ids: [row.mrRepertoryId]
                }, function (json) {
                    this.callbackAfter({status: json.status, model: "导出库存单"}, function () {
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
            obj.$confirm('确定导出库存?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                var ids = [];
                for (var i = 0; i < obj.multipleSelection.length; i++) {
                    ids.push(obj.multipleSelection[i].mrRepertoryId);
                }
                p[1].post({
                    ids: ids
                }, function (json) {
                    json.status = 20000; //TODO
                    this.callbackAfter({status: json.status, model: "导出库存"}, function () {
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
            p[0].post((_option ? this.form_pop : (_option ? this.form_pop : this.option)));
        },                                   //分页 Size
        handleCurrentChange: function (val) {
            /*<debug>*/
            console.log('当前第' + val + '页');
            /*</debug>*/
            this.currentPage = val;
            p[0].post((_option ? this.form_pop : (_option ? this.form_pop : this.option)));
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
            this.dialogSelectVisible = false;
        },                                          //详细查询 提交
        printfSubmit: function () {
            var datas = [];
            var checkData = stockSelect.$refs.printf.getCheckedNodes();
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
        }
    },
    watch: {
        blLname: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : (_option ? this.form_pop : this.option)));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : (_option ? this.form_pop : this.option)));
        },
        bgGoodsNo: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : (_option ? this.form_pop : this.option)));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : (_option ? this.form_pop : this.option)));
        },
        bgGoodsName: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : (_option ? this.form_pop : this.option)));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : (_option ? this.form_pop : this.option)));
        },
        mrArehouseId: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : (_option ? this.form_pop : this.option)));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : (_option ? this.form_pop : this.option)));
        },

    }
});
function _form() {
    return {
        mrKcydsj: [null, null],    //模糊查询--异动时间
        bgGoodsNo: '',   //模糊查询--货品编号
        bgGoodsName: '',    //模糊查询--货品名称
        blLname: '',//模糊查询--库位名称
        mrGoodsBatch: '',//模糊查询--货品批次
        mrArehouseId: ''//模糊查询--仓库
    }
}
var obj = stockSelect;
var p = [];
// 0 库存查询 分页查询
p[0] = autoPost({
    urlHock: "/hock/stockSelect/page.json",
    urlProd: "/route/stockSelect/0",
    success: function (json) {
        obj.$data.stockSelect = json.data;
        obj.$data.currentTotal = json.recordsFiltered;
    }
});
// 1 库存查询 导出
p[1] = autoPost({
    urlHock: "",
    urlProd: "/route/stockSelect/1",
    method: "GET",
    success: function (json) {
    }
});
// 高级 监视器的 使用方法
//    stockSelect.$watch('date', function () {
//        if (!(_option ? this.form_pop : (_option ? this.form_pop : this.option)).dateStart)return;
//        /*<debug>*/
//        console.log((_option ? this.form_pop : (_option ? this.form_pop : this.option)));
//        /*</debug>*/
//        post(this, (_option ? this.form_pop : (_option ? this.form_pop : this.option)));
//    }, {deep: true});
p[0].post(stockSelect.option);
