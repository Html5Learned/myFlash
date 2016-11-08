define(
	[
	'text!./wait.html',
	'css!./wait.css'
	],
	function(html){
		function render(){
			$("footer").hide();
		    $('#container').html(html);
		    function delayer(){ 
				window.location.href="#home";
			}
			setTimeout(delayer, 3000);
		}

		return {
			render:render
		}
})