/*<debug>*/
var id = 0;
(function () {
    window.dbmessage = {};
    window.dbmessage.baseArehouses = JSON.parse('[{"baArehouseId":4,"baName":"无限极济阳仓A91","baAddr":"济南市济阳县","baScity":"齐河","baScontacts":"联系人1","baPhone":"13112345678","baAcreage":"222","baCtype":"22","baHumidity":"222","baFax":"2222","baPostoffice":"test","baIsti":1,"baStatus":1,"baClientId":3,"baRemarks":"test","baCreatetime":1487233193000,"baPgroupinfo":"eeeeeeeeeeeee","arehouseKqs":[]},{"baArehouseId":5,"baName":"九阳济南仓A02","baAddr":"济南市济阳278号","baScity":"齐河","baScontacts":"联系人1","baPhone":"13012345678","baAcreage":"222","baCtype":"111","baHumidity":"222","baFax":"2222","baPostoffice":"test","baIsti":2,"baStatus":1,"baClientId":1,"baRemarks":"test","baCreatetime":1487838047000,"baPgroupinfo":"eeeeeeeeeeeee","arehouseKqs":[]}]');
})();
/*</debug>*/
var outputAppointment = new Vue({
    el: '#outputAppointment',
    prop: {},
    data: function () {
        return {
            baseArehouses: window.dbmessage.baseArehouses,
            outputAppointment: [],
            outputAppointmentCombination: [],
            outputAppointmentCombinationDetails: CombinationDetails(),
            multipleSelection: [],
            multipleSelectionCombination: [],
            multiSelect: false,
            date: [null, null],           //主页面 选择日期 搜索
            ckCkdjNo: '',                 //主页面 出库单号 搜索
            ckCkdjClientname: '',        //主页面 客户名称 搜索
            // ckCkdjType: '',               //主页面 出库单 类型
            ckRwStatus: 0,                //主页面 出库单任务状态 搜索
            ckArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,//主页面 仓库 搜索
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

            formLabelWidth: '120px',       //表单 配置
            form: _form(),                 //表单 弹出层 信息集合
            rule_form: autoValidate(validate_form()), //出库基础信息验证规则
            rule_form2: autoValidate(validate_form2()),//出库明细验证规则
            rule_outputAppointmentCombinationDetails: autoValidate(validate_details()),
            dialogFormActive: 0,           //新建 弹出层 steps 当前进度
            dialogFormVisible: false,      //新建 弹出层 是否可见
            submitLoading: false,          //新建 弹出层 提交等待

            dialogExcelVisible: false,     //Excel 弹出层 是否可见
            excelLoading: false,           //Excel 弹出层 提交等待

            formActive: 0,                 //form steps 当前进度

            select: {},                    //搜索 弹出层 信息集合
            dialogSelectVisible: false,
            selectLoading: false,
            fileList: [],

            watchView: false,               //观察状态量-是否为查看
        }
    },
    computed: {
        option: function () {
            return {
                "draw": 1,
                "pageNum": 1,
                "pageSize": 19,
                // "ckCkdjType": this.ckCkdjType,
                "ckCkdjNo": this.ckCkdjNo,
                "ckCkdjClientname":this.ckCkdjClientname,
                // "startTimeParam": tsf_date(this.date[0]),
                // "endTimeParam": tsf_date(this.date[1]),
                "ckArehouseId": this.ckArehouseId,

//                    ckCkdjNo: this.ckCkdjNo,

//                    "ckStatus": -1,
//                    "ckCkdjClientname": "",
//                    "ckCkdjType": -1,
//                    "ckArehouseId": -1
            }
        },
        form_pop: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "startTimeParam": tsf_date(this.form.ckXdsj[0]),
                "endTimeParam": tsf_date(this.form.ckXdsj[1]),
                "ckCkdjNo": this.form.ckCkdjNo,
                "ckCkdjClientname": this.form.ckCkdjClientname,
                "ckArehouseId": this.form.ckArehouseId,
                "ckCkdjType": this.form.ckCkdjType,
            }
        },
    },
    methods: {
        View: function (index, row) {
            p[8].post({id: row.ckCkdjId}, function (json) {
                var step = _form();
                allPrposCb(step, function (obj, index) {
                    if (typeof row[index] !== 'undefined') step[index] = row[index];
                });
                /*<debug>*/
                console.log(row);
                console.log(step);
                /*</debug>*/
                step.title = '查看';
                obj.watchView = true;
                step.mfunckDocs = json.model;
                if (typeof obj.$refs.carousel !== 'undefined') obj.$refs.carousel.setActiveItem(0);
                obj.form = step;
                obj.dialogFormActive = 0;
                obj.dialogFormVisible = true;
            });
        },                                        //行内按钮-观察
        inlineEdit: function (index, row) {
            p[8].post({id: row.ckCkdjId}, function (json) {
                var step = _form();
                allPrposCb(step, function (obj, index) {
                    if (typeof row[index] !== 'undefined') step[index] = row[index];
                });
                /*<debug>*/
                console.log(row);
                console.log(step);
                /*</debug>*/
                step.title = '编辑';
                step.userId = app.rmsUser.ruUserId;
                obj.watchView = false;
                step.mfunckDocs = json.model;
                if (typeof obj.$refs.carousel !== 'undefined') obj.$refs.carousel.setActiveItem(0);
                obj.form = step;
                obj.dialogFormActive = 0;
                obj.dialogFormVisible = true;
            });
        },                                  //行内按钮-编辑
        inlineDeleteOlder: function (index, row) {
            obj.$confirm('确定作废? 单号：' + row.ckCkdjNo, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                remove(row, obj.outputAppointment);
                p[11].post({
                    id: row.ckCkdjId
                });
            }).catch(function () {
                obj.$message({
                    type: 'info',
                    message: '已取消作废'
                });
            });
        },                           //行内按钮-作废
        inlineRetentionInput: function (index, row) {
            obj.$confirm('确定滞留出库？ 单号：' + row.ckCkdjNo, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[12].post({
                    useId: app.rmsUser.ruUserId,
                    ids: [row.ckCkdjId]
                }, function (json) {
                    this.callbackAfter({status: json.status, model: '滞留入库'}, function () {
                        remove(row, obj.outputAppointment);
                    })
                });
            }).catch(function () {
                obj.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },                        //行内按钮-滞留出库
        multiSelectClick: function () {
            this.multiSelect = !this.multiSelect;
        },                                      //多选 状态维护
        handleSelectionChange: function (val, row) {
            /*<debug>*/
            console.log(addOrDelete(row, val));
            /*</debug>*/
            if (addOrDelete(row, val)) {
                this.outputAppointmentCombination.push(row);
            } else {
                remove(row, this.outputAppointmentCombination);
            }
            this.multipleSelection = val;
        },                         //多选 选中控制
        handleSelectionChangeAll: function (val) {
            if (val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    if (!addOrDelete(val[i], this.outputAppointmentCombination)) {
                        this.outputAppointmentCombination.push(val[i]);
                    }
                }
            } else {
                for (var i = 0; i < this.outputAppointment.length; i++) {
                    remove(this.outputAppointment[i], this.outputAppointmentCombination);
                }
            }
            this.multipleSelection = val;
        },                           //多选 选中控制
        handleSelectionChangeCombination: function (val) {
            /*<debug>*/
            console.log(this.multipleSelectionCombination);
            /*</debug>*/
            this.multipleSelectionCombination = val;
        },                   //Combination 选中控制
        moreOperationDelete: function () {
            /*<debug>*/
            console.log('选中的删除');
            /*</debug>*/
            for (i = 0; i < this.multipleSelectionCombination.length; i++) {
                remove(this.multipleSelectionCombination[i], this.outputAppointmentCombination);
            }
        },                                   //多选 删除
        handleSizeChange: function (val) {
            /*<debug>*/
            console.log('每页' + val + '条');
            /*</debug>*/
            this.pageSize = val;
            p[7].post((_option ? this.form_pop : this.option));
        },                                   //分页 Size
        handleCurrentChange: function (val) {
            /*<debug>*/
            console.log('当前第' + val + '页');
            /*</debug>*/
            this.currentPage = val;
            p[7].post((_option ? this.form_pop : this.option));
        },                                //分页 当前页
        newInput: function () {
            var No = this.form.ckCkdjNo;
            var Id = this.form.ckCkdjId;
            obj.form = _form();
            if (No === '' || Id !== '') {
                p[9].post();
            } else if (Id === '') {
                this.form.ckCkdjNo = No;
            }
            if (typeof obj.$refs.carousel !== 'undefined') obj.$refs.carousel.setActiveItem(0);
            obj.dialogFormActive = 0;
            obj.dialogFormVisible = true;
        },                                              //按钮 新建出库单
        expandChange: function (row, expanded) {
//                if (typeof (row.history) == 'undefined') {
//                    postHistory(row);
//                }
//                console.log(row);
        },                             //下拉 选择
        rowSelection: function (row, selected) {
//                console.log(selected)
        },                             //选中 当前行
        prevForm: function () {
            this.formActive--;
            this.$refs.carouselWaiting.prev();
        },                                              //form 前一个
        nextForm: function () {
            if (this.outputAppointmentCombinationDetails.ckrwNo === "") {
                obj.showLoading = true;
                p[10].post();
            }
            this.formActive++;
            this.$refs.carouselWaiting.next();

        },                                              //form 后一个
        submitForm: function () {
            this.$refs['ref_outputAppointmentCombinationDetails'].validate(function (valid) {
                if (valid) {
                    var Combination = post_Combination();
                    allPrposCb(Combination, function (obj2, index) {
                        if (typeof obj.outputAppointmentCombinationDetails[index] !== 'undefined') Combination[index] = obj.outputAppointmentCombinationDetails[index];
                    });
                    Combination.ckCkdjIds = [];
                    for (var i = 0; i < outputAppointment.outputAppointmentCombination.length; i++) {
                        Combination.ckCkdjIds.push(outputAppointment.outputAppointmentCombination[i].ckCkdjId);
                    }
                    Combination.ckrwYjdcsj = Combination.ckrwYjdcsj.toJSON();
                    p[1].post(Combination);
                } else {
                    return false;
                }
            });
        },                                            //组合 表单提交
        submitUpload: function () {
            console.log('提交')
        },

        prev: function () {
            this.dialogFormActive--;
            this.$refs.carousel.prev();
        },                                                  //新建 弹出层banner控制 前一个
        next: function () {
            this.$refs['ref_form'].validate(function (valid) {
                if (valid) {
                    obj.dialogFormActive++;
                    obj.$refs.carousel.next();
                } else {
                    return false;
                }
            });

        },                                                  //新建 弹出层banner控制 后一个
        submit: function () {
            this.dialogFormActive++;
            this.submitLoading = true;

            /*<prod>*/
            var form = post_form();

            allPrposCb(form, function (val, index) {
                if (typeof obj.form[index] !== 'undefined') form[index] = obj.form[index];
            });

            form.rkCreatetime = new Date().toJSON();
            form.mfunckDocs = [];
            for (var i = 0; i < obj.form.mfunckDocs.length; i++) {
                var form_mfunckDocs = post_form_mfunckDocs();
                (function (i, form_mfunckDocs) {
                    allPrposCb(form_mfunckDocs, function (val, index) {
                        console.log(index);
                        if (typeof obj.form.mfunckDocs[i][index] !== 'undefined') form_mfunckDocs[index] = obj.form.mfunckDocs[i][index];
                    })
                })(i, form_mfunckDocs);
                form.mfunckDocs.push(form_mfunckDocs);
            }
            if (this.form.title === '新建出库单') {
                p[0].post(form);
            } else {
                p[3].post(form);
            }
            /*</prod>*/


            /*<debug>*/
            setTimeout(function () {
                obj.submitLoading = false;
                obj.$notify({
                    title: '成功',
                    message: '保存成功！',
                    type: 'success'
                });
                obj.dialogFormVisible = false;
                obj.form = _form();
                obj.dialogFormActive = 0;
                obj.$refs.carousel.setActiveItem(0);
                p[7].post(outputAppointment.options);
            }, 1500);
            /*</debug>*/

        },                                                //新建 表单提交
        submitWatchView: function () {
            this.dialogFormActive++;
            this.dialogFormVisible = false;
            this.form = _form();
            this.dialogFormActive = 0;
            this.$refs.carousel.setActiveItem(0);
        },                                       //观察提交

        validateRkRkdjNo: function (rule, value, callback) {
            if (validateRule.a.exec(value)) {
                callback(new Error('不允许存在特殊字符!'));
            }
            else {
                callback();
            }
        },                 //validate 出库单号
        formValidateField: function (formName) {
//                console.log(outputAppointment.$refs[formName]);
//                console.log(outputAppointment.$refs);
//                setTimeout(function () {
//                    return outputAppointment.$refs[formName].validate(function (valid) {
//                        console.log(valid);
//                        return valid;
//                    })
//                },0);
        },                             //表单 string验证
        querySearchAsync: function (queryString, cb) {
            postGoods(this, {
                bgGoodsNo: queryString,
                "pageNum": 1,
                "pageSize": 20,
                "draw": 1
            }, cb);
        },                       //货品异步查询
        GoodSelect: function (item) {
            this.form.selectGood = selectGood();
            this.form.saveAmfunckDocs = false;
            this.form.deleteAmfunckDocs = true;
            this.form.selectGood = {
                baseGoods: {
                    bgGoodsNo: item.data.bgGoodsNo,
                    bgGoodsName: item.data.bgGoodsName
                },
                baseDw: {
                    bdDwid: 1
                },
                cksGoodsCount: 0,
                cksDwid: item.data.bgZxdw,
                cksGoodsId: item.data.bgGoodsId,
                data: item.data
            };
            obj.$refs.ref_rksCount.$el.querySelector('input').focus();
        },                                        //货品明细控制 选中下拉菜单中的货品
        GoodClick: function (item) {
            this.form.saveAmfunckDocs = true;
            this.form.deleteAmfunckDocs = false;
            this.form.selectGood = item;
            obj.$refs.ref_rksCount.$el.querySelector('input').focus();
        },                                         //货品明细控制 选中form中的货品
        saveDocsList: function () {
            this.$refs['ref_form2'].validate(function (valid) {
                if (valid) {
                    obj.form.mfunckDocs.push(obj.form.selectGood);
                    obj.form.selectGood = selectGood();
                    obj.form.saveAmfunckDocs = true;
                    obj.$refs.ref_bgGoodsNo.$el.querySelector('input').focus();
                } else {
                    return false;
                }
            });

        },                                          //货品明细控制 保存
        GoodEnter: function () {
            if (this.form.deleteAmfunckDocs === false) {
                this.form.selectGood = selectGood();
                this.form.saveAmfunckDocs = true;
                this.form.deleteAmfunckDocs = true;
                obj.$refs.ref_bgGoodsNo.$el.querySelector('input').focus();
            } else if (this.form.saveAmfunckDocs === false && this.form.selectGood.cksGoodsCount !== 0) {
                this.saveDocsList();
            }

        },
        deleteAmfunckDocs: function () {
            remove(this.form.selectGood, this.form.mfunckDocs);
            this.form.selectGood = selectGood();
            this.form.deleteAmfunckDocs = true;
        },                                     //货品明细控制 删除

        selectSubmit: function () {
            _option=true;
            p[7].post(obj.form_pop);
            this.dialogSelectVisible = false;
        },                                          //详细查询 查询提交

        auto_ckArehouseId: function (data, set) {
            /*<debug>*/
//                console.log(data);
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
        },                            //出库仓库id 自动匹配
        auto_ckXdsj: function (value, bool) {
            if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年 MM月 dd日');
            else return dateFormat(new Date(parseInt(value)), 'MM-dd');
        },                                //下单时间
        auto_ckCkdjType: function (value) {
            var temp = {};
            if (!isNaN(value)) {
                temp = {
                    0: '正常单据',
                    1: '挂起单据',
                    2: '滞留单据'
                }
            } else {
                temp = {
                    '正常单据': 0,
                    '挂起单据': 1,
                    '滞留单据': 2
                }
            }
            return temp[value];
        },                                  //单据类型
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
        auto_ckStatus: function (value) {
            var temp = {};
            if (!isNaN(value)) {
                temp = {
                    1: '原始状态',
                    21: '部分分拣',
                    22: '部分下架',
                    31: '全部分拣',
                    32: '全部下架',
                    50: '作废'
                }
            } else {
                temp = {
                    '原始状态': 1,
                    '部分分拣': 21,
                    '部分下架': 22,
                    '全部分拣': 31,
                    '全部下架': 32,
                    '作废': 50

                }
            }
            return temp[value];
        }                                     //单据状态

    },
    watch: {
        outputAppointment: function () {

        },
        form: function () {
            if (isNaN(this.form.selectGood.count)) {
                this.saveAmfunckDocs = false;
            }
        },
        ckCkdjNo: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[7].post((_option ? this.form_pop : this.option));
        },
        ckCkdjClientname: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[7].post((_option ? this.form_pop : this.option));
        },

        ckCkdjType: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[7].post((_option ? this.form_pop : this.option));
        },
        ckArehouseId: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[7].post((_option ? this.form_pop : this.option));
        },

    }
});
// 高级 监视器的 使用方法
outputAppointment.$watch('date', function () {
    /*<debug>*/
    console.log((_option ? this.form_pop : this.option));
    /*</debug>*/
    p[7].post((_option ? this.form_pop : this.option));
}, {deep: true});
var obj = outputAppointment;
var p = [];
// 0 出库预约 新增 出库单据/包含出库单明细
p[0] = autoPost({
    urlHock: "/hock/outputAppointment/page.json",
    urlProd: "/route/outputAppointment/0",
    method: 'GET',
    success: function (json) {
        obj.dialogFormVisible = false;
        obj.submitLoading = false;
        this.callbackAfter({status: json.status, model: '新建出库单'}, function () {
            obj.form = _form();
            obj.dialogFormActive = 0;
            if (obj.$refs.carousel) obj.$refs.carousel.setActiveItem(0);
            p[7].post(obj.option);
        })
    }
});
// 1 出库预约-组合
p[1] = autoPost({
    urlHock: "../../hock/form/inputOption.json",
    urlProd: "/route/outputAppointment/1",
    method: 'GET',
    success: function (json) {
        obj.dialogFormVisible = false;
        obj.submitLoading = false;
        this.callbackAfter({status: json.status, model: '组合出库单'}, function () {
            obj.$refs['ref_outputAppointmentCombinationDetails'].resetFields();
            obj.outputAppointmentCombinationDetails = CombinationDetails();
            obj.outputAppointmentCombination = [];
            obj.multipleSelection = [];
            obj.multipleSelectionCombination = [];

            obj.formActive = 0;
            if (obj.$refs.carouselWaiting) obj.$refs.carouselWaiting.setActiveItem(0);
            p[7].post(outputAppointment.option);
        })
    }
});
// 3 编辑-出库单
p[3] = autoPost({
    urlHock: "../../hock/form/inputOption.json",
    urlProd: "/route/outputAppointment/3",
    method: 'GET',
    success: function (json) {
        obj.dialogFormVisible = false;
        obj.submitLoading = false;
        this.callbackAfter({status: json.status, model: '修改出库单'}, function () {
            obj.form = _form();
            obj.dialogFormActive = 0;
            if (obj.$refs.carousel) obj.$refs.carousel.setActiveItem(0);
            p[7].post(obj.option);
        })
    }
});
// 7 出库预约分页查询接口
p[7] = autoPost({
    urlHock: "/hock/outputAppointment/page.json",
    urlProd: "/route/outputAppointment/7",
    success: function (json) {
        obj.dialogFormVisible = false;
        obj.submitLoading = false;
        obj.$data.outputAppointment = json.data;
        /*<debug>*/
        console.log(obj.$data.outputAppointment);
        /*</debug>*/
    }
});
// 8 出库单 详细信息
p[8] = autoPost({
    urlHock: "../../hock/form/inputOption.json",
    urlProd: "/route/outputAppointment/8"
});
// 9 出库预约-查询-出库单据-出库单号
p[9] = autoPost({
    urlHock: "../../hock/form/inputOption.json",
    urlProd: "/route/outputAppointment/9",
    success: function (json) {
        //TODO 状态值
        obj.form.ckCkdjNo = json.model;
    }
});
// 10 出库预约-查询-出库任务-出库任务
p[10] = autoPost({
    urlHock: "../../hock/form/inputOption.json",
    urlProd: "/route/outputAppointment/10",
    success: function (json) {
        //TODO 状态值
        obj.outputAppointmentCombinationDetails.ckrwNo = json.model;
        obj.showLoading = false;
    }
});
// 11 出库预约-作废-出库单据
p[11] = autoPost({
    urlHock: "../../hock/form/inputOption.json",
    urlProd: "/route/outputAppointment/11"
});
// 12 出库预约-滞留入库
p[12] = autoPost({
    urlHock: "../../hock/form/inputOption.json",
    method: 'GET',
    urlProd: "/route/outputAppointment/12"
});
function CombinationDetails() {
    return {
        "ckrwNo": "",
        "ckrwYjdcsj": new Date(),
        "ckrwCph": "",
        "ckrwWls": "",
        "ckrwQhStatus": 1,
        "ckrwZlStatus": 1,
        "ckrwArehouseId": 1,
        "ckrwClientId": 1,
        "userName": app.rmsUser.ruUserName,
        "ckCkdjIds": []
    }

}
function selectGood() {
    return {
        baseGoods: {
            bgGoodsNo: '',
            bgGoodsName: ''
        },
        baseDw: {
            bdDwid: '',
            bdName: ''
        },
        cksGoodsCount: 0,
        cksDwid: '',
        cksGoodsId: ''
    }
}
function _form() {
    return {
        "ckCkdjId": "",
        "ckCkdjNo": "",
        "ckErpNo": "",
        "ckCkdjClientno": "",
        "ckCkdjClientname": "",
        "ckContacts": "",
        "ckTel": "",
        "ckAdress": "",
        "ckRemarks": "",
        "ckIsyadan": 0,
        "ckIsqianhuo": 0,
        "ckArehouseId": 1,
        "ckClientId": 1,
        "userId": app.rmsUser.userId,
        "mfunckDocs": [],
        "ckXdsj":"",

        title: '新建出库单',

        "ckYfhsj": (new Date()).toJSON(),
        "ckEndtime": "",
        "ckCkdjType": "",

        allCount: 0,
        allTj: 0,

        bgGoodsNo: '',
        selectGood: selectGood(),
        saveAmfunckDocs: true,
        deleteAmfunckDocs: true
    }
}
function validate_form() {
    return {
        "ckCkdjClientname": 'vNull',
        "ckTel": 'vNull',
        "ckAdress": 'vNull',
        "ckContacts": 'vNull',
    }
}
function validate_form2() {
    return {
        "cksGoodsCount": ['vNull', 'vNumber', 'vNumberZZ', 'vWS4'],
    }
}
function validate_details() {
    return {
        "ckrwNo": "vNull",
        "ckrwCph": "vNull",
        "ckrwYjdcsj": "vNull",
        "ckrwWls": "vNull"
    }
}
function post_form() {
    return {
        "ckCkdjId": "",
        "ckCkdjNo": "CK1482398743793",
        "ckErpNo": "hk45645",
        "ckCkdjType": 0,
        "ckCkdjClientno": "hlcs2001",
        "ckCkdjClientname": "济南华联超市王舍人店",
        "ckContacts": "张三丰",
        "ckTel": "18856568985",
        "ckAdress": "济南市历城区工业北路",
        "ckYfhsj": (new Date()).toJSON(),
        "ckRemarks": "备注",
        "ckIsyadan": 0,
        "ckIsqianhuo": 0,
        "ckArehouseId": 1,
        "ckClientId": 1,
        "ckEndtime": (new Date()).toJSON(),
        "userId": app.rmsUser.ruUserId,
        "mfunckDocs": []
    }
}
function post_form_mfunckDocs() {
    return {
        "cksGoodsId": 0,
        "cksGoodsCount": 0,
        "cksDwid": 0
    }
}
function post_Combination() {
    return {
        "ckrwNo": "",
        "ckrwYjdcsj": new Date(),
        "ckrwCph": "",
        "ckrwWls": "",
        "ckrwArehouseId": 1,
        "ckrwClientId": 1,
        "userName": app.rmsUser.userName,
        "ckCkdjIds": []
    }
}
var validateRule = {
    a: new RegExp("((?=[\x21-\x7e\u4e00-\u9fa5\（\）\《\》\——\；\，\。\“\”\<\>\！、]+)[^A-Za-z0-9])", "g")
};
outputAppointment.$watch('form.title', function () {
    if (this.form.title === '查看') this.watchView = true;
    else this.watchView = false;
}, {deep: true});
p[7].post(outputAppointment.option);
function postGoods(obj, option, cb) {

    /*<debug>*/
    url = "/hock/form/rkGoods.json";
    /*</debug>*/

    /*<prod>*/
    url = "/route/goodsManage/0";
    /*</prod>*/

    $.ajax(url, {
        type: "GET",
        data: option,
        success: function (json) {
            json = json.data;

            if (json[0].bgGoodsNo === obj.form.selectGood.baseGoods.bgGoodsNo) {
                obj.form.selectGood = {
                    baseGoods: {
                        bgGoodsNo: json[0].bgGoodsNo,
                        bgGoodsName: json[0].bgGoodsName
                    },
                    baseDw: {
                        bdDwid: 1
                    },
                    cksGoodsCount: 0,
                    cksDwid: json[0].bgZxdw,
                    cksGoodsId: json[0].bgGoodsId,
                    data: json[0]
                };
                obj.form.saveAmfunckDocs = false;
            } else {
                obj.form.selectGood.cksGoodsId = 0;
                obj.form.saveAmfunckDocs = true;
            }

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
}          // 4 获取货品编号
