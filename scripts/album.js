<<<<<<< HEAD
=======
var setSong = function(songNumber) {
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function(number) {
  return $('.song-item-number[data-song-number="' + number + '"]');
};

>>>>>>> assignment-32-jquery-next-and-previous-buttons
var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

     /*return template;
     return $(template);*/
     var $row = $(template);

     var clickHandler = function() {
       var songNumber = parseInt($(this).attr('data-song-number'));

       	if (currentlyPlayingSongNumber !== null) {
       		var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
       		currentlyPlayingCell.html(currentlyPlayingSongNumber);
       	}
       	if (currentlyPlayingSongNumber !== songNumber) {
       		$(this).html(pauseButtonTemplate);
       		/*currentlyPlayingSongNumber = songNumber;
          currentSongFromAlbum = currentAlbum.songs[songNumber - 1];*/
          setSong(songNumber);
          updatePlayerBarSong();
       	} else if (currentlyPlayingSongNumber === songNumber) {
       		$(this).html(playButtonTemplate);
          $('.main-controls .play-pause').html(playerBarPlayButton);
       		currentlyPlayingSongNumber = null;
          currentSongFromAlbum = null;
       }
     };

     var onHover = function(event) {
       var songNumberCell = $(this).find('.song-item-number');
       var songNumber = parseInt(songNumberCell.attr('data-song-number'));
       if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(playButtonTemplate);
       }
     };
     var offHover = function(event) {
       var songNumberCell = $(this).find('.song-item-number');
       var songNumber = parseInt(songNumberCell.attr('data-song-number'));
       if (songNumber !== currentlyPlayingSongNumber) {
         songNumberCell.html(songNumber);
       }
     };

     // #1
     $row.find('.song-item-number').click(clickHandler);
     // #2
     $row.hover(onHover, offHover);
     // #3
     return $row;
 };

 /*var albumTitle = document.getElementsByClassName('album-view-title')[0];
 var albumArtist = document.getElementsByClassName('album-view-artist')[0];
 var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
 var albumImage = document.getElementsByClassName('album-cover-art')[0];
 var albumSongList = document.getElementsByClassName('album-view-song-list')[0];*/

var $albumTitle = $('.album-view-title');
var $albumArtist = $('.album-view-artist');
var $albumReleaseInfo = $('.album-view-release-info');
var $albumImage = $('.album-cover-art');
var $albumSongList = $('.album-view-song-list');

var setCurrentAlbum = function(album) {
     currentAlbum = album;

     // #2
     /*albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);*/
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);

     // #3
     /*albumSongList.innerHTML = '';*/
     $albumSongList.empty();

     // #4
     for (var i = 0; i < album.songs.length; i++) {
         /*albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);*/
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
};

var nextSong = function() {
   //get index of the current song, increment the value of the index
   var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
   currentSongIndex++;
   //wraps back to first song
   if (currentSongIndex >= currentAlbum.songs.length) {
     currentSongIndex = 0;
   }
   //previous song number
   var lastSongNumber = currentlyPlayingSongNumber;
   //set a new current song
   currentlyPlayingSongNumber = currentSongIndex + 1;
   currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
   //update player bar to show new song
   updatePlayerBarSong();
   //update html of previous song's .song-item-number element with a songNumber
   var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
   var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
   //update the html of the new song's .song-item-number element with a pause button
   $nextSongNumberCell.html(pauseButtonTemplate);
   $lastSongNumberCell.html(lastSongNumber);

 };

 var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    var lastSongNumber = currentlyPlayingSongNumber;

    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

<<<<<<< HEAD
    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
=======
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
>>>>>>> assignment-32-jquery-next-and-previous-buttons

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

  /*var findParentByClassName = function(element, targetClass) {
     if (element) {
         var currentParent = element.parentElement;
         while (currentParent.className !== targetClass && currentParent.className !== null) {
             currentParent = currentParent.parentElement;
         }
         return currentParent;
     }
 };

 var getSongItem = function(element) {
     switch (element.className) {
         case 'album-song-button':
         case 'ion-play':
         case 'ion-pause':
             return findParentByClassName(element, 'song-item-number');
         case 'album-view-song-item':
             return element.querySelector('.song-item-number');
         case 'song-item-title':
         case 'song-item-duration':
             return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
         case 'song-item-number':
             return element;
         default:
             return;
     }
 };

var clickHandler = function(targetElement) {

  var songItem = getSongItem(targetElement);

  if (currentlyPlayingSong === null) {
      songItem.innerHTML = pauseButtonTemplate;
      currentlyPlayingSong = songItem.getAttribute('data-song-number');
  } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
      songItem.innerHTML = playButtonTemplate;
      currentlyPlayingSong = null;
  } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
      var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
      currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
      songItem.innerHTML = pauseButtonTemplate;
      currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }

};*/

/*var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');*/

var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing songs
/*var currentlyPlayingSong = null;*/
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

/*window.onload = function() {*/
$(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);

     /*songListContainer.addEventListener('mouseover', function(event) {
       if (event.target.parentElement.className === 'album-view-song-item') {
         event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
        }
     });*/

     /*for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
         });

         songRows[i].addEventListener('click', function(event) {
           clickHandler(event.target);
         });
     }*/

     var albums = [albumMarconi, albumWaves, albumPicasso];
     var i = 0;
     albumImage.addEventListener("click", function(event) {
       setCurrentAlbum(albums[i]); i++;
       if (i == albums.length) {
         i=0;
       }
     });
 });
