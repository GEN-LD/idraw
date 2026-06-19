import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes.js';
import { playClick } from '../utils/soundUtils.js';
import { animateClick } from '../utils/viewUtils.js';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  const handleColoringMode = () => {
    playClick();
    window.alert('涂色模式即将上线！');
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
          涂色模式
        </button>
        <button className="home-button home-button-drawing" onClick={handleDrawingMode}>
          画画模式
        </button>
      </div>
      <button className="home-settings-button" onClick={handleSettings} aria-label="设置">
        <img src="/idraw/ic_settings.png" alt="设置" className="nav-icon-img" />
      </button>
    </div>
  );
}
