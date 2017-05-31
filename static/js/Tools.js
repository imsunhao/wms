/**
 * Created by imsunhao on 2017/5/2.
 */




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
            tree[tree[0].children[i].bmOrderNumber].head = tree[0].children[i].bmMenuName;
            data.push(tree[tree[0].children[i].bmOrderNumber]);
        }
        return data;
    }
}         //菜单树
function changeDate(date) {
    return dateFormat(new Date(date), 'MM-dd hh:mm');
}           //转换时间
function errorTip(obj, error) {                    // 错误提示
    /*<debug>*/
    console.log(error);
    /*</debug>*/
    obj.$alert(error.status + '\n' + error.statusText, '网络异常');
}       //错误提示
function dateFormat(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}      //转换时间核心
function remove(obj, data) {
    for (var i = 0; i < data.length; i++) {
        var temp = data[i];
        if (!isNaN(obj)) {
            temp = i;
        }
        if (temp == obj) {
            for (var j = i; j < data.length; j++) {
                data[j] = data[j + 1];

//                    console.log(temp);
            }
            data.pop();
        }
    }
}          //删除数组数据
function addOrDelete(obj, data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i] == obj) {
            return true;
        }
    }
    return false;
}     //判断是否重复
function allPrposCb(obj, cb) {
    /*
     * 用来遍历指定对象所有的属性名称和值
     * obj 需要遍历的对象
     * cb 回调函数  1. 子属性 2.子属性名
     */
    for (var p in obj) {
        if (typeof(obj[p]) !== "function") {
            cb(obj, p)
        }
    }
}        //继承核心
function autoPost(option) {
    function autoValue(obj) {
        var temp = Object.create(null);
        for (index in obj) {
            temp[index] = Object.create(null);
            temp[index].value = obj[index];
            temp[index].configurable = true;
            temp[index].enumerable = true;
            temp[index].writable = true;
        }
        return temp;
    }             //post核心 配置子类-自动转换参数

    function postCore() {
        /*<debug>*/
        $.ajax(this.urlHock, this);
        /*</debug>*/
        /*<prod>*/
        $.ajax(this.urlProd, this);
        /*</prod>*/
    }                 //post核心

    var _post = {
        type: 'POST',
        urlHock: '',
        urlProd: '',
        success: function (json) {
            this.callbackAfter(json);
        },
        callbackAfter: function (json, cb) {
            if (json.status > 19999 && json.status < 30000) {
                obj.$notify({
                    title: '成功',
                    message: json.model + '成功！',
                    type: 'success'
                });
                if (cb) cb();
            } else {
                obj.$notify({
                    title: '失败',
                    message: json.model + '失败!',
                    type: 'error'
                });
            }
        },
        data: {},
        error: function (error) {
            errorTip(app, error)
        },
        complete: function () {

        },
        post: function (data, call) {
            if (typeof data !== 'undefined') this.data = data;
            if (typeof call !== 'undefined') this.success = call;
            postCore.call(this);
        }
    };          //post父类
    return Object.create(_post, autoValue(option));
}           //post核心
function autoValidate(option, cbs) {
    var validateRule = {
        vNull: function (rule, value, callback) {
            console.log(rule);
            if (value === '') {
                callback(new Error('必填'));
            } else {
                callback();
            }
        },
        a: autoValidateRule("((?=[\x21-\x7e\u4e00-\u9fa5\（\）\《\》\——\；\，\。\“\”\<\>\！、]+)[^A-Za-z0-9])", '不允许存在特殊字符!'),
    };

    function autoValidateRule(string, model) {
        return function (rule, value, callback) {
            if ((new RegExp(string, "g")).exec(value)) {
                return callback(new Error(model));
            }
            else {
                return callback();
            }
        };
    }

    var temp = Object.create(null);
    var i = 0;
    for (index in option) {
        var type = typeof option[index];
        switch (type) {
            case 'object':
                temp[index] = [];
                for (var b in option[index]) {
                    temp[index].push({validator: validateRule[option[index][b]], trigger: 'blur'});
                }
                break;
            case 'string':
                if (!option[index]) {
                    temp[index] = [{validator: cbs[i++], trigger: 'blur'}]
                } else {
                    temp[index] = [{validator: validateRule[option[index]], trigger: 'blur'}];
                }
                break;
        }
    }
    return temp;
}  //validate核心


function tsf_date(date, number) {
    if (typeof date !== 'undefined' && date !== null && date !== '') {
        switch (number) {
            case 1:
                return dateFormat(date, 'yyyy-MM-dd hh:mm');
            default:
                return dateFormat(date, 'yyyy-MM-dd hh:mm:ss')

        }
    } else {
        return null;
    }
}     //安全转换日期 为 java 可识别
function auto_number(data, size) {
    if (data < Math.pow(10, size)) {
        for (var i = 0; i < size; i++) {
            data = '0' + data;
        }
    }
    return data;
}    //自动转换数字为  01 等格式 ，size代表前缀0的个数
function auto_time(value, bool) {
    if (!bool) return dateFormat(new Date(value), 'yyyy-MM-dd');
    else return dateFormat(new Date(value), 'MM-dd');
}     //自动转换 表格中的日期
function auto_time_new(value, number) {
    if (value === '')return '';
    if (value === null)return '';
    if (typeof value === 'undefined')return '';
    switch (number) {
        case 1:
            return dateFormat(new Date(value), 'yyyy年 MM月 dd日');
        case 2:
            return dateFormat(new Date(value), 'MM-dd');
        case 3:    //批次
            return dateFormat(new Date(value), 'yyyy-MM-dd');
        case 4:
            return dateFormat(new Date(value), 'yyyy/MM/dd hh:mm');
        case 5:
            return dateFormat(new Date(value), 'yyyy年 MM月 dd日 hh:mm');
        case 6:
            if (body.kjW < 1367)
                return dateFormat(new Date(value), 'yyyy年 MM月 dd日 hh:mm:ss');
            else return dateFormat(new Date(value), 'yyyy年 MM月 dd日 hh:mm');
        default:
            return dateFormat(new Date(value), 'yyyy-MM-dd');
    }
}//自动转换 表格中的日期 新
(function () {
    if (!exports) var exports = window;
    var BARS = [212222, 222122, 222221, 121223, 121322, 131222, 122213, 122312, 132212, 221213, 221312, 231212, 112232, 122132, 122231, 113222, 123122, 123221, 223211, 221132, 221231, 213212, 223112, 312131, 311222, 321122, 321221, 312212, 322112, 322211, 212123, 212321, 232121, 111323, 131123, 131321, 112313, 132113, 132311, 211313, 231113, 231311, 112133, 112331, 132131, 113123, 113321, 133121, 313121, 211331, 231131, 213113, 213311, 213131, 311123, 311321, 331121, 312113, 312311, 332111, 314111, 221411, 431111, 111224, 111422, 121124, 121421, 141122, 141221, 112214, 112412, 122114, 122411, 142112, 142211, 241211, 221114, 413111, 241112, 134111, 111242, 121142, 121241, 114212, 124112, 124211, 411212, 421112, 421211, 212141, 214121, 412121, 111143, 111341, 131141, 114113, 114311, 411113, 411311, 113141, 114131, 311141, 411131, 211412, 211214, 211232, 23311120]
        , START_BASE = 38
        , STOP = 106;

    function code128(code, barcodeType) {
        if (arguments.length < 2)
            barcodeType = code128Detect(code);
        if (barcodeType == 'C' && code.length % 2 == 1)
            code = '0' + code;
        var a = parseBarcode(code, barcodeType);
        return bar2html(a.join('')) + '<label>' + code + '</label>';
    }

    function bar2html(s) {
        for (var pos = 0, sb = []; pos < s.length; pos += 2) {
            sb.push('<div class="bar' + s.charAt(pos) + ' space' + s.charAt(pos + 1) + '"></div>');
        }
        return sb.join('');
    }

    function code128Detect(code) {
        if (/^[0-9]+$/.test(code)) return 'C';
        if (/[a-z]/.test(code)) return 'B';
        return 'A';
    }

    function parseBarcode(barcode, barcodeType) {
        var bars = [];
        bars.add = function (nr) {
            var nrCode = BARS[nr];
            this.check = this.length == 0 ? nr : this.check + nr * this.length;
            this.push(nrCode || ("UNDEFINED: " + nr + "->" + nrCode));
        };
        bars.add(START_BASE + barcodeType.charCodeAt(0));
        for (var i = 0; i < barcode.length; i++) {
            var code = barcodeType == 'C' ? +barcode.substr(i++, 2) : barcode.charCodeAt(i);
            converted = fromType[barcodeType](code);
            if (isNaN(converted) || converted < 0 || converted > 106) throw new Error("Unrecognized character (" + code + ") at position " + i + " in code '" + barcode + "'.");
            bars.add(converted);
        }
        bars.push(BARS[bars.check % 103], BARS[STOP]);
        return bars;
    }

    var fromType = {
        A: function (charCode) {
            if (charCode >= 0 && charCode < 32) return charCode + 64;
            if (charCode >= 32 && charCode < 96) return charCode - 32;
            return charCode;
        },
        B: function (charCode) {
            if (charCode >= 32 && charCode < 128) return charCode - 32;
            return charCode;
        },
        C: function (charCode) {
            return charCode;
        }
    };

    //--| Export
    exports.code128 = code128;
})();                    //一维码 打印核心
function auto_portrait(portrait) {
    return 'static/images/users/' + portrait;
}

