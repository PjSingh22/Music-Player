'use strict';
import PlayList from './playlist.js';
const PlayInfo = (_ => {
  //cache the DOM
  const playerCountEl = document.querySelector('.player__count');
  const playerTriggerEl = document.querySelector('.player__trigger');

  const state = {
    songsLength: 0,
    isPlaying: false
  };
  const init = _ => {
    render();
    listeners();
  };
  const listeners = _ => {
    playerTriggerEl.addEventListener('click', () => {
      state.isPlaying = state.isPlaying ? false : true;
      render();
      PlayList.flip();

    })
  }
  const setState = obj => {
    state.songsLength = obj.songsLength;
    state.isPlaying = obj.isPlaying;
    render();
  }
  const render = _ => {
    playerCountEl.innerHTML =`${state.songsLength} SONGS`;
    playerTriggerEl.innerHTML = state.isPlaying ? 'Pause' : 'Play';
  };
  return {
    init,
    setState
  };
})();

export default PlayInfo;