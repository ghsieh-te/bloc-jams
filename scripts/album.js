var setSong = function(songNumber) {
  if (currentSoundFile) {
    currentSoundFile.stop();
  }
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    formats: [ 'mp3' ],
    preload: true
  });

  setVolume(currentVolume);
};

var seek = function(time) {
    if (currentSoundFile) {
        currentSoundFile.setTime(time);
    }
}

var setVolume = function(volume) {
  if (currentSoundFile) {
    currentSoundFile.setVolume(volume);
  }
};

var getSongNumberCell = function(number) {
  return $('.song-item-number[data-song-number="' + number + '"]');
};

var $mainControlPlayPause = $('.main-controls .play-pause');

var setCurrentTimeInPlayerBar = function(currentTime) {
  $('.seek-control .current-time').text(filterTimeCode(currentTime));
};

var setTotalTimeInPlayerBar = function(totalTime) {
  $('.seek-control .total-time').text(filterTimeCode(totalTime));
};

var filterTimeCode = function(timeInSeconds) {
  var roundedSeconds = Math.floor(Number.parseFloat(timeInSeconds));
  var minutes = Math.floor(roundedSeconds / 60);
  var remainingSeconds = (roundedSeconds % 60);

  if (remainingSeconds < 10) {
    remainingSeconds = '0' + remainingSeconds;
  }
  return minutes + ':' + remainingSeconds;
};

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
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
          currentSoundFile.play();
          updateSeekBarWhileSongPlays();

          var $volumeFill = $('.volume .fill');
          var $volumeThumb = $('.volume .thumb');
          $volumeFill.width(currentVolume + '%');
          $volumeThumb.css({left: currentVolume + '%'});

          updatePlayerBarSong();
       	} else if (currentlyPlayingSongNumber === songNumber) {
       		/*$(this).html(playButtonTemplate);
          $('.main-controls .play-pause').html(playerBarPlayButton);
       		currentlyPlayingSongNumber = null;
          currentSongFromAlbum = null;*/
          if(currentSoundFile.isPaused()) {
            $(this).html(pauseButtonTemplate);
            /*$('.main-controls .play-pause').html(playerBarPauseButton);*/
            $mainControlPlayPause.html(playerBarPauseButton)
            currentSoundFile.play();
          } else {
            $(this).html(playButtonTemplate);
            /*$('.main-controls .play-pause').html(playerBarPlayButton);*/
            $mainControlPlayPause.html(playerBarPlayButton)
            currentSoundFile.pause();
          }
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

 var updateSeekBarWhileSongPlays = function() {
     if (currentSoundFile) {
         // #10
         currentSoundFile.bind('timeupdate', function(event) {
             // #11
             var seekBarFillRatio = this.getTime() / this.getDuration();
             var $seekBar = $('.seek-control .seek-bar');

             updateSeekPercentage($seekBar, seekBarFillRatio);
             setCurrentTimeInPlayerBar(this.getTime());
             setTotalTimeInPlayerBar(this.getDuration());
         });

     }
 };

 var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
   var offsetXPercent = seekBarFillRatio * 100;
   // #1
   offsetXPercent = Math.max(0, offsetXPercent);
   offsetXPercent = Math.min(100, offsetXPercent);

   // #2
   var percentageString = offsetXPercent + '%';
   $seekBar.find('.fill').width(percentageString);
   $seekBar.find('.thumb').css({left: percentageString});
};

var setupSeekBars = function() {
    var $seekBars = $('.player-bar .seek-bar');

    $seekBars.click(function(event) {
        // #3
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        // #4
        var seekBarFillRatio = offsetX / barWidth;

        if ($(this).parent().attr('class') == 'seek-control') {
          seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
          setVolume(seekBarFillRatio * 100);
        }

        // #5
        updateSeekPercentage($(this), seekBarFillRatio);
    });
      // #7
      $seekBars.find('.thumb').mousedown(function(event) {
      // #8
      var $seekBar = $(this).parent();

      // #9
      $(document).bind('mousemove.thumb', function(event){
          var offsetX = event.pageX - $seekBar.offset().left;
          var barWidth = $seekBar.width();
          var seekBarFillRatio = offsetX / barWidth;

          if ($seekBar.parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());
          } else {
            setVolume(seekBarFillRatio);
          }

          updateSeekPercentage($seekBar, seekBarFillRatio);
      });

      // #10
      $(document).bind('mouseup.thumb', function() {
          $(document).unbind('mousemove.thumb');
          $(document).unbind('mouseup.thumb');
      });
  });
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
   /*currentlyPlayingSongNumber = currentSongIndex + 1;
   currentSongFromAlbum = currentAlbum.songs[currentSongIndex];*/
   setSong(currentSongIndex + 1);
   currentSoundFile.play();
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

    /*currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];*/
    setSong(currentSongIndex + 1);
    currentSoundFile.play();

    updatePlayerBarSong();

    /*$('.main-controls .play-pause').html(playerBarPauseButton);*/
    $mainControlPlayPause.html(playerBarPauseButton)

    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

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
    /*$('.main-controls .play-pause').html(playerBarPauseButton);*/
    $mainControlPlayPause.html(playerBarPlayButton);
    setTotalTimeInPlayerBar(filterTimeCode(currentSongFromAlbum.length));
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
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

var togglePlayFromPlayerBar = function() {
  var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
  //if song is paused and play button is clicked in the player bar
  if(currentSoundFile.isPaused()) {
    $(this).html(playerBarPauseButton);
    currentSoundFile.play();
    currentlyPlayingCell.html(pauseButtonTemplate);


  //change song number cell from a play button to a pause button
  //change html of the player bar's button to a pause button
  //play song
} else {
    $(this).html(playerBarPlayButton);
    currentSoundFile.pause();
    currentlyPlayingCell.html(playButtonTemplate);

  //if song is playing and pause button is clicked
  //change song number cell from pause button to a play button
  //change html of player bar's pause button to a play buttons
  //pause the song
  }
};
/*window.onload = function() {*/
$(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     setupSeekBars();
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
     $mainControlPlayPause.click(togglePlayFromPlayerBar);

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
     $albumImage.addEventListener("click", function(event) {
       setCurrentAlbum(albums[i]); i++;
       if (i == albums.length) {
         i=0;
       }
     });
 });
