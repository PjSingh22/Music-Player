'use strict';
import {
  songsList
} from '../data/songs.js';
const Playlist = (_ => {
  //cache the DOM
  const playlistEl = document.querySelector('.playlist');
  //data or state
  let songs = songsList;
  let currentlyPlayingIndex = 0;
  let currentSong = new Audio(songs[currentlyPlayingIndex].url);
  let isPlaying = false;

  const init = _ => {
    render();
  };

  const render = _ => {
    let markup = '';
    songs.forEach((songObj, index) => {
      markup += `
        <li class="playlist__song">
          <div class="play-pause">
            <i class="fa fa-play pp-icon"></i>
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