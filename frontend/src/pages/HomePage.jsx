import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes.js';
import { IcSettings } from '../assets/icons/index.js';
import { playClick } from '../utils/soundUtils.js';
import { animateClick, requestImmersiveOnce } from '../utils/viewUtils.js';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  const handleColoringMode = () => {
    requestImmersiveOnce();
    playClick();
    window.alert('涂色模式即将上线！');
  };

  const handleDrawingMode = () => {
    requestImmersiveOnce();
    playClick();
    navigate(ROUTES.CATEGORY);
  };

  const handleSettings = (e) => {
    animateClick(e.currentTarget, () => {
      requestImmersiveOnce();
      playClick();
      navigate(ROUTES.SETTINGS);
    });
  };

  return (
    <div className="home-page">
      <div className="home-buttons">
        <button className="home-button home-button-coloring" onClick={handleColoringMode}>
          涂色模式
        </button>
        <button className="home-button home-button-drawing" onClick={handleDrawingMode}>
          画画模式
        </button>
      </div>
      <button className="home-settings-button" onClick={handleSettings} aria-label="设置">
        <IcSettings className="icon" />
      </button>
    </div>
  );
}
