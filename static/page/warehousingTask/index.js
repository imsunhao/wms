function _form_list2() {
    return {
        date: [null, null],
        rkRkdjNo: '',
        warehousingReservation: [],
        warehousingReservationCombination: [],


        multiSelect: false,
        multipleSelection: []
    }
}
function _form() {
    return {
        rkrwId: '',

        rkrwDhrq: '',//模糊查询--预计到货日期
        rkrwNo: '',//模糊查询--任务号
        rkrwCph: '',//模糊查询--车牌号
        rkrwSjxm: '',//模糊查询--司机姓名
        rkrwDh: '',//司机电话
        rkrwDbd: '',//模糊查询--调拨地
        rkrwCys: '',//模糊查询--承运商
        rkrwStatus: 0,


        "rkrwArehouseId": "",
        "rkrwClientId": "",
        "rkrwCreateUserid": "",

        goodsType: 0,
        orders: 0,

        list2: _form_list2()
    }
}
function _form_post() {
    return {
        "rkrwId": 25,
        "rkrwNo": "",
        "rkrwDhrq": "",
        "rkrwDbd": "",
        "rkrwCys": "",
        "rkrwCph": "",
        "rkrwSjxm": "",
        "rkrwDh": "",
        "rkrwStatus": "",
        "rkrwArehouseId": "",
        "rkrwClientId": "",
        "rkrwCreateUserid": "",
        editorId: app.rmsUser.ruUserId,
        "docList": []
    }
}
function validate_form() {
    return {
        rkrwDbd: 'vNull',
        rkrwCph: 'vNull',
        rkrwDh: 'vNull',
        rkrwDhrq: 'vNull',
        rkrwCys: 'vNull',
        rkrwSjxm: 'vNull',
    }
}
function _lists() {
    return {
        rkrwNo: '',
        data: []
    }
}
var warehousingTask = new Vue({
    el: '#warehousingTask',
    prop: {},
    data: function () {
        return {
            baseArehouses: window.dbmessage.baseArehouses,
            baseRkType: window.rkType,
            lists: _lists(),
            dialogListsVisible: false,           //明细 弹出层 是否可见

            warehousingTask: [],
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
            rule_form: autoValidate(validate_form()), //编辑验证规则
            rkrwSjxm: '',                       //主页面 司机姓名 搜索
            rkrwNo: '',                         //主页面 入库单号 搜索
            rkrwCph: '',                        //主页面 车牌号
            // rkrwArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,                   //主页面 入库仓库 id
            rkrwArehouseId: '',                   //主页面 入库仓库 id
            formLabelWidth: '120px',            //表单 配置
            form: _form(),                      //表单 弹出层 信息集合
            dialogFormActive: 0,                //新建 弹出层 steps 当前进度
            dialogFormVisible: false,           //新建 弹出层 是否可见
            submitLoading: false,               //新建 弹出层 提交等待
            select: _form(),                    //搜索 弹出层 信息集合,
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
                "rkrwCph": this.rkrwCph.trim(),
                "rkrwNo": this.rkrwNo.trim(),
                "rkrwSjxm": this.rkrwSjxm.trim(),
                rkrwArehouseId: this.rkrwArehouseId

            }
        },
        list2_option: function () {
            return {
                "draw": 1,
                "pageNum": 1,
                "pageSize": 20,
                startTimeParam: tsf_date(this.form.list2.date[0]),
                endTimeParam: tsf_date(this.form.list2.date[1]),
                rkRkdjNo: this.form.list2.rkRkdjNo,
                rkStatus: 1,
                rkRwStatus: 0
            }
        },
        search: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "rkrwNo": this.form.rkrwNo,
                "rkrwCph": this.form.rkrwCph,
                "dds": this.form.dds,
                "pxs": this.form.pxs,
                "rkrwSjxm": this.form.rkrwSjxm,
                "rkrwDhrq": tsf_date(this.form.rkrwDhrq, 1),
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
                "startDhrqTimeParam": tsf_date(this.form.rkrwDhrq, 1),
                "rkrwNo": this.form.rkrwNo,
                "rkrwCph": this.form.rkrwCph,
                "rkrwSjxm": this.form.rkrwSjxm,
                "rkrwDbd": this.form.rkrwDbd,
                "rkrwCys": this.form.rkrwCys,

            }
        },
        distributionForm: function () {
            return {
                distribution: this.distribution
            }
        },                                      //分配 表单
    },
    methods: {
        inlineEdit: function (index, row) {
            var step = _form();
            allPrposCb(step, function (obj, index) {
                if (typeof row[index] !== 'undefined') step[index] = row[index];
            });
            /*<debug>*/
            console.log(row);
            console.log(step);
            /*</debug>*/
            step.title = '编辑';
            if (row.rkrwStatus == 1) {
                p[8].post(obj.list2_option);
            }
            step.list2.warehousingReservationCombination = row.docList;

            if (typeof obj.$refs.carousel !== 'undefined') obj.$refs.carousel.setActiveItem(0);
            obj.form = step;
            obj.dialogFormActive = 0;
            obj.dialogFormVisible = true;
        },                                  //行内按钮 编辑
        inlineIssued: function (index, row) {
            obj.$confirm('此操作将这单任务单据下发, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[5].post({
                    rwIds: [row.rkrwId],
                    userId: app.rmsUser.ruUserId
                });
            }).catch(function () {
                obj.$message({
                    type: 'info',
                    message: '已取消下发'
                });
            });
        },                                //行内按钮 下发
        dblClick: function (row, event) {
            if (row.rkDocsList === null || typeof row.rkDocsList === 'undefined' || row.rkDocsList.length < 1) {
                p[7].post({rkRkdjId: row.rkRkdjId}, function (json) {
                    row.rkDocsList = json.rkDocsList;
                    obj.lists.data = row.rkDocsList;
                    obj.lists.rkRkdjNo = row.rkRkdjNo;
                    obj.dialogListsVisible = true;
                })
            } else {
                obj.lists.data = row.rkDocsList;
                obj.lists.rkRkdjNo = row.rkRkdjNo;
                obj.dialogListsVisible = true;
            }
        },                                    //行内按钮 双击查看明细
        multiSelectClick: function () {
            this.multiSelect = !this.multiSelect;
        },                                      //多选 状态维护
        multiSelectionChange: function (val) {
            /*<debug>*/
            console.log(this.multipleSelection);
            /*</debug>*/
            this.multipleSelection = val;
        },                               //多选 选中控制
        multiOperationIssued: function () {
            obj.$confirm('此操作将这些任务单据下发, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                // TODO
                var step = [];
                for (var i = 0; i < obj.multipleSelection.length; i++) {
                    step.push(obj.multipleSelection[i].rkrwId);
                }
                p[5].post({rwIds: step,userId:app.rmsUser.ruUserId});
            }).catch(function () {
                obj.$message({
                    type: 'info',
                    message: '已取消'
                });
            });

        },                                  //多选 下发
        handleSizeChange: function (val) {
            /*<debug>*/
            console.log('每页' + val + '条');
            /*</debug>*/
            this.pageSize = val;
            p[0].post((_option ? this.form_pop : this.option))
        },                                   //分页 Size
        expandChange: function (row, expanded) {
            if (expanded && (typeof (row.docList) === 'undefined' || row.docList.length === 0)) {
                p[6].post({rkrwId: row.rkrwId}, function (json) {
                    /*<debug>*/
                    console.log(json);
                    /*</debug>*/
                    row.docList = json.docList;
                });
            }
            /*<debug>*/
            console.log(row);
            console.log(expanded);
            /*</debug>*/
        },                             //下拉 选择
        handleCurrentChange: function (val) {
            /*<debug>*/
            console.log('当前第' + val + '页');
            /*</debug>*/
            this.currentPage = val;
            p[0].post((_option ? this.form_pop : this.option))
        },                                //分页 当前页
        newInput: function () {
            this.dialogFormVisible = true;

        },                                              //按钮 新建入库单
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
            this.dialogFormActive = 2;
            this.submitLoading = true;
            obj.form.docList = obj.form.list2.warehousingReservationCombination;
            var step = _form_post();
            allPrposCb(step, function (obj2, index) {
                if (typeof obj.form[index] !== 'undefined') step[index] = obj.form[index];
            });
            var step2 = [];
            for (var i = 0; i < step.docList.length; i++) {
                step2.push({rkRkdjId: step.docList[i].rkRkdjId});
            }
            step.docList = step2;

            p[1].post(step, function (json) {
                obj.submitLoading = false;
                this.callbackAfter({status: json.status, model: '任务修改'}, function () {
                    p[0].post(obj.option);
                    obj.dialogFormVisible = false;
                    obj.form = _form();
                    obj.dialogFormActive = 0;
                    obj.$refs.carousel.setActiveItem(0);
                })
            });
        },                                                //新建 表单提交
        selectSubmit: function () {
            _option = true;
//                p[0].post(warehousingTask.search);
            p[0].post(obj.form_pop);
            this.dialogSelectVisible = !this.dialogSelectVisible;

        },                                          //详细查询 提交

        list2_handleSelectionChange: function (val, row) {
            /*<debug>*/
            console.log(addOrDelete(row, val));
            /*</debug>*/
            if (addOrDelete(row, val)) {
                this.form.list2.warehousingReservationCombination.push(row);
            } else {
                remove(row, this.form.list2.warehousingReservationCombination);
            }
            this.form.list2.multipleSelection = val;
        },                   //多选 list2-选中控制
        list2_handleSelectionChangeAll: function (val) {
            if (val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    if (!addOrDelete(val[i], this.form.list2.warehousingReservationCombination)) {
                        this.form.list2.warehousingReservationCombination.push(val[i]);
                    }
                }
            } else {
                for (var i = 0; i < this.form.list2.warehousingReservation.length; i++) {
                    remove(this.form.list2.warehousingReservation[i], this.form.list2.warehousingReservationCombination);
                }
            }
            this.form.list2.multipleSelection = val;
        },                     //多选 list2-选中控制
        list2_handleSelectionChangeCombination: function (val) {
            /*<debug>*/
            console.log(this.form.list2.multipleSelectionCombination);
            /*</debug>*/
            this.form.list2.multipleSelectionCombination = val;
        },             //Combination list2-选中控制
        list2_moreOperationDelete: function () {
            /*<debug>*/
            console.log('选中的删除');
            /*</debug>*/
            for (i = 0; i < this.form.list2.multipleSelectionCombination.length; i++) {
                remove(this.form.list2.multipleSelectionCombination[i], this.form.list2.warehousingReservationCombination);
            }
        },                             //多选 list2-删除
        list2_more: function () {
            this.form.list2.multiSelect = !this.form.list2.multiSelect
        },
        list2_View: function (index, row) {

        },

        auto_rkArehouseId: function (data, set) {
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
        },                            //入库仓库id 自动匹配
        auto_rkrwDhrq: function (value, bool) {
            if (!bool)return dateFormat(new Date(value), 'yyyy年 MM月 dd日 hh时 mm分 ');
            else return dateFormat(new Data(value), 'MMdd');
        },                              //预计到货日期
        auto_rkrwStatus: function (value) {

            if (!isNaN(value)) {
                temp = {
                    1: '初始',
                    2: '已下发任务',
                    3: '已开始收货',
                    4: '收货中',
                    51: '部分收货',
                    52: '全部收货',
                    61: '收货完成',
                    62: '欠货'
                }
            } else {
                temp = {
                    '初始': 1,
                    '已下发任务': 2,
                    '已开始收货': 3,
                    '收货中': 4,
                    '部分收货': 51,
                    '全部收货': 52,
                    '收货完成': 61,
                    '欠货': 62
                }
            }
            return temp[value];
        },                                  //任务状态
        auto_rkCreatetime: function (value, bool) {
            if (!bool) return dateFormat(new Date(value), 'yyyy-MM-dd');
            else return dateFormat(new Date(value), 'MM-dd');
        },                          //入库任务中详细信息 - 入库时间
        auto_rkType: function (value) {
            // if (!isNaN(value)) {
            //     for (var index in this.baseRkType) {
            //         if (this.baseRkType[index] == value) {
            //             return index;
            //         }
            //     }
            // }
            // else return this.baseRkType[value];
            return this.baseRkType[value];
        },                                      //订单类型
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
                    '采购订单': 0,
                    '仓间调拨': 1,
                    '退货入库': 2
                }
            }
            return temp[value];
        },                                    //入库状态
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
        },                            //入库仓库id 自动匹配
        auto_rkZdfs: function (value) {
            var temp = {}
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
        },                                      //制单方式
        auto_jc: function (value) {
            var temp = {};
            if (!isNaN(value)) {
                temp = {
                    1: '21',
                    2: '22',
                    3: ' 美里'
                }
            } else {
                temp = {
                    '21': 1,
                    '22': 2,
                    '美里': 3
                }
            }
            return temp[value];
        },
    },
    watch: {
        rkrwCph: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
        rkrwNo: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
        rkrwSjxm: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
    }
});
// 高级 监视器的 使用方法
warehousingTask.$watch('date', function () {
    /*<debug>*/
    console.log((_option ? this.form_pop : this.option));
    /*</debug>*/
    p[0].post((_option ? this.form_pop : this.option));
}, {deep: true});
var obj = warehousingTask;
var p = [];
obj.$watch('form.list2.date', function () {
    p[8].post(obj.list2_option);
}, {deep: true});
obj.$watch('form.list2.rkRkdjNo', function () {
    p[8].post(obj.list2_option);
}, {deep: true});
// 0 查询-入库任务
p[0] = autoPost({
    urlHock: "/hock/warehousingTask/page.json",
    urlProd: "/route/warehousingTask/0",
    success: function (json) {
        /*<debug>*/
        console.log(json);
        /*</debug>*/
        obj.$data.warehousingTask = json.data;
        obj.$data.currentTotal = json.recordsFiltered;
    }
});
// 1 修改-入库任务
p[1] = autoPost({
    urlHock: "/hock/warehousingTask/page.json",
    urlProd: "/route/warehousingTask/1",
    method: 'GET',
});
// 5 下发-入库任务
p[5] = autoPost({
    urlHock: "/hock/warehousingTask/page.json",
    urlProd: "/route/warehousingTask/5",
    method: 'GET',
    success: function (json) {
        /*<debug>*/
        console.log(json);
        /*</debug>*/
        this.callbackAfter({status: json.status, model: '任务下发'}, function () {
            p[0].post(obj.option);
        });
    }
});
// 6 查询-入库任务详情
p[6] = autoPost({
    urlHock: "/hock/warehousingTask/rwDocList.json",
    urlProd: "/route/warehousingTask/6",
    method: 'GET'
});
// 7 查询-入库单号-入库明细
p[7] = autoPost({
    urlHock: "/hock/warehousingTask/docList.json",
    urlProd: "/route/warehousingTask/7",
    method: 'GET'
});
// 8 查询-入库单据
p[8] = autoPost({
    urlHock: "/hock/form/inputOption.json",
    urlProd: "/route/warehousingTask/8",
    success: function (json) {
        /*<debug>*/
        console.log(json);
        /*</debug>*/
        obj.$data.form.list2.warehousingReservation = json.data;
    }
});
p[0].post((_option ? obj.form_pop : obj.option));
