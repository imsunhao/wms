var outputOperation = new Vue({
    el: '#outputOperation',
    prop: {},
    data: function () {
        return {
            baseArehouses: window.dbmessage.baseArehouses,
            validateRkRkdjNo: function (rule, value, callback) {
                if (validateRule.a.exec(value)) {
                    callback(new Error('不允许存在特殊字符!'));
                }
                else {
                    callback();
                }
            },                  //validate 入库单号
            outputOperation: [],
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
            date: [null, null],                  //TODO 主页面 下单时间 搜索
            ckCkdjNo: '',                        //TODO 主页面 出库单号 搜索
            date2: [null, null],                 //TODO 主页面 制作时间 搜索
            ckStatus: '',                        //TODO 主页面 出库状态 搜索
            formLabelWidth: '120px',             //表单 配置
            form: form(),                        //表单 弹出层 信息集合
            dialogFormActive: 0,                 //新建 弹出层 steps 当前进度
            dialogFormVisible: false,            //新建 弹出层 是否可见
            submitLoading: false,                //新建 弹出层 提交等待

            location: [],                        //分配 弹出层 信息集合,
            dialogDistributionForm: false,       //分配 弹出层 是否可见
            locationLoading: false,


            printDatas: _printDatas_p2(),        // 打印数据

            select: {},                          //搜索 弹出层 信息集合
            dialogLocationVisible: false,        //关联 弹出层 是否可见
            dialogSelectVisible: false,
            selectLoading: false,
        }
    },
    computed: {
        option: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "ckCkdjNo": this.ckCkdjNo.trim(),
                "ckStatus": this.ckStatus,
                "ckStartXdsj": tsf_date(this.date[0]),
                "ckEndXdsj": tsf_date(this.date[1]),
                "mhStartCreateTime": tsf_date(this.date2[0]),
                "mhEndCreateTime": tsf_date(this.date2[1]),
                ckArehouseId:window.dbmessage.baseArehouses[0].baArehouseId,
            }
        },
        distributionForm: function () {
            return {
                distribution: this.distribution
            }
        },                                      //分配 表单
    },
    methods: {
        inlinePrintSortingList: function (index, row) {
            this.multipleSelection = [row];
            printfCompile(this, 1, row);
        },                      //行内按钮-打印分拣单
        inlineXj: function (index, row) {
            obj.$confirm('此操作将此出库单据下架 单据单号：' + row.ckCkdjNo, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[2].post({
                    ids: [row.ckCkdjId],
                    userName: app.rmsUser.ruUserName,
                    useId: app.rmsUser.ruUserId
                }, function (json) {
                    this.callbackAfter({status: json.status, model: "下架"}, function () {
                        p[0].post(obj.option);
                    })
                });
            }).catch(function () {
                obj.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },                                    //行内按钮-下架
        inlinePrintOrder: function (index, row) {
            this.multipleSelection = [row];
            printfCompile(this, 0, row);
        },                            //TODO 行内按钮-打印追加分拣单
        distributionBtnSubmit: function () {
            this.dialogFormActive++;
            this.submitLoading = true;
            //TODO 此处应是ajax请求
            setTimeout(function () {
                obj.submitLoading = false;
                obj.$notify({
                    title: '成功',
                    message: '分配成功！',
                    type: 'success'
                });
                obj.dialogFormVisible = false;
                obj.form = form();
                obj.dialogFormActive = 0;
                obj.dialogDistributionForm = false;
                obj.$refs.carousel.setActiveItem(0);
                p[0].post();
            }, 1500);
        },
        distributionBtnLocation: function (index, row) {
            var step = selectGood();
            allPrposCb(step, function (obj, index) {
                if (typeof row[index] !== 'undefined') step[index] = row[index];
            });
            this.form.location.selectGood = step;
            this.dialogLocationVisible = true;
        },
        distributionBtnLocationDelete: function (index, row) {
            var obj = this;
            obj.$confirm('此操作将删除该条库存储位信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
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
            var obj = this;
            this.locationLoading = true;
            //TODO 此处应是ajax请求
            setTimeout(function () {
                obj.locationLoading = false;
                obj.$notify({
                    title: '成功',
                    message: '关联成功！',
                    type: 'success'
                });
                var step = locationFather();
                allPrposCb(step, function (obj, index) {
                    if (typeof obj.form.location[index] !== 'undefined') step[index] = obj.form.location[index];
                });
                obj.location.push(step);
                obj.form.location = newLocation();
                obj.dialogLocationVisible = false;
            }, 250);
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
            var obj = this;
            if (this.dialogFormActive !== 0) {
                setTimeout(function () {
                    obj.$refs.carousel.setActiveItem(1);
                }, 150);
            } else {
                setTimeout(function () {
                    obj.$refs.carousel.setActiveItem(0);
                }, 150);
            }
        },

        multiSelectClick: function () {
            this.multiSelect = !this.multiSelect;
        },                                      //多选 状态维护
        multiSelectPrintCombinedSortingList: function () {
            printfCompile(this);
        },                   //多选 打印组合分拣单
        multiSelectOffTheShelf: function () {
            obj.$confirm('此操作将这些出库单据下架', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                var ids = [];
                for (var i = 0; i < obj.multipleSelection.length; i++) {
                    ids.push(obj.multipleSelection[i].ckCkdjId);
                }
                p[2].post({
                    ids: ids,
                    userName: app.rmsUser.ruUserName,
                    useId: app.rmsUser.ruUserId
                }, function (json) {
                    this.callbackAfter({status: json.status, model: "下架"}, function () {
                        p[0].post(obj.option);
                    })
                });
            }).catch(function () {
                obj.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },                                //多选 下架
        handleSelectionChange: function (val) {
            /*<debug>*/
            console.log(this.multipleSelection);
            /*</debug>*/
            this.multipleSelection = val;
        },                              //多选 选中控制
        moreOperationDelete: function () {
            /*<debug>*/
            console.log('选中的删除');
            /*</debug>*/
            var listID = [];
            for (var i = 0; i < this.multipleSelection.length; i++) {
                remove(this.multipleSelection[i], this.outputOperation);
                listID.push(this.outputOperation.rkdjNo);
            }
            postDelete(this, {
                id: listID
            })

        },                                   //多选 删除


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
                obj.historyLoading = true;
                p[1].post({id: row.ckCkdjId}, function (json) {
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
                });
            }
            if (expanded && row.mfunckDocs.length === 0) {
                p[101].post({id: row.ckCkdjId}, function (json) {
                    row.mfunckDocs = json.model;
                })

            }
        },                             //下拉 选择
        rowSelection: function (row, selected) {
//                console.log(selected)
        },                             //选中 当前行


        printfSubmit: function () {
            var datas = [];
            var checkData = startReceiving.$refs.printf.getCheckedNodes();
            for (var i in checkData) {
                if (typeof checkData[i].val2 !== 'undefined') {
                    datas.push(checkData[i]);
                }
            }
            this.printDatas = datas;
            this.dialogPelectVisible = !this.dialogPrintfVisible;
            wap.print2(this);
        },                                          //打印 提交
        printfCheckChange: function () {

        },                                     //打印 选中维护
        printfLoadNode: function (node, resolve) {
            switch (node.level) {
                case 0:
                    return resolve(this.printf);
                case 1:
                    console.log(node.data)
                    var resoleveStep = [];
                    for (var i = 0; i < node.data.mfunckDocs.length; i++) {
                        resoleveStep.push({
                            name: node.data.mfunckDocs[i].baseGoods.bgGoodsName
                        });
                    }
                    return resolve(resoleveStep);
                case 2:
                    return resolve([]);
            }
        },                           //打印 加载数据

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
                obj.$refs.carousel.setActiveItem(0);
                //post(outputOperation);
            }, 1500);
        },                                                //新建 表单提交

        querySearchAsync: function (queryString, cb) {
            postGoods(this, {bgGoodsNo: queryString}, cb);
        },
        queryLocationAsync: function (queryString, cb) {
            postLocation(this, {blLname: queryString}, cb);
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
                remove(row, obj.outputOperation);
                postDelete(obj, {
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
        },                            //TODO 入库仓库id 自动匹配
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
        },                                    //TODO 单据状态
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
        },                                    //TODO 制单方式
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
        }   //修改分拣方式

    },
    watch: {
        ckCkdjNo: function () {
            /*<debug>*/
            console.log(this.option);
            /*</debug>*/
            p[0].post(this.option);
        },
        ckStatus: function () {
            /*<debug>*/
            console.log(this.option);
            /*</debug>*/
            p[0].post(this.option);
        },
    }
});
// 高级 监视器的 使用方法
outputOperation.$watch('form.selectGood.rksCount', function () {
    if (!this.form.deleteARkDocsList)return;
    var valid = false;
    outputOperation.$refs['newForm'].validate(function (_valid) {
        valid = _valid;
    });
    valid ?
        this.form.saveARkDocsList = false :
        this.form.saveARkDocsList = true
});
outputOperation.$watch('date', function () {
    /*<debug>*/
    console.log(this.option);
    /*</debug>*/
    p[0].post(this.option);
}, {deep: true});
outputOperation.$watch('date2', function () {
    /*<debug>*/
    console.log(this.option);
    /*</debug>*/
    p[0].post(this.option);
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
        selectGood: selectGood(),
        location: newLocation(),
        saveARkDocsList: true,
        deleteARkDocsList: true
    };
}
var obj = outputOperation;
var p = [];
// 0 出库操作 分页查询
p[0] = autoPost({
    urlHock: "../../hock/outputOperation/page.json",
    urlProd: "/route/outputOperation/0",
    success: function (json) {
        var temp = [];
        for (var i = 0; i < json.data.length; i++) {
            temp[i] = json.data[i];
            temp[i].history = [];
            temp[i].historyLoading = false;
            temp[i].historyLength = 0;
        }
        obj.$data.outputOperation = json.data;
        obj.$data.currentTotal = json.recordsFiltered;
    }
});
// 1 出库操作-查询-历史记录
p[1] = autoPost({
    urlHock: "../../hock/outputOperation/page.json",
    urlProd: "/route/outputOperation/1",
    method: 'GET'
});
// 2 出库操作-下架
p[2] = autoPost({
    urlHock: "../../hock/outputOperation/page.json",
    urlProd: "/route/outputOperation/2",
    method: 'GET'
});
// 3 出库操作-打印分拣单
p[3] = autoPost({
    urlHock: "../../hock/outputOperation/page.json",
    urlProd: "/route/outputOperation/3"
});
// 4 出库操作-打印组合分拣单
p[4] = autoPost({
    urlHock: "../../hock/outputOperation/page.json",
    urlProd: "/route/outputOperation/4",
    method: 'GET'
});
// 5 出库操作-打印追加分拣单
p[5] = autoPost({
    urlHock: "../../hock/outputOperation/page.json",
    urlProd: "/route/outputOperation/5"
});

// 101 查询-出库单号-出库明细
p[101] = autoPost({
    urlHock: "/hock/warehousingTask/mfunckDoc.json",
    urlProd: "/route/outboundTask/2"
});

/*<debug>*/
(function () {
    window.dbmessage = {};
    window.dbmessage.baseArehouses = JSON.parse('[{"baArehouseId":4,"baName":"无限极济阳仓A91","baAddr":"济南市济阳县","baScity":"齐河","baScontacts":"联系人1","baPhone":"13112345678","baAcreage":"222","baCtype":"22","baHumidity":"222","baFax":"2222","baPostoffice":"test","baIsti":1,"baStatus":1,"baClientId":3,"baRemarks":"test","baCreatetime":1487233193000,"baPgroupinfo":"eeeeeeeeeeeee","arehouseKqs":[]},{"baArehouseId":5,"baName":"九阳济南仓A02","baAddr":"济南市济阳278号","baScity":"齐河","baScontacts":"联系人1","baPhone":"13012345678","baAcreage":"222","baCtype":"111","baHumidity":"222","baFax":"2222","baPostoffice":"test","baIsti":2,"baStatus":1,"baClientId":1,"baRemarks":"test","baCreatetime":1487838047000,"baPgroupinfo":"eeeeeeeeeeeee","arehouseKqs":[]}]');
})();
/*</debug>*/

function locationFather() {
    return {
        selectGood: {
            baseGoods: {
                bgGoodsNo: "",
                blLname: ""
            },
            rksCount: ''
        },
        lala: '',
        blLname: ''
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
        lala: dateFormat(new Date(), 'yyyyMMdd')
    }
}
//    , {
//        deep: true
//    }

p[0].post(outputOperation.option);


function postLocation(obj, option, cb) {

    /*<debug>*/
    url = "/hock/inputOption/location.json";
    /*</debug>*/

    /*<prod>*/
    url = "/data/inputOption/history";
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
            json = json.data;
            var step = [];
            var length = json.length > 20 ? 20 : json.length;
            for (var i = 0; i < length; i++) {
                step.push({data: json[i], value: json[i].blLname})
            }
            cb(step);
        },
        complete: function () {
        }
    });
}

function postDelete(obj, option) {
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

function postGoods(obj, option, cb) {
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

function printfCompile(obj, index, row) {
    var ids = [];
    for (var i = 0; i < obj.multipleSelection.length; i++) {
        ids.push(obj.multipleSelection[i].ckCkdjId);
    }
    if (ids.length === 1 && index === 1) {
        p[3].post({
            id: ids[0],
            "pageNum": 1,
            "pageSize": 999,
            "draw": 0
        }, function (json) {
            obj.printDatas.data = json.data;
            obj.printDatas.row = row;
            obj.printDatas.info.amount = json.data[0].mfunckDoc.amount;
            wap.print2(obj);
        });
    } else if (ids.length === 1) {
        p[5].post({
            id: ids[0],
            "pageNum": 1,
            "pageSize": 999,
            "draw": 0
        }, function (json) {
            obj.printDatas.data = json.data;
            obj.printDatas.row = row;
            obj.printDatas.info.amount = json.data[0].mfunckDoc.amount;
            wap.print2(obj);
        });
    }
    else if (ids.length === 0) {

    } else {
        p[4].post({
            ids: ids,
            "pageNum": 1,
            "pageSize": 999,
            "draw": 0
        }, function (json) {
            obj.printDatas = json.data;
            wap.print3(obj);
        });
    }
}