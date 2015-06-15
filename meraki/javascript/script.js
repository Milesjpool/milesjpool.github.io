$(document).ready(function () {
	$(".animated").mouseover(function(){
		//bounce(this)
		if ($(this).attr('id') == 'mu') bounce(this);
		//if ($(this).attr('id') == 'alpha') shake(this);
		if ($(this).attr('id') == 'iota') drag(this);
	});

	$("img").mousedown(function(){
    	return false;
	});

	function bounce(element){
		$('#muAudio')[0].play();
		$(element).animate({ "top": "70%" }, 1000, function () {
			$(element).animate({ "top": "0%" }, 1000);
		});
	};

	function spin(element){
	};

	function shake(element){
	};

	function drag(element){
		$(function() {
			$(element).draggable({ 
				axis: "y",
				containment: "parent",
				scroll: false,
				stop: function() {
					$(this).animate({ "top": "0%" }, 1000);
				}
			});
		});
	};
});
