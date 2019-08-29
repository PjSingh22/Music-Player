'use strict';
import {
  songsList
} from '../data/songs.js';
const Playlist = (_ => {
  //cache the DOM
  const playlistEl = document.querySelector('.playlist');
  //data or state
  let songs = songsList;
  let currentlyPlayingIndex = 3;
  let currentSong = new Audio(songs[currentlyPlayingIndex].url);
  let isPlaying = false;

  currentSong.currentTime = 255;

  const init = _ => {
    render();
    listeners();
  };

  const changeAudioSource = _ => {
    currentSong.src = songs[currentlyPlayingIndex].url;
  }

  const togglePlayPause = _ => {
    return currentSong.paused ? currentSong.play() : currentSong.pause();
  }

  const mainPlay = clickedIndex => {
    if (currentlyPlayingIndex === clickedIndex) {
      //toggle play or pause
      console.log('same song clicked');
      togglePlayPause();
    } else {
      console.log('new song clicked');
      currentlyPlayingIndex = clickedIndex
      changeAudioSource();
      togglePlayPause();
    }
  };

  const playNext = _ => {
    if(songs[currentlyPlayingIndex + 1]) {
      currentlyPlayingIndex++;
      changeAudioSource();
      togglePlayPause();
      render(); 
    }
  }

  const listeners = _ => {
    playlistEl.addEventListener('click', event => {
      if (event.target && event.target.matches('.fa')) {
        const listElem = event.target.parentNode.parentNode;
        const listElemIndex = [...listElem.parentElement.children].indexOf(listElem);
        console.log(listElemIndex);
        mainPlay(listElemIndex);
        render();
      }
    });
    currentSong.addEventListener('ended', _ => {
      playNext();
    })
  }

  const render = _ => {
    let markup = '';

    const toggleIcon = itemIndex => {
      if (currentlyPlayingIndex === itemIndex) {
        return currentSong.paused ? 'fa-play' : 'fa-pause';
      } else {
        return 'fa-play';
      }
    }

    songs.forEach((songObj, index) => {
      markup += `
        <li class="playlist__song ${index === currentlyPlayingIndex ? 'playlist__song--active' : ""}">
          <div class="play-pause">
            <i class="fa ${toggleIcon(index)} pp-icon"></i>
          </div>
          <div class="playlist__song-details">
            <span class="playlist__song-name">${songObj.title}</span>
            <br>
            <span class="playlist__song-artist">${songObj.artist}</span>
          </div>
          <div class="playlist__song-duration">${songObj.time}</div>
        </li>
      `;
    });
    playlistEl.innerHTML = markup;
  };

  return {
    init
  };
})();

export default Playlist;


//NOTES: 
//for listeners function: console.log(listElem.parentElement.children) will show that the list is a HTML collection thus why we spread it into the two brackets (array) in order to find the indexOf since that method only works on arrays.