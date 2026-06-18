const PREFS_NAME = 'idraw_settings';
const KEY_BG_MUSIC = 'bg_music_enabled';
const KEY_SOUND_EFFECTS = 'sound_effects_enabled';
const KEY_VOLUME = 'volume';

function getStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readBool(key, defaultValue) {
  const storage = getStorage();
  if (!storage) return defaultValue;
  const value = storage.getItem(`${PREFS_NAME}.${key}`);
  if (value === null) return defaultValue;
  return value === 'true';
}

function writeBool(key, value) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(`${PREFS_NAME}.${key}`, value ? 'true' : 'false');
}

function readInt(key, defaultValue) {
  const storage = getStorage();
  if (!storage) return defaultValue;
  const value = storage.getItem(`${PREFS_NAME}.${key}`);
  if (value === null) return defaultValue;
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? defaultValue : parsed;
}

function writeInt(key, value) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(`${PREFS_NAME}.${key}`, String(value));
}

export const settingsManager = {
  isBgMusicEnabled() {
    return readBool(KEY_BG_MUSIC, true);
  },
  setBgMusicEnabled(enabled) {
    writeBool(KEY_BG_MUSIC, enabled);
  },
  isSoundEffectsEnabled() {
    return readBool(KEY_SOUND_EFFECTS, true);
  },
  setSoundEffectsEnabled(enabled) {
    writeBool(KEY_SOUND_EFFECTS, enabled);
  },
  getVolume() {
    const value = readInt(KEY_VOLUME, 70);
    return Math.max(0, Math.min(100, value));
  },
  setVolume(volume) {
    writeInt(KEY_VOLUME, Math.max(0, Math.min(100, volume)));
  },
};
