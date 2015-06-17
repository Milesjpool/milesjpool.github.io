$(document).ready(function () {
	var rhoClicks = 0;

	$("#char-0").mouseover(function(){ bounce(this) });
	$("#char-2").click(function(){ swap() });
	$("#char-5").mouseover(function(){ drag(this) });

	$("img").mousedown(function(){ return false; });
	
	$("#pause").click(function(){
		$("#cloud-full-audio").each(function(){ 
			if (this.paused == false) {
				this.pause();
			} else {
				this.play();
			}
		});
	});

	function bounce(element){
		$('#char-0-Audio')[0].play();
		$(element).animate({ "top": "70%" }, 3700, function () {
			$(element).animate({ "top": "0%" }, 3400);
		});
	};

	function swap(){
		if (rhoClicks < vistaPattern.length) {
			for (i=0; i < 6; i++) {
				var $char = $("#char-"+i);
				if (vistaPattern[rhoClicks].indexOf(i) >= 0) $char.attr("src", vistasPaths[i]);
				else $char.attr("src", merakiPaths[i]);
			}
		};
		$('#char-2-Audio-' + (rhoClicks % 4))[0].play();
		rhoClicks ++;
	};

	function drag(element){
		$(function() {
			$(element).draggable({ 
				axis: "y",
				containment: "parent",
				scroll: false,
				stop: function() {
					$('#char-5-Audio')[0].play();
					$(this).animate({ "top": "0%" }, 3500);
				}
			});
		});
	};
});

var vistaPattern = [
[2],
[],
[4],
[],
[0,3],
[],
[0,2,4,5],
[],
[0, 3, 4],
[],
[0, 2, 3],
[1, 2, 5],
[0, 2, 3, 5],
[],
[0, 1, 3, 4, 5],
[],
[0,1,2,3,4,5],
[],
[0,1,2,3,4,5]
];

var merakiPaths = [
"image/meraki/m.png",
"image/meraki/e.png",
"image/meraki/r.png",
"image/meraki/a.png",
"image/meraki/k.png",
"image/meraki/i.png"
];

var vistasPaths = [
"image/vistas/v.png",
"image/vistas/i.png",
"image/vistas/s.png",
"image/vistas/t.png",
"image/vistas/a.png",
"image/vistas/s.png",
];