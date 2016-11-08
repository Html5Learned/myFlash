//函数创建xhr对象
function createXhr() {
	if (typeof XMLHttpRequest != "undefined") {
		//IE6里面出现undefined直接报错
		return new XMLHttpRequest();
	} else if (typeof ActiveXObject != "undefined") {
		//低版本ie使用ActiveXObject(构造函数) 传参方式创建xhr对象，主要支持以下参数
		var strList = ["MSXML.XMLHttp.6.0", "MSXML.XMLHttp.3.0", "MSXML.XMLHttp"],
			tmp = "";
		//tmp代表缓冲变量
		for (var n in strList) {
			//异常处理，try中的代码出现异常会执行catch中的代码，而不会影响到外部后续代码执行
			try {
				new ActiveXObject(strList[n]);
				var tmp = strList[n];
				break;
			} catch (e) {
				//表示捕获到的异常对象
				//输出异常情况
				console.log(e);
			};
		};
		if (tmp = "") {
			//空就表示上面三种版本都不行
			console.log("您的浏览器目前不支持ajax请求");
		} else {
			return new ActiveXObject(tmp);
		}
	} else {
		console.log("您的浏览器目前不支持ajax请求");
	};
};
/*	
	封装公共请求函数
	type：get/post
	url：请求路径
	isSyn：true 异步，false	同步
	data：上送参数对象
	callback：回调函数
*/
function sendRequest(type, url, isSyn, data, callback) {
	//0.创建请求对象
	var xhr = new createXhr();
	//绑定readyState监听事件
	xhr.onreadystatechange = function() {
		if (xhr.status == "200" || xhr.status == "304") {
			if (xhr.readyState == "4") {
				//JSON:数据格式，可以转换成对象
				callback && callback(JSON.parse(xhr.responseText));
			};
		};
	};
	if (type == "get") {
		//?key1=value1&key2=value2
		url += "?";
		for (var n in data) {
			url += (n + "=" + data[n] + "&");
		}
		//console.log(newUrl);
		url = url.substr(0, url.length - 1)
	} else {
		data = JSON.stringify(data);
	}
	//1.请求对象初始化
	xhr.open(type, url, isSyn);
	//2.发送请求send 
	xhr.send(type == "get" ? null : data);
	//3.开始接受服务端数据
	//4.数据接受完毕	
};