define(
[
'text!./order.html',
'css!./order.css',
'md5'
],
function(html){
	function render(){
	    $('#container').html(html);
	    bindEvent();
		addJian();
	}
	// 实现购物车样式变化
	function addJian(){
		$(".list").on("click",".list-icon",function(e){
			// 增加显示
			$(this).prev().prev().css("display", "inline-block");
			$(this).prev().css("display", "inline-block");
			$(".foot-num").css("display", "inline-block");
			// 获取数量
			num = $(".foot-num").text();
			count = $(this).prev().text();
			// 增加
			//if(count<=10){
			$(this).prev().html(++count);
			$(".foot-num").html(++num);
			var img = $(this).parent().parent().siblings('.img');
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
				// 注意,li序号是0,1,2,3
				top: $('footer ul li:eq(3)').offset().top,
				left: $('footer ul li:eq(3)').offset().left + $('footer ul li:eq(3)').width() / 2,
				width: 20,
				height: 32
			}, 'slow', function() {
				newBox.remove();
			});
			// }else{
			// 		alert("库存不足");
			// }

		})
		$(".list").on("click",".list-icon1",function(e){
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
		$('.list').on('click', '.list-icon', function(e) {
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
				array.push(id);
				localStorage.arr = array;
				localStorage.setItem(id, JSON.stringify({
					data: json,
					number: 1
				}));
			}
		});
		$(".list").on("click", ".list-icon1", function(e) {
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
					delete array;
	            	delete localStorage.arr;
				}
			}
		})
	}
	function getData(){
		//动态加载模板
		$(".list").load("template/bee-tmp2.html",function(){
			sendRequest("get","data/bee-Reserve.json",true,{},function(data){
				$(".list").html(baidu.template("reserve-list",data))
			})
		});
	}
	return {
	    render:render,
	    getData:getData
	}
})