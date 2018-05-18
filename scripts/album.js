// Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };

 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 // Assignment Example Album
 var albumWaves = {
     title: 'Oceans',
     artist: 'Crashing Waves',
     label: 'Pop',
     year: '1991',
     albumArtUrl: 'assets/images/album_covers/10.png',
     songs: [
         { title: 'Seaside stroll', duration: '3:02' },
         { title: 'Footprints in the sand', duration: '4:01' },
         { title: 'Sand dollar', duration: '2:55'},
         { title: 'One more day', duration: '3:32' },
         { title: 'Sound of waves', duration: '4:08'}
     ]
 };

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
       var songNumber = $(this).attr('data-song-number');

       	if (currentlyPlayingSong !== null) {
       		var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
       		currentlyPlayingCell.html(currentlyPlayingSong);
       	}
       	if (currentlyPlayingSong !== songNumber) {
       		$(this).html(pauseButtonTemplate);
       		currentlyPlayingSong = songNumber;
       	} else if (currentlyPlayingSong === songNumber) {
       		$(this).html(playButtonTemplate);
       		currentlyPlayingSong = null;
       }
     };

     var onHover = function(event) {
       var songNumberCell = $(this).find('.song-item-number');
       var songNumber = songNumberCell.attr('data-song-number');
       if (songNumber !== currentlyPlayingSong) {
        songNumberCell.html(playButtonTemplate);
       }
     };
     var offHover = function(event) {
       var songNumberCell = $(this).find('.song-item-number');
       var songNumber = songNumberCell.attr('data-song-number');
       if (songNumber !== currentlyPlayingSong) {
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

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;


/*window.onload = function() {*/
$(document).ready(function() {
     setCurrentAlbum(albumPicasso);

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
