import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes.js';
import { IcSettings } from '../assets/icons/index.js';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  const handleColoringMode = () => {
    window.alert('涂色模式即将上线！');
  };

  return (
    <div className="home-page">
      <div className="home-buttons">
        <button
          className="home-button home-button-coloring"
          onClick={handleColoringMode}
        >
          涂色模式
        </button>
        <button
          className="home-button home-button-drawing"
          onClick={() => navigate(ROUTES.CATEGORY)}
        >
          画画模式
        </button>
      </div>

      <button
        className="home-settings-button"
        onClick={() => navigate(ROUTES.SETTINGS)}
        aria-label="设置"
      >
        <IcSettings className="icon" />
      </button>
    </div>
  );
}
