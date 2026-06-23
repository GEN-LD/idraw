const MODULES = [
  { id: 'light-left', name: '左警灯' },
  { id: 'light-center', name: '警灯中段' },
  { id: 'light-right', name: '右警灯' },
  { id: 'window-left', name: '左车窗' },
  { id: 'window-right', name: '右车窗' },
  { id: 'panel-front', name: '车头面板' },
  { id: 'body-front', name: '前车身' },
  { id: 'body-rear', name: '后车身' },
  { id: 'panel-rear', name: '车尾面板' },
  { id: 'badge', name: '警徽' },
  { id: 'bumper-right', name: '右保险杠' },
  { id: 'bumper-left', name: '左保险杠' },
  { id: 'wheel-front-outer', name: '前轮外圈' },
  { id: 'wheel-front-mid', name: '前轮中圈' },
  { id: 'wheel-front-inner', name: '前轮内圈' },
  { id: 'wheel-rear-outer', name: '后轮外圈' },
  { id: 'wheel-rear-mid', name: '后轮中圈' },
  { id: 'wheel-rear-inner', name: '后轮内圈' },
];

export default function PoliceCarColoring({ onModuleClick, moduleColors }) {
  const fill = (id) => moduleColors?.[id] || '#FFFFFF';

  return (
    <svg className="coloring-svg" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <g className="coloring-modules">
        {/* 警灯支架装饰（不可涂色） */}
        <line x1="440" y1="175" x2="440" y2="145" stroke="#1e1e1e" strokeWidth="6" strokeLinecap="round" />
        <line x1="415" y1="180" x2="390" y2="155" stroke="#1e1e1e" strokeWidth="6" strokeLinecap="round" />
        <line x1="465" y1="180" x2="490" y2="155" stroke="#1e1e1e" strokeWidth="6" strokeLinecap="round" />

        {/* 左警灯 */}
        <path className="coloring-module" data-module-id="light-left" data-module-name="左警灯"
              d="M425,190 L390,190 A20,20 0 0 0 370,210 A20,20 0 0 0 390,230 L425,230 Z"
              fill={fill('light-left')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('light-left', e)} />
        {/* 警灯中段 */}
        <rect className="coloring-module" data-module-id="light-center" data-module-name="警灯中段"
              x="425" y="190" width="30" height="40"
              fill={fill('light-center')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('light-center', e)} />
        {/* 右警灯 */}
        <path className="coloring-module" data-module-id="light-right" data-module-name="右警灯"
              d="M455,190 L490,190 A20,20 0 0 1 510,210 A20,20 0 0 1 490,230 L455,230 Z"
              fill={fill('light-right')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('light-right', e)} />
        {/* 左车窗 */}
        <path className="coloring-module" data-module-id="window-left" data-module-name="左车窗"
              d="M310,330 L342,250 Q350,230 365,230 L440,230 L440,330 Z"
              fill={fill('window-left')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('window-left', e)} />
        {/* 右车窗 */}
        <path className="coloring-module" data-module-id="window-right" data-module-name="右车窗"
              d="M440,230 L525,230 Q540,230 554,250 L610,330 L440,330 Z"
              fill={fill('window-right')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('window-right', e)} />
        {/* 车头面板 */}
        <path className="coloring-module" data-module-id="panel-front" data-module-name="车头面板"
              d="M190,330 L310,330 L310,430 L190,430 Q170,430 170,410 L170,350 Q170,330 190,330 Z"
              fill={fill('panel-front')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('panel-front', e)} />
        {/* 前车身 */}
        <path className="coloring-module" data-module-id="body-front" data-module-name="前车身"
              d="M310,330 L440,330 L440,430 L310,430 Z"
              fill={fill('body-front')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('body-front', e)} />
        {/* 后车身 */}
        <path className="coloring-module" data-module-id="body-rear" data-module-name="后车身"
              d="M440,330 L610,330 L610,430 L440,430 Z"
              fill={fill('body-rear')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('body-rear', e)} />
        {/* 车尾面板 */}
        <path className="coloring-module" data-module-id="panel-rear" data-module-name="车尾面板"
              d="M610,330 L730,330 Q750,330 750,350 L750,410 Q750,430 730,430 L610,430 Z"
              fill={fill('panel-rear')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('panel-rear', e)} />
        {/* 警徽 */}
        <polygon className="coloring-module" data-module-id="badge" data-module-name="警徽"
                 points="512,352 519,368 536,370 524,381 529,398 512,388 495,398 500,381 488,370 505,368"
                 fill={fill('badge')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
                 onClick={(e) => onModuleClick?.('badge', e)} />
        {/* 右保险杠 */}
        <path className="coloring-module" data-module-id="bumper-right" data-module-name="右保险杠"
              d="M750,355 L750,385 L725,385 Q715,385 715,375 L715,365 Q715,355 725,355 Z"
              fill={fill('bumper-right')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('bumper-right', e)} />
        {/* 左保险杠 */}
        <path className="coloring-module" data-module-id="bumper-left" data-module-name="左保险杠"
              d="M170,355 L170,385 L195,385 Q205,385 205,375 L205,365 Q205,355 195,355 Z"
              fill={fill('bumper-left')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('bumper-left', e)} />
        {/* 前轮外圈 */}
        <circle className="coloring-module" data-module-id="wheel-front-outer" data-module-name="前轮外圈"
                cx="240" cy="430" r="45"
                fill={fill('wheel-front-outer')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-front-outer', e)} />
        {/* 前轮中圈 */}
        <circle className="coloring-module" data-module-id="wheel-front-mid" data-module-name="前轮中圈"
                cx="240" cy="430" r="25"
                fill={fill('wheel-front-mid')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-front-mid', e)} />
        {/* 前轮内圈 */}
        <circle className="coloring-module" data-module-id="wheel-front-inner" data-module-name="前轮内圈"
                cx="240" cy="430" r="10"
                fill={fill('wheel-front-inner')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-front-inner', e)} />
        {/* 后轮外圈 */}
        <circle className="coloring-module" data-module-id="wheel-rear-outer" data-module-name="后轮外圈"
                cx="680" cy="430" r="45"
                fill={fill('wheel-rear-outer')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-rear-outer', e)} />
        {/* 后轮中圈 */}
        <circle className="coloring-module" data-module-id="wheel-rear-mid" data-module-name="后轮中圈"
                cx="680" cy="430" r="25"
                fill={fill('wheel-rear-mid')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-rear-mid', e)} />
        {/* 后轮内圈 */}
        <circle className="coloring-module" data-module-id="wheel-rear-inner" data-module-name="后轮内圈"
                cx="680" cy="430" r="10"
                fill={fill('wheel-rear-inner')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-rear-inner', e)} />
      </g>
    </svg>
  );
}

export { MODULES };
