/*<prod>*/
console.log('线上版本');
/*</prod>*/
var app;
/*<debug>*/
var hock = "../../hock";
/*</debug>*/
$(function () {
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
                    ruUserName:''
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
            handleAvatarScucess: function (res, a1, a2) {
                // console.log(res)
                // console.log(a1)
                // console.log(a2)
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
    app.$watch('rmsUser', function () {}, {deep: true});

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
                function generateNode(tree) {
                    var formatTree = formatTreeData(tree);
                    return combinationNode(formatTree);
                    function formatTreeData(tree) {
                        if (!tree)return;
                        var formatTree = {};
                        for (var i = 0; i < tree.length; i++) {
                            if (formatTree[tree[i].bmParentMenuId]) {
                                tree[i].label = tree[i].bmMenuName;
                                tree[i].id = tree[i].bmMenuId;
                                formatTree[tree[i].bmParentMenuId].children.push(tree[i]);
                            }
                            else {
                                formatTree[tree[i].bmParentMenuId] = {};
                                formatTree[tree[i].bmParentMenuId].children = [];
                                tree[i].id = tree[i].bmMenuId;
                                tree[i].label = tree[i].bmMenuName;
                                formatTree[tree[i].bmParentMenuId].children.push(tree[i]);
                            }
                        }
                        return formatTree;
                    }

                    function combinationNode(tree) {
                        var data = [];
                        for (var i = 0; i < tree[0].children.length; i++) {
                            tree[tree[0].children[i].bmMenuId].head = tree[0].children[i].bmMenuName;
                            data.push(tree[tree[0].children[i].bmMenuId]);
                        }
                        return data;
                    }
                }

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
});
