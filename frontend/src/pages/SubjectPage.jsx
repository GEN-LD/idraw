import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../routes.js';
import { getSubjects, getCategoryTitle } from '../utils/subjectsRepository.js';
import { COLORING_SUBJECTS } from './ColoringPage.jsx';
import { ExcavatorIcon, FireTruckIcon, PoliceCarIcon, TrainIcon } from '../assets/subject-icons/index.js';
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

const SUBJECT_ICON_MAP = {
  excavator: ExcavatorIcon,
  fire_truck: FireTruckIcon,
  police_car: PoliceCarIcon,
  train: TrainIcon,
};

export default function SubjectPage() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const coloringMode = searchParams.get('coloring') === 'true';
  const coloringParam = coloringMode ? '&coloring=true' : '';
  const subjects = getSubjects(category);
  const title = getCategoryTitle(category);

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
    <div className="subject-page page-background">
      <header className="subject-header">
        <button className="icon-button" onClick={handleBack} aria-label="返回">
          <img src="/idraw/ic_back.png" alt="返回" className="nav-icon-img" />
        </button>
        <h1 className="subject-title">{title}</h1>
      </header>

      <div className="subject-grid">
        {subjects.map((subject, index) => {
          const colorSet = SUBJECT_COLORS[index % SUBJECT_COLORS.length];
          const IconComponent = SUBJECT_ICON_MAP[subject.id];
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
                {IconComponent ? (
                  <IconComponent className="subject-card-icon" />
                ) : (
                  <img
                    src={`/idraw/ic_subject_${subject.id}.png`}
                    alt={subject.name}
                    className="subject-card-icon"
                  />
                )}
              </div>
              <span className="subject-card-name">{subject.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
