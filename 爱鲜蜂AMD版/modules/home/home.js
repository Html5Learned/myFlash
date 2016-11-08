define(
[
'text!./home.html',
'css!./home.css',
'./swiper.jquery.min.js',
'css!./swiper.min.css',
'md5'
],
function(html){
	function render(){
		$("footer").show();
		$('#container').html(html);
		bindEvent();
		addJian();
	}
	//动态加载模板
	function getData(){
		$(".hot-list-ul").load("template/bee-tmp1.html",function(){
			//首页鲜蜂热卖
			sendRequest("get","data/bee--hot.json",true,{},function(data){
				$(".hot-list-ul").html(baidu.template("hot-list",data));
				// addJian();
			})
		});
	};
	//实现购物车数字变化
	function addJian(){
		$(".hot-list-ul").on("click",".sock-icon",function(e){
		//当采用下面这种方法绑定事件时，会出现无法绑定问题
		//因为整个模板数据都是后面加上的
		//解决方法:1.直接在加号上绑定时，需要将函数加到加载的模板处
				// 2.使用事件委托，在html实际存在的外层绑定
		// $(".sock-icon").on("click", function(){
			// 增加显示
			$(this).prev().prev().css("display","inline-block");
			$(this).prev().css("display","inline-block");
			$(".foot-num").css("display","inline-block");
			// 获取数量
			num = $(".foot-num").text();
			count = $(this).prev().text();
			//if(count<=10){
				//将数字++和动画变化放在for循环内，这样点击时会都触发
			$(this).prev().html(++count);
			$(".foot-num").html(++num);
			var img = $(this).parent().parent().siblings('.shop1');
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
				// 小错，li是0123
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
		$(".hot-list-ul").on("click",".sock-icon1",function(e){
		// $(".sock-icon1").on("click", function(){
			var count1= $(this).next().text();
			var num1= $(".foot-num").text();
			// 实现减少
			$(this).next().html(count1-1);
			$(".foot-num").html(num1-1);
			// 更新数量
			count= $(this).next().text();
			num = $(".foot-num").text();
			// 判断是否隐藏
			if(count1==1){
				$(this).hide();
				$(this).next().hide();
			}
			if(num1==1){
				$(".foot-num").hide();
			}
		})
	}
	//图片轮播
	function swiper(){
		var mySwiper = new Swiper ('.swiper-container', {
		// direction: 'vertical',图片纵向
		//图片横向
		direction: 'horizontal',
		//图片自动播放
		// autoplay:1000,onAutoplayStop: function(swiper) {
  //           alert('事件触发了;');
  //         },
        autoplay:1000,onAutoplayStop: function(swiper) {
            swiper.startAutoplay();
          },
        //循环
		loop: true,
		//实现点击按钮切换图片
		paginationClickable: true,
		// 如果需要分页器
		pagination: '.swiper-pagination',
		// 如果需要前进后退按钮
		// nextButton: '.swiper-button-next',
		// prevButton: '.swiper-button-prev',
		// 如果需要滚动条
		// scrollbar: '.swiper-scrollbar',
		})
	}
	//点击搜索框/秒杀
	function clickEvent(){
		$(".header-icon").on("click",function(e){
			window.location.href="clickEvent/html/bee-search.html";
		})
		$(".secKill").on("click",function(e){
			window.location.href="clickEvent/html/bee-secKill.html";
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
		$(".hot-list-ul").on("click",".sock-icon",function(e){
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
			// console.log(json);
			// console.log(id)
			// console.log(value)
		});
		$(".hot-list-ul").on("click",".sock-icon1",function(e){
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
	return{
		render:render,
		getData:getData,
		swiper:swiper,
		clickEvent:clickEvent
	}
});