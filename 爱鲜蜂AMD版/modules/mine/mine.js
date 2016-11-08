define(
[
'text!./mine.html',
'css!./mine.css'
],
function(html){
	function render(){
	    $('#container').html(html);
	}
	function clickEvent(){
		$(".order").on("click",function(e){
			window.location.href="clickEvent/html/bee-myOrder.html"
		})
		$(".EC").on("click",function(){
			window.location.href="clickEvent/html/bee-ECshop.html"
		})
	}
	return {
	    render:render,
	    clickEvent:clickEvent
	}
})