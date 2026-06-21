const MODULES = [
  { id: 'rear-body', name: '后车厢' },
  { id: 'cab-body', name: '驾驶室' },
  { id: 'cab-window', name: '侧车窗' },
  { id: 'windshield', name: '前挡风玻璃' },
  { id: 'storage-1', name: '器材厢1' },
  { id: 'storage-2', name: '器材厢2' },
  { id: 'hose-outer', name: '水带外圈' },
  { id: 'hose-inner', name: '水带内圈' },
  { id: 'extinguisher', name: '灭火器' },
  { id: 'extinguisher-head', name: '灭火器喷头' },
  { id: 'axe-handle', name: '斧柄' },
  { id: 'axe-head', name: '斧头' },
  { id: 'fender-front', name: '前挡泥板' },
  { id: 'fender-mid', name: '中挡泥板' },
  { id: 'fender-rear', name: '后挡泥板' },
  { id: 'wheel-front', name: '前轮' },
  { id: 'wheel-mid', name: '中轮' },
  { id: 'wheel-rear', name: '后轮' },
  { id: 'hub-front', name: '前轮毂' },
  { id: 'hub-mid', name: '中轮毂' },
  { id: 'hub-rear', name: '后轮毂' },
  { id: 'bumper-front', name: '前保险杠' },
  { id: 'bumper-rear', name: '后保险杠' },
  { id: 'grille', name: '进气格栅' },
  { id: 'light-front', name: '前警示灯' },
  { id: 'light-rear', name: '后警示灯' },
  { id: 'ladder-base', name: '云梯底座' },
  { id: 'ladder-control', name: '云梯控制台' },
  { id: 'ladder-top', name: '云梯上梁' },
  { id: 'ladder-bottom', name: '云梯下梁' },
  { id: 'ladder-rung-1', name: '横踏板1' },
  { id: 'ladder-rung-2', name: '横踏板2' },
  { id: 'ladder-rung-3', name: '横踏板3' },
  { id: 'ladder-rung-4', name: '横踏板4' },
  { id: 'ladder-rung-5', name: '横踏板5' },
  { id: 'ladder-rung-6', name: '横踏板6' },
  { id: 'ladder-rung-7', name: '横踏板7' },
  { id: 'rescue-platform', name: '救援斗' },
];

export default function FireTruckColoring({ onModuleClick, moduleColors }) {
  const fill = (id) => moduleColors?.[id] || '#FFFFFF';

  return (
    <svg className="coloring-svg" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <g className="coloring-modules">
        {/* 后车厢主体 */}
        <rect className="coloring-module" data-module-id="rear-body" data-module-name="后车厢"
              x="320" y="200" width="460" height="230" rx="15"
              fill={fill('rear-body')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('rear-body', e)} />
        {/* 前驾驶室主体 */}
        <path className="coloring-module" data-module-id="cab-body" data-module-name="驾驶室"
              d="M320,430 L320,240 Q320,220 300,220 L220,220 L180,300 L180,430 Z"
              fill={fill('cab-body')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('cab-body', e)} />
        {/* 驾驶室侧车窗 */}
        <path className="coloring-module" data-module-id="cab-window" data-module-name="侧车窗"
              d="M305,310 L305,250 L240,250 L240,310 Z"
              fill={fill('cab-window')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('cab-window', e)} />
        {/* 前挡风玻璃 */}
        <path className="coloring-module" data-module-id="windshield" data-module-name="前挡风玻璃"
              d="M225,310 L225,250 L195,300 L195,310 Z"
              fill={fill('windshield')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('windshield', e)} />
        {/* 侧边器材厢 1 */}
        <rect className="coloring-module" data-module-id="storage-1" data-module-name="器材厢1"
              x="460" y="280" width="120" height="120" rx="10"
              fill={fill('storage-1')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('storage-1', e)} />
        {/* 侧边器材厢 2 */}
        <rect className="coloring-module" data-module-id="storage-2" data-module-name="器材厢2"
              x="610" y="280" width="140" height="120" rx="10"
              fill={fill('storage-2')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('storage-2', e)} />
        {/* 消防水带外圈 */}
        <circle className="coloring-module" data-module-id="hose-outer" data-module-name="水带外圈"
                cx="390" cy="320" r="35"
                fill={fill('hose-outer')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('hose-outer', e)} />
        {/* 消防水带内圈 */}
        <circle className="coloring-module" data-module-id="hose-inner" data-module-name="水带内圈"
                cx="390" cy="320" r="15"
                fill={fill('hose-inner')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('hose-inner', e)} />
        {/* 灭火器瓶身 */}
        <rect className="coloring-module" data-module-id="extinguisher" data-module-name="灭火器"
              x="630" y="300" width="25" height="55" rx="10"
              fill={fill('extinguisher')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('extinguisher', e)} />
        {/* 灭火器喷头 */}
        <rect className="coloring-module" data-module-id="extinguisher-head" data-module-name="灭火器喷头"
              x="637" y="285" width="11" height="15"
              fill={fill('extinguisher-head')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('extinguisher-head', e)} />
        {/* 消防斧柄 */}
        <path className="coloring-module" data-module-id="axe-handle" data-module-name="斧柄"
              d="M690,290 L700,290 L700,380 L690,380 Z"
              fill={fill('axe-handle')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('axe-handle', e)} />
        {/* 消防斧头 */}
        <path className="coloring-module" data-module-id="axe-head" data-module-name="斧头"
              d="M700,300 L725,310 L725,330 L700,320 Z"
              fill={fill('axe-head')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('axe-head', e)} />
        {/* 前挡泥板 */}
        <path className="coloring-module" data-module-id="fender-front" data-module-name="前挡泥板"
              d="M190,430 A60 60 0 0 1 310 430 Z"
              fill={fill('fender-front')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('fender-front', e)} />
        {/* 中挡泥板 */}
        <path className="coloring-module" data-module-id="fender-mid" data-module-name="中挡泥板"
              d="M500,430 A60 60 0 0 1 620 430 Z"
              fill={fill('fender-mid')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('fender-mid', e)} />
        {/* 后挡泥板 */}
        <path className="coloring-module" data-module-id="fender-rear" data-module-name="后挡泥板"
              d="M620,430 A60 60 0 0 1 740 430 Z"
              fill={fill('fender-rear')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('fender-rear', e)} />
        {/* 前轮 */}
        <circle className="coloring-module" data-module-id="wheel-front" data-module-name="前轮"
                cx="250" cy="430" r="45"
                fill={fill('wheel-front')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-front', e)} />
        {/* 中轮 */}
        <circle className="coloring-module" data-module-id="wheel-mid" data-module-name="中轮"
                cx="560" cy="430" r="45"
                fill={fill('wheel-mid')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-mid', e)} />
        {/* 后轮 */}
        <circle className="coloring-module" data-module-id="wheel-rear" data-module-name="后轮"
                cx="680" cy="430" r="45"
                fill={fill('wheel-rear')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-rear', e)} />
        {/* 前轮毂 */}
        <circle className="coloring-module" data-module-id="hub-front" data-module-name="前轮毂"
                cx="250" cy="430" r="20"
                fill={fill('hub-front')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('hub-front', e)} />
        {/* 中轮毂 */}
        <circle className="coloring-module" data-module-id="hub-mid" data-module-name="中轮毂"
                cx="560" cy="430" r="20"
                fill={fill('hub-mid')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('hub-mid', e)} />
        {/* 后轮毂 */}
        <circle className="coloring-module" data-module-id="hub-rear" data-module-name="后轮毂"
                cx="680" cy="430" r="20"
                fill={fill('hub-rear')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('hub-rear', e)} />
        {/* 前保险杠 */}
        <rect className="coloring-module" data-module-id="bumper-front" data-module-name="前保险杠"
              x="150" y="390" width="30" height="30" rx="8"
              fill={fill('bumper-front')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('bumper-front', e)} />
        {/* 后保险杠 */}
        <rect className="coloring-module" data-module-id="bumper-rear" data-module-name="后保险杠"
              x="780" y="390" width="20" height="30" rx="5"
              fill={fill('bumper-rear')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('bumper-rear', e)} />
        {/* 进气格栅 */}
        <rect className="coloring-module" data-module-id="grille" data-module-name="进气格栅"
              x="170" y="340" width="10" height="40"
              fill={fill('grille')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('grille', e)} />
        {/* 前警示灯 */}
        <path className="coloring-module" data-module-id="light-front" data-module-name="前警示灯"
              d="M290,220 L280,190 L250,190 L240,220 Z"
              fill={fill('light-front')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('light-front', e)} />
        {/* 后警示灯 */}
        <rect className="coloring-module" data-module-id="light-rear" data-module-name="后警示灯"
              x="750" y="170" width="20" height="30" rx="5"
              fill={fill('light-rear')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('light-rear', e)} />
        {/* 云梯底座 */}
        <rect className="coloring-module" data-module-id="ladder-base" data-module-name="云梯底座"
              x="580" y="170" width="90" height="30" rx="5"
              fill={fill('ladder-base')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('ladder-base', e)} />
        {/* 云梯控制台 */}
        <rect className="coloring-module" data-module-id="ladder-control" data-module-name="云梯控制台"
              x="600" y="150" width="50" height="20" rx="3"
              fill={fill('ladder-control')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('ladder-control', e)} />
        {/* 伸缩云梯组 */}
        <g transform="translate(230, 0)">
          <rect className="coloring-module" data-module-id="ladder-top" data-module-name="云梯上梁"
                x="150" y="140" width="350" height="15" rx="5"
                fill={fill('ladder-top')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('ladder-top', e)} />
          <rect className="coloring-module" data-module-id="ladder-bottom" data-module-name="云梯下梁"
                x="150" y="175" width="350" height="15" rx="5"
                fill={fill('ladder-bottom')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('ladder-bottom', e)} />
          <rect className="coloring-module" data-module-id="ladder-rung-1" data-module-name="横踏板1"
                x="180" y="155" width="12" height="20"
                fill={fill('ladder-rung-1')} stroke="#1a1a1a" strokeWidth="3"
                onClick={(e) => onModuleClick?.('ladder-rung-1', e)} />
          <rect className="coloring-module" data-module-id="ladder-rung-2" data-module-name="横踏板2"
                x="230" y="155" width="12" height="20"
                fill={fill('ladder-rung-2')} stroke="#1a1a1a" strokeWidth="3"
                onClick={(e) => onModuleClick?.('ladder-rung-2', e)} />
          <rect className="coloring-module" data-module-id="ladder-rung-3" data-module-name="横踏板3"
                x="280" y="155" width="12" height="20"
                fill={fill('ladder-rung-3')} stroke="#1a1a1a" strokeWidth="3"
                onClick={(e) => onModuleClick?.('ladder-rung-3', e)} />
          <rect className="coloring-module" data-module-id="ladder-rung-4" data-module-name="横踏板4"
                x="330" y="155" width="12" height="20"
                fill={fill('ladder-rung-4')} stroke="#1a1a1a" strokeWidth="3"
                onClick={(e) => onModuleClick?.('ladder-rung-4', e)} />
          <rect className="coloring-module" data-module-id="ladder-rung-5" data-module-name="横踏板5"
                x="380" y="155" width="12" height="20"
                fill={fill('ladder-rung-5')} stroke="#1a1a1a" strokeWidth="3"
                onClick={(e) => onModuleClick?.('ladder-rung-5', e)} />
          <rect className="coloring-module" data-module-id="ladder-rung-6" data-module-name="横踏板6"
                x="430" y="155" width="12" height="20"
                fill={fill('ladder-rung-6')} stroke="#1a1a1a" strokeWidth="3"
                onClick={(e) => onModuleClick?.('ladder-rung-6', e)} />
          <rect className="coloring-module" data-module-id="ladder-rung-7" data-module-name="横踏板7"
                x="480" y="155" width="12" height="20"
                fill={fill('ladder-rung-7')} stroke="#1a1a1a" strokeWidth="3"
                onClick={(e) => onModuleClick?.('ladder-rung-7', e)} />
          <path className="coloring-module" data-module-id="rescue-platform" data-module-name="救援斗"
                d="M80,120 L150,120 L150,190 L100,190 Z"
                fill={fill('rescue-platform')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
                onClick={(e) => onModuleClick?.('rescue-platform', e)} />
        </g>
      </g>
    </svg>
  );
}

export { MODULES };
