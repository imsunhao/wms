var inventorySelect = new Vue({
    el: '#inventorySelect',
    prop: {},
    data: function () {
        return {
            baseArehouses: window.dbmessage.baseArehouses,
            inventorySelect: [],
            multipleSelection: [],
            multiSelect: false,
            pickerOptions: _pickerOptions(),
            showLoading: false,
            currentPage: 1,
            pageSize: 10,
            currentTotal:0,
            date: [null, null],                    //主页面 创建时间 搜索
            rmsUser: {
                ruUserName: ''
            },      //主页面 创建人 搜索
            pdOperator: '',                        //主页面 经办人 搜索
            pdType:'',                             //主页面 盘点状态
            pdArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,             //主页面 仓库 搜索
            formLabelWidth: '120px',            //表单 配置
            form: _form(),                          //表单 弹出层 信息集合
            dialogFormActive: 0,                //新建 弹出层 steps 当前进度
            dialogFormVisible: false,           //新建 弹出层 是否可见
            submitLoading: false,               //新建 弹出层 提交等待
            inventory: [],                      //查看盘点详情信息 弹出层 信息集合(表单格式)息 弹出层 信息集合
            dialogInventoryVisible: false,    //查看盘点详情信息 弹出层 是否可见
            select: _form(),                     //搜索 弹出层 信息集合,
            dialogSelectVisible: false,
            dialogPrintfVisible: false,
            selectLoading: false,
            printfLoading: false,
            watchView: false,               //观察状态量-是否为查看
        }
    },
    computed: {
        // TODO 表格提交
        option: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "pdOperator": this.pdOperator.trim(),
                "ruUserName": this.rmsUser.ruUserName.trim(),
                "pdType":this.pdType,
                "pdStartCreateTime": tsf_date(this.date[0]),
                "pdEndCreateTime": tsf_date(this.date[1]),
                "pdArehouseId":this.form.pdArehouseId,
            }
        },
        form_pop:function(){
            return{
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "pdStartCreateTime": tsf_date( this.form.pdCreateTime[0]),
                "pdEndCreateTime": tsf_date( this.form.pdCreateTime[1]),
                "ruUserName":this.form.ruUserName,
                "pdOperator":this.form.pdOperator,
                "pdStatus":this.form.pdStatus,
                "pdDiffStatus":this.form.pdDiffStatus,
                "pdArehouseId":this.form.pdArehouseId
            }
        },
        distributionForm: function () {
            return {
                distribution: this.distribution
            }
        },                                      //分配 表单
    },
    methods: {
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
            printfCompile(this);
            this.dialogPrintfVisible = !this.dialogPrintfVisible;
        },                                   //多选 打印标签页
        multiExport: function () {
        },                                                  //TODO 多选 导出
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
        inlineInventoryDetails: function (index,row) {
            p[1].post({pdId: row.pdId});
        },                                 //TODO 行内按钮-盘点详情
        inlineExport: function (index,row) {
            obj.$confirm('导出盘点：', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[2].post({
                    pdId: row.pdId
                }, function (json) {
                    this.callbackAfter({status: json.status, model: "导出盘点"}, function () {
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
        },                                                  //TODO 行内按钮--导出
        selectSubmit: function () {
            _option = true;
            p[0].post(obj.form_pop);
            this.dialogSelectVisible = false;

        },                                          //详细查询 提交
        inventorySubmit: function () {
        },
        auto_pdType: function (value) {
            var temp = {}
            if (!isNaN(value)) {
                temp = {
                    0: '异动盘点',
                    1: '货品盘点',
                    2: '全仓盘点',
                }
            } else {
                temp = {
                    '异动盘点': 0,
                    '货品盘点': 1,
                    '全仓盘点': 2,
                }
            }
            return temp[value];
        },                                         //盘点类型
        auto_pdStatus: function (value) {
            var temp = {}
            if (!isNaN(value)) {
                temp = {
                    0: '初始',
                    1: '盘点确认',
                    2: '作废',
                }
            } else {
                temp = {
                    '初始': 0,
                    '盘点确认': 1,
                    '作废': 2,
                }
            }
            return temp[value];
        },                                       //盘点状态
        auto_pdDiffStatus: function (value) {
            var temp = {}
            if (!isNaN(value)) {
                temp = {
                    0: '无差异',
                    1: '有差异',
                }
            } else {
                temp = {
                    '无差异': 0,
                    '有差异': 1,
                }
            }
            return temp[value];
        },                                   //差异状态
    },
    watch: {
        pdOperator: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
        pdType: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
        pdArehouseId: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },


    },
});
// 高级 监视器的 使用方法
inventorySelect.$watch('date', function () {
    /*<debug>*/
    console.log((_option ? this.form_pop : this.option));
    /*</debug>*/
    p[0].post((_option ? this.form_pop : this.option));
}, {deep: true});
inventorySelect.$watch('rmsUser.ruUserName', function () {
    /*<debug>*/
    console.log(obj.option);
    /*</debug>*/
    p[0].post(obj.option);
}, {deep: true});
function _form() {
    return {
        pdCreateTime: [null, null],//模糊查询--创建时间
        ruUserName: '',//模糊查询--创建人
        pdOperator: '',//模糊查询--经办人
        pdStatus: '',//模糊查询--盘点状态
        pdDiffStatus: '',//模糊查询--差异状态
        pdArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,//模糊查询--仓库

    }
}
function rmsUser() {
    return {
        ruUserName: '',
    }
}
var obj = inventorySelect;
var p = [];
// 0 盘点查询 根据查询条件分页查询盘点计划
p[0] = autoPost({
    urlHock: "/hock/inventorySelect/page.json",
    urlProd: "/route/inventorySelect/0",
    success: function (json) {
        obj.$data.inventorySelect = json.data;
        obj.$data.currentTotal = json.recordsFiltered;
    }
});
// 1 盘点查询 根据盘点计划ID查询盘点详情
p[1] = autoPost({
    urlHock: "",
    urlProd: "/route/inventorySelect/1",
    success: function (json) {
        obj.inventory = json.model;
        obj.dialogInventoryVisible = true;
    }
});
// 2 盘点查询 根据盘点计划ID导出盘点计划及详情
p[2] = autoPost({
    urlHock: "",
    urlProd: "/route/inventorySelect/2",
    method: 'GET',
    success: function (json) {

    }
});

function formInventory() {
    return {
        pdsRepertoryId: '',
        pdsGoodsId: '',
        pdsGoodsId: '',
        pdsRepertoryCount: '',
        pdsPdCount: ''
    }
}
p[0].post(inventorySelect.option);
