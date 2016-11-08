$(function(){
	$(".img1").on('click',function(){
		window.location.href="../../index.html#/mine";
		//后退是根据历史记录来的，刷新后就没有历史记录了，下列代码就失效了
		//所以需要直接跳转到bee-My.html
		// window.location.href=document.referrer;
	})
	$(".img2").on("click",function(){
		window.location.reload();
	})
})