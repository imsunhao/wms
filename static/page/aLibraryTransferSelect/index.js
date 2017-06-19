var aLibraryTransferSelect = new Vue({
    el: '#aLibraryTransferSelect',
    prop: {},
    data: function () {
        return {
            baseArehouses: window.dbmessage.baseArehouses,
            aLibraryTransferSelect: [],
            multipleSelection: [],
            multiSelect: false,
            pickerOptions: _pickerOptions(),
            showLoading: false,
            currentPage: 1,
            pageSize: 10,
            currentTotal: 0,
            date: [null, null],                  //主页面 创建时间 搜索
            zyCreateUserName: '',                //主页面 创建人 搜索
            zyStatus: '',                         //主页面 状态
            zyArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,             //主页面 仓库 搜索
            formLabelWidth: '120px',             //表单 配置
            form: _form(),                       //表单 弹出层 信息集合
            dialogFormActive: 0,                 //新建 弹出层 steps 当前进度
            dialogFormVisible: false,            //新建 弹出层 是否可见
            submitLoading: false,                //新建 弹出层 提交等待
            select: _form(),                     //搜索 弹出层 信息集合,
            dialogSelectVisible: false,
            selectLoading: false,
            watchView: false,                    //观察状态量-是否为查看

        }
    },
    computed: {
        // TODO 表格提交
        option: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "zyCreateUserName": this.zyCreateUserName.trim(),
                "zyStatus": this.zyStatus,
                "startCreateTimeParam": tsf_date(this.date[0]),
                "endCreateTimeParam": tsf_date(this.date[1]),
                "zyArehouseId":this.zyArehouseId,
            }
        },
        form_pop: function () {
            return {
                "draw": 1,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "startCreateTimeParam": tsf_date(this.form.zyCreateTime[0]),
                "endCreateTimeParam": tsf_date(this.form.zyCreateTime[1]),
                "startConfirmTimeParam": tsf_date(this.form.zyConfirmTime[0]),
                "endConfirmTimeParam": tsf_date(this.form.zyConfirmTime[1]),
                "zyCreateUserName": this.form.zyCreateUserName,
                "zyConfirmUserName": this.form.zyConfirmUserName,
                "zyMentionUserName": this.form.zyMentionUserName,
                "zyArehouseId": this.form.zyArehouseId,
                "zyStatus": this.form.zyStatus,
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
            this.form.title = '编辑';
            this.form.rkrwNo = row.rkrwNo;
            this.form.rkrwCph = row.rkrwCph;
            this.form.dds = row.dds;
            this.form.pxs = row.pxs;
            this.form.rkrwSjxm = row.rkrwSjxm;
            this.form.rkrwDhrq = row.rkrwDhrq;
            this.form.rkrwDbd = row.rkrwDbd;
            this.form.rkrwCys = row.rkrwCys;
            this.form.rkrwDh = row.rkrwDh;
            this.form.rkrwStatus = parseInt(row.rkrwStatus);
            this.dialogFormVisible = true;
            this.dialogFormActive = 0;
            Vue.nextTick(function () {
                aLibraryTransferSelect.$refs.carousel.setActiveItem(0);
            });
        },                                  //TODO 行内按钮-编辑
        inlineExport: function (index, row) {
            obj.$confirm('导出库存转移', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                p[2].post({
                    ids: [row.zyId]
                }, function (json) {
                    this.callbackAfter({status: json.status, model: "导出库位转移"}, function () {
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
        },                                //行内按钮 导出
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
            obj.$confirm('批量导出库位转移', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                var ids = [];
                for (var i = 0; i < obj.multipleSelection.length; i++) {
                    ids.push(obj.multipleSelection[i].zyId);
                }
                p[2].post({
                    ids: ids
                }, function (json) {
                    this.callbackAfter({status: json.status, model: "导出库位转移"}, function () {

                    })
                });
            }).catch(function () {
                obj.$message({
                    type: 'info',
                    message: '已取消导出'
                });
            });
        },                                   //TODO 多选 导出
        handleSizeChange: function (val) {
            /*<debug>*/
            console.log('每页' + val + '条');
            /*</debug>*/
            this.pageSize = val;
            p[0].post((_option ? this.form_pop : this.option));
        },                                   //分页 Size
        expandChange: function (row, expanded) {

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
            p[0].post(obj.form_pop);
            this.dialogSelectVisible = false;

        },                                          //详细查询 提交
        auto_zyStatus: function (value) {

            if (!isNaN(value)) {
                temp = {
                    0: '初始',
                    1: '确认',
                    2: '作废'

                }
            } else {
                temp = {
                    '初始': 0,
                    '确认': 1,
                    '作废': 2,
                }
            }
            return temp[value];
        },                                    //任务状态,

    },
    watch: {
        zyCreateUserName: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
        zyStatus: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },
        zyArehouseId: function () {
            /*<debug>*/
            console.log((_option ? this.form_pop : this.option));
            /*</debug>*/
            p[0].post((_option ? this.form_pop : this.option));
        },

    }
});
function _form() {
    return {
        zyCreateTime: [null, null],//模糊查询--创建时间
        zyConfirmTime: [null, null],//模糊查询--确认时间
        zyCreateUserName: '',//模糊查询--创建人
        zyConfirmUserName: '',//模糊查询--确认人
        zyMentionUserName: '',//模糊查询--提起人
        zyArehouseId: window.dbmessage.baseArehouses[0].baArehouseId,//模糊查询--仓库
        zyStatus: '',//模糊查询--转移状态
    }
}
// 高级 监视器的 使用方法
aLibraryTransferSelect.$watch('date', function () {
    /*<debug>*/
    console.log((_option ? this.form_pop : this.option));
    /*</debug>*/
    p[0].post((_option ? this.form_pop : this.option));
}, {deep: true});
var obj = aLibraryTransferSelect;
var p = [];
// 0 库位转移查询 分页查询
p[0] = autoPost({
    urlHock: "/hock/aLibraryTransferSelect/page.json",
    urlProd: "/route/aLibraryTransferSelect/0",
    success: function (json) {
        obj.$data.aLibraryTransferSelect = json.data;
        obj.$data.currentTotal = json.recordsFiltered;
    }
});
// 2 库位转移查询  库存转移报表导出
p[2] = autoPost({
    urlHock: "",
    urlProd: "/route/aLibraryTransferSelect/2",
    method: 'GET'
});
p[0].post(aLibraryTransferSelect.option);
