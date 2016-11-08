define(
[
'text!./cart.html',
'css!./cart.css',
'md5'
],
function(html){
	function render(){
	    $('#container').html(html);
	    addJian();
	    banEvent();
	    bindEvent();
	}
	//事件绑定事件
	function banEvent(){
		//判断缓存的数组是否存在
	    if(localStorage.arr){
	    	//切换购物车页面
		    $(".empty").hide();
		    $(".shop").show();
		    //split() 方法用于把一个字符串分割成字符串数组。
		    //"," 是以,为边界切割为数组
		    var array =localStorage.arr.split(",");
		    //拼接字符串
		    var str ="";
		    //计算总价问题
		    var toMoney=0;
		    //循环添加tr
		    for(var n=0;n<array.length;n++){
		   	var xhr =JSON.parse(JSON.parse(localStorage.getItem(array[n])).data);
		    str +=	'<tr id="'+array[n]+'">'+
			            '<td class="img1" style="width:5rem;height:3rem;background: url(images/056.png) no-repeat center;background-size: auto 2rem;" ></td>'+
			          	'<td class="img2" style="width:5rem;height:8rem;background:url('+xhr.img+') no-repeat center;background-size: auto 5rem;"></td>'+
			          	'<td class="cart-icon" style="width:71%">'+
			            	'<div>'+xhr.name+'</div>'+
			            	'<div>￥'+'<span class="onePrice" style="font-size:2rem;color:red">'+xhr.price+'</span>'+'</div>'+
				          	'<div class="cart-icon">'+
				            	'<i class="reduce"></i>'+
				            	'<span>'+JSON.parse(JSON.parse(localStorage.getItem(array[n])).number)+'</span>'+
				            	'<i class="add"></i>'+
				          	'</div>'+
		        		'<textarea style="display:none">'+JSON.parse(localStorage.getItem(array[n])).data+'</textarea>'+
			          	'</td>'+
		        	'</tr>'
		       	toMoney += xhr.price*JSON.parse(JSON.parse(localStorage.getItem(array[n])).number);
		    } 	
		    document.getElementsByClassName('tab')[0].innerHTML=str;
		   	document.getElementsByClassName("money")[0].innerHTML = parseFloat(toMoney).toFixed(1) ;
		}
	}
	//购物车样式加减
	function addJian(){
		$(".tab").on("click",".add",function(e){
			$(".foot-num").css("display","inline-block");
			// 获取实际数量
			var num = $(".foot-num").text();
			var count = $(this).prev().text();
			// 同步增加
			$(this).prev().html(++count);
			$(".foot-num").html(++num);
			//总价变化
			var sumPrice = parseFloat($(".money").text());
			var Price =parseFloat($(this).closest("tr").find('.onePrice').text());
			sumPrice += Price;
			$(".money").text(parseFloat(sumPrice).toFixed(1));
			//动画效果
			var img = $(this).parent().parent().siblings('.img2');
            var newBox = img.clone().appendTo(document.body);
            newBox.css({
                'z-index': 10,
                'border-radius':'50%',
                'display': 'block',
                'position': 'absolute',
                'top': img.offset().top +'px',
                'left': img.offset().left +'px',
                'width': img.width() +'px',
                'height': img.height() +'px'
            });
            newBox.animate({
                top:  $('footer ul li:eq(3)').offset().top,
                left:  $('footer ul li:eq(3)').offset().left+ $('footer ul li:eq(3)').width()/2,
                width: 20,
                height: 32
            }, 'slow', function() {
                newBox.remove();
            });
		})
		$(".tab").on("click",".reduce",function(e){
			//商品数量
			var count= $(this).next().text();
			//购物车里商品数量
			var num = $(".foot-num").text();
			//实现同步减少
			$(this).next().html(count-1);
			$(".foot-num").html(num-1);
			//总价变化
			var sumPrice = parseFloat($(".money").text());
			var Price =parseFloat($(this).closest("tr").find('.onePrice').text());
			sumPrice -= Price;
			$(".money").text(parseFloat(sumPrice).toFixed(1));
			//总价为0时，切换页面为空购物车
			if($(".money").text() == 0){
				$(".empty").show();
		    	$(".shop").hide();
			}
			//当购物车里商品数量到达1之后，再次点击购物车显示的数字消失
			if(num == 1){
				$(".foot-num").hide();
			}
			//当商品数量为1时，再点击时该商品框消失
			if(count == 1){
				$(this).parent().parent().parent().hide();
			}
		})
	}
	//购物车实现本地缓存
	function bindEvent() {
		//判断缓存数组是否为空
		if(localStorage.arr == null) return;
	    var array =localStorage.arr.split(",");	
	    //点击添加缓存    
		$(".tab").on("click",".add",function(e){
			// console.log(this);
			var parent = $(this).closest('tr');
			var json = parent.find('textarea').val();
			var id = parent.attr('id');
			var value = localStorage.getItem(id);
			if (value) {
				localStorage.setItem(id,JSON.stringify({
					data: json,
					number: JSON.parse(value).number + 1
				}));
			}
		});
		//点击减少缓存
		$(".tab").on("click",".reduce",function(e){
			var parent = $(this).closest('tr');
			var json = parent.find('textarea').val();
			var id = parent.attr('id');
			var value = localStorage.getItem(id);
			if (value) {
				localStorage.setItem(id,JSON.stringify({
					data: json,
					number: JSON.parse(value).number - 1
				}))
				if (JSON.parse(value).number - 1 == "0"){
		            // $("#"+id+"").remove();
	               	delete localStorage[id];
	              	if(parseInt(localStorage.num)!=0){
	              		//创建的放id的数组不等于0，进行
	               		for(var i =0;i<array.length;i++){
	                  		if(array[i] ==id){
	                    		array.splice(i,1);
	                  		}
                		}
               			localStorage.arr =array;
	              	}else{
	                	delete array;
	              		localStorage.arr = null
	                	// delete localStorage.arr;
	              	}
				}
			}
		})

	}
	// 点击//去逛逛
	function clickEvent(){
		$(".empty span").on("click",function(e){
			window.location.hash="index.html#home"
		})
	}
	return {
	    render:render,
	    clickEvent:clickEvent
	}

})