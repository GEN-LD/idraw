import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ROUTES, getSubjectsPath } from '../routes.js';
import { IcCategoryAnimal, IcCategoryVehicle, IcCategoryBlank } from '../assets/icons/index.js';
import { playClick } from '../utils/soundUtils.js';
import { animateClick } from '../utils/viewUtils.js';
import { bgmManager } from '../utils/bgmManager.js';
import './CategoryPage.css';

const categories = [
  {
    id: 'animal',
    title: '动物',
    icon: IcCategoryAnimal,
    bgColor: 'linear-gradient(135deg, #A8E6CF, #7ECEC1)',
    shadowColor: '#5BA99A',
    path: getSubjectsPath('animal'),
  },
  {
    id: 'vehicle',
    title: '交通工具',
    icon: IcCategoryVehicle,
    bgColor: 'linear-gradient(135deg, #FFB8C6, #FF8BA7)',
    shadowColor: '#E0607A',
    path: getSubjectsPath('vehicle'),
  },
  {
    id: 'blank',
    title: '空白画布',
    icon: IcCategoryBlank,
    bgColor: 'linear-gradient(135deg, #FFE066, #FFD666)',
    shadowColor: '#D4A017',
    path: `${ROUTES.DRAWING}?blank=true`,
  },
];

export default function CategoryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const coloringMode = searchParams.get('coloring') === 'true';
  const visibleCategories = coloringMode ? categories.filter((c) => c.id !== 'blank') : categories;
  const decoRef = useRef(null);

  useEffect(() => {
    if (coloringMode) {
      bgmManager.ensurePlaying('/idraw/liangzhilaohu.mp3');
    } else {
      bgmManager.ensurePlaying('/idraw/niwawa.mp3');
    }
  }, [coloringMode]);

  useEffect(() => {
    const container = decoRef.current;
    if (!container) return;
    container.innerHTML = '';

    const starPositions = [
      { top: '6%', left: '12%' }, { top: '14%', left: '78%' },
      { top: '22%', left: '35%' }, { top: '8%', left: '55%' },
      { top: '18%', left: '90%' }, { top: '30%', left: '8%' },
      { top: '12%', left: '45%' }, { top: '26%', left: '68%' },
    ];
    starPositions.forEach((pos) => {
      const star = document.createElement('div');
      star.className = 'cp-star';
      star.style.top = pos.top;
      star.style.left = pos.left;
      star.style.setProperty('--dur', `${2.5 + Math.random() * 3}s`);
      star.style.setProperty('--delay', `${-Math.random() * 5}s`);
      star.style.fontSize = `${10 + Math.random() * 8}px`;
      container.appendChild(star);
    });

    const hearts = ['\u2665', '\u2661', '\u2764'];
    for (let i = 0; i < 8; i++) {
      const h = document.createElement('div');
      h.className = 'cp-float-heart';
      h.textContent = hearts[i % hearts.length];
      h.style.left = `${Math.random() * 90 + 5}%`;
      h.style.bottom = `${Math.random() * 30 + 5}%`;
      h.style.setProperty('--dur', `${5 + Math.random() * 5}s`);
      h.style.setProperty('--delay', `${-Math.random() * 10}s`);
      h.style.setProperty('--size', `${12 + Math.random() * 10}px`);
      container.appendChild(h);
    }

    const petalColors = ['#FF8BA7', '#FFB8C6', '#FFD666', '#89CFF0', '#DDA0DD'];
    for (let i = 0; i < 6; i++) {
      const flower = document.createElement('div');
      flower.className = 'cp-flower';
      flower.style.left = `${8 + i * 15 + Math.random() * 5}%`;
      flower.style.bottom = `${10 + Math.random() * 15}px`;
      flower.style.setProperty('--delay', `${-Math.random() * 3}s`);
      const color = petalColors[i % petalColors.length];
      flower.innerHTML = `
        <div class="cp-flower-head">
          <span class="cp-flower-petal" style="background:${color}"></span>
          <span class="cp-flower-petal" style="background:${color}"></span>
          <span class="cp-flower-petal" style="background:${color}"></span>
          <span class="cp-flower-petal" style="background:${color}"></span>
          <span class="cp-flower-center"></span>
        </div>
        <div class="cp-flower-stem"></div>`;
      container.appendChild(flower);
    }
  }, []);

  const handleBack = (e) => {
    animateClick(e.currentTarget, () => {
      playClick();
      navigate(ROUTES.HOME);
    });
  };

  const handleCategoryClick = (path) => {
    playClick();
    if (coloringMode) {
      if (path.startsWith(ROUTES.DRAWING)) {
        navigate(`${path}&coloring=true`);
      } else {
        navigate(`${path}?coloring=true`);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <div className="category-page">
      <div className="cp-deco" ref={decoRef} />

      {/* 太阳 */}
      <div className="cp-sun">
        <div className="cp-sun-face">
          <span className="cp-sun-eye" />
          <span className="cp-sun-eye" />
          <span className="cp-sun-mouth" />
        </div>
      </div>

      {/* 云朵 */}
      <div className="cp-cloud cp-cloud-1" />
      <div className="cp-cloud cp-cloud-2" />
      <div className="cp-cloud cp-cloud-3" />
      <div className="cp-cloud cp-cloud-4" />

      {/* 草地 */}
      <div className="cp-ground">
        <div className="cp-ground-wave cp-ground-wave-1" />
        <div className="cp-ground-wave cp-ground-wave-2" />
        <div className="cp-ground-wave cp-ground-wave-3" />
      </div>

      <header className="cp-header">
        <button className="cp-back-btn" onClick={handleBack} aria-label="返回">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      </header>

      <div className="cp-cards">
        {visibleCategories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              className="cp-card"
              style={{
                background: category.bgColor,
                boxShadow: `0 6px 0 ${category.shadowColor}, 0 10px 25px rgba(0,0,0,0.1)`,
              }}
              onClick={() => handleCategoryClick(category.path)}
            >
              <div className="cp-card-icon-wrapper">
                <Icon className="cp-card-icon" />
              </div>
              <span className="cp-card-title">{category.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
