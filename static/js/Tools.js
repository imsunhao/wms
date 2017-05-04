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
            cb(obj[p], p)
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
        type: 'GET',
        urlHock: '',
        urlProd: '',
        data: {},
        error: function (error) {
            errorTip(app, error)
        },
        success: function (json) {
            if (json.status > 19999 && json.status < 30000) {
                this.success(json);
            } else {
                errorTip(app, json)
            }
        },
        complete: function () {

        },
        post: function () {
            postCore.call(this);
        }
    };          //post父类

    return Object.create(_post, autoValue(option));
}           //post核心
