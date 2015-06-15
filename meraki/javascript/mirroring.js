$(document).ready(function () {
	var mirrorType = 0;
	mirrorNone();

	$(".grid").click(function(){
		iterateMirrorType();

		if ($(this).hasClass("top left")){
			mirrorNone();	
		}
		if ($(this).hasClass("top right")){
			mirrorVert();	
		}
		if ($(this).hasClass("bottom left")){
			mirrorHoriz();	
		}
		if ($(this).hasClass("bottom right")){
			mirrorQuad();	
		}
	});

	function mirrorNone(){
		if (mirrorType == 0) {
			reflect($(".grid"), 'none');
			$(".top.left").attr("src", getImagePath(0));
			$(".top.right").attr("src", getImagePath(1));
			$(".bottom.right").attr("src", getImagePath(2));
			$(".bottom.left").attr("src", getImagePath(3));
		}
		if (mirrorType == 1) {
			reflect($(".grid"), 'horizontally');
			$(".top.left").attr("src", getImagePath(1));
			$(".top.right").attr("src", getImagePath(0));
			$(".bottom.right").attr("src", getImagePath(3));
			$(".bottom.left").attr("src", getImagePath(2));
		}
		if (mirrorType == 2) {
			reflect($(".grid"), 'both');
			$(".top.left").attr("src", getImagePath(2));
			$(".top.right").attr("src", getImagePath(3));
			$(".bottom.right").attr("src", getImagePath(0));
			$(".bottom.left").attr("src", getImagePath(1));
		}
		if (mirrorType == 3) {
			reflect($(".grid"), 'vertically');
			$(".top.left").attr("src", getImagePath(3));
			$(".top.right").attr("src", getImagePath(2));
			$(".bottom.right").attr("src", getImagePath(1));
			$(".bottom.left").attr("src", getImagePath(0));
		}
	}

	function mirrorVert(){
		if (mirrorType == 0) {
			reflect($(".top"), 'vertically');
			reflect($(".bottom"), 'none');
			$(".left").attr("src", getImagePath(3));
			$(".right").attr("src", getImagePath(2));
		}
		if (mirrorType == 1) {
			reflect($(".top"), 'none');
			reflect($(".bottom"), 'vertically');
			$(".left").attr("src", getImagePath(0));
			$(".right").attr("src", getImagePath(1));
		}
		if (mirrorType == 2) {
			reflect($(".top"), 'horizontally');
			reflect($(".bottom"), 'both');
			$(".left").attr("src", getImagePath(1));
			$(".right").attr("src", getImagePath(0));
		}
		if (mirrorType == 3) {
			reflect($(".top"), 'both');
			reflect($(".bottom"), 'horizontally');
			$(".left").attr("src", getImagePath(2));
			$(".right").attr("src", getImagePath(3));
		}
	}

	function mirrorHoriz(){
		if (mirrorType == 0) {
			reflect($(".left"), 'vertically');
			reflect($(".right"), 'both');
			$(".top").attr("src", getImagePath(3));
			$(".bottom").attr("src", getImagePath(0));
		}
		if (mirrorType == 1) {
			reflect($(".left"), 'both');
			reflect($(".right"), 'vertically');
			$(".top").attr("src", getImagePath(2));
			$(".bottom").attr("src", getImagePath(1));
		}
		if (mirrorType == 2) {
			reflect($(".left"), 'horizontally');
			reflect($(".right"), 'none');
			$(".top").attr("src", getImagePath(1));
			$(".bottom").attr("src", getImagePath(2));
		}
		if (mirrorType == 3) {
			reflect($(".left"), 'none');
			reflect($(".right"), 'horizontally');
			$(".top").attr("src", getImagePath(0));
			$(".bottom").attr("src", getImagePath(3));
		}
	}

	function mirrorQuad(){
		if (mirrorType == 0) {
			reflect($(".top.left"), 'none');
			reflect($(".top.right"), 'horizontally');
			reflect($(".bottom.right"), 'both');
			reflect($(".bottom.left"), 'vertically');
		}
		if (mirrorType == 1) {
			reflect($(".top.left"), 'horizontally');
			reflect($(".top.right"), 'none');
			reflect($(".bottom.right"), 'vertically');
			reflect($(".bottom.left"), 'both');
		}
		if (mirrorType == 2) {
			reflect($(".top.left"), 'both');
			reflect($(".top.right"), 'vertically');
			reflect($(".bottom.right"), 'none');
			reflect($(".bottom.left"), 'horizontally');
		}
		if (mirrorType == 3) {
			reflect($(".top.left"), 'vertically');
			reflect($(".top.right"), 'both');
			reflect($(".bottom.right"), 'horizontally');
			reflect($(".bottom.left"), 'none');
		}
			$(".grid").attr("src", getImagePath(mirrorType));
	}

	function iterateMirrorType(){
		mirrorType ++;
		mirrorType = mirrorType % 4;
	}

	function getImagePath(corner) {;
		return imagePaths.cloud + corner + ".jpg";
	}

	function reflect(element, reflectType) {
		if (reflectType == 'horizontally') element.addClass('reflect-horiz').removeClass('reflect-vert');
		else if (reflectType == 'vertically') element.removeClass('reflect-horiz').addClass('reflect-vert');
		else if (reflectType == 'both') element.addClass('reflect-horiz').addClass('reflect-vert');
		else element.removeClass('reflect-horiz').removeClass('reflect-vert');
	}

});

var imagePaths = {
	cloud:"image/cloud/",
}