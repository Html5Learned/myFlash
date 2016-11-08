$(function(){
	// 直接在img1里面写onclick="history.back(),可以做到从哪来回哪去
	// $(".img1").on('click',function(){
	// 	window.location.href=document.referrer;
	// })
	$(".seek").on("click",function(){
		$(this).parent().hide();
		$(this).parent().next("div").show();
	})
	$(".list").on("click",function(){
		$(this).parent().hide();
		$(this).parent().prev("div").show();
	})
})