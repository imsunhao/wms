var aLibraryFrozenSelect = new Vue({
    el: '#aLibraryFrozenSelect',
    prop: {},
    data: function () {
        return {
            baseArehouses: window.dbmessage.baseArehouses,
            aLibraryFrozenSelect: [],
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
            currentTotal:0,
            date: [null, null],                      //主页面 解冻时间 搜索
            djCreateUserName: '',                   //主页面 创建人 搜索
            djJdUserName:'',                         //主页面 解冻人 搜索
            djArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,             //主页面 仓库 搜索
            formLabelWidth: '120px',               //表单 配置
            form: _form(),                            //表单 弹出层 信息集合
            dialogFormActive: 0,                    //新建 弹出层 steps 当前进度
            dialogFormVisible: false,              //新建 弹出层 是否可见
            submitLoading: false,                   //新建 弹出层 提交等待
            select: _form(),                           //搜索 弹出层 信息集合,
            dialogSelectVisible: false,
            selectLoading: false,
            watchView: false,                           //观察状态量-是否为查看

        }
    },
    computed: {
        // TODO 表格提交
        option: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "djCreateUserName":this.djCreateUserName.trim(),
                "djJdUserName":this.djJdUserName.trim(),
                "startJdTimeParam": tsf_date(this.date[0]),
                "endJdTimeParam": tsf_date(this.date[1]),
                "djArehouseId":this.djArehouseId,
            }
        },
        form_pop:function(){
            return{
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "startCreateTimeParam": tsf_date( this.form.djCreateTime[0]),
                "endCreateTimeParam": tsf_date( this.form.djCreateTime[1]),
                "startJdTimeParam": tsf_date( this.form.djJdTime[0]),
                "endJdTimeParam": tsf_date( this.form.djJdTime[1]),
                "djCreateUserName":this.form.djCreateUserName,
                "djJdUserName":this.form.djJdUserName,
                "djArehouseId":this.form.djArehouseId,
                "djStatus":this.form.djStatus,
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
            obj.$confirm('导出库位冻结' , '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[2].post({
                    ids: [row.djId]
                }, function (json) {
                    this.callbackAfter({status: json.status, model: "导出库位冻结"}, function () {
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

        },                                // 行内按钮 导出
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
            obj.$confirm('确定导出库存冻结单据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                var ids = [];
                for (var i = 0; i < obj.multipleSelection.length; i++) {
                    ids.push(obj.multipleSelection[i].djId);
                }
                p[2].post({
                    ids: ids
                }, function (json) {
                    json.status = 20000; //TODO
                    this.callbackAfter({status: json.status, model: "导出库位冻结单"}, function () {
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

        },                                   //TODO 多选 修改

        handleSizeChange: function (val) {
            /*<debug>*/
            console.log('每页' + val + '条');
            /*</debug>*/
            this.pageSize = val;
            p[0].post( (_option ? this.form_pop : this.option));
        },                                   //分页 Size
        expandChange: function (row, expanded) {
            if (typeof (row.inputOperation) === 'undefined' && expanded) {
//                    postInputOperation(this, row);
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
            p[0].post((_option ? this.form_pop : this.option));
        },                                //分页 当前页
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
            _option = true;
            p[0].post( obj.form_pop);
            this.dialogSelectVisible = false;
        },                                          //详细查询 提交
        auto_djStatus: function (value) {

            if (!isNaN(value)) {
                temp = {
                    0: '冻结',
                    1: '解冻',
                    2: '作废'

                }
            } else {
                temp = {
                    '冻结': 0,
                    '解冻': 1,
                    '作废': 2,
                }
            }
            return temp[value];
        },                                    //解冻状态

    },
    watch: {
        djCreateUserName: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
        djJdUserName: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
        djArehouseId: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },

    }
});
// 高级 监视器的 使用方法
aLibraryFrozenSelect.$watch('date', function () {
    /*<debug>*/
    console.log((_option ? this.form_pop : this.option));
    /*</debug>*/
    p[0].post( (_option ? this.form_pop : this.option));
}, {deep: true});
function _form() {
    return {
        djCreateTime:[null,null],//模糊查询--创建时间
        djJdTime:[null,null],//模糊查询--解冻时间
        djCreateUserName:'',//模糊查询--创建人
        djJdUserName:'',//模糊查询--解冻人
        djArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,//模糊查询--仓库
        djStatus:'',//模糊查询--冻结状态
    }
}
var obj=aLibraryFrozenSelect;
var p=[];
// 0 库位冻结查询  分页获取库存冻结单据
p[0] = autoPost({
    urlHock: "/hock/aLibraryFrozenSelect/page.json",
    urlProd: "/route/aLibraryFrozenSelect/0",
    success: function (json) {
        obj.$data.aLibraryFrozenSelect = json.data;
        obj.$data.currentTotal = json.recordsFiltered;
    }
});
// 1 库位冻结查询 明细
p[1] = autoPost({
    urlHock: "",
    urlProd: "/route/aLibraryFrozenSelect/1",
    success: function (json) {

    }
});
// 2 库位冻结查询 库存冻结报表导出
p[2] = autoPost({
    urlHock: "",
    urlProd: "/route/aLibraryFrozenSelect/2",
    method: 'GET',

    success: function (json) {
    }
});
p[0].post( aLibraryFrozenSelect.option);
