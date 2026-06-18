import { useCallback, useState, useEffect } from 'react';
import { settingsManager } from '../utils/settingsManager.js';

export function useSettings() {
  const [bgMusicEnabled, setBgMusicEnabled] = useState(() => settingsManager.isBgMusicEnabled());
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(() => settingsManager.isSoundEffectsEnabled());
  const [volume, setVolume] = useState(() => settingsManager.getVolume());

  useEffect(() => {
    setBgMusicEnabled(settingsManager.isBgMusicEnabled());
    setSoundEffectsEnabled(settingsManager.isSoundEffectsEnabled());
    setVolume(settingsManager.getVolume());
  }, []);

  const updateBgMusic = useCallback((enabled) => {
    settingsManager.setBgMusicEnabled(enabled);
    setBgMusicEnabled(enabled);
  }, []);

  const updateSoundEffects = useCallback((enabled) => {
    settingsManager.setSoundEffectsEnabled(enabled);
    setSoundEffectsEnabled(enabled);
  }, []);

  const updateVolume = useCallback((value) => {
    const clamped = Math.max(0, Math.min(100, value));
    settingsManager.setVolume(clamped);
    setVolume(clamped);
  }, []);

  return {
    bgMusicEnabled,
    soundEffectsEnabled,
    volume,
    setBgMusicEnabled: updateBgMusic,
    setSoundEffectsEnabled: updateSoundEffects,
    setVolume: updateVolume,
  };
}
