/**
 * Created by imsunhao on 2017/5/2.
 */

function generateNode(tree) {
  var formatTree = formatTreeData(tree);
  return combinationNode(formatTree);
  function formatTreeData(tree) {
    if (!tree)return;
    var formatTree = {};
    var parentId = 0;
    for (var i = 0; i < tree.length; i++) {
      parentId = tree[i].bmParentMenuId || 0;
      if (formatTree[parentId]) {
        tree[i].label = tree[i].bmMenuName;
        tree[i].id = tree[i].bmMenuId;
        formatTree[parentId].children.push(tree[i]);
      }
      else {
        formatTree[parentId] = {};
        formatTree[parentId].children = [];
        tree[i].id = tree[i].bmMenuId;
        tree[i].label = tree[i].bmMenuName;
        formatTree[parentId].children.push(tree[i]);
      }
    }
    return formatTree;
  }

  function combinationNode(tree) {
    var data = [];
    for (var i = 0; i < tree[0].children.length; i++) {
      tree[tree[0].children[i].bmOrderNumber].head = tree[0].children[i].bmMenuName;
      tree[tree[0].children[i].bmOrderNumber].bmMenuId = tree[0].children[i].bmMenuId;
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
}        //核心-继承
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
}             //核心-继承-配置子类-自动转换参数
function autoPost(option) {
  function postCore() {
    for (var i in this.data) {
      if (this.data.hasOwnProperty(i)) {
        if (this.data[i] === '' || this.data[i] === null || this.data[i] === -1) {
          delete this.data[i];
        }
      }
    }
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
    callbackAfter: function (json, cb, cb2) {
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
        if (cb2) cb2();
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
}           //核心 - post
function auto_form(option) {
  var step = {};
  var index;
  var _form = {
    data: {},       //数据集合
    label: {},      //字段集合
    labelFun: function () {
      if (!this.label.hasOwnProperty()) {
        var step = {};
        for (index in this.data) {
          if (this.data.hasOwnProperty(index)) {
            step[index] = this.data[index].label;
          }
        }
        this.label = step;
      }
    },
    init: function () {
      this.labelFun();
      return this;
    },
    get: function (number, numberN) {
      if (typeof number === 'undefined')return;
      var step = {};
      if (typeof numberN === 'undefined') {
        for (index in this.data) {
          if (this.data.hasOwnProperty(index)) {
            if ($.inArray(number, this.data[index].data) !== -1) {
              if (typeof this.data[index].Default !== 'undefined') step[index] = this.data[index].Default;
              else step[index] = '';
            }
          }
        }
      } else {
        for (index in this.data) {
          if (this.data.hasOwnProperty(index)) {
            if (($.inArray(number, this.data[index].data) !== -1) && ($.inArray(numberN, this.data[index].data) === -1)) {
              if (typeof this.data[index].Default !== 'undefined') step[index] = this.data[index].Default;
              else step[index] = '';
            }
          }
        }
      }
      return step;
    },
    pop: function (O, number) {
      if (typeof O === 'undefined')return;
      var row = O['form_' + number];
      var cur = O['current'];
      var step = this.get(number);

      allPrposCb(step, function (obj2, index) {
        if (typeof row[index] !== 'undefined') {
          if (row[index] instanceof Date) {
            step[index] = tsf_date(row[index]);
          }
          else if (row[index] instanceof Array) {
            for (var i in row[index]) {
              if (row[index].hasOwnProperty(i)) step[index + i] = tsf_date(row[index][i]);
            }
            delete step[index];
          }
          else {
            step[index] = row[index];
          }
        }
      });

      step.pageNum = cur.pageNum;
      step.pageSize = cur.pageSize;
      step.draw = 0;

      return step;
    }
  };
  return Object.create(_form, autoValue({data: option}));
}          //核心 - 表单字段
function autoVue(data, methods, other) {
  function auto_data(option, prop) {
    var _data = {
      data: {},                 // 自定义值
      Default: {
        current: _current(),
        multiSelect: false,
        showLoading: false,
        pickerOption0: _pickerOptions(0),
        pickerOption10: _pickerOptions(10),
        pickerOption100: _pickerOptions(100),
        pickerOption110: _pickerOptions(110)
      },           // 默认值
      init: function () {
        var step = Object.create(null);
        var index = '';
        for (index in this.Default) {
          if (this.Default.hasOwnProperty(index)) {
            step[index] = this.Default[index];
          }
        }
        if (typeof prop !== 'undefined') for (index = 0; index < prop.length; index++) {
          step[prop[index].name] = prop[index].data;
        }
        for (index in this.data) {
          if (this.data.hasOwnProperty(index)) {
            step[index] = this.data[index];
          }
        }
        return function () {
          return step
        };
      }   // 值
    };
    return Object.create(_data, autoValue({data: option}));
  }

  function auto_methods(option, prop) {
    var _methods = {
      data: {},                 // 自定义值
      Default: {
        handleSizeChange: function (val) {
          this.current.pageSize = val;
          p[0].post((_option ? this.pop : this.option));
        },
        handleCurrentChange: function (val) {
          this.current.currentPage = val;
          p[0].post((_option ? this.pop : this.option));
        }
      },           // 默认值
      init: function () {
        var step = Object.create(null);
        var index = '';
        for (index in this.Default) {
          if (this.Default.hasOwnProperty(index)) {
            step[index] = this.Default[index];
          }
        }
        if (typeof prop !== 'undefined') for (index = 0; index < prop.length; index++) {
          step[prop[index].name] = prop[index].fun;
        }
        for (index in this.data) {
          if (this.data.hasOwnProperty(index)) {
            step[index] = this.data[index];
          }
        }
        return step;
      }   // 值
    };
    return Object.create(_methods, autoValue({data: option}));
  }

  var prop = [];
  for (var i = 3; i < arguments.length; i++) {
    prop.push(arguments[i])
  }
  _Vue = {
    data: auto_data(data, prop).init(),
    methods: auto_methods(methods, prop).init(),
    template: "",
    computed: {
      option: function () {
        return _form.pop(this, 2);
      },
      pop: function () {
        return _form.pop(this, 3);
      }
    },
    watch: {}
  };
  return Object.create(_Vue, autoValue(other));
} //核心 - 自动配置Vue
function ldd(label, data, Default) {
  var step = Object.create(null);
  step.label = label;
  step.data = data;
  step.Default = Default;
  return step;
}  //核心 - 表单 自动配置
function auto_dialog(option) {
  var _dialog = {
    name: '',
    data: {},                 // 自定义值
    Default: {
      dv: false,   //弹出层 控制
    },           // 默认值
    val: function () {
      if (this.name === '') return;
      var step = Object.create(null);
      var index = '';
      for (index in this.Default) {
        if (this.Default.hasOwnProperty(index)) {
          step[index] = this.Default[index];
        }
      }
      for (index in this.data) {
        if (this.data.hasOwnProperty(index)) {
          step[index] = this.data[index];
        }
      }
      return step;
    }, // 值
    fun: function (str, obj) {
    }
  };
  return Object.create(_dialog, autoValue(option));
}        //核心 - 新建弹出层

function _current() {
  return {
    draw: 1,

    pageNum: 1,
    pageSize: 10,

    pageSizes: [5, 10, 15, 20],
    currentTotal: 0
  };
}                 //基础类   -  分页查询
function _baseArehouses() {
  return window.dbmessage.baseArehouses;
}           //基础类   -  权限仓库

function autoValidate(option, cbs) {
  var validateRule = {
    vNumber: function (rule, value, callback) {
      if (isNaN(value)) {
        callback(new Error('必须为数字!'));
      } else {
        callback();
      }
    },                   //是   数字
    vNumberZ: function (rule, value, callback) {
      if (value < 0) {
        callback(new Error('必须为正数!'));
      } else {
        callback();
      }
    },                  //是   正数
    vNumberZZ: function (rule, value, callback) {
      if ((value + '').indexOf('.') !== -1) {
        callback(new Error('必须为正整数!'));
      } else {
        callback();
      }
    },                 //是   正整数

    vNull: function (rule, value, callback) {
      if (value === '') {
        callback(new Error('必填!'));
      } else {
        callback();
      }
    },                     //不是 空
    vNHZ: function (rule, value, callback) {
      var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (reg.test(value)) {
        callback(new Error('不能含有汉字!'));
      } else {
        callback();
      }
    },                      //不含有 汉字
    vNTS: function (rule, value, callback) {
      if ((new RegExp('((?=[\x21-\x7e\u4e00-\u9fa5\（\）\《\》\——\；\，\。\“\”\<\>\！、]+)[^A-Za-z0-9])', "g")).exec(value)) {
        return callback(new Error('不能含有特殊符号!'));
      }
      else {
        return callback();
      }
    },                      //不含有 特殊符号
    vN0Number: function (rule, value, callback) {
      if (value === 0) {
        callback(new Error('不能为0!'));
      } else {
        callback();
      }
    },                 //不是 数字0

    vWS4: function (rule, value, callback) {
      if ((value + '').length > 4) {
        return callback(new Error('必须小于4位!'));
      }
      else {
        return callback();
      }

    },                      //必须小于4位
    vWS16: function (rule, value, callback) {
      if ((value + '').length > 16) {
        return callback(new Error('必须小于16位!'));
      }
      else {
        return callback();
      }

    },                     //必须小于16位

    v_Car: function (rule, value, callback) {
      var reg = new RegExp("^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$", "g");
      if (!reg.test(value)) {
        return callback(new Error('必须为中国车牌号!'));
      }
      else {
        return callback();
      }

    },                     //必须为车牌号

    v$User1: function (rule, value, callback) {
      if ((value + '').length < 6 && (value + '').length != 0) {
        return callback(new Error('必须大于6位!或者不填写'));
      }
      else {
        return callback();
      }

    },                   //必须大于6位!或者不填写
  };

  // function autoValidateRule(string, model) {
  //     return function (rule, value, callback) {
  //         if ((new RegExp(string, "g")).exec(value)) {
  //             return callback(new Error(model));
  //         }
  //         else {
  //             return callback();
  //         }
  //     };
  // }

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

  /*autoValidate({
   pass:'',
   imsunhao:'vNull',
   name:['vNull','a']
   }, [
   function(rule, value, callback){
   console.log(123)
   }
   ]);*/

}  //核心-validate

function selectVC(ref, prop) {
  obj.$refs[ref].validateField(prop, function (valid) {
    return valid;
  });
}        //validate select 验证补丁

function autoIndexof(e, o, o2) {
  var i = 0;
  for (i = 0; i < o2.length; i++) {
    if (e === o2[i]) return true;
  }
  for (i = 0; i < o.length; i++) {
    if (e === o[i]) return false;
  }
  return true;
}

var _option = false;                      //查询切换 补丁
function selectReturn() {
  _option = false;
}             //查询切换 select 补丁
function _pickerOptions(number) {
  switch (number || 0) {
    case 0:      //pickerOption0     模糊查询 范围 周 月
      return {
        shortcuts: [{
          text: '最近一周',
          onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            selectReturn();
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            selectReturn();
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            selectReturn();
            picker.$emit('pick', [start, end]);
          }
        }],
        onPick: function (maxDate, minDate) {
          selectReturn();
        }
      };
    case 10:     //pickerOption11    模糊查询 精确 天
      return {
        shortcuts: [
          {
            text: '明天',
            onClick: function (picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          },
          {
            text: '今天',
            onClick: function (picker) {
              picker.$emit('pick', new Date());
            }
          },
          {
            text: '昨天',
            onClick: function (picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }
        ],
        onPick: function (maxDate, minDate) {
          selectReturn();
        }
      };
    case 100:     //pickerOption100  范围 周 月
      return {
        shortcuts: [{
          text: '最近一周',
          onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            selectReturn();
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            selectReturn();
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            selectReturn();
            picker.$emit('pick', [start, end]);
          }
        }]
      };
    case 110:     //pickerOption111  精确 天
      return {
        shortcuts: [
          {
            text: '明天',
            onClick: function (picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          },
          {
            text: '今天',
            onClick: function (picker) {
              picker.$emit('pick', new Date());
            }
          },
          {
            text: '昨天',
            onClick: function (picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }
        ]
      };
  }
}     //查询切换 picker 补丁

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
      if (body.kjW > 1367)
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
}    //生成 正确的头像路径

var homeTimer = 0;                        //timer 核心
var timer_span = {
  home: 30000,
  loopInventory: 10000,
  dynamicTouchInventory: 10000,
  comprehensiveInventory: 10000,
};                   //timer   配置文件

var ___datas = (function () {
//     function auto_color(index, key, value) {
//         return {
//             value: key,
//             name: value,
//             type: auto_Type(index),
// //            color: randomColor(key)
//         };
//     }
//
//     function randomColor(key) {
//         if (key < 6) return '';
//         else return '#' +
//             (function (color) {
//                 return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
//                 && (color.length === 6) ? color : arguments.callee(color);
//             })('');
//     }
//
//     function auto_Type(key) {
//         switch (key % 6) {
//             case 0:
//                 return '';
//             case 1:
//                 return 'gray';
//             case 2:
//                 return 'primary';
//             case 3:
//                 return 'success';
//             case 4:
//                 return 'warning';
//             case 5:
//                 return 'danger';
//         }
//
//     }
  return [
    // {
    //     id: 'rkType',
    //     name: '入库单据类型',
    //     data: [
    //         auto_color(2, 0, '杂入'),
    //         auto_color(2, 1, '事业部入库'),
    //         auto_color(2, 2, 'OEM收货单'),
    //         auto_color(2, 3, '成品调拨入库'),
    //         auto_color(2, 4, '成品调拨入库'),
    //         auto_color(2, 5, '成品调拨入库'),
    //         auto_color(2, 6, '成品调拨入库'),
    //         auto_color(2, 7, '成品调拨入库'),
    //         auto_color(2, 8, '成品调拨入库'),
    //         auto_color(2, 9, '成品调拨入库'),
    //     ]
    // },
    {
      id: 'rkZdfs',
      name: '制单方式',
      data: [
        {value: 1, name: '手动', type: 'success', color: ''},
        {value: 2, name: '导入', type: 'primary', color: ''},
        {value: 3, name: '接口', type: 'warning', color: ''}
      ]
    },
    {
      id: 'ckIsauto',
      name: '制单方式',
      data: [
        {value: 1, name: '手动', type: 'success', color: ''},
        {value: 2, name: '导入', type: 'primary', color: ''},
        {value: 3, name: '接口', type: 'warning', color: ''}
      ]
    },
    {
      id: 'rkStartwith',
      name: '操作方式',
      data: [
        {value: 0, name: '初始', type: 'success', color: ''},
        {value: 1, name: '电脑端', type: 'success', color: ''},
        {value: 2, name: 'PDA', type: 'primary', color: ''}
      ]
    },
    {
      id: 'ckStartwith',
      name: '操作方式',
      data: [
        {value: 0, name: '初始', type: 'success', color: ''},
        {value: 1, name: '电脑端', type: 'success', color: ''},
        {value: 2, name: 'PDA', type: 'primary', color: ''}
      ]
    },
    {
      id: 'rkStatus',
      name: '入库单据状态',
      data: [
        {value: 1, name: '原始', type: '', color: ''},
        {value: 21, name: '部分分配', type: 'gray', color: ''},
        {value: 22, name: '全部分配', type: 'primary', color: ''},
        {value: 31, name: '部分收货', type: 'success', color: ''},
        {value: 32, name: '全部收货', type: 'warning', color: ''},
        {value: 50, name: '作废', type: 'danger', color: ''},
      ]
    },
    {
      id: 'rk_status',
      name: '入库单据状态',
      data: [
        {value: 1, name: '原始', type: '', color: ''},
        {value: 21, name: '部分分配', type: 'gray', color: ''},
        {value: 22, name: '全部分配', type: 'primary', color: ''},
        {value: 31, name: '部分收货', type: 'success', color: ''},
        {value: 32, name: '全部收货', type: 'warning', color: ''},
        {value: 50, name: '作废', type: 'danger', color: ''},
      ]
    },
    {
      id: 'rksStatus',
      name: '入库明细据状态',
      data: [
        {value: 1, name: '初始', type: '', color: ''},
        {value: 21, name: '部分分配', type: 'gray', color: ''},
        {value: 22, name: '全部分配', type: 'primary', color: ''},
        {value: 31, name: '部分收货', type: 'success', color: ''},
        {value: 32, name: '全部收货', type: 'warning', color: ''},
        {value: 50, name: '作废', type: 'danger', color: ''},
      ]
    },


    {
      id: 'rkRwStatus',
      name: '入库任务状态',
      data: [
        {value: 1, name: '初始', type: '', color: ''},
        {value: 2, name: '已下发任务', type: 'gray', color: ''},
        {value: 3, name: '已开始收货', type: 'primary', color: ''},
        {value: 4, name: '收货中', type: 'gray', color: ''},
        {value: 51, name: '部分收货', type: 'warning', color: ''},
        {value: 52, name: '全部收货', type: 'warning', color: ''},
        {value: 61, name: '收货完成', type: 'success', color: ''},
        {value: 62, name: '欠货', type: 'danger', color: ''}
      ]
    },
    {
      id: 'ckCkdjType',
      name: '出库单据类型',
      data: [
        {value: 1, name: '挂起单据', type: 'danger', color: ''},
        {value: 2, name: '滞留单据', type: 'warning', color: ''},
        {value: 0, name: '正常单据', type: 'success', color: ''}
      ]
    },
    {
      id: 'ckStatus',
      name: '出库单据状态',
      data: [
        {value: 1, name: '原始状态', type: '', color: ''},
        {value: 21, name: '部分分拣', type: 'gray', color: ''},
        {value: 22, name: '部分下架', type: 'primary', color: ''},
        {value: 31, name: '全部分拣', type: 'success', color: ''},
        {value: 32, name: '全部下架', type: 'warning', color: ''},
        {value: 50, name: '作废', type: 'danger', color: ''},
      ]
    },
    {
      id: 'ckRwStatus',
      name: '出库任务状态',
      data: [
        {value: 10, name: '初始', type: '', color: ''},
        {value: 11, name: '已下发', type: 'gray', color: ''},
        {value: 21, name: '已挑选', type: 'primary', color: ''},
        {value: 31, name: '已激活', type: 'danger', color: ''},
        {value: 41, name: '部分出库', type: 'warning', color: ''},
        {value: 42, name: '全部出库', type: 'warning', color: ''},
        {value: 51, name: '部分发运', type: 'success', color: ''},
        {value: 52, name: '全部发运', type: 'success', color: ''}
      ]
    },
    {
      id: 'ckQhStatus',
      name: '欠货状态(出库欠货状态)',
      data: [
        {value: 1, name: '欠货', type: 'danger', color: ''},
        {value: 2, name: '未欠货', type: 'success', color: ''}
      ]
    },
    {
      id: 'cksQhStatus',
      name: '欠货状态(出库日报欠货状态)',
      data: [
        {value: 1, name: '全部欠货', type: 'danger', color: ''},
        {value: 2, name: '部分欠货', type: 'warning', color: ''},
        {value: 3, name: '未欠货', type: 'success', color: ''}
      ]
    },
    {
      id: 'cksQhStatuss',
      name: '欠货状态(整单欠货)',
      data: [
        {value: 1, name: '整单欠货', type: 'danger', color: ''},
        {value: 2, name: '部分欠货', type: 'warning', color: ''},
        {value: 3, name: '未欠货', type: 'success', color: ''}
      ]
    },


    {
      id: 'ckZlStatus',
      name: '滞留状态(出库滞留状态)',
      data: [
        {value: 1, name: '滞留', type: 'danger', color: ''},
        {value: 2, name: '未滞留', type: 'success', color: ''}
      ]
    },
    {
      id: 'cksZlStatus',
      name: '滞留状态(出库日报滞留状态)',
      data: [
        {value: 1, name: '未到车滞留', type: 'warning', color: ''},
        {value: 2, name: '到车滞留', type: 'danger', color: ''},
        {value: 3, name: '未滞留', type: 'success', color: ''}
      ]
    },
    {
      id: 'cksBfStatus',
      name: '补发状态',
      data: [
        {value: 0, name: '初始', type: 'gray', color: ''},
        {value: 1, name: '已赔付', type: 'warning', color: ''},
        {value: 2, name: '已补发', type: 'danger', color: ''},
        {value: 3, name: '需更进', type: 'success', color: ''}
      ]
    },

    {
      id: 'zyStatus',
      name: '转移状态',
      data: [
        {value: 0, name: '初始', type: 'warning', color: ''},
        {value: 1, name: '确认', type: 'danger', color: ''},
        {value: 2, name: '作废', type: 'success', color: ''}
      ]
    },
    {
      id: 'ckGqStatus',
      name: '挂起状态',
      data: [
        {value: 1, name: '未挂起', type: 'danger', color: ''},
        {value: 2, name: '已挂起', type: 'success', color: ''}
      ]
    },

    {
      id: 'djStatus',
      name: '冻结状态',
      data: [
        {value: 0, name: '冻结', type: 'warning', color: ''},
        {value: 1, name: '解冻', type: 'danger', color: ''},
        {value: 2, name: '作废', type: 'success', color: ''}
      ]
    },
    {
      id: 'pdType',
      name: '盘点类型',
      data: [
        {value: 0, name: '异动盘点', type: 'warning', color: ''},
        {value: 1, name: '货品盘点', type: 'danger', color: ''},
        {value: 2, name: '全仓盘点', type: 'success', color: ''},
        {value: 3, name: '库区盘点', type: 'primary', color: ''},
      ]
    },
    {
      id: 'pdStatus',
      name: '盘点状态',
      data: [
        {value: 0, name: '初始', type: 'warning', color: ''},
        {value: 1, name: '盘点确认', type: 'danger', color: ''},
        {value: 2, name: '作废', type: 'success', color: ''}
      ]
    },
    {
      id: 'pdDiffStatus',
      name: '差异状态',
      data: [
        {value: 0, name: '无差异', type: 'danger', color: ''},
        {value: 1, name: '有差异', type: 'success', color: ''}
      ]
    },
    {
      id: 'ruUserType',
      name: '用户类型',
      data: [
        {value: 0, name: '普通', type: 'warning', color: ''},
        {value: 1, name: '堆高车', type: 'danger', color: ''},
        {value: 2, name: '高位叉车', type: 'success', color: ''}
      ]
    },
    {
      id: 'bcStatus',
      name: '客户配置-状态',
      data: [
        {value: 0, name: '', type: 'danger', color: ''},
        {value: 1, name: '可用', type: 'success', color: ''}
      ]
    },
    {
      id: 'rrStatus',
      name: '角色管理-状态',
      data: [
        {value: 0, name: '禁用', type: 'danger', color: ''},
        {value: 1, name: '可用', type: 'success', color: ''}
      ]
    },
    {
      id: 'ruUserType',
      name: 'RF管理-类型',
      data: [
        {value: 0, name: '普通', type: 'warning', color: ''},
        {value: 1, name: '堆高车', type: 'danger', color: ''},
        {value: 2, name: '高位叉车', type: 'success', color: ''}
      ]
    },


    // {
    //     id: 'baArehouseId',
    //     name: '仓库id',
    //     data: (function () {
    //         var step = [];
    //         for (var i = 0; i < window.dbmessage.baseArehouses.length; i++) {
    //             step.push(auto_color(3, window.dbmessage.baseArehouses[i].baArehouseId, window.dbmessage.baseArehouses[i].baName))
    //         }
    //         return step;
    //     })()
    // },
  ]
})();     //全局 el_tag 配置 参数
function auto_el_tag(id, value) {
  for (var i in ___datas) {
    if (___datas[i].id === id) {
      for (var b in ___datas[i].data) {
        if (___datas[i].data[b].value === value) {
          return ___datas[i].data[b];
        }
      }
    }
  }
}     //自动适配 el-tag 标签
function config_table_height(num) {
  switch (num) {
    case 1:
      return document.body.clientHeight - 400;
    default:
      return document.body.clientHeight - 300;
  }
}

function detailsClose() {
  clearInterval(homeTimer);
  homeTimer = 0;
}

var imClear = false;