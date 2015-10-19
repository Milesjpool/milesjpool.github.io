$(document).ready(function () {
	albums.forEach(function(album){
		var albumName = album.albumName;
		var albumRow = '<div id="'+album.albumName+'" class="album"></div>';
		$('.albums').append(albumRow);
		album.images.forEach(function(image){
			var path = "image/"+albumName+"/"+image;
			var imageDiv = '<img src="'+path+'" class="image"></img>';
			$('#'+albumName).append(imageDiv);
		});
	});
});

var albums = [
{albumName : "difference", images : ["1.png", "2.png", "3.png"]},
{albumName : "multiply", images : ["1.png", "2.png", "3.png"]}
];