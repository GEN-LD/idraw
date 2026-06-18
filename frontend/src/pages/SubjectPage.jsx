import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../routes.js';
import { getSubjects, getCategoryTitle } from '../utils/subjectsRepository.js';
import * as icons from '../assets/icons/index.js';
import { playClick } from '../utils/soundUtils.js';
import { animateClick } from '../utils/viewUtils.js';
import './SubjectPage.css';

const SUBJECT_COLORS = [
  { bg: '#FCE4EC', stroke: '#F48FB1', text: '#C2185B' },
  { bg: '#E3F2FD', stroke: '#90CAF9', text: '#1565C0' },
  { bg: '#FFF8E1', stroke: '#FFE082', text: '#F57F17' },
  { bg: '#E8F5E9', stroke: '#A5D6A7', text: '#2E7D32' },
  { bg: '#F3E5F5', stroke: '#CE93D8', text: '#7B1FA2' },
  { bg: '#FBE9E7', stroke: '#FFAB91', text: '#E64A19' },
];

export default function SubjectPage() {
  const navigate = useNavigate();
  const { category } = useParams();
  const subjects = getSubjects(category);
  const title = getCategoryTitle(category);

  const handleBack = (e) => {
    animateClick(e.currentTarget, () => {
      playClick();
      navigate(ROUTES.CATEGORY);
    });
  };

  const handleSubjectClick = (subject) => {
    playClick();
    navigate(`${ROUTES.DRAWING}?subject=${subject.id}`);
  };

  return (
    <div className="subject-page">
      <header className="subject-header">
        <button className="icon-button" onClick={handleBack} aria-label="返回">
          <img src="/idraw/ic_back.png" alt="返回" className="nav-icon-img" />
        </button>
        <h1 className="subject-title">{title}</h1>
      </header>

      <div className="subject-grid">
        {subjects.map((subject, index) => {
          const IconComponent = icons[subject.icon];
          const colorSet = SUBJECT_COLORS[index % SUBJECT_COLORS.length];
          return (
            <button
              key={subject.id}
              className="subject-card"
              style={{
                backgroundColor: colorSet.bg,
                borderColor: colorSet.stroke,
                color: colorSet.text,
              }}
              onClick={() => handleSubjectClick(subject)}
            >
              <div className="subject-card-icon-wrapper">
                {IconComponent && <IconComponent className="subject-card-icon" />}
              </div>
              <span className="subject-card-name">{subject.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
