import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ROUTES } from '../routes.js';
import { playClick } from '../utils/soundUtils.js';
import { animateClick } from '../utils/viewUtils.js';
import { bgmManager } from '../utils/bgmManager.js';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    bgmManager.ensurePlaying('/idraw/xiaoxingxing.mp3');
  }, []);

  const handleColoringMode = () => {
    playClick();
    navigate(`${ROUTES.CATEGORY}?coloring=true`);
  };

  const handleDrawingMode = () => {
    playClick();
    navigate(ROUTES.CATEGORY);
  };

  const handleSettings = (e) => {
    animateClick(e.currentTarget, () => {
      playClick();
      navigate(ROUTES.SETTINGS);
    });
  };

  return (
    <div className="home-page page-background">
      <div className="home-buttons">
        <button className="home-button home-button-coloring" onClick={handleColoringMode}>
          涂色乐园
        </button>
        <button className="home-button home-button-drawing" onClick={handleDrawingMode}>
          画画天地
        </button>
      </div>
      <button className="home-settings-button" onClick={handleSettings} aria-label="设置">
        <img src="/idraw/ic_settings.png" alt="设置" className="nav-icon-img" />
      </button>
    </div>
  );
}
