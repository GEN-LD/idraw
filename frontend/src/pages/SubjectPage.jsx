import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../routes.js';
import { getSubjects, getCategoryTitle } from '../utils/subjectsRepository.js';
import * as icons from '../assets/icons/index.js';
import { IcBack } from '../assets/icons/index.js';
import './SubjectPage.css';

export default function SubjectPage() {
  const navigate = useNavigate();
  const { category } = useParams();
  const subjects = getSubjects(category);
  const title = getCategoryTitle(category);

  const handleSubjectClick = (subject) => {
    // 保持与 Android 一致：不传递线稿参数
    navigate(`${ROUTES.DRAWING}?subject=${subject.id}`);
  };

  return (
    <div className="subject-page">
      <header className="subject-header">
        <button
          className="icon-button"
          onClick={() => navigate(ROUTES.CATEGORY)}
          aria-label="返回"
        >
          <IcBack className="icon" />
        </button>
        <h1 className="subject-title">{title}</h1>
      </header>

      <div className="subject-grid">
        {subjects.map((subject) => {
          const IconComponent = icons[subject.icon];
          return (
            <button
              key={subject.id}
              className="subject-card"
              onClick={() => handleSubjectClick(subject)}
            >
              {IconComponent && <IconComponent className="subject-card-icon" />}
              <span className="subject-card-name">{subject.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
