import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExcavatorColoring, ExcavatorModules, FireTruckColoring, FireTruckModules, PoliceCarColoring, PoliceCarModules, TrainColoring, TrainModules } from '../assets/coloring/index.js';
import { getSubjectById } from '../utils/subjectsRepository.js';
import { playClick } from '../utils/soundUtils.js';
import './ColoringPage.css';

const COLORS = [
  { hex: '#E63946', name: '热情红' },
  { hex: '#FF6B35', name: '活力橙' },
  { hex: '#FB8500', name: '南瓜橘' },
  { hex: '#FFD23F', name: '阳光黄' },
  { hex: '#FFB703', name: '蜂蜜金' },
  { hex: '#06D6A0', name: '青草绿' },
  { hex: '#588157', name: '森林绿' },
  { hex: '#4ECDC4', name: '湖水青' },
  { hex: '#219EBC', name: '天空蓝' },
  { hex: '#4361EE', name: '海洋蓝' },
  { hex: '#A2D2FF', name: '婴儿蓝' },
  { hex: '#7209B7', name: '神秘紫' },
  { hex: '#F72585', name: '樱花粉' },
  { hex: '#FFB4A2', name: '蜜桃粉' },
  { hex: '#8B5E3C', name: '巧克力' },
  { hex: '#2B2D42', name: '深夜黑' },
  { hex: '#6c757d', name: '水泥灰' },
  { hex: '#FFE5B4', name: '奶油色' },
  { hex: '#95D5B2', name: '薄荷绿' },
  { hex: '#FFFFFF', name: '橡皮擦' },
];

const SUBJECT_CONFIG = {
  excavator: {
    name: '挖掘机',
    Component: ExcavatorColoring,
    modules: ExcavatorModules,
  },
  fire_truck: {
    name: '消防车',
    Component: FireTruckColoring,
    modules: FireTruckModules,
  },
  police_car: {
    name: '警车',
    Component: PoliceCarColoring,
    modules: PoliceCarModules,
  },
  train: {
    name: '小火车',
    Component: TrainColoring,
    modules: TrainModules,
  },
};

export const COLORING_SUBJECTS = Object.keys(SUBJECT_CONFIG);

const CELEBRATION_COLORS = ['#FF6B35', '#FFD23F', '#06D6A0', '#4ECDC4', '#4361EE', '#F72585', '#7209B7'];

export default function ColoringPage() {
  const navigate = useNavigate();
  const { subject } = useParams();
  const config = SUBJECT_CONFIG[subject];

  const [moduleColors, setModuleColors] = useState({});
  const [selectedColor, setSelectedColor] = useState(COLORS[1]);
  const [toast, setToast] = useState({ msg: '', celebrate: false, show: false });
  const [celebrated, setCelebrated] = useState(false);
  const toastTimer = useRef(null);

  const totalModules = config?.modules?.length || 0;
  const paintedCount = useMemo(() => {
    let count = 0;
    for (const key of Object.keys(moduleColors)) {
      const c = moduleColors[key];
      if (c && c !== '#FFFFFF') count++;
    }
    return count;
  }, [moduleColors]);
  const progressPct = totalModules > 0 ? Math.round((paintedCount / totalModules) * 100) : 0;

  const showToast = useCallback((msg, celebrate = false) => {
    clearTimeout(toastTimer.current);
    setToast({ msg, celebrate, show: true });
    toastTimer.current = setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2500);
  }, []);

  const fireConfetti = useCallback(() => {
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'coloring-confetti';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.background = CELEBRATION_COLORS[Math.floor(Math.random() * CELEBRATION_COLORS.length)];
        el.style.transform = `rotate(${Math.random() * 360}deg)`;
        el.style.animation = `coloring-confetti-fall ${1.5 + Math.random() * 1.5}s linear forwards`;
        el.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3500);
      }, i * 30);
    }
  }, []);

  const handleModuleClick = useCallback((moduleId) => {
    setModuleColors((prev) => {
      const next = { ...prev, [moduleId]: selectedColor.hex };
      const count = Object.values(next).filter((c) => c && c !== '#FFFFFF').length;
      if (count === totalModules && !celebrated) {
        setCelebrated(true);
        showToast('太棒了！全部涂色完成！', true);
        fireConfetti();
      }
      return next;
    });
    playClick();
  }, [selectedColor, totalModules, celebrated, showToast, fireConfetti]);

  const handleEraser = useCallback(() => {
    setSelectedColor(COLORS[19]);
    showToast('橡皮擦已启用，点击模块即可擦除');
  }, [showToast]);

  const handleRandom = useCallback(() => {
    const pool = COLORS.filter((c) => c.hex !== '#FFFFFF' && c.hex !== '#2B2D42');
    setCelebrated(true);
    const newColors = {};
    config?.modules?.forEach((m, i) => {
      setTimeout(() => {
        const c = pool[Math.floor(Math.random() * pool.length)];
        setModuleColors((prev) => ({ ...prev, [m.id]: c.hex }));
      }, i * 50);
    });
    showToast('正在随机涂色...');
  }, [config?.modules, showToast]);

  const handleClear = useCallback(() => {
    setCelebrated(false);
    setModuleColors({});
    showToast('画布已清空，开始新的创作吧');
  }, [showToast]);

  const handleSave = useCallback(() => {
    const svg = document.querySelector('.coloring-svg');
    if (!svg) return;
    const clone = svg.cloneNode(true);
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('x', '0');
    bg.setAttribute('y', '0');
    bg.setAttribute('width', '900');
    bg.setAttribute('height', '600');
    bg.setAttribute('fill', '#FFFEF8');
    clone.insertBefore(bg, clone.firstChild);

    const svgData = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1800;
      canvas.height = 1200;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FFFEF8';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      canvas.toBlob((b) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(b);
        a.download = `我的${config?.name || '作品'}-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
        showToast('图片已保存到下载文件夹');
      }, 'image/png');
    };
    img.src = url;
  }, [config?.title, showToast]);

  const handleBack = useCallback(() => {
    const subj = getSubjectById(subject);
    const category = subj?.category || 'vehicle';
    navigate(`/subjects/${category}?coloring=true`);
  }, [navigate, subject]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'r' || e.key === 'R') handleRandom();
      if (e.key === 'e' || e.key === 'E') handleEraser();
      if (e.key === 'c' || e.key === 'C') handleClear();
      if ((e.key === 's' || e.key === 'S') && !e.ctrlKey && !e.metaKey) handleSave();
      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= 9) {
        setSelectedColor(COLORS[num - 1]);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handleRandom, handleEraser, handleClear, handleSave]);

  if (!config) {
    return (
      <div className="coloring-page">
        <div className="coloring-not-found">
          <p>该主题暂未开放涂色模式</p>
          <button className="coloring-btn coloring-btn-primary" onClick={handleBack}>返回</button>
        </div>
      </div>
    );
  }

  const { Component } = config;

  return (
    <div className="coloring-page">
      <header className="coloring-header">
        <button className="coloring-back-btn" onClick={handleBack} aria-label="返回">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="coloring-title-area">
          <div className="coloring-title-row">
            <div className="coloring-title-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 18h7m4 0h9" />
                <rect x="3" y="14" width="7" height="4" rx="1" />
                <path d="M10 14l3-7 4 2-2 5" />
                <path d="M15 14l3-5 3 2-1 5" />
              </svg>
            </div>
            <h1>涂色乐园 — {config.name}</h1>
          </div>
          <p className="coloring-subtitle">选一种颜色，点击{config.name}的零件给它穿上彩衣吧</p>
        </div>
      </header>

      <div className="coloring-main">
        <div className="coloring-canvas-area">
          <Component onModuleClick={handleModuleClick} moduleColors={moduleColors} />
        </div>

        <div className="coloring-toolbar">
          <div className="coloring-section">
            <h3>当前颜色</h3>
            <div className="coloring-current-color">
              <div className="coloring-current-chip" style={{ background: selectedColor.hex }} />
              <span className="coloring-current-label">{selectedColor.name}</span>
            </div>
          </div>

          <div className="coloring-section">
            <h3 className="coloring-section-title-yellow">调色板</h3>
            <div className="coloring-palette">
              {COLORS.map((c, i) => (
                <button
                  key={i}
                  className={`coloring-color-btn${selectedColor.hex === c.hex ? ' active' : ''}`}
                  style={{ '--c': c.hex }}
                  title={c.name}
                  aria-label={c.name}
                  onClick={() => { setSelectedColor(c); playClick(); }}
                />
              ))}
            </div>
          </div>

          <div className="coloring-section">
            <h3 className="coloring-section-title-cyan">完成度</h3>
            <div className="coloring-progress-bar">
              <div className="coloring-progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="coloring-progress-text">
              <span>已涂色 {paintedCount} / {totalModules}</span>
              <span>{progressPct}%</span>
            </div>
          </div>

          <div className="coloring-section">
            <h3 className="coloring-section-title-cyan">工具箱</h3>
            <div className="coloring-actions">
              <button className="coloring-btn" onClick={handleEraser}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20H7L3 16C2.5 15.5 2.5 14.5 3 14L13 4L20 11L11 20" /></svg>
                橡皮擦
              </button>
              <button className="coloring-btn coloring-btn-primary" onClick={handleRandom}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8" cy="8" r="1.5" fill="currentColor" /><circle cx="16" cy="16" r="1.5" fill="currentColor" /><circle cx="16" cy="8" r="1.5" fill="currentColor" /><circle cx="8" cy="16" r="1.5" fill="currentColor" /></svg>
                随机涂色
              </button>
              <button className="coloring-btn coloring-btn-warn" onClick={handleClear}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9" /><path d="M3 4v5h5" /></svg>
                清空
              </button>
              <button className="coloring-btn coloring-btn-secondary" onClick={handleSave}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                保存
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`coloring-toast${toast.show ? ' show' : ''}${toast.celebrate ? ' celebrate' : ''}`}>
        {toast.msg}
      </div>
    </div>
  );
}
