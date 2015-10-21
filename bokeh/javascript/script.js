$(document).ready(function () {
	
	albums.forEach(function(album){
		var numberOfImages = album.images.length;

		if (numberOfImages > 0) {
			AddAlbum(album);
		}
	});

});

function AddAlbum(album){
	var albumDiv = $('<div id="'+album.Name+'" class="album"></div>');
	albumDiv.append('<h2 class="album-title">'+album.Name+'</h2>')
	$('.albums').append(albumDiv);

	FillAlbum(albumDiv, album);
}

function FillAlbum(albumDiv, album){
	var numberOfImages = album.images.length;

	album.images.forEach(function(image, index){
		var imageDiv = '<img src="' + assetRoot + album.Name + "/" + image + '" class="image" style="z-index:'+ ( - 1 - index) +'"></img>';
		albumDiv.append(imageDiv);
	});
}

