import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ROUTES } from '../routes.js';
import { getSubjects, getCategoryTitle } from '../utils/subjectsRepository.js';
import { COLORING_SUBJECTS } from './ColoringPage.jsx';
import { ExcavatorIcon, FireTruckIcon, PoliceCarIcon, TrainIcon, CraneIcon } from '../assets/subject-icons/index.js';
import { playClick } from '../utils/soundUtils.js';
import { animateClick } from '../utils/viewUtils.js';
import './SubjectPage.css';

const SUBJECT_COLORS = [
  { bg: 'linear-gradient(135deg, #A8E6CF, #7ECEC1)', shadow: '#5BA99A' },
  { bg: 'linear-gradient(135deg, #FFB8C6, #FF8BA7)', shadow: '#E0607A' },
  { bg: 'linear-gradient(135deg, #FFE066, #FFD666)', shadow: '#D4A017' },
  { bg: 'linear-gradient(135deg, #A2D2FF, #89CFF0)', shadow: '#5B9BD5' },
  { bg: 'linear-gradient(135deg, #D4A5FF, #C39BD3)', shadow: '#9B59B6' },
  { bg: 'linear-gradient(135deg, #FFB4A2, #FF8B6B)', shadow: '#E0604A' },
];

const SUBJECT_ICON_MAP = {
  excavator: ExcavatorIcon,
  fire_truck: FireTruckIcon,
  police_car: PoliceCarIcon,
  train: TrainIcon,
  crane: CraneIcon,
};

export default function SubjectPage() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const coloringMode = searchParams.get('coloring') === 'true';
  const coloringParam = coloringMode ? '&coloring=true' : '';
  const subjects = getSubjects(category);
  const title = getCategoryTitle(category);
  const decoRef = useRef(null);

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
      star.className = 'sp-star';
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
      h.className = 'sp-float-heart';
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
      flower.className = 'sp-flower';
      flower.style.left = `${8 + i * 15 + Math.random() * 5}%`;
      flower.style.bottom = `${10 + Math.random() * 15}px`;
      flower.style.setProperty('--delay', `${-Math.random() * 3}s`);
      const color = petalColors[i % petalColors.length];
      flower.innerHTML = `
        <div class="sp-flower-head">
          <span class="sp-flower-petal" style="background:${color}"></span>
          <span class="sp-flower-petal" style="background:${color}"></span>
          <span class="sp-flower-petal" style="background:${color}"></span>
          <span class="sp-flower-petal" style="background:${color}"></span>
          <span class="sp-flower-center"></span>
        </div>
        <div class="sp-flower-stem"></div>`;
      container.appendChild(flower);
    }
  }, []);

  const handleBack = (e) => {
    animateClick(e.currentTarget, () => {
      playClick();
      if (coloringMode) {
        navigate(`${ROUTES.CATEGORY}?coloring=true`);
      } else {
        navigate(ROUTES.CATEGORY);
      }
    });
  };

  const handleSubjectClick = (subject) => {
    playClick();
    if (coloringMode && COLORING_SUBJECTS.includes(subject.id)) {
      navigate(`/coloring/${subject.id}?coloring=true`);
    } else if (coloringMode) {
      navigate(`${ROUTES.DRAWING}?subject=${subject.id}${coloringParam}`);
    } else {
      navigate(`${ROUTES.DRAWING}?subject=${subject.id}${coloringParam}`);
    }
  };

  return (
    <div className="subject-page">
      <div className="sp-deco" ref={decoRef} />

      {/* 太阳 */}
      <div className="sp-sun">
        <div className="sp-sun-face">
          <span className="sp-sun-eye" />
          <span className="sp-sun-eye" />
          <span className="sp-sun-mouth" />
        </div>
      </div>

      {/* 云朵 */}
      <div className="sp-cloud sp-cloud-1" />
      <div className="sp-cloud sp-cloud-2" />
      <div className="sp-cloud sp-cloud-3" />
      <div className="sp-cloud sp-cloud-4" />

      {/* 草地 */}
      <div className="sp-ground">
        <div className="sp-ground-wave sp-ground-wave-1" />
        <div className="sp-ground-wave sp-ground-wave-2" />
        <div className="sp-ground-wave sp-ground-wave-3" />
      </div>

      <header className="sp-header">
        <button className="sp-back-btn" onClick={handleBack} aria-label="返回">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="sp-title">{title}</h1>
      </header>

      <div className="sp-grid">
        {subjects.map((subject, index) => {
          const colorSet = SUBJECT_COLORS[index % SUBJECT_COLORS.length];
          const IconComponent = SUBJECT_ICON_MAP[subject.id];
          return (
            <button
              key={subject.id}
              className="sp-card"
              style={{
                background: colorSet.bg,
                boxShadow: `0 6px 0 ${colorSet.shadow}, 0 10px 25px rgba(0,0,0,0.1)`,
              }}
              onClick={() => handleSubjectClick(subject)}
            >
              <div className="sp-card-icon-wrapper">
                {IconComponent ? (
                  <IconComponent className="sp-card-icon" />
                ) : (
                  <img
                    src={`/idraw/ic_subject_${subject.id}.png`}
                    alt={subject.name}
                    className="sp-card-icon"
                  />
                )}
              </div>
              <span className="sp-card-name">{subject.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
