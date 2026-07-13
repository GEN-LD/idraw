import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useLayoutEffect, useRef, useState } from 'react';
import { ROUTES } from './routes.js';
import HomePage from './pages/HomePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import SubjectPage from './pages/SubjectPage.jsx';
import DrawingPage from './pages/DrawingPage.jsx';
import ColoringPage from './pages/ColoringPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

const TRANSITION_MS = 1000;

function getTransitionType(fromPath, toPath) {
  const fromSubj = fromPath.startsWith('/subjects');
  const toSubj = toPath.startsWith('/subjects');
  const fromLeaf = fromPath.startsWith('/coloring') || fromPath === '/draw';
  const toLeaf = toPath.startsWith('/coloring') || toPath === '/draw';
  if (fromSubj && toLeaf) return 'forward';
  if (fromLeaf && toSubj) return 'back';
  return 'none';
}

function AppRoutes({ loc }) {
  return (
    <Routes location={loc}>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.CATEGORY} element={<CategoryPage />} />
      <Route path={ROUTES.SUBJECTS} element={<SubjectPage />} />
      <Route path={ROUTES.DRAWING} element={<DrawingPage />} />
      <Route path={ROUTES.COLORING} element={<ColoringPage />} />
      <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const [layers, setLayers] = useState([{ loc: location, anim: 'static', key: location.key }]);
  const prevLocRef = useRef(location);
  const timerRef = useRef(null);

  useLayoutEffect(() => {
    const prev = prevLocRef.current;
    if (location === prev) return;
    prevLocRef.current = location;
    clearTimeout(timerRef.current);

    const type = getTransitionType(prev.pathname, location.pathname);
    if (type === 'forward') {
      setLayers([
        { loc: prev, anim: 'static', key: prev.key },
        { loc: location, anim: 'slide-in', key: location.key },
      ]);
      timerRef.current = setTimeout(() => {
        setLayers([{ loc: location, anim: 'static', key: location.key }]);
      }, TRANSITION_MS);
    } else if (type === 'back') {
      setLayers([
        { loc: location, anim: 'static', key: location.key },
        { loc: prev, anim: 'slide-out', key: prev.key },
      ]);
      timerRef.current = setTimeout(() => {
        setLayers([{ loc: location, anim: 'static', key: location.key }]);
      }, TRANSITION_MS);
    } else {
      setLayers([{ loc: location, anim: 'static', key: location.key }]);
    }

    return () => clearTimeout(timerRef.current);
  }, [location]);

  return (
    <div className={`route-stack${layers.length > 1 ? ' transitioning' : ''}`}>
      {layers.map((layer) => (
        <div key={layer.key} className={`route-layer ${layer.anim}`}>
          <AppRoutes loc={layer.loc} />
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  );
}

export default App;
