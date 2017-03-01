//封装的 ajax 网络请求函数
//obj 是一个对象
function Ajax(obj){
	if (obj.dataType == "jsonp") {
		//在这里callBack必须是全局变量，保证函数消失的时候这个变量不可以被销毁
		//处理一下函数名 （防止多个网络请求，创建多个函数名字相同，出现紊乱的情况）
		var name = "callBack" + "_" + new Date().getTime() + "_" + String(Math.random()).replace(".","");
		window[name] = obj.success
		//或者加给window对象  window["callBack"] = obj.success;
		//创建script标签
		var sc = document.createElement("script");
		sc.src = obj.url + "?" + "cb=" + name;
		document.body.appendChild(sc);
		return;

	}

	var ajaxObj = null;
	if (window.XMLHttpRequest) {
		ajaxObj = new XMLHttpRequest();
	}else{
		ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//设置请求类型  toUpperCase()转化为大写
	obj.type = obj.type.toUpperCase() || "GET";

	//如果是 get 请求 并且需要传递参数则需要给 url 后面拼接参数
	if (obj.type == "GET") {
		var arr = []; // 定义数组，用于把对象存储到数据里面
		for (var key in obj.data) {
			arr.push(key + "=" + obj.data[key]);
		}
		//用&分隔数组，让其转化为类型： name=xxx&age=24 的形式
		var str = arr.join("&");

		obj.url = obj.url + "?" + str;
		//拨号
		ajaxObj.open(obj.type,obj.url,true);
		//发送
		ajaxObj.send();
	}else{
		//post 发送
		var arr = []; // 定义数组，用于把对象存储到数据里面
		for (var key in obj.data) {
			arr.push(key + "=" + obj.data[key]);
		}
		//用&分隔数组，让其转化为类型： name=xxx&age=24 的形式
		var str = arr.join("&");
		//拨号
		ajaxObj.open(obj.type,obj.url,true);
    		ajaxObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		//发送
		ajaxObj.send(str);
	}

	//监听
	ajaxObj.onreadystatechange = function(){
		if (ajaxObj.readyState == 4) {
			//发送成功
			if (ajaxObj.status >= 200 && ajaxObj.status < 300 || ajaxObj.status == 304) {
				//请求成功
				obj.success(ajaxObj.responseText);
			}else{
				//请求失败
				obj.error(ajaxObj.status);
			}
		}
	}
}
