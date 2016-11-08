define(
	[
		'text!./store.html',
		'css!./store.css',
		'md5'
	],
	function(html) {
		function render() {
			$('#container').html(html);
			bindEvent();
			addJian();
		}
		// 实现购物车样式变化
		function addJian() {
			$(".list1").on("click",".list-icon",function(e){
				// 增加显示
				$(this).prev().prev().css("display", "inline-block");
				$(this).prev().css("display", "inline-block");
				$(".foot-num").css("display", "inline-block");
				// 获取数量
				num = $(".foot-num").text();
				count = $(this).prev().text();
				// 增加
				//if(count<10){

				$(this).prev().html(++count);
				$(".foot-num").html(++num);
				var img = $(this).parent().parent().siblings('.list-img');
				var newBox = img.clone().appendTo(document.body);
				newBox.css({
					'z-index': 10,
					'border-radius': '50%',
					'display': 'block',
					'position': 'absolute',
					'top': img.offset().top + 'px',
					'left': img.offset().left + 'px',
					'width': img.width() + 'px',
					'height': img.height() + 'px'
				});
				newBox.animate({
					// 注意，li序号是0123
					top: $('footer ul li:eq(3)').offset().top,
					left: $('footer ul li:eq(3)').offset().left + $('footer ul li:eq(3)').width() / 2,
					width: 20,
					height: 32
				}, 'slow', function() {
					newBox.remove();
				});
					

				// }else{
				// 	alert("库存不足");
				// }
				
				

			})
			$(".list1").on("click",".list-icon1",function(e){
				var count1 = $(this).next().text();
				var num1 = $(".foot-num").text();
				// 实现减少
				$(this).next().html(count1 - 1);
				$(".foot-num").html(num1 - 1);
				// 更新数量
				count = $(this).next().text();
				num = $(".foot-num").text();
				// 判断是否隐藏
				if (count1 == 1) {
					$(this).hide();
					$(this).next().hide();
				}
				if (num1 == 1) {
					$(".foot-num").hide();
				}
			})
		}
		//本地缓存
		function bindEvent() {
			//购物车添加
			if (localStorage.arr) {
				var array = localStorage.arr.split(",")
			} else {
				var array = [];
			}
			$('.list1').on('click', '.list-icon', function(e) {
				// console.log(this);
				var parent = $(this).closest('li');
				var json = parent.find('textarea').val();
				var id = parent.attr('id');
				var value = localStorage.getItem(id);
				if (value) {
					localStorage.setItem(id, JSON.stringify({
						data: json,
						number: JSON.parse(value).number + 1
					}));
					// console.log(JSON.parse(localStorage.getItem(id)))
				} else {
					// pop()方法将删除arr的最后一个元素，
					//把数组长度减 1，并且返回它删除的元素的值。
					//如果数组已经为空，则 pop() 不改变数组，
					//并返回 undefined 值。
					array.push(id);
					localStorage.arr = array;
					localStorage.setItem(id, JSON.stringify({
						data: json,
						number: 1
					}));
				}
			});
			$(".list1").on("click", ".list-icon1", function(e) {
				var parent = $(this).closest('li');
				var json = parent.find('textarea').val();
				var id = parent.attr('id');
				var value = localStorage.getItem(id);
				if (value) {
					localStorage.setItem(id, JSON.stringify({
						data: json,
						number: JSON.parse(value).number - 1
					}))
					if (JSON.parse(value).number - 1 == "0") {
						delete localStorage[id]
              			array.pop(id);
              			// console.log(array);
              			localStorage.arr =array;
					}
				}
			})
		}
		//获得数据并切换
		function getData() {
			//动态加载模板 默认的
			$(".list1").load("template/bee-tmp3.html", function() {
					sendRequest("get", "data/bee-Supermarket--1.json", true, {}, function(data) {
						$(".list1").html(baidu.template("list", data));
						//事件绑定问题
						// 绑定事件的时候模块没加载上
						//在模板拼接的时候直接使用
						// addJian()
						//使用事件委托，在函数里找到页面本身上存在的，非动态添加的大的div或ul
						//通过操作里面的DOM节点可以绑定事件
					})
				})
				// 切换到热销榜
			$(".HOT1").on("click", function() {
					$(".list1").load("template/bee-tmp3.html", function() {
						sendRequest("get", "data/bee-Supermarket--1.json", true, {}, function(data) {
							$(".list1").html(baidu.template("list", data));
						})
					})
				})
				// 切换
			$(".HOT2").on("click", function() {
				$(".list1").load("template/bee-tmp3.html", function() {
					sendRequest("get", "data/bee-Supermarket--2.json", true, {}, function(data) {
						$(".list1").html(baidu.template("list", data));
					})
				})
			})
			$(".HOT3").on("click", function() {
				$(".list1").load("template/bee-tmp3.html", function() {
					sendRequest("get", "data/bee-Supermarket--3.json", true, {}, function(data) {
						$(".list1").html(baidu.template("list", data));
					})
				})
			})
			$(".HOT4").on("click", function() {
				$(".list1").load("template/bee-tmp3.html", function() {
					sendRequest("get", "data/bee-Supermarket--4.json", true, {}, function(data) {
						$(".list1").html(baidu.template("list", data));
					})
				})
			})
		}
		//点击搜索框/秒杀
		function clickEvent() {
			$(".header-icon").on("click", function(e) {
				window.location.href = "clickEvent/html/bee-search.html";
			})
		}
		return {
			render: render,
			getData: getData,
			clickEvent: clickEvent
		}

	})