let audioContext = null;
let clickBuffer = null;
let loading = false;

async function ensureAudioContext() {
  if (audioContext && clickBuffer) return true;
  if (loading) return false;
  loading = true;
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const response = await fetch('/idraw/sound_click.wav');
    const arrayBuffer = await response.arrayBuffer();
    clickBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return true;
  } catch (e) {
    console.warn('soundUtils: failed to init audio', e);
    return false;
  } finally {
    loading = false;
  }
}

export async function playClick() {
  const { settingsManager } = await import('./settingsManager.js');
  if (!settingsManager.isSoundEffectsEnabled()) return;

  const ok = await ensureAudioContext();
  if (!ok || !audioContext || !clickBuffer) return;

  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }

  const volume = settingsManager.getVolume() / 100;
  const source = audioContext.createBufferSource();
  source.buffer = clickBuffer;
  const gain = audioContext.createGain();
  gain.gain.value = volume;
  source.connect(gain);
  gain.connect(audioContext.destination);
  source.start(0);
}
