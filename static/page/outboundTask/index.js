var outboundTask = new Vue({
    el: '#outboundTask',
    prop: {},
    data: function () {
        return {
            baseArehouses: window.dbmessage.baseArehouses,
            outboundTask: [],
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
            date: [null, null],                   //主页面 选择日期 搜索
            ckrwNo: '',                           //主页面 入库单号 搜索
            ckrwCph: '',                          //主页面 车牌号
            ckrwArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,                          //主页面 车牌号
            formLabelWidth: '120px',              //表单   配置
            form: _form(),                         //表单   弹出层 信息集合
            rule_outputAppointmentCombinationDetails: autoValidate(validate_outputAppointmentCombinationDetails()), //编辑验证规则

            formActive: 0,                        //新建   弹出层 steps 当前进度

            dialogFormVisible: false,             //新建   弹出层 是否可见


            submitLoading: false,                 //新建   弹出层 提交等待

            car: formCar(),                       //到车信息  弹出层 信息集合
            dialogCarVisible: false,              //到车信息  弹出层 是否可见


            modifyTask: _modifyTask(),             //修改任务信息  弹出层 信息集合
            multipleSelectionCombination: [],
            multiSelect2: false,
            dialogModifyTaskVisible: false,        //修改任务信息  弹出层 是否可见


            dialogListsVisible: false,              //单据详细 查询
            lists: formList(),                      //出库详细 弹出层 信息集合


            select: _form(),                         //搜索      弹出层 信息集合,
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
                ckrwArehouseId:-1
            }
        },
        form_pop: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "ckrwCph": this.form.ckrwCph,
                "ckrwNo": this.form.ckrwNo,
                "ckrwQhStatus": this.form.ckrwQhStatus,
                "ckrwZlStatus": this.form.ckrwZlStatus,
                "ckrwStatus": this.form.ckrwStatus,
                "ckrwStartGreatTime": tsf_date(this.form.ckrwGreatTime[0]),
                "ckrwEndGreatTime": tsf_date(this.form.ckrwGreatTime[1]),
                ckrwArehouseId:-1
            }
        },
        modifyTask_prop: function () {
            return {
                "draw": 1,
                "pageNum": 1,
                "pageSize": 20,
                "ckCkdjType": this.modifyTask.ckCkdjType,
                "ckCkdjNo": this.modifyTask.ckCkdjNo,
                "startTimeParam": tsf_date(this.modifyTask.date[0]),
                "endTimeParam": tsf_date(this.modifyTask.date[1]),
            }
        }
    },
    methods: {
        inlineIssued: function (index, row) {
            obj.$confirm('此操作将此任务下发, 是否继续? 任务号为：' + row.ckrwNo, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[3].post({
                    ids: [row.ckrwId],
                    "userName": app.rmsUser.ruUserName
                });
            }).catch(function () {
                obj.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },                                //行内按钮-下发

        inlineArriveCar: function (index, row) {
            var step = formCar();
            allPrposCb(step, function (obj2, index) {
                if (typeof row[index] !== 'undefined') step[index] = row[index];
            });
            this.car = step;

            this.dialogCarVisible = true;
        },                             //行内按钮-到车
        carSubmit: function () {
            obj.$confirm('实际到车时间一旦录入系统不能修改, 是否继续? ', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                obj.submitLoading = true;
                p[4].post({
                    "id": obj.car.ckrwId,
                    "ckrwSjdcsj": (new Date(obj.car.ckrwSjdcsj)).toJSON(),
                    "userName": app.rmsUser.ruUserName
                });
            }).catch(function () {
                obj.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },                                             //到车-保存

        inlineModifyTask: function (index, row) {
            var step = _modifyTask_outputAppointmentCombinationDetails();
            allPrposCb(step, function (obj, index) {
                if (typeof row[index] !== 'undefined') step[index] = row[index];
            });
            /*<debug>*/
            console.log(row);
            console.log(step);
            /*</debug>*/
            p[101].post(obj.modifyTask_prop);

            if (typeof obj.$refs.carouselWaiting !== 'undefined') {
                obj.$refs.carouselWaiting.setActiveItem(0);
                obj.formActive = 0;
            }
            obj.modifyTask.outputAppointmentCombinationDetails = step;
            obj.modifyTask.outputAppointmentCombination = row.mfunckDoc;
            obj.dialogFormActive = 0;
            obj.dialogModifyTaskVisible = true;
        },                            //行内按钮-修改任务
        moreOperationDelete: function () {
            /*<debug>*/
            console.log('选中的删除');
            /*</debug>*/
            for (i = 0; i < this.multipleSelectionCombination.length; i++) {
                remove(this.multipleSelectionCombination[i], this.modifyTask.outputAppointmentCombination);
            }
        },
        multiSelectClick2: function () {
            this.multiSelect2 = !this.multiSelect2;
        },
        handleSelectionChangeCombination: function (val) {
            /*<debug>*/
            console.log(this.multipleSelectionCombination);
            /*</debug>*/
            this.multipleSelectionCombination = val;
        },                   //Combination 选中控制
        handleSelectionChange: function (val, row) {
            /*<debug>*/
            console.log(addOrDelete(row, val));
            /*</debug>*/
            if (addOrDelete(row, val)) {
                this.modifyTask.outputAppointmentCombination.push(row);
            } else {
                remove(row, this.modifyTask.outputAppointmentCombination);
            }
        },                         //多选 选中控制
        handleSelectionChangeAll: function (val) {
            if (val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    if (!addOrDelete(val[i], this.modifyTask.outputAppointmentCombination)) {
                        this.modifyTask.outputAppointmentCombination.push(val[i]);
                    }
                }
            } else {
                for (var i = 0; i < this.modifyTask.outputAppointment.length; i++) {
                    remove(this.modifyTask.outputAppointment[i], this.modifyTask.outputAppointmentCombination);
                }
            }
        },                           //多选 选中控制
        modifyTask_submit: function () {
            var step = postModifyTask();
            allPrposCb(step, function (obj2, index) {
                if (typeof obj.modifyTask.outputAppointmentCombinationDetails[index] !== 'undefined') step[index] = obj.modifyTask.outputAppointmentCombinationDetails[index];
            });
            var ids = [];
            for (var i = 0; i < obj.modifyTask.outputAppointmentCombination.length; i++) {
                ids.push(obj.modifyTask.outputAppointmentCombination[i].ckCkdjId);
            }
            step.ckCkdjIds = ids;
            p[5].post(step, function (json) {
                this.callbackAfter({status: json.status, model: "修改任务"}, function () {
                    p[0].post(obj.option);
                    obj.dialogModifyTaskVisible = false;
                })
            });
        },                                     //修改任务-提交

        prevForm: function () {
            this.formActive--;
            this.$refs.carouselWaiting.prev();
        },                                              //修改任务 前一个
        nextForm: function () {
//                if (this.outputAppointmentCombinationDetails.ckrwNo === "") {
//                    obj.showLoading = true;
//                    p[10].post();
//                }
            this.$refs['ref_outputAppointmentCombinationDetails'].validate(function (valid) {
                if (valid) {
                    obj.formActive++;
                    obj.$refs.carouselWaiting.next();
                } else {
                    return false;
                }
            });

        },                                              //修改任务 后一个


        inlineCancelTask: function (index, row) {
            var obj = this;
            obj.$confirm('此操作将此任务取消, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[6].post({
                    id: row.ckrwId,
                    "userName": app.rmsUser.ruUserName
                });
            }).catch(function () {
                obj.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },                            //行内按钮-取消任务
        inlineModifySorting: function (index, row) {
            var step = formListSort();
            allPrposCb(step, function (obj2, index) {
                if (typeof row[index] !== 'undefined') step[index] = row[index];
            });
            step.index = index;
            if (step.baseLocation === null) {
                step.baseLocation = {
                    blLocationId: 0,
                    blLname: ''
                }
            }

            if (step.cksZdpc == null || step.cksZdpc === '' || step.cksZdpc === '无') {
                step.cksZdpc = auto_time_new(new Date(), 3);
            }

            this.lists.sort = step;
            this.lists.dialogLocationVisible = true;
        },                         //行内按钮-修改分拣方式
        inlineHangBill: function (index, row) {
            obj.$confirm('此操作将此单据挂起, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[7].post({
                    "ids": [row.ckCkdjId],
                    "userName": app.rmsUser.ruUserName
                }, function (json) {
                    this.callbackAfter({status: json.status, model: '单据挂起'}, function () {
                        row.ckGqStatus = 2;
                        console.log(row);
                    })
                });
            }).catch(function () {
                obj.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },                              //行内按钮-挂起单据
        inlineCancelHang: function (index, row) {
            obj.$confirm('此操作将此任务取消挂起, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[8].post({
                    "id": row.ckCkdjId,
                    "userName": app.rmsUser.ruUserName
                }, function (json) {
                    this.callbackAfter({status: json.status, model: '取消挂起'}, function () {
                        row.ckGqStatus = 1;
                    })
                });
            }).catch(function () {
                obj.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },                            //行内按钮-取消挂起

        multiSelectClick: function () {
            this.multiSelect = !this.multiSelect;
        },                                      //多选 状态维护
        multiSelectionChange: function (val) {
            /*<debug>*/
            console.log(this.multipleSelection);
            /*</debug>*/
            this.multipleSelection = val;
        },                               //多选 选中控制
        moreOperationIssued: function () {
            obj.$confirm('此操作将这些任务下发, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                var ids = [];
                for (var i = 0; i < obj.multipleSelection.length; i++) {
                    ids.push(obj.multipleSelection[i].ckrwId);
                }
                p[3].post({
                    ids: ids,
                    "userName": app.rmsUser.ruUserName
                });
            }).catch(function () {
                obj.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },                                   //多选 下发
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
        newInput: function () {
            this.dialogFormVisible = true;

        },                                              //按钮 新建入库单
        queryLocationAsync: function (queryString, cb) {
            p[10].post({
                "pageNum": 1,
                "pageSize": 10,
                "draw": 0,
                blLName: queryString,
                arehouseId: window.dbmessage.baseArehouses[0].baArehouseId
            }, function (json) {
                json = json.data;
                var step = [];
                var length = json.length > 20 ? 20 : json.length;
                for (var i = 0; i < length; i++) {
                    step.push({data: json[i], value: json[i].blLname})
                }
                cb(step);
            });
        },
        locationSelect: function (item) {
            this.lists.sort.cksLocationId = item.data.blLocationId;
            this.lists.sort.baseLocation = item.data;
        },
        locationSubmit: function () {
            obj.lists.locationLoading = true;
            var option = {};
            switch (obj.lists.sort.cksCkfs) {
                case 'X':
                    option = {
                        cksCkmxId: obj.lists.sort.cksCkmxId,
                        cksCkfs: obj.lists.sort.cksCkfs,
                        userId: app.rmsUser.ruUserId
                    }
                    break;
                case 'K':
                    option = {
                        cksCkmxId: obj.lists.sort.cksCkmxId,
                        cksCkfs: obj.lists.sort.cksCkfs,
                        cksLocationId: obj.lists.sort.baseLocation.blLocationId,
                        userId: app.rmsUser.ruUserId
                    }
                    break;
                case 'P':
                    option = {
                        cksCkmxId: obj.lists.sort.cksCkmxId,
                        cksCkfs: obj.lists.sort.cksCkfs,
                        cksZdpc: obj.lists.sort.cksZdpc,
                        userId: app.rmsUser.ruUserId
                    }
                    break;
            }
            p[9].post(option, function (json) {
                obj.lists.locationLoading = false;
                this.callbackAfter({status: json.status, model: '修改分拣方式'}, function () {
                    switch (obj.lists.sort.cksCkfs) {
                        case 'X':
                            obj.lists.data[obj.lists.sort.index].cksCkfs = 'X';
                            obj.lists.data[obj.lists.sort.index].baseLocation = {
                                blLocationId: 1,
                                blLname: ''
                            };
                            obj.lists.data[obj.lists.sort.index].cksZdpc = '';
                            break;
                        case 'K':
                            obj.lists.data[obj.lists.sort.index].cksCkfs = 'K';
                            obj.lists.data[obj.lists.sort.index].baseLocation = obj.lists.sort.baseLocation;
                            obj.lists.data[obj.lists.sort.index].cksZdpc = '';
                            break;
                        case 'P':
                            obj.lists.data[obj.lists.sort.index].cksCkfs = 'P';
                            obj.lists.data[obj.lists.sort.index].baseLocation = {
                                blLocationId: 1,
                                blLname: ''
                            };
                            obj.lists.data[obj.lists.sort.index].cksZdpc = obj.lists.sort.cksZdpc;
                            break;
                    }
                    obj.lists.dialogLocationVisible = false;
                })
            })
        },
        expandChange: function (row, expanded) {
            if (expanded && (typeof (row.mfunckDoc) === 'undefined' || row.mfunckDoc === null || row.mfunckDoc.length === 0)) {
                p[1].post({
                    id: row.ckrwId,
                    arehouseId: -1
                }, function (json) {
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
        },                             //下拉 选择
        dblClick: function (row, event) {

            obj.lists.ckRwStatus = row.ckRwStatus;
            obj.lists.ckCkdjType = row.ckCkdjType;
            obj.lists.ckStatus = row.ckStatus;

            if (row.mfunckDocs === null || typeof row.mfunckDocs === 'undefined' || row.mfunckDocs.length < 1) {
                p[2].post({id: row.ckCkdjId}, function (json) {
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
            this.dialogSelectVisible = !this.dialogSelectVisible;

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
        },                                  //任务状态
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
        },                                //欠货状态
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
        },                                //滞留状态

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
        },

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
        auto_ckXdsj: function (value, bool) {
            if (!bool) return dateFormat(new Date(parseInt(value)), 'yyyy年 MM月 dd日');
            else return dateFormat(new Date(parseInt(value)), 'MM-dd');
        },

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
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
        ckrwCph: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        }
    }
});
// 高级 监视器的 使用方法
outboundTask.$watch('date', function () {
    /*<debug>*/
    console.log((_option ? this.form_pop : this.option));
    /*</debug>*/
    p[0].post((_option ? this.form_pop : this.option));
}, {deep: true});
function _form() {
    return {
        ckrwCph: '',        //车牌号
        ckrwNo: '',         //任务号
        ckrwGreatTime: '', //制作时间
        ckrwStatus: '',     //任务状态
        ckrwQhStatus: '',    //欠货状态
        ckrwZlStatus: '',    //滞留状态
    }
}
function validate_outputAppointmentCombinationDetails() {
    return {
        ckrwNo: 'vNull',
        ckrwYjdcsj: 'vNull',
        ckrwCph: 'vNull',
        ckrwWls: 'vNull',
    }
}
var obj = outboundTask;
var p = [];
// 0 出库任务 分页查询
p[0] = autoPost({
    urlHock: "../../hock/outboundTask/page.json",
    urlProd: "/route/outboundTask/0",
    success: function (json) {
        for (var i = 0; i < json.data.length; i++) {
            json.data[i].mfunckDoc = [];
        }
        obj.$data.outboundTask = json.data;
        obj.$data.currentTotal = json.recordsFiltered;
    }
});
// 1 查询-入库任务详情
p[1] = autoPost({
    urlHock: "/hock/warehousingTask/rwmfunckDoc.json",
    urlProd: "/route/outboundTask/1"
});
// 2 查询-出库单号-出库明细
p[2] = autoPost({
    urlHock: "/hock/warehousingTask/mfunckDoc.json",
    urlProd: "/route/outboundTask/2"
});
// 3 出库任务-下发
p[3] = autoPost({
    urlHock: "/hock/warehousingTask/mfunckDoc.json",
    urlProd: "/route/outboundTask/3",
    method: 'GET',
    success: function (json) {
        this.callbackAfter({status: json.status, model: '出库任务下发'}, function () {
            p[0].post(outboundTask.option);
        })
    }
});
// 4 出库任务-实际到车
p[4] = autoPost({
    urlHock: "/hock/warehousingTask/mfunckDoc.json",
    urlProd: "/route/outboundTask/4",
    success: function (json) {
        obj.submitLoading = false;
        this.callbackAfter({status: json.status, model: '实际到车'}, function () {
            obj.dialogCarVisible = false;
            p[0].post(outboundTask.option);
        })
    }
});
// 5 出库任务-修改-任务单
p[5] = autoPost({
    urlHock: "/hock/warehousingTask/mfunckDoc.json",
    urlProd: "/route/outboundTask/5",
    method: 'GET'
});
// 6 出库任务-取消任务
p[6] = autoPost({
    urlHock: "/hock/warehousingTask/mfunckDoc.json",
    urlProd: "/route/outboundTask/6",
    success: function (json) {
        this.callbackAfter({status: json.status, model: '取消任务'}, function () {
            p[0].post(outboundTask.option);
        })
    }
});
// 7 出库任务-挂起单据
p[7] = autoPost({
    urlHock: "/hock/warehousingTask/mfunckDoc.json",
    urlProd: "/route/outboundTask/7",
    method: 'GET'
});
// 8 出库任务-取消挂起
p[8] = autoPost({
    urlHock: "/hock/warehousingTask/mfunckDoc.json",
    urlProd: "/route/outboundTask/8"
});
// 9 出库任务-修改分拣方式
p[9] = autoPost({
    urlHock: "/hock/warehousingTask/mfunckDoc.json",
    urlProd: "/route/outboundTask/9"
});
//10 查询-储位
p[10] = autoPost({
    urlHock: "/hock/inputOption/location.json",
    urlProd: "/route/inputOperation/5"
});

// 101 查询-出库单据
p[101] = autoPost({
    urlHock: "/hock/form/inputOption.json",
    urlProd: "/route/outputAppointment/7",
    success: function (json) {
        /*<debug>*/
        console.log(json);
        /*</debug>*/
        obj.$data.modifyTask.outputAppointment = json.data;
    }
});
obj.$watch('modifyTask.ckCkdjType', function () {
    p[101].post(obj.modifyTask_prop);
}, {deep: true});
obj.$watch('modifyTask.ckCkdjNo', function () {
    p[101].post(obj.modifyTask_prop);
}, {deep: true});
obj.$watch('modifyTask.date', function () {
    p[101].post(obj.modifyTask_prop);
}, {deep: true});

function formCar() {
    return {
        ckrwId: '',
        ckrwSjdcsj: '',//实际到车时间
        ckrwNo: ''
    }
}             //到车信息
function formList() {
    return {
        data: [],

        ckRwStatus: 0,
        ckCkdjType: 0,
        ckStatus: 0,

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

function _modifyTask() {
    return {
        "ckCkdjType": "",
        "ckCkdjNo": "",
        date: [null, null],

        outputAppointmentCombinationDetails: _modifyTask_outputAppointmentCombinationDetails(),

        outputAppointment: [],
        outputAppointmentCombination: [],


        data: []


    }
}
function _modifyTask_outputAppointmentCombinationDetails() {
    return {
        ckrwId: 0,
        "ckrwNo": "",
        "ckrwYjdcsj": new Date(),
        "ckrwCph": "",
        "ckrwWls": "",
        "ckrwQhStatus": 1,
        "ckrwZlStatus": 1,
        "ckrwArehouseId": 1,
        "ckrwClientId": 1
    }
}
function postModifyTask() {
    return {
        ckrwId: 0,
        "ckrwNo": "CK20170418-04",
        "ckrwYjdcsj": "2017-04-18T03:45:44.353Z",
        "ckrwCph": "鲁A56895",
        "ckrwWls": "佳怡物流",
        "ckrwClientId": 1,

        "userName": app.rmsUser.ruUserName,
        "ckCkdjIds": []
    }
}
p[0].post(outboundTask.option);
