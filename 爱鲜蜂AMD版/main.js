require.config({
	paths:{
		'jquery':'lib/jquery',
		'backbone':'lib/backbone',
		'css':'lib/css',
		'text':'lib/text',
		'md5':'lib/md5',
		'underscore':'lib/underscore',
	}
})

require([
	'jquery',
	'backbone'],
	function($,backbone){
	//页脚图标变化
	loca();
	var Router = Backbone.Router.extend({
	  routes: {
	    "home":  "homeFun",   
	    "store": "storeFun",  
	    "order": "orderFun",
	    "cart":  "cartFun",
	    "mine":  "mineFun",
	    "wait":  "waitFun",
	    "*actions":"defaultAction"
	  },

	  homeFun: function() {
	   	require(['./modules/home/home.js','modules/home/swiper.jquery.min.js'],function(home){
	   		home.render();
	   		home.swiper();
	   		home.getData();
	   		home.clickEvent();
	   	})
	  },
	  storeFun: function() {
	    require(['./modules/store/store.js'],function(store){
	        store.render();
	        store.getData();
	        store.clickEvent();
	    })
	  },
	  orderFun: function() {
	    require(['./modules/order/order.js'],function(order){
	        order.render();
	        order.getData();
	    })
	  },
	  cartFun: function() {
	    require(['./modules/cart/cart.js'],function(cart){
	        cart.render();
	        cart.clickEvent();
	    })
	  },
	  mineFun: function() {
	    require(['./modules/mine/mine.js'],function(mine){
	        mine.render();
	       	mine.clickEvent();
	    })
	  },
	  waitFun: function(){
	  	require(['./modules/wait/wait.js'],function(wait){
	  		wait.render()
	  	})
	  },
	  defaultAction:function(){
	  	location.hash = 'wait';
	  }
	});

	var router = new Router();
	Backbone.history.start();
	
	$("footer a").on("click", function(){
		var target = $(this).find("p").html();
		switch(target){
			case "首页" :
				$("footer a").find("img").eq(0).attr("src","images/011.png");
				$("footer a").find("img").eq(1).attr("src","images/012.png");
				$("footer a").find("img").eq(2).attr("src","images/052.png");
				$("footer a").find("img").eq(3).attr("src","images/013.png");
				$("footer a").find("img").eq(4).attr("src","images/014.png");
				;break;
			case "闪送超市" :
				$("footer a").find("img").eq(0).attr("src","images/xx2.png");
				$("footer a").find("img").eq(1).attr("src","images/img1.jpg");
				$("footer a").find("img").eq(2).attr("src","images/052.png");
				$("footer a").find("img").eq(3).attr("src","images/013.png");
				$("footer a").find("img").eq(4).attr("src","images/014.png");
				;break;
			case "新鲜预定" :
				$("footer a").find("img").eq(0).attr("src","images/xx2.png");
				$("footer a").find("img").eq(1).attr("src","images/012.png");
				$("footer a").find("img").eq(2).attr("src","images/061.png");
				$("footer a").find("img").eq(3).attr("src","images/013.png");
				$("footer a").find("img").eq(4).attr("src","images/014.png");
				;break;
			case "购物车" :
				$("footer a").find("img").eq(0).attr("src","images/xx2.png");
				$("footer a").find("img").eq(1).attr("src","images/012.png");
				$("footer a").find("img").eq(2).attr("src","images/052.png");
				$("footer a").find("img").eq(3).attr("src","images/xx3.png");
				$("footer a").find("img").eq(4).attr("src","images/014.png");
				;break;
			case "我的" :
				$("footer a").find("img").eq(0).attr("src","images/xx2.png");
				$("footer a").find("img").eq(1).attr("src","images/012.png");
				$("footer a").find("img").eq(2).attr("src","images/052.png");
				$("footer a").find("img").eq(3).attr("src","images/013.png");
				$("footer a").find("img").eq(4).attr("src","images/xx4.png");
				;break;
		};
		$(this).find("img").addClass("an");
		$(this).parent().siblings("li").find("img").removeClass("an");
	})
	function loca(){
    if(location.hash=="#home"){
    	$("footer a").find("img").eq(0).attr("src","images/xx2.png");
    }else if(location.hash=="#store"){
      	$("footer a").find("img").eq(0).attr("src","images/xx2.png");
		$("footer a").find("img").eq(1).attr("src","images/img1.jpg");
		$("footer a").find("img").eq(2).attr("src","images/052.png");
		$("footer a").find("img").eq(3).attr("src","images/013.png");
		$("footer a").find("img").eq(4).attr("src","images/014.png");
    }else if(location.hash=="#order"){
     	$("footer a").find("img").eq(0).attr("src","images/xx2.png");
		$("footer a").find("img").eq(1).attr("src","images/012.png");
		$("footer a").find("img").eq(2).attr("src","images/061.png");
		$("footer a").find("img").eq(3).attr("src","images/013.png");
		$("footer a").find("img").eq(4).attr("src","images/014.png");
    }else if(location.hash=="#cart"){
      	$("footer a").find("img").eq(0).attr("src","images/xx2.png");
		$("footer a").find("img").eq(1).attr("src","images/012.png");
		$("footer a").find("img").eq(2).attr("src","images/052.png");
		$("footer a").find("img").eq(3).attr("src","images/xx3.png");
		$("footer a").find("img").eq(4).attr("src","images/014.png");
    }else if(location.hash =="#mine"){
      	$("footer a").find("img").eq(0).attr("src","images/xx2.png");
		$("footer a").find("img").eq(1).attr("src","images/012.png");
		$("footer a").find("img").eq(2).attr("src","images/052.png");
		$("footer a").find("img").eq(3).attr("src","images/013.png");
		$("footer a").find("img").eq(4).attr("src","images/xx4.png");
   	}
  }
})