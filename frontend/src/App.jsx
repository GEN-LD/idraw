import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routes.js';
import HomePage from './pages/HomePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import SubjectPage from './pages/SubjectPage.jsx';
import DrawingPage from './pages/DrawingPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.CATEGORY} element={<CategoryPage />} />
        <Route path={ROUTES.SUBJECTS} element={<SubjectPage />} />
        <Route path={ROUTES.DRAWING} element={<DrawingPage />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
