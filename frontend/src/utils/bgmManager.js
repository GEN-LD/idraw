import { settingsManager } from './settingsManager.js';

let bgmAudio = null;
let currentSrc = null;

function play(src) {
  const volume = settingsManager.getVolume() / 100;

  if (bgmAudio && currentSrc === src) {
    bgmAudio.volume = volume;
    if (bgmAudio.paused) {
      bgmAudio.play().catch(() => {});
    }
    return;
  }

  if (bgmAudio) {
    bgmAudio.pause();
    bgmAudio = null;
  }

  bgmAudio = new Audio(src);
  bgmAudio.loop = true;
  bgmAudio.volume = volume;
  currentSrc = src;
  bgmAudio.play().catch(() => {});
}

export const bgmManager = {
  ensurePlaying(src) {
    if (!settingsManager.isBgMusicEnabled()) return;
    play(src);
  },

  pause() {
    if (bgmAudio) {
      bgmAudio.pause();
    }
  },

  resume() {
    if (bgmAudio && settingsManager.isBgMusicEnabled()) {
      bgmAudio.volume = settingsManager.getVolume() / 100;
      bgmAudio.play().catch(() => {});
    }
  },

  updateVolume(volume) {
    if (bgmAudio) {
      bgmAudio.volume = Math.max(0, Math.min(1, volume / 100));
    }
  },

  isPlaying() {
    return bgmAudio && !bgmAudio.paused;
  },

  getCurrentSrc() {
    return currentSrc;
  },
};
