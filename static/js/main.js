/*<prod>*/
console.log('线上版本');
/*</prod>*/
var app;
var wap;
var body = {};
/*<debug>*/
var hock = "../../hock";
/*</debug>*/

function _printDatas() {
    return {
        p0: [],
        p1: _printDatas_p1(),
        p2: _printDatas_p2(),
        p3: [],
    }
}

function _printDatas_p1() {
    return {
        data: [{
            "体积": 1596.0800000000002,
            "订单号": "CKD201705191540",
            "联系方式": "15853130911",
            "收货人": "吴金霏101",
            "发运数量": 50,
            "任务单号": "CKRW20170519-02",
            "地址": "山东济南",
            "货品名称": "酥油茶机、SY-T5、主体木纹部分金色镶件、Ⅰ类电气结构、1300W、220V、50HZ"
        }],
        info: _printDatas_p1_info()
    }
}
function _printDatas_p1_info() {
    return {
        "起运地": "九阳齐河仓",
        "到达地": "山东济南",
        "托运日期": "2017-05-23 15:37:09",
        "回单份数": 1,
        "承运方": "佳怡物流",
        "车牌号": '',

        "托运方": '',
        "托运方联系人": '',
        "承运人": {
            "姓名": '',
            "证件号": '',
            "联系人": ''
        },
        "到货时限": new Date()
    }
}

function _printDatas_p2() {
    return {
        data: [],
        info: _printDatas_p2_info(),
        row: {
            ckCkdjNo: '',
            ckCkdjClientname: '',
            ckAdress: ''
        }
    }
}
function _printDatas_p2_info() {
    return {
        amount: 0
    }
}


$(function () {
    Vue.component('sh-print', {
        render: function (h) {
            var value2 = this.val2;
            var value = this.val;
            var rwdh = this.rwdh;
            var dhrq = this.dhrq;
            var dysj = this.dysj;
            return h(
                'div', {
                    'class': {
                        divImsunhao: true
                    }
                },
                [
                    h('div', {
                        'class': {
                            barcode2: true
                        },
                        domProps: {
                            innerHTML: code128(value2, "B")
                        }
                    }, ''),
                    h('p', ['任务单号', h('span', rwdh)]),
                    h('p', ['到货日期', h('span', dhrq)]),
                    h('p', ['打印时间', h('span', dysj)]),
                    h('div', {
                        'class': {
                            barcode: true
                        },
                        domProps: {
                            innerHTML: code128(value, "B")
                        }
                    }, '')
                ]
            )
        },
        props: {
            val2: '',
            val: '',
            rwdh: '',
            dhrq: '',
            dysj: ''
        }
    });
    Vue.component('el-tag-s', {
        render: function (h) {
            var val = this.val;
            return h('el-tag', {
                props: {
                    type: val.type,
                    color: val.color
                }
            }, val.name);
        },
        props: {
            val: {}
        }
    });
    Vue.directive('echarts', {
        bind: function (el, binding, vnode) {
            Vue.nextTick(function () {
                var el = vnode.context.$el.children[binding.arg];
                el.instance = echarts.init(el);
                el.instance.setOption(binding.value);
            });
        },
        update: function (val, oldVal) {
            console.log('update');
        },
        unbind: function () {
            console.log('unbind');
        }
    });                 //Vue与ECharts的接口
    app = new Vue({
        el: '#app',
        prop: {},
        data: function () {
            return {
                nav: [],                            //Nav-DB
                navControl: 0,                      //Nav-control
                headMenu: [],                       //nav-header
                slideMenu: {},                      //Nav-slide
                f_SlideMenuText: '',                //Nav-slide-search
                navIsOpen: false,                   //Nav 开启状态维护

                fullscreenLoading: false,           //全局 加载控制

                breadcrumb: ['首页'],               //面包屑菜单
                showingLoading: false,              //content 加载控制
                treeRenderContent: function (h, node) {
                    return h(
                        'div', {
                            style: {
                                width: '100%',
                                lineHeight: '60px',
                                position: 'relative',
                                paddingLeft: '60px'
                            }
                        },
                        [
                            h('i', {
                                style: {
                                    width: '24px',
                                    height: '24px',
                                    display: 'inline-block',
                                    position: 'absolute',
                                    left: '18px',
                                    top: '18px',
                                    backgroundImage: 'url("/static/images/' + node.data.bmMenuIcon + '.png")'
                                }
                            }),
                            h('span', {
                                style: {
                                    color: '#fafafa',
                                    fontSize: '14px'
                                }
                            }, node.data.label)
                        ]
                    )
                },

                rmsUser: {
                    ruUserName: ''
                },                        //User信息
                dialogUserVisible: false,
                userLoading: false
            };
        },
        methods: {
            handleSelect: function (key, keyPath) {
                this.$data.slideMenu = this.$data.nav[key].children;
                this.$data.navControl = key;
                this.$data.f_SlideMenuText = '';
                this.breadcrumb = ['首页'];
                this.breadcrumb.push(this.$data.nav[key].head);
            },                    //nav-head 点击事件
            handleNodeClick: function (data) {
                /*<debug>*/
                console.log(this.breadcrumb);
                console.log(data);
                /*</debug>*/
                if (homeTimer) {
                    clearInterval(homeTimer);
                    homeTimer = 0;
                }
                if (this.breadcrumb.length > 2) this.breadcrumb.pop();
                this.breadcrumb.push(data.label);
                // ------------ 切换 content ---------------
                this.showingLoading = true;           //开启加载

                /*<debug>*/
                url = "/static/" + data.url + "/index.html";
                /*</debug>*/

                /*<prod>*/
                url = data.bmMenuUrl;
                /*</prod>*/

                (function (_this) {
                    $("#showing").load(url, function () {
                        /*<debug>*/
                        console.log("loadSuccess");
                        /*</debug>*/
                        _this.showingLoading = false;           //结束加载
                    })
                })(this);


            },                         //nav-slider 点击事件
            filterNode: function (value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },                       //nav-slider 过滤文字
            clickGoHome: function () {
                this.showingLoading = true;           //开启加载
                /*<debug>*/
                url = "/static/page/home/index.html";
                /*</debug>*/
                /*<prod>*/
                url = "/page/home";
                /*</prod>*/
                (function (_this) {
                    $("#showing").load(url, function () {
                        /*<debug>*/
                        console.log("loadSuccess");
                        console.log(_this.headMenu);
                        console.log(_this.navControl);
                        /*</debug>*/
                        _this.breadcrumb = ['首页', _this.headMenu[_this.navControl]];
                        _this.showingLoading = false;           //结束加载
                    })
                })(this);
            },                                 //返回首页
            navOpen: function () {
                this.navIsOpen = !this.navIsOpen;
            },                                     //最大化界面
            userSubmit: function () {
                this.dialogUserVisible = false;

                /*<debug>*/
                console.log('select!');
                /*</debug>*/

            },                                  //用户修改信息提交
            handleAvatarScucess: function (res) {
                if (res.status === 200) {
                    this.rmsUser.ruPortrait = res.ruPortrait;
                    this.$notify({
                        title: '提示',
                        type: 'success',
                        message: this.$createElement(
                            'p',
                            '更换头像成功！'
                        )
                    });
                } else {
                    this.$notify({
                        title: '提示',
                        type: 'error',
                        message: this.$createElement(
                            'p',
                            '更换头像失败！'
                        )
                    });
                }
            },
            beforeAvatarUpload: function (file) {
                var isJPG = file.type === 'image/jpeg';
                var isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            signOut: function () {
                // TODO signOut
                window.location = '/users/logout';
            }
        },
        watch: {
            f_SlideMenuText: function (val) {
                this.$refs.slideTree.filter(val);
            }
        }
    });

    wap = new Vue({
        el: '#wap',
        data: function () {
            return {
                printDatas: _printDatas(),
                dialogTableVisible: false,
                dialogTableVisible1: false,
                dialogTableVisible2: false,
                dialogTableVisible3: false,
            }
        },
        methods: {
            print: function (obj) {
                if (typeof (obj.printDatas) === 'undefined') return;
                this.printDatas = _printDatas();
                this.printDatas.p0 = obj.printDatas;
                this.dialogTableVisible = true;
                var _this = this;
                setTimeout(function () {
                    window.print();
                    obj.printModel = true;
                    _this.dialogTableVisible = false;
                }, 500);
            },                                        // 开始收货 打印标签页
            print1: function (obj) {
                if (typeof (obj.printDatas) === 'undefined') return;
                this.printDatas = _printDatas();
                this.printDatas.p1 = obj.printDatas;
                this.dialogTableVisible1 = true;
                var _this = this;
                setTimeout(function () {
                    window.print();
                    obj.printModel = true;
                    _this.dialogTableVisible1 = false;
                }, 500);
            },                                       // 出库发运 打印承运协议
            print2: function (obj) {
                if (typeof (obj.printDatas) === 'undefined') return;
                this.printDatas = _printDatas();
                this.printDatas.p2 = obj.printDatas;
                this.dialogTableVisible2 = true;
                var _this = this;
                setTimeout(function () {
                    window.print();
                    obj.printModel = true;
                    _this.dialogTableVisible2 = false;
                }, 500);
            },                                       // 出库操作 打印分拣单 打印追加分拣单
            print3: function (obj) {
                if (typeof (obj.printDatas) === 'undefined') return;
                this.printDatas = _printDatas();
                var stepString = '';
                var step = [];
                for (var i = 0; i < obj.printDatas.length; i++) {
                    step = obj.printDatas[i].mfunckDoc.ckRemarks.split(';');
                    for (var b = 0; b < step.length; b++) {
                        stepString += '<span>' + step[b] + '</span>';
                    }
                    obj.printDatas[i].mfunckDoc.ckRemarks = stepString;
                }

                this.printDatas.p3 = obj.printDatas;
                this.dialogTableVisible3 = true;
                var _this = this;
                setTimeout(function () {
                    window.print();
                    obj.printModel = true;
                    _this.dialogTableVisible3 = false;
                }, 500);
            },                                       // 出库操作 打印组合分拣单
        }
    });
    app.$watch('rmsUser', function () {
    }, {deep: true});

    //维护 权限验证
    (function (app) {
        //维护 Loading 层
        var complie = 0;                                //统计页面是否全部完成
        var end = 2;
        app.$data.fullscreenLoading = true;             //显示加载
        function Loading() {
            complie++;
            if (complie >= end) {
                app.$data.fullscreenLoading = false; //结束加载
            }
        }

        //---------------------初始化界面-------------------
        function init(json) {
            //维护 Loading 层
            var setpNumber = 2;
            complie += setpNumber;                      //刷新统计页面是否全部完成
            end += setpNumber;
            app.$data.fullscreenLoading = true;         //显示加载

            //-------------------------用户信息---------------------
            app.$data.rmsUser = json.rmsUser;

            /*<debug>*/
            console.log(json.rmsUser);
            /*</debug>*/

            //-------------------------加载nav----------------------
            /*<debug>*/
            $.ajax(hock + '/main/Nav-DB.json', {
                type: "GET",
                data: {},
                error: function () {
                },
                success: function (json) {
                    app.$data.nav = json.data;
                    //加载header-Nav
                    (function () {
                        var temp = [];
                        for (var i = 0; i < app.$data.nav.length; i++)
                            temp.push(app.$data.nav[i].head);
                        app.$data.headMenu = temp;
                        app.$data.breadcrumb.push(app.$data.nav[0].head);
                    })();

                    //加载slider-Menu
                    analysisSliderNav(app);
                },
                complete: function () {
                    Loading();
                }
            });
            /*</debug>*/

            /*<prod>*/
            (function (json) {
                app.$data.nav = generateNode(json);
                //加载header-Nav
                (function () {
                    var temp = [];
                    for (var i = 0; i < app.$data.nav.length; i++)
                        temp.push(app.$data.nav[i].head);
                    app.$data.headMenu = temp;
                    app.$data.breadcrumb.push(app.$data.nav[0].head);
                })();
                //加载slider-Menu
                analysisSliderNav(app);
                Loading();
            })(json.baseMenus);
            /*</prod>*/


            //------------------------- 加载 首页-----------------------
            /*<debug>*/
            // $("#showing").load("/static/page/inputSelect/inputSelect.html", function() {     //加载 入库查询
            $("#showing").load("/static/page/home/index.html", function () {                     //加载 首页
                console.log("Load was performed.");
                Loading();
            });
            /*</debug>*/

            /*<prod>*/
            $("#showing").load("/page/home", function (json) {
                Loading();
            });
            /*</prod>*/

            // 面包屑 菜单 首页按钮
            $('.el-breadcrumb__item__inner').eq(0).on('click', function () {
                app.clickGoHome();
            });

            //------------------------------工具函数-------------------------
            function analysisSliderNav(app) {
                app.$data.slideMenu = app.$data.nav[app.$data.navControl].children;
            }

            /*<debug>*/
            //初始化程序结束，输出提示
            console.log('界面加载完成');
            console.log('用户：');
            console.log(app.$data.user);
            /*</debug>*/
        }

        function tip(message) {
            app.$data.fullscreenLoading = false; //停止加载
            app.$alert(message, '提示', {
                confirmButtonText: '确定',
                callback: function () {
                    window.location.href = '/index.html';
                }
            });
        }


        /*<debug>*/
        // $.ajax(hock + '/Auth/userInfo-AuthFile.json', {
        // $.ajax(hock + '/Auth/userInfo-timeOut.json', {
        $.ajax(hock + '/Auth/userInfo.json', {
            type: "GET",
            data: {},
            error: function (error) {
                console.log(error);
            },
            success: function (json) {
                if (json.status != 1) tip(json.authMessage);//身份验证失败信息窗
                else init(json);
            },
            complete: function () {
                Loading();
            }
        });
        /*</debug>*/

        /*<prod>*/
        init(window.dbmessage);
        /*</prod>*/
    })(app);

    //维护 全局变量
    (function (w) {
        w.body.kjW = document.body.clientWidth;    //网页可见区域宽
        w.body.kjH = document.body.clientHeight; //网页可见区域高
        w.body.kjQyW = document.body.offsetWidth; //网页可见区域宽 (包括边线和滚动条的宽)
        w.body.kjQyH = document.body.offsetHeight; //网页可见区域高 (包括边线的宽)
        // w.body.kjW = document.body.scrollWidth; //网页正文全文宽
        // w.body.kjW = document.body.scrollHeight; //网页正文全文高
        // w.body.kjW = document.body.scrollTop; //网页被卷去的上
        // w.body.kjW = document.body.scrollLeft; //网页被卷去的左
        // w.body.kjW = window.screenTop; //网页正文部分上
        // w.body.kjW = window.screenLeft; //网页正文部分左
        // w.body.kjW = window.screen.width; //屏幕分辨率的宽
        // w.body.kjW = window.screen.height; //屏幕分辨率的高
        // w.body.kjW = window.screen.availWidth; //屏幕可用工作区宽度
        // w.body.kjW = window.screen.availHeight; //屏幕可用工作区高度
        // w.body.kjW = window.screen.colorDepth; //你的屏幕设置是  位彩色
        // w.body.kjW = window.screen.deviceXDPI;  //你的屏幕设置  像素/英寸
        autoPost({
            urlProd: "/route/home/1",
            success: function (json) {
                var step = {};
                for (index in json) {
                    step[json[index]] = index;
                }
                w.rkType = step;
            }
        }).post();
    })(window);
});

/*<debug>*/
var id = 0;
(function () {
    window.dbmessage = {};
    window.dbmessage.baseArehouses = JSON.parse('[{"baArehouseId":4,"baName":"无限极济阳仓A91","baAddr":"济南市济阳县","baScity":"齐河","baScontacts":"联系人1","baPhone":"13112345678","baAcreage":"222","baCtype":"22","baHumidity":"222","baFax":"2222","baPostoffice":"test","baIsti":1,"baStatus":1,"baClientId":3,"baRemarks":"test","baCreatetime":1487233193000,"baPgroupinfo":"eeeeeeeeeeeee","arehouseKqs":[]},{"baArehouseId":5,"baName":"九阳济南仓A02","baAddr":"济南市济阳278号","baScity":"齐河","baScontacts":"联系人1","baPhone":"13012345678","baAcreage":"222","baCtype":"111","baHumidity":"222","baFax":"2222","baPostoffice":"test","baIsti":2,"baStatus":1,"baClientId":1,"baRemarks":"test","baCreatetime":1487838047000,"baPgroupinfo":"eeeeeeeeeeeee","arehouseKqs":[]}]');
})();
/*</debug>*/


