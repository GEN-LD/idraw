import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ROUTES } from '../routes.js';
import { playClick } from '../utils/soundUtils.js';
import { animateClick } from '../utils/viewUtils.js';
import { bgmManager } from '../utils/bgmManager.js';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const decoRef = useRef(null);

  useEffect(() => {
    bgmManager.ensurePlaying('/idraw/xiaoxingxing.mp3');
  }, []);

  useEffect(() => {
    const container = decoRef.current;
    if (!container) return;
    container.innerHTML = '';

    /* 星星 */
    const starPositions = [
      { top: '6%', left: '12%' }, { top: '14%', left: '78%' },
      { top: '22%', left: '35%' }, { top: '8%', left: '55%' },
      { top: '18%', left: '90%' }, { top: '30%', left: '8%' },
      { top: '12%', left: '45%' }, { top: '26%', left: '68%' },
    ];
    starPositions.forEach((pos) => {
      const star = document.createElement('div');
      star.className = 'hp-star';
      star.style.top = pos.top;
      star.style.left = pos.left;
      star.style.setProperty('--dur', `${2.5 + Math.random() * 3}s`);
      star.style.setProperty('--delay', `${-Math.random() * 5}s`);
      star.style.fontSize = `${10 + Math.random() * 8}px`;
      container.appendChild(star);
    });

    /* 飘浮爱心 */
    const hearts = ['\u2665', '\u2661', '\u2764'];
    for (let i = 0; i < 10; i++) {
      const h = document.createElement('div');
      h.className = 'hp-float-heart';
      h.textContent = hearts[i % hearts.length];
      h.style.left = `${Math.random() * 90 + 5}%`;
      h.style.bottom = `${Math.random() * 30 + 5}%`;
      h.style.setProperty('--dur', `${5 + Math.random() * 5}s`);
      h.style.setProperty('--delay', `${-Math.random() * 10}s`);
      h.style.setProperty('--size', `${12 + Math.random() * 10}px`);
      container.appendChild(h);
    }

    /* 小花 */
    const petalColors = ['#FF8BA7', '#FFB8C6', '#FFD666', '#89CFF0', '#DDA0DD'];
    for (let i = 0; i < 7; i++) {
      const flower = document.createElement('div');
      flower.className = 'hp-flower';
      flower.style.left = `${8 + i * 13 + Math.random() * 5}%`;
      flower.style.bottom = `${10 + Math.random() * 15}px`;
      flower.style.setProperty('--delay', `${-Math.random() * 3}s`);
      const color = petalColors[i % petalColors.length];
      flower.innerHTML = `
        <div class="hp-flower-head">
          <span class="hp-flower-petal" style="background:${color}"></span>
          <span class="hp-flower-petal" style="background:${color}"></span>
          <span class="hp-flower-petal" style="background:${color}"></span>
          <span class="hp-flower-petal" style="background:${color}"></span>
          <span class="hp-flower-center"></span>
        </div>
        <div class="hp-flower-stem"></div>`;
      container.appendChild(flower);
    }
  }, []);

  const handleColoringMode = () => {
    playClick();
    navigate(`${ROUTES.CATEGORY}?coloring=true`);
  };

  const handleDrawingMode = () => {
    playClick();
    navigate(ROUTES.CATEGORY);
  };

  const handleSettings = (e) => {
    animateClick(e.currentTarget, () => {
      playClick();
      navigate(ROUTES.SETTINGS);
    });
  };

  return (
    <div className="home-page">
      <div className="hp-deco" ref={decoRef} />

      {/* 太阳 */}
      <div className="hp-sun">
        <div className="hp-sun-face">
          <span className="hp-sun-eye" />
          <span className="hp-sun-eye" />
          <span className="hp-sun-mouth" />
        </div>
      </div>

      {/* 云朵 */}
      <div className="hp-cloud hp-cloud-1" />
      <div className="hp-cloud hp-cloud-2" />
      <div className="hp-cloud hp-cloud-3" />
      <div className="hp-cloud hp-cloud-4" />

      {/* 草地 */}
      <div className="hp-ground">
        <div className="hp-ground-wave hp-ground-wave-1" />
        <div className="hp-ground-wave hp-ground-wave-2" />
        <div className="hp-ground-wave hp-ground-wave-3" />
      </div>

      {/* 按钮区 */}
      <div className="hp-btn-row">
        <div className="hp-btn-wrapper">
          <span className="hp-btn-label">涂色乐园</span>
          <button className="hp-cat-btn" onClick={handleColoringMode} aria-label="涂色乐园">
            <span className="hp-cat-ear-inner-l" />
            <span className="hp-cat-ear-inner-r" />
            <span className="hp-cat-blush-l" />
            <span className="hp-cat-blush-r" />
            涂色乐园
          </button>
        </div>
        <div className="hp-btn-wrapper">
          <span className="hp-btn-label">画画天地</span>
          <button className="hp-candy-btn" onClick={handleDrawingMode} aria-label="画画天地">
            <span className="hp-candy-twist-l" />
            <span className="hp-candy-twist-r" />
            <div className="hp-candy-stripes" />
            <span className="hp-candy-shine" />
            <span className="hp-candy-shadow" />
            画画天地
          </button>
        </div>
      </div>

      {/* 设置按钮 */}
      <div className="hp-settings-wrapper">
        <button className="hp-settings-btn" onClick={handleSettings} aria-label="设置">
          <span className="hp-gear-icon" />
        </button>
        <span className="hp-settings-btn-shadow" />
      </div>
    </div>
  );
}
