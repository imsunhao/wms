var outputSelect = new Vue({
    el: '#outputSelect',
    prop: {},
    data: function () {
        return {
            baseArehouses: window.dbmessage.baseArehouses,
            watchView: false,                   //观察状态量-是否为查看
            outputSelect: [],
            multipleSelection: [],
            multiSelect: false,
            pickerOptions: _pickerOptions(),
            showLoading: false,
            currentPage: 1,
            pageSize: 10,
            currentTotal: 0,
            date: [null, null],                 //主页面 下单时间 搜索
            ckCkdjNo: '',                       //主页面 出库单号 搜索
            ckCkdjClientno: '',                 //主页面 客户名称 搜索
            ckArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,             //主页面 仓库 搜索
            formLabelWidth: '120px',            //表单 配置
            form: _form(),                      //表单 弹出层 信息集合
            dialogFormActive: 0,                //新建 弹出层 steps 当前进度
            dialogFormVisible: false,           //新建 弹出层 是否可见
            submitLoading: false,               //新建 弹出层 提交等待

            detailed: [],
            detailedTemp: {
                "cksCkmxId": 106,
                "cksGoodsId": 9774,
                "cksGoodsCount": 10,
                "cksDwid": 2,
                "cksCkfs": "X",
                "cksZdpc": "X",
                "cksLocationId": 2,
                "cksStatus": 22,
                "cksCkdjId": 88,
                "cksQhStatus": 2,
                "cksQhCount": 3,
                "cksZlStatus": 1,
                "cksZlCount": 0,
                "cksQhbfInfo": null,
                "cksZlbfInfo": null,
                "cksFyCount": 3,
                "cksBfNo": null,
                "cksQhRemarks": null,
                "cksBfStatus": null,
                "baseGoods": {
                    "bgGoodsId": 9774,
                    "bgGoodsNo": "10201037018",
                    "bgGoodsName": "厨房机械（原汁机）、JYZ-E91、主体白色+两侧烫金紫色、Ⅰ类电器、150W、220V、50Hz",
                    "bgNamejc": "",
                    "bgT": null,
                    "bgI": null,
                    "bgHsl": 3,
                    "bgZxdw": 2,
                    "bgSzdw": 1,
                    "bgStatus": 1,
                    "bgArehouseId": 1,
                    "bgClientId": 1,
                    "bgGoodsType": null,
                    "bgGoodsTj": 26.2808,
                    "bgGoodsZl": 0,
                    "bgGoodsPrice": null,
                    "bgCreatetime": 1494825251000,
                    "bgRemarks": null,
                    "bgGoodsGg": null,
                    "baseDws": null
                },
                "baseDw": {
                    "bdDwId": 2,
                    "bdName": "箱",
                    "bdStatus": 1,
                    "bdIsdel": true,
                    "bdCreatetime": 1488786130000
                },
                "ckDoc": {
                    "ckCkdjId": 88,
                    "ckCkdjNo": "CK1495166289874",
                    "ckErpNo": "",
                    "ckCkdjType": 0,
                    "ckCkdjClientno": "",
                    "ckCkdjClientname": "张三",
                    "ckContacts": "李四",
                    "ckTel": "130",
                    "ckAdress": "山东济南",
                    "ckXdsj": 1495166346000,
                    "ckBjsj": 1495166346000,
                    "ckYfhsj": 1495166286000,
                    "ckRemarks": "112",
                    "ckStatus": 22,
                    "ckIsauto": 1,
                    "ckCksj": 1495181518000,
                    "ckStartwith": 1,
                    "ckIsyadan": 2,
                    "ckIsqianhuo": 1,
                    "ckArehouseId": 1,
                    "ckClientId": 1,
                    "ckEndtime": 1495166286000,
                    "ckRwStatus": 41,
                    "ckQhStatus": 2,
                    "ckZlStatus": 3,
                    "ckGqStatus": 1,
                    "ckrwId": 36,
                    "ckZjStatus": 0,
                    "ckZlfyStatus": 0,
                    "mfunckDocs": null,
                    "mfunckSortingMx": null,
                    "baseLocation": null,
                    "mfunHistory": null,
                    "mfunRepertory": null,
                    "mfunckSorting": null,
                    "xjry": null,
                    "msUserName": null,
                    "rwOperator": null,
                    "allCount": null,
                    "allTj": null,
                    "allHeight": null,
                    "rwDoc": null,
                    "baseArehouse": null,
                    "allSortingCount": null,
                    "allSortingTj": null,
                    "allQhCount": null,
                    "allQhTj": null,
                    "allZlCount": null,
                    "allZlTj": null,
                    "userId": null,
                    "rmsUser": null
                },
                "rwDoc": {
                    "ckrwId": 36,
                    "ckrwNo": null,
                    "ckrwYjdcsj": null,
                    "ckrwCph": null,
                    "ckrwSjdcsj": null,
                    "ckrwStatus": null,
                    "ckrwQhStatus": null,
                    "ckrwZlStatus": null,
                    "ckrwWls": null,
                    "ckrwArehouseId": null,
                    "ckrwClientId": null,
                    "orderNum": null,
                    "goodsTypeNum": null,
                    "mfunckDoc": null,
                    "ckCkdjIds": null,
                    "userName": null,
                    "mfunckRwHistory": null
                },
                "mfunckSortingMx": [],
                "mfunRepertory": null,
                "sortingCount": 7,
                "sortingTj": 183.9656,
                "goodsTj": 262.808,
                "cksQhTj": 78.8424,
                "cksZlTj": 0,
                "cksFyTj": 78.8424,
                "baseLocation": {
                    "blLocationId": 8,
                    "blLname": "H16-43-A3",
                    "blRegionId": 4,
                    "blLtray": 2,
                    "blLorder": 7,
                    "blStatus": 1,
                    "blArehouseId": 1
                }
            },
            dialogDetailedVisible: false,       //查看出库明细信息 弹出层 是否可见

            sorting: [],                        //查看分拣明细信息 弹出层 信息集合
            dialogSortingVisible: false,        //查看储位信息 弹出层 是否可见

            select: _form(),                    //搜索 弹出层 信息集合,
            dialogSelectVisible: false,
            dialogPrintfVisible: false,
            selectLoading: false,

        }
    },
    computed: {
        // TODO 表格提交
        option: function () {
            return {
                "draw": 1,
                "ckCkdjNo": this.ckCkdjNo.trim(),
                "ckCkdjClientno": this.ckCkdjClientno.trim(),
                "ckStartXdsj": tsf_date(this.date[0]),
                "ckEndXdsj": tsf_date(this.date[1]),
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
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
                "ckStartXdsj": tsf_date(this.form.ckXdsj[0]),
                "ckEndXdsj": tsf_date(this.form.ckXdsj[1]),
                "mhStartCreateTime": tsf_date(this.form.mhCreatetime[0]),
                "mhEndCreateTime": tsf_date(this.form.mhCreatetime[1]),
                "ckCksj": tsf_date(this.form.ckCksj),
                "ckEndtime": tsf_date(this.form.ckEndtime),
                "ckCkdjNo": this.form.ckCkdjNo,
                "ckCkdjClientno": this.form.ckCkdjClientno,
                "ckCkdjClientname": this.form.ckCkdjClientname,
                "ckAdress": this.form.ckAdress,
                "ckContacts": this.form.ckContacts,
                "ckTel": this.form.ckTel,
                "ckStatus": this.form.ckStatus,
                "ckQhStatus": this.form.ckQhStatus,
                "ckZlStatus": this.form.ckZlStatus,
                "ckIsauto": this.form.ckIsauto,
                "ckStartwith": this.form.ckStartwith,
                "blLname": this.form.blLname,
                "ckArehouseId": this.form.ckArehouseId,
                "ckCkdjType": this.form.ckCkdjType,
            }
        },
        distributionForm: function () {
            return {
                distribution: this.distribution
            }
        },                                      //分配 表单
    },
    methods: {
        inlineExportOutputList: function (index, row) {
            obj.$confirm('导出出库单 单据单号：' + row.ckCkdjNo, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[3].post({
                    ids: [row.ckCkdjId]
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
        },                      //行内按钮-导出出库单
        inlineExportOutputDetailed: function (index, row) {
            obj.$confirm('导出出库明细 单据单号：' + row.ckCkdjNo, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[4].post({
                    ids: [row.ckCkdjId]
                }, function (json) {
                    this.callbackAfter({status: json.status, model: "导出出库明细"}, function () {
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
        },                  //行内按钮-导出出库明细
        inlineExportSortingDetailed: function (index, row) {
            obj.$confirm('导出分拣明细 单据单号：' + row.ckCkdjNo, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[5].post({
                    ids: [row.ckCkdjId]
                }, function (json) {
                    this.callbackAfter({status: json.status, model: "导出分拣明细"}, function () {
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
        },                 //行内按钮-导出分拣明细
        inlineExportOutput: function (index, row) {
        },                          //TODO 行内按钮-导出出库

        inlineSelectOutputDetailed: function (index, row) {
            p[1].post({id: row.ckCkdjId}, function (json) {
                obj.detailed = json.model;
                obj.dialogDetailedVisible = true;
            })
        },                  //行内按钮-查看出库明细信息
        inlineSelectSortingDetailed: function (index, row) {
            this.detailedTemp = row;
            p[2].post({id: row.cksCkmxId}, function (json) {
                obj.sorting = json.model;
                obj.dialogSortingVisible = true;
            })

        },                 //行内按钮-查看分拣明细信息
        inlineModify: function (index, row) {
            this.multipleSelection = [row];
            printfCompile(this);
            this.dialogPrintfVisible = !this.dialogPrintfVisible;
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
        multiExportOutputList: function () {
            obj.$confirm('确定导出出库单据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                var ids = [];
                for (var i = 0; i < obj.multipleSelection.length; i++) {
                    ids.push(obj.multipleSelection[i].ckCkdjId);
                }
                p[3].post({
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

        },                                 //多选 导出出库单据
        multiExportOutputDetailed: function () {
            obj.$confirm('确定导出出库明细?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                var ids = [];
                for (var i = 0; i < obj.multipleSelection.length; i++) {
                    ids.push(obj.multipleSelection[i].ckCkdjId);
                }
                p[4].post({
                    ids: ids
                }, function (json) {
                    json.status = 20000; //TODO
                    this.callbackAfter({status: json.status, model: "导出出库明细"}, function () {
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
        },                             //多选 导出出库单据明细
        multiExportSortingDetailed: function () {
            obj.$confirm('确定导出分拣明细?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                var ids = [];
                for (var i = 0; i < obj.multipleSelection.length; i++) {
                    ids.push(obj.multipleSelection[i].ckCkdjId);
                }
                p[5].post({
                    ids: ids
                }, function (json) {
                    this.callbackAfter({status: json.status, model: "导出分拣明细"}, function () {
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
        },                            //多选 导出分拣明细
        multiExportOutput: function () {
            printfCompile(this);
            this.dialogPrintfVisible = !this.dialogPrintfVisible;
        },                                     //TODO 多选 导出出库
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
                    ckCkdjNo: '',
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

        detailedSubmit: function () {

        },
        sortingSubmit: function () {

        },
        printfLoadNode: function (node, resolve) {
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

        auto_ckCksj: function (value, bool) {
            if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年-MM月-dd日');
            else return dateFormat(new Date(parseInt(value)), 'MM-dd');
        },                                //上架开始时间
        auto_ckEndtime: function (value, bool) {
            if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年-MM月-dd日');
            else return dateFormat(new Date(parseInt(value)), 'MM-dd');
        },                             //上架结束时间
        auto_mhCreatetime: function (value, bool) {
            if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年-MM月-dd日');
            else return dateFormat(new Date(parseInt(value)), 'MM-dd');
        },                          //激活时间
        auto_ckCkdjType: function (value) {
            var temp = {}
            if (!isNaN(value)) {
                temp = {
                    0: '正常单据',
                    1: '挂起单据',
                    2: '滞留单据',
                }
            } else {
                temp = {
                    '正常单据': 0,
                    '挂起单据': 1,
                    '滞留单据': 2,
                }
            }
            return temp[value];
        },                                  //单据类型
        auto_ckStatus: function (value) {
            var temp = {}
            if (!isNaN(value)) {
                temp = {
                    1 :'原始状态',
                    21:'部分分拣',
                    22:'部分下架',
                    31:'全部分拣',
                    32:'全部下架',
                    50: '作废',
                }
            } else {
                temp = {
                    '原始状态': 1,
                    '部分分拣': 21,
                    '部分下架': 22,
                    '全部分拣': 31,
                    '全部下架': 32,
                    '作废': 50,
                }
            }
            return temp[value];
        },                                    //单据状态
        auto_ckQhStatus: function (value) {
            var temp = {}
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
        },                                  //欠货状态
        auto_ckZlStatus: function (value) {
            var temp = {}
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
        },                                  //滞留状态
        auto_ckIsauto: function (value) {
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
        },                                    //制作方式
        auto_ckStartwith: function (value) {
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
        },                                 //操作方式
        auto_msxWt: function (value) {
            var temp = {}
            if (!isNaN(value)) {
                temp = {
                    0: '未修改',
                    1: '货品损坏',
                    2: '库存不足',
                    3: '其他',
                }
            } else {
                temp = {
                    '未修改': 0,
                    '货品损坏': 1,
                    '库存不足': 2,
                    '其他': 3,
                }
            }
            return temp[value];
        },                                       //操作方式
    },
    watch: {
        ckCkdjNo: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
        ckCkdjClientno: function () {
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
// 高级 监视器的 使用方法
outputSelect.$watch('date', function () {
    /*<debug>*/
    console.log((_option ? this.form_pop : this.option));
    /*</debug>*/
    p[0].post((_option ? this.form_pop : this.option));
}, {deep: true});

function _form() {
    return {
        ckXdsj: [null, null],//模糊查询--下单时间
        mhCreatetime: [null, null],//模糊查询--激活时间
        ckCksj: '',//模糊查询--下架开始时间
        ckEndtime:'',//模糊查询--下架结束时间
        ckCkdjNo: '',//模糊查询--出库单号
        ckCkdjClientno: '',//模糊查询--客户编号
        ckCkdjClientname: '',//模糊查询--客户名称
        ckAdress: '',//模糊查询--客户地址
        ckContacts: '',//模糊查询--联系人
        ckTel: '',//模糊查询--联系电话
        ckStatus: '',//--模糊查询--单据状态
        ckQhStatus: '',//模糊查询--欠货状态
        ckZlStatus: '',//模糊查询--滞留状态
        ckCkdjType: '',//模糊查询--单据类型
        ckIsauto: '',//模糊查询--制单方式
        ckStartwith: '',//模糊查询--操作方式
        baName: '',//模糊查询--仓库
        ckArehouseId:window.dbmessage.baseArehouses[0].baArehouseId,//模糊查询 --仓库id
    }
}
var obj = outputSelect;
var p = [];
// 0 出库单据查询 分页查询
p[0] = autoPost({
    urlHock: "/hock/outputSelect/page.json",
    urlProd: "/route/outputSelect/0",
    success: function (json) {
        obj.$data.outputSelect = json.data;
        obj.$data.currentTotal = json.recordsFiltered;
    }
});
// 1 根据出库单id查询出库明细（二级菜单）
p[1] = autoPost({
    urlHock: "",
    urlProd: "/route/outputSelect/1",
    success: function (json) {
        obj.detailed = json.model;
        obj.dialogDetailedVisible = true;
    }
});
// 2 根据出库明细id查询分拣明细集合（三级菜单）
p[2] = autoPost({
    urlHock: "",
    urlProd: "/route/outputSelect/2",
    method: 'GET',
    success: function (json) {

    }
});
// 3 出库单据查询 根据出库ID导出出库单
p[3] = autoPost({
    urlHock: "",
    urlProd: "/route/outputSelect/3",
    method: 'GET',
    success: function (json) {

    }
});
// 4 出库单据查询 根据出库单ID导出出库明细
p[4] = autoPost({
    urlHock: "",
    urlProd: "/route/outputSelect/4",
    method: 'GET',
    success: function (json) {

    }
});
// 5 出库单据查询 根据出库单ID导出分拣明细
p[5] = autoPost({
    urlHock: "",
    urlProd: "/route/outputSelect/5",
    method: 'GET',
    success: function (json) {

    }
});
// 6 出库单据查询
p[6] = autoPost({
    urlHock: "",
    urlProd: "/route/outputSelect/6",
    success: function (json) {

    }
});

function formDetailed() {
    return {
        rksGoodsId: '',     // 货品编号
        rksGoodsId1: '',     // 货品名称
        mdtBatch: '',       // 货品批次
        rksCount: '',       // 货品数量
        bgGoodsTj: '',       //货品体积
        sssl: '',           // 实收数量
        sstj: '',            //实收体积
        rksStatus: '',      //入库明细状态
        mdtUserId: ''       // 上架人员
    }
}//明细
function formsorting() {
    return {
        rksGoodsId: '',     //货品编号
        rksGoodsId1: '',     //货品名称
        mdtBatch: '',       //货品批次
        mdtLocationId: '',  //上架库位
        mdtCount: '',       //上架数量
        sstj: '',             //实收体积
        mdtUserId: '',       //上架人员
        mdtSjsj: ''         //下架时间
    }
}//储位
p[0].post(outputSelect.option);