$(function(){
	$(".img1").on('click',function(){
		window.location.href="../../index.html#home";
		//后退是根据历史记录来的，刷新后就没有历史记录了，代码就失效了
		//所以需要直接跳转到bee.html
		// window.location.href=document.referrer;
	})
	$(".img2").on("click",function(){
		window.location.reload();
	})

	//动态加载模板 默认的
	$(".list1").load("../template/bee-tmp4.html",function(){
		// sendRequest("get","../data/bee-seckill.json",true,{},function(data){
		// 	$(".list1").html(baidu.template("list",data))
		// })
		//线上直接抓取
		sendRequest("get","http://www.vrserver.applinzi.com/aixianfeng/apimiaosha.php",true,{},function(data){
			$(".list1").html(baidu.template("list",data))
		})
	})
})