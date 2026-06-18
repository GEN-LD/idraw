import { useNavigate } from 'react-router-dom';
import { ROUTES, getSubjectsPath } from '../routes.js';
import { IcBack, IcCategoryAnimal, IcCategoryVehicle, IcCategoryBlank } from '../assets/icons/index.js';
import { playClick } from '../utils/soundUtils.js';
import { animateClick, requestImmersiveOnce } from '../utils/viewUtils.js';
import './CategoryPage.css';

const categories = [
  {
    id: 'animal',
    title: '动物',
    icon: IcCategoryAnimal,
    bgColor: '#E8F5E9',
    strokeColor: '#A5D6A7',
    textColor: '#2E7D32',
    path: getSubjectsPath('animal'),
  },
  {
    id: 'vehicle',
    title: '交通工具',
    icon: IcCategoryVehicle,
    bgColor: '#E3F2FD',
    strokeColor: '#90CAF9',
    textColor: '#1565C0',
    path: getSubjectsPath('vehicle'),
  },
  {
    id: 'blank',
    title: '空白画布',
    icon: IcCategoryBlank,
    bgColor: '#FFF8E1',
    strokeColor: '#FFE082',
    textColor: '#F57F17',
    path: `${ROUTES.DRAWING}?blank=true`,
  },
];

export default function CategoryPage() {
  const navigate = useNavigate();

  const handleBack = (e) => {
    animateClick(e.currentTarget, () => {
      playClick();
      navigate(ROUTES.HOME);
    });
  };

  const handleCategoryClick = (path) => {
    requestImmersiveOnce();
    playClick();
    navigate(path);
  };

  return (
    <div className="category-page">
      <header className="category-header">
        <button className="icon-button" onClick={handleBack} aria-label="返回">
          <IcBack className="icon" />
        </button>
      </header>

      <div className="category-cards">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              className="category-card"
              style={{
                backgroundColor: category.bgColor,
                borderColor: category.strokeColor,
                color: category.textColor,
              }}
              onClick={() => handleCategoryClick(category.path)}
            >
              <div className="category-card-icon-wrapper">
                <Icon className="category-card-icon" />
              </div>
              <span className="category-card-title">{category.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
