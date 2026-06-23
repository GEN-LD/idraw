import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes.js';
import { useSettings } from '../hooks/useSettings.js';
import { playClick } from '../utils/soundUtils.js';
import { animateClick } from '../utils/viewUtils.js';
import './SettingsPage.css';

export default function SettingsPage() {
  const navigate = useNavigate();
  const {
    bgMusicEnabled,
    soundEffectsEnabled,
    volume,
    setBgMusicEnabled,
    setSoundEffectsEnabled,
    setVolume,
  } = useSettings();

  const handleBack = (e) => {
    animateClick(e.currentTarget, () => {
      playClick();
      navigate(ROUTES.HOME);
    });
  };

  return (
    <div className="settings-page">
      <header className="settings-header">
        <button className="page-back-btn" onClick={handleBack} aria-label="返回">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="settings-title">设置</h1>
      </header>

      <div className="settings-card">
        <div className="settings-row">
          <span className="settings-label">背景音乐</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={bgMusicEnabled}
              onChange={(e) => setBgMusicEnabled(e.target.checked)}
            />
            <span className="switch-slider" />
          </label>
        </div>

        <div className="settings-row">
          <span className="settings-label">音效</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={soundEffectsEnabled}
              onChange={(e) => setSoundEffectsEnabled(e.target.checked)}
            />
            <span className="switch-slider" />
          </label>
        </div>

        <div className="settings-divider" />

        <div className="settings-volume">
          <span className="settings-label">音量</span>
          <input
            type="range"
            min={0}
            max={100}
            step={25}
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value, 10))}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
}
