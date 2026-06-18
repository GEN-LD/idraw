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
        <button className="icon-button" onClick={handleBack} aria-label="返回">
          <img src="/idraw/ic_back.png" alt="返回" className="nav-icon-img" />
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
