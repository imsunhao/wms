var inputLedger = new Vue({
    el: '#inputLedger',
    prop: {},
    data: function () {
        return {
            baseArehouses: window.dbmessage.baseArehouses,

            inputLedger: [],
            multipleSelection: [],
            multiSelect: false,
            pickerOptions: _pickerOptions,
            showLoading: false,
            currentPage: 1,
            pageSize: 10,
            currentTotal: 0,
            rule_end: autoValidate(validate_end()), //欠货完结验证规则
            dbdh: '',                              //主页面 调拨单号 搜索
            dh:'',                                  //主页面 单号 搜索
            date1: [null, null],                  //主页面 到货日期 搜索
            rkArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,//主页面 仓库搜索
            formLabelWidth: '120px',            //表单 配置
            form: _form(),                         //表单   弹出层 信息集合
            dialogFormActive: 0,                //新建 弹出层 steps 当前进度
            dialogFormVisible: false,           //新建 弹出层 是否可见
            submitLoading: false,               //新建 弹出层 提交等待
            end: formEnd(),                       //TODO 欠货完结信息 弹出层 信息集合
            dialogEndVisible: false,            //TODO 欠货完结信息 弹出层 是否可见
            ledger: formLedger(),                 //TODO 制作台账结信息 弹出层 信息集合
            dialogLedgerVisible: false,         //TODO 制作台账信息 弹出层 是否可见
            select: _form(),                        //搜索      弹出层 信息集合
            dialogSelectVisible: false,
            selectLoading: false,
            watchView: false,                       //观察状态量-是否为查看
        }
    },
    computed: {
        option: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "dbdh": this.dbdh.trim(),
                "dh": this.dh.trim(),
                "dhrqStart": tsf_date(this.date1[0]),
                "dhrqEnd": tsf_date(this.date1[1]),
                "rkArehouseId": this.rkArehouseId,
            }
        },
        form_pop: function () {
            return {
                "draw": 1,
                "pageNum": 1,
                "pageSize": this.pageSize,
                "sfrqStart": tsf_date(this.form.sfrq[0]),
                "sfrqEnd": tsf_date(this.form.sfrq[1]),
                "dhrqStart": tsf_date(this.form.dhrq[0]),
                "dhrqEnd": tsf_date(this.form.dhrq[1]),
                "shrqStart": tsf_date(this.form.shrq[0]),
                "shrqEnd": tsf_date(this.form.shrq[1]),
                "dbdh": this.form.dbdh,
                "dbdd": this.form.dbdd,
                "cph": this.form.cph,
                "shr_": this.form.shr_,
                "shck": this.form.shck,
                "wlbm": this.form.wlbm,
                "wlms": this.form.wlms,
            }
        }
    },
    methods: {
        inlineExport: function (index, row) {
            obj.$confirm('导出入库台账', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[3].post({
                    ids: [row.rk_rkdj_id]
                }, function (json) {
                    this.callbackAfter({status: json.status, model: "导出入库台账"}, function () {
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
        },                                                 //行内按钮-导出
        inlineProductionLedger: function (index, row) {

            var step = formLedger();
            allPrposCb(step, function (obj2, index) {
                if (typeof row[index] !== 'undefined') step[index] = row[index];
            });

            this.ledger = step;
            this.dialogLedgerVisible = true;

        },                                       //行内按钮-制作台账
        inlineOweEnd: function (index, row) {
            this.end.rks_rkmx_id = row.rk_rkdj_id;
            this.dialogEndVisible = true;
        },                                          //行内按钮-欠货完结
        filterStatus: function (value, row) {
            return row.status == value;
        },                                //状态 过滤函数
        statusWatch: function (status) {
            var str = '';
            switch (status) {
                case '初始状态':
                    str = 'info';
                    break;
                case '部分分配':
                    str = 'danger';
                    break;
                case '全部分配':
                    str = 'warning';
                    break;
                case '部分收货':
                    str = 'success';
                    break;
                case '全部收货':
                    str = 'primary';
                    break;
            }
            return str;
        },                                     //状态 标签颜色
        typeWatch: function (type) {
            var str = '';
            switch (type) {
                case '采购订单':
                    str = 'warning';
                    break;
                case '仓间挑拨':
                    str = 'success';
                    break;
                case '退货入库':
                    str = 'default';
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
        moreOperationDelete: function () {
            /*<debug>*/
            console.log('选中的删除');
            /*</debug>*/
            var listID = [];
            for (var i = 0; i < this.multipleSelection.length; i++) {
                remove(this.multipleSelection[i], this.inputLedger);
                listID.push(this.inputLedger.rkdjNo);
            }
            postDelete(this, {
                id: listID
            })

        },                                   //多选 删除
        moreOperationModify: function () {
            obj.$confirm('确定导出入库台账单据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                var ids = [];
                for (var i = 0; i < obj.multipleSelection.length; i++) {
                    ids.push(obj.multipleSelection[i].rk_rkdj_id);
                }
                p[3].post({
                    ids: ids
                }, function (json) {
                    json.status = 20000; //TODO
                    this.callbackAfter({status: json.status, model: "导出入库台账单"}, function () {
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

        },                                   //多选导出
        oweEnd: function () {
            /*<debug>*/
            console.log('选中的删除');
            /*</debug>*/
            var listID = [];
            for (var i = 0; i < this.multipleSelection.length; i++) {
                remove(this.multipleSelection[i], this.inputLedger);
                listID.push(this.inputLedger.rkdjNo);
            }
            postDelete(this, {
                id: listID
            })

        },                                                //多选欠货完结
        handleSizeChange: function (val) {
            console.log('每页' + val + '条');
            this.pageSize = val;
            p[0].post((_option ? this.form_pop : this.option));
        },                                   //分页 Size
        handleCurrentChange: function (val) {
            console.log('当前第' + val + '页');
            this.currentPage = val;
            p[0].post((_option ? this.form_pop : this.option));
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
//                if (typeof (row.history) == 'undefined') {
//                    postHistory(row);
//                }
//                console.log(row);
        },                             //下拉 选择
        rowSelection: function (row, selected) {
//                console.log(selected)
        },                             //选中 当前行
        hello: function (row, event, column) {
//                console.log(row);
//                this.$refs.table.$emit('toggleRowSelection', row, true);
//                console.log(row);
//                console.log(event);
//                console.log(column);
        },                               //测试 函数 --> 选中 当前行
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
//                setTimeout(function () {
//                    _this.submitLoading = false;
//                    _this.$notify({
//                        title: '成功',
//                        message: '保存成功！',
//                        type: 'success'
//                    });
//                    _this.dialogFormVisible = false;
//                    _this.form = {
//                        dh: '',
//                        rkType: '',
//                        rkRemarks: '',
//                        rkDocsList: [],
//                        wlbm: '',
//                        selectGood: {
//                            value: '',
//                            wlms: '',
//                            count: 0,
//                            bgGoodsId: ''
//                        },
//                        saveARkDocsList: true,
//                        deleteARkDocsList: true
//                    };
//                    _this.dialogFormActive = 0;
//                    _this.$refs.carousel.setActiveItem(0);
//                    p[0].post();
//                }, 1500);
        },                                                //新建 表单提交
        formValidateField: function (formName) {
//                console.log(inputLedger.$refs[formName]);
//                console.log(inputLedger.$refs);
//                setTimeout(function () {
//                    return inputLedger.$refs[formName].validate(function (valid) {
//                        console.log(valid);
//                        return valid;
//                    })
//                },0);
        },                             //表单 string验证
        querySearchAsync: function (queryString, cb) {
            postGoods(this, {wlbm: queryString}, cb);
        },
        GoodSelect: function (item) {
            this.form.saveARkDocsList = false;
            this.form.deleteARkDocsList = true;
            this.form.selectGood = item;
        },
        GoodClick: function (item) {
            this.form.saveARkDocsList = true;
            this.form.deleteARkDocsList = false;
            this.form.selectGood = item;
        },
        saveARkDocsList: function () {
            this.form.rkDocsList.push(this.form.selectGood);
            this.form.selectGood = {
                value: '',
                wlms: '',
                count: 0
            };
            this.form.saveARkDocsList = true;
        },
        deleteARkDocsList: function () {
            remove(this.form.selectGood, this.form.rkDocsList);
            this.form.selectGood = {
                value: '',
                wlms: '',
                count: 0
            };
        },
        endSubmit: function () {
            this.$refs['ref_end'].validate(function (valid) {
                if (valid) {
                    p[1].post(obj.end, function (json) {
                        this.callbackAfter({status: json.status, model: '欠货补发信息'}, function () {
                            p[0].post(obj.option);
                            obj.dialogEndVisible = false;
                        })
                    })
                } else {
                    return false;
                }
            });
        },
        ledgerSubmit: function () {

            var step = _postLedger();

            var row = obj.ledger;
            allPrposCb(step, function (obj2, index) {
                if (typeof row[index] !== 'undefined') step[index] = row[index];
            });

            step.jssj = (new Date(obj.ledger.jssj)).toJSON();
            step.rks_rkmx_id = obj.ledger.rk_rkdj_id;
            p[1].post(step, function (json) {
                this.callbackAfter(json, function () {
                    p[0].post(obj.option);
                    obj.dialogLedgerVisible = false;
                })
            });
        },

        distributionBtn: function () {
            this.dialogDistributionVisible = !this.dialogDistributionVisible;
        },                                        //分配 控制按钮
        selectSubmit: function () {
            _option = true;
            p[0].post(obj.form_pop);
            this.dialogSelectVisible = false;
        },                                           //结算时间

    },
    watch: {
        dbdh: function () {
            p[0].post((_option ? this.form_pop : this.option));
        },
        dh: function () {
            p[0].post((_option ? this.form_pop : this.option));
        },

        rkArehouseId: function () {
            p[0].post((_option ? this.form_pop : this.option));
        }
    }
});
inputLedger.$watch('date1', function () {
    p[0].post((_option ? this.form_pop : this.option));
}, {deep: true});
var obj = inputLedger;
var p = [];
// 0 入库台账 分页查询
p[0] = autoPost({
    urlHock: "../../hock/inputLedger/page.json",
    urlProd: "/route/inputLedger/0",
    success: function (json) {
        obj.$data.inputLedger = json.data;
        obj.$data.currentTotal = json.recordsFiltered;
    }
});
// 1 入库台账 制作/欠货 修改入库台账信息
p[1] = autoPost({
    urlHock: "",
    urlProd: "/route/inputLedger/1",
    success: function (json) {
    }
});
// 3 入库台账 导出
p[3] = autoPost({
    urlHock: "",
    urlProd: "/route/inputLedger/3",
    method: 'GET',
    success: function (json) {
    }
});
function _form() {
    return {
        sfrq: [null, null],//模糊查询--始发时间
        dhrq: [null, null],//模糊查询--到货时间
        shrq: [null, null],//模糊查询--收货时间
        dbdh: '',//模糊查询--调拨单号
        dbdd: '',//模糊查询--调拨地
        cph: '',//模糊查询--车牌号
        shr_: '',//模糊查询--收货人
        shck: '',//模糊查询--收货仓库
        wlbm: '',//模糊查询--物料编号
        wlms: '',//模糊查询--物料描述
        jssj: [null, null],//模糊查询--结算时间
//            shrq:[null,null],
    }
}
function formEnd() {
    return {
        rksWjReason: '',             //完结原因
        rksBfdh: '',                 //补发单号
        rks_rkmx_id: 0,
        userId:app.rmsUser.ruUserId
    }
}
function formLedger() {
    return {
        rk_rkdj_id: '',   //明细id
        sfrq: '',      //始发日期
        dhsj: '',           //到货日期，收货日期
        dbdd: '',         //--调拨地点
        cys: '',         //--承运商
        cph: '',          // --车牌号
        shr: '',      //--收货人
        shck: '',          //--收货仓库
        dh: '',        //--单号
        dbdh: '',         //-调拨单号
        cyts: '',     //承运件数(台)
        cyxs: '',    //承运件数(箱)
        cytj: '',    //方数
        wlbm: '',      //--物料编号
        wlms: '',    //--物料描述
        pm: '',          //--泡沫
        ts: '',          //台数
        js: '',          //件数
        tj: '',          //方数
        dbpswb: '',   //--调拨破损外包
        ytpswb: '',   //--源头破损外包
        dbpsnb: '',   //--调拨破损内保
        ytpsnb: '',   //--源头破损内保
        ycyy: '',    // --异常原因
        cljg: '',    // ---处理结果
        psts: '',    // --破损台数
        jssj: '',    // --结算时间
        qhsl: ''
    }
}
function validate_end() {
    return {
        rksWjReason: 'vNull',
        // rksBfdh: 'vNull',
    }
}
function _postLedger() {
    return {
        "rks_rkmx_id": 0,
        "pm": "string",
        "dbpswb": "string",
        "ytpswb": "string",
        "dbpsnb": "string",
        "ytpsnb": "string",
        "ycyy": "string",
        "qhsl": "string",
        "cljg": "string",
        "psts": 8,
        "jssj": "2017-06-08T09:15:32.918Z",
        "userId":app.rmsUser.ruUserId
    }
}
p[0].post(inputLedger.option);
