/*<prod>*/
console.log('线上版本');
/*</prod>*/

(function () {
//---------------------------工具函数----------------------------

    var regItem = {
        // 是否为必填
        required: function (field) {
            var value = field.value;

            //判断是不是单选框，多选框的可能
            if (field.type === 'checkbox' || field.type === 'radio') {
                return field.checked === true;
            }
            return value !== null && value !== '';
        },
        maxLength: function (field, length) {
            var value = field.value;
            return value.length <= length;
        },
        minLength: function (field, length) {
            var value = field.value;
            return value.length >= length;
        }

    };

    function validate(opts) {
        var el = this.form[opts.name], i = 0;

        if (opts.rules) {
            for (; i < opts.rules.length; i++) {
                var valiReg = true, valiStr = true;
                if (typeof opts.rules[i] != 'string') {
                    valiReg = validateReg(el, opts.rules[i])
                } else {
                    valiStr = validateString(el, opts.rules[i])
                }

                if (!valiReg || !valiStr) {
                    alertMessage.call(this, opts, opts.message[i]);
                    return false;
                }
            }
        } else if (opts.sameTo) {
            var selfValue = el.value;
            var targetValue = this.form[opts.sameTo].value;
            if (selfValue !== targetValue) {
                alertMessage.call(this, opts, opts.message[i]);
                return false;
            }
        }

        return true;
    }

    function alertMessage(opts, message) {
        var errorEle = document.createElement('div');
        errorEle.className = 'errorMessage';
        var nodeEles = document.getElementsByClassName('errorMessage');

        if (nodeEles.length === 0) {
            document.getElementsByTagName('body')[0].appendChild(errorEle);
        }
        var errEl = document.getElementsByClassName('errorMessage')[0];
        errEl.innerHTML = message;
        errorMessageStyle(errEl);
        if (opts.callback) {
            opts.callback(this.form[opts.name], errEl)
        }
    }

    function errorMessageStyle(errEl) {

        errEl.style.display = 'block';

        if (!/animated fadeOut/.test(errEl.className)) {
            errEl.className += ' animated fadeOut';
        }

        errEl.addEventListener('webkitAnimationEnd', endAnime);
        errEl.addEventListener('animationend', endAnime);

        function endAnime() {
            removeClass(errEl, 'animated');
            removeClass(errEl, 'fadeOut');
            errEl.style.display = 'none'
        }

    }

    function validateReg(el, rule) {
        return rule.test(el.value)
    }

    function validateString(el, rule) {

        var result;
        var ruleArr = /(\w+)/ig.exec(rule);

        //不带参数的规则处理
        if (ruleArr[1] === ruleArr.input) {
            result = regItem[ruleArr.input](el);

        } else {
            //带参数的规则处理，如：maxLength
            ruleArr = /(\w+)\((\d+)/ig.exec(rule);
            result = regItem[ruleArr[1]](el, ruleArr[2]);
        }
        return result
    }

    function removeClass(ele, oldClass) {
        var classNames = ele.className.trim();
        classNames = classNames.replace(/\s+/g, ' ');
        var classNameArr = classNames.split(' ');
        for (var j = 0; j < classNameArr.length; j++) {
            if (oldClass === classNameArr[j]) {
                classNameArr.splice(j, 1)
            }
        }
        return ele.className = classNameArr.join(' ');
    }

    function cssStyle() {
        var cssStyle = document.createElement('style');
        cssStyle.type = 'text/css';
        cssStyle.innerHTML = '.errorMessage{position:fixed;top:50%;right:0;left:0;display:block;margin:auto;padding:5%;width:60%;-webkit-border-radius:4px;background-color:rgba(0,0,0,.7);color:#fff;text-align:center;font-size:16px;transform:translateY(-50%);-ms-transform:translateY(-50%)}.animated{-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-fill-mode:both;animation-fill-mode:both}@-webkit-keyframes fadeOut{50%{opacity:1}to{opacity:0}}@keyframes fadeOut{50%{opacity:1}to{opacity:0}}.fadeOut{-webkit-animation-name:fadeOut;animation-name:fadeOut}';

        document.head.appendChild(cssStyle);
    }


//---------------------------背景绘制------------------------------
    var CanvasParticle = (function () {
        function getElementByTag(name) {
            return document.getElementsByTagName(name);
        }

        function getELementById(id) {
            return document.getElementById(id);
        }

        // 根据传入的config初始化画布
        function canvasInit(canvasConfig) {
            canvasConfig = canvasConfig || {};
            var html = getElementByTag("html")[0];
            var body = getElementByTag("body")[0];
            var canvasDiv = getELementById("canvas-particle");
            var canvasObj = document.createElement("canvas");

            var canvas = {
                element: canvasObj,
                points: [],
                // 默认配置
                config: {
                    vx: canvasConfig.vx || 4,
                    vy: canvasConfig.vy || 4,
                    height: canvasConfig.height || 2,
                    width: canvasConfig.width || 2,
                    count: canvasConfig.count || 100,
                    color: canvasConfig.color || "121, 162, 185",
                    stroke: canvasConfig.stroke || "130,255,255",
                    dist: canvasConfig.dist || 6000,
                    e_dist: canvasConfig.e_dist || 20000,
                    max_conn: 10
                }
            };

            // 获取context
            if (canvas.element.getContext("2d")) {
                canvas.context = canvas.element.getContext("2d");
            } else {
                return null;
            }

            body.style.padding = "0";
            body.style.margin = "0";
            // body.replaceChild(canvas.element, canvasDiv);
            body.appendChild(canvas.element);

            canvas.element.style = "position: absolute; top: 0; left: 0; z-index: -1;";
            canvasSize(canvas.element);
            window.onresize = function () {
                canvasSize(canvas.element);
            }
            body.onmousemove = function (e) {
                var event = e || window.event;
                canvas.mouse = {
                    x: event.clientX,
                    y: event.clientY
                }
            }
            document.onmouseleave = function () {
                canvas.mouse = undefined;
            }
            setInterval(function () {
                drawPoint(canvas);
            }, 40);
        }

        // 设置canvas大小
        function canvasSize(canvas) {
            canvas.width = window.innerWeight || document.documentElement.clientWidth || document.body.clientWidth;
            canvas.height = window.innerWeight || document.documentElement.clientHeight || document.body.clientHeight;
        }

        // 画点
        function drawPoint(canvas) {
            var context = canvas.context,
                point,
                dist;
            context.clearRect(0, 0, canvas.element.width, canvas.element.height);
            context.beginPath();
            context.fillStyle = "rgb(" + canvas.config.color + ")";
            for (var i = 0, len = canvas.config.count; i < len; i++) {
                if (canvas.points.length != canvas.config.count) {
                    // 初始化所有点
                    point = {
                        x: Math.floor(Math.random() * canvas.element.width),
                        y: Math.floor(Math.random() * canvas.element.height),
                        vx: canvas.config.vx / 2 - Math.random() * canvas.config.vx,
                        vy: canvas.config.vy / 2 - Math.random() * canvas.config.vy
                    }
                } else {
                    // 处理球的速度和位置，并且做边界处理
                    point = borderPoint(canvas.points[i], canvas);
                }
                context.fillRect(point.x - canvas.config.width / 2, point.y - canvas.config.height / 2, canvas.config.width, canvas.config.height);

                canvas.points[i] = point;
            }
            drawLine(context, canvas, canvas.mouse);
            context.closePath();
        }

        // 边界处理
        function borderPoint(point, canvas) {
            var p = point;
            if (point.x <= 0 || point.x >= canvas.element.width) {
                p.vx = -p.vx;
                p.x += p.vx;
            } else if (point.y <= 0 || point.y >= canvas.element.height) {
                p.vy = -p.vy;
                p.y += p.vy;
            } else {
                p = {
                    x: p.x + p.vx,
                    y: p.y + p.vy,
                    vx: p.vx,
                    vy: p.vy
                }
            }
            return p;
        }

        // 画线
        function drawLine(context, canvas, mouse) {
            context = context || canvas.context;
            for (var i = 0, len = canvas.config.count; i < len; i++) {
                // 初始化最大连接数
                canvas.points[i].max_conn = 0;
                // point to point
                for (var j = 0; j < len; j++) {
                    if (i != j) {
                        dist = Math.round(canvas.points[i].x - canvas.points[j].x) * Math.round(canvas.points[i].x - canvas.points[j].x) +
                            Math.round(canvas.points[i].y - canvas.points[j].y) * Math.round(canvas.points[i].y - canvas.points[j].y);
                        // 两点距离小于吸附距离，而且小于最大连接数，则画线
                        if (dist <= canvas.config.dist && canvas.points[i].max_conn < canvas.config.max_conn) {
                            canvas.points[i].max_conn++;
                            // 距离越远，线条越细，而且越透明
                            context.lineWidth = 0.5 - dist / canvas.config.dist;
                            context.strokeStyle = "rgba(" + canvas.config.stroke + "," + (1 - dist / canvas.config.dist) + ")"
                            context.beginPath();
                            context.moveTo(canvas.points[i].x, canvas.points[i].y);
                            context.lineTo(canvas.points[j].x, canvas.points[j].y);
                            context.stroke();

                        }
                    }
                }
                // 如果鼠标进入画布
                // point to mouse
                if (mouse) {
                    dist = Math.round(canvas.points[i].x - mouse.x) * Math.round(canvas.points[i].x - mouse.x) +
                        Math.round(canvas.points[i].y - mouse.y) * Math.round(canvas.points[i].y - mouse.y);
                    // 遇到鼠标吸附距离时加速，直接改变point的x，y值达到加速效果
                    if (dist > canvas.config.dist && dist <= canvas.config.e_dist) {
                        canvas.points[i].x = canvas.points[i].x + (mouse.x - canvas.points[i].x) / 20;
                        canvas.points[i].y = canvas.points[i].y + (mouse.y - canvas.points[i].y) / 20;
                    }
                    if (dist <= canvas.config.e_dist) {
                        context.lineWidth = 1;
                        context.strokeStyle = "rgba(" + canvas.config.stroke + "," + (1 - dist / canvas.config.e_dist) + ")";
                        context.beginPath();
                        context.moveTo(canvas.points[i].x, canvas.points[i].y);
                        context.lineTo(mouse.x, mouse.y);
                        context.stroke();
                    }
                }
            }
        }

        return canvasInit;
    })();

//---------------------------验证控制层----------------------------
    (function (win) {


        var Mvalidate = function (form) {
            this.form = document.forms[form];
            this.options = []
        };

        Mvalidate.prototype = {
            add: function (opts) {

                var self = this;
                self.options.push(opts);
                return self;
            },
            remove: function (elem) {
                var self = this, i = 0, j, len = self.options.length;

                for (; i < len; i++) {
                    if (elem.trim() === self.options[i].name.trim()) {
                        j = i;
                    }
                }
                self.options.splice(j, 1);
                return self;
            },
            valid: function () {
                var self = this, i = 0, len = self.options.length;

                for (; i < len; i++) {
                    if (validate.call(self, self.options[i]) === false) {
                        return false;
                    }
                }

                return true;
            }

        };

        win.Mvalidate = Mvalidate;
        cssStyle();

    }(window));


//---------------------------初始化程序----------------------------
    window.onload = function () {

        var config = {
            vx: 4,
            vy: 4,
            height: 2,
            width: 2,
            count: 100,
            color: "121, 162, 185",
            stroke: "100,200,180",
            dist: 6000,
            e_dist: 20000,
            max_conn: 10
        };
        CanvasParticle(config);
        var box = document.getElementsByClassName('box')[0];
        var X = 0;
        var Y = 0;
        var timer = setInterval(function () {
            X++;
            Y++;
            auto();
        }, 33);
        box.onmouseover = function () {
            clearInterval(timer);
        };
        box.onmouseleave = function () {
            timer = setInterval(function () {
                X++;
                Y++;
                auto();
            }, 33);
        };
        function auto() {
            if (X > 360) X = 0;
            if (Y > 360) Y = 0;
            box.style.transform = "rotateX(" + X + "deg) rotateY(" + Y + "deg)";
        }


        var submit = document.getElementById('submit');

        //--------
        var ooo = new Mvalidate('myForm');
        ooo
            .add({
                name: 'username',
                rules: ['required', /[a-zA-Z0-9_]+$/, 'maxLength(16)'],
                message: ['用户名必须填写', '用户名必须为英文与数字或者下划线', '用户名最长不能超过16位'],
                callback: function (el, errorEl) {

                }
            })
            .add({
                name: 'password',
                rules: ['required', 'minLength(6)'],
                message: ['密码必须填', '密码不足6位'],
                callback: function (el, errorEl) {

                }
            });
        //     .add({
        //         name: 'confirm-password',
        //         sameTo: 'password',
        //         message: ['两次密码必须保持一致']
        //     })
        //     .add({
        //         name: 'mobile',
        //         rules: [/^[1-9]\d{10}$/],
        //         message: ['手机号输入错误']
        //     })
        //     .add({
        //         name: 'email',
        //         rules: [/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/],
        //         message: ['对不起，您填写的E-mail格式不正确！']
        //     })
        //     .add({
        //         name: 'sure',
        //         rules: ['required'],
        //         message: ['确定项项必须选']
        //     });

        document.getElementById('myForm').onsubmit = function (e) {
            e.preventDefault();

            /*<debug>*/
            console.log(ooo.valid());
            /*</debug>*/

            if (ooo.valid()) {
                submit.disabled = true;
                /*<debug>*/
                window.location.href = '/main.html';
                /*</debug>*/

                /*<prod>*/
                $.post('/users/login', {
                    username: $('#username').val(),
                    password: $('#password').val()
                }, function (json) {
                    if (json.status == 1)
                        window.location.href = json.url;
                    else {
                        submit.disabled = false;
                        alertMessage.call(this, {name: "对不起"}, json.message);
                    }
                });
                /*</prod>*/
            }
        };
        document.getElementById('username').onclick = function () {
            document.getElementById('usernameDiv').className = "ac";
            document.getElementById('passwordDiv').className = "";
        };
        document.getElementById('password').onclick = function () {
            document.getElementById('passwordDiv').className = "ac";
            document.getElementById('usernameDiv').className = "";
        }
    };


})();