'use strict';
const TrackBar = (_ => {
  const trackBarEl = document.querySelector('.track-bar');
  const trackBarElFill = document.querySelector('.track-bar__fill');


  const state = {
    currentTrackTime: 0,
    fullTrackTime: 0,
    fillWidth: 0
  };
  const init = _ => {
    render();
  }
  const render = _ => {
    trackBarElFill.style.width = `${state.fillWidth}%`;
  };
  const getPercent = (current, full) => {
    return (current/full) * 100;
  }
  const setState = obj => {
    state.currentTrackTime = obj.currentTime;
    state.fullTrackTime = obj.duration;
    state.fillWidth = getPercent(state.currentTrackTime, state.fullTrackTime);
    render();
  }
  return {
    init,
    setState
  }
})();

export default TrackBar;