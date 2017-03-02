/*<prod>*/
console.log('线上版本');
/*</prod>*/
/*<debug>*/
var app;
var hock = "../../hock";
/*</debug>*/
$(function (dbmessage) {
    /*<prod>*/
    var app;
    /*</prod>*/
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

                fullscreenLoading: false,           //全局 加载控制

                rmsUser: {},                          //User信息
                breadcrumb: ['首页'],                //面包屑菜单
                showingLoading: false,                //content 加载控制
            };
        },
        methods: {
            handleSelect: function (key, keyPath) { //nav-head 点击事件
                this.$data.slideMenu = this.$data.nav[key].children;
                this.$data.f_SlideMenuText = '';
                this.breadcrumb = [];
                this.breadcrumb.push(this.$data.nav[key].head);
            },
            userSelect: function () {                //nav-head 用户点击事件
                console.log('userSelect!');
            },
            handleNodeClick: function (data) {      //nav-slider 点击事件
                /*<debug>*/
                console.log(this.breadcrumb);
                console.log(data);
                /*</debug>*/
                if (this.breadcrumb.length == 2) this.breadcrumb.pop();
                this.breadcrumb.push(data.label);
                // ------------ 切换 content ---------------
                this.showingLoading = true;           //开启加载

                /*<debug>*/
                url = "/static/" + data.url + "/index.html";
                /*</debug>*/

                /*<prod>*/
                url = data.url;
                /*</prod>*/

                (function (_this) {
                    $("#showing").load(url, function () {
                        /*<debug>*/
                        console.log("loadSuccess");
                        /*</debug>*/
                        _this.showingLoading = false;           //结束加载
                    })
                })(this);


            },
            filterNode: function (value, data) {    //nav-slider 过滤文字
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
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
                        /*</debug>*/
                        _this.showingLoading = false;           //结束加载
                    })
                })(this);
            }
        },
        watch: {
            f_SlideMenuText: function (val) {
                this.$refs.slideTree.filter(val);
            },
            slideMenu: function () {
            },
            breadcrumb: function () {
            },
            rmsUser: function () {

            }
        }
    });

    //维护 权限验证
    (function (app) {
        //维护 Loading 层
        var complie = 0;                                //统计页面是否全部完成
        var end = 2;
        app.$data.fullscreenLoading = true;             //显示加载
        function Loading() {
            complie++;
            if (complie == end) {
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
            console.log(json.rmsUser);

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
            Loading();
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
            $("#showing").load("/page/home", function () {
                Loading();
            });
            /*</prod>*/

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
                console.log(json);
                if (json.status != 1) tip(json.authMessage);//身份验证失败信息窗
                else init(json);
            },
            complete: function () {
                Loading();
            }
        });
        /*</debug>*/

        /*<prod>*/
        init(dbmessage);
        /*</prod>*/
    })(app, dbmessage);
});
