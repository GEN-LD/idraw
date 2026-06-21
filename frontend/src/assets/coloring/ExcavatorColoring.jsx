const MODULES = [
  { id: 'track-outer', name: '履带外框' },
  { id: 'track-inner', name: '履带内侧' },
  { id: 'roller-left', name: '左承重轮' },
  { id: 'roller-mid', name: '中承重轮' },
  { id: 'roller-right', name: '右承重轮' },
  { id: 'platform', name: '平台底座' },
  { id: 'engine', name: '发动机室' },
  { id: 'exhaust', name: '排气管' },
  { id: 'rain-cap', name: '防雨帽' },
  { id: 'cab', name: '驾驶室' },
  { id: 'warning-light', name: '警示灯' },
  { id: 'cab-window', name: '玻璃窗' },
  { id: 'arm-base', name: '机械臂底座' },
  { id: 'boom', name: '大臂' },
  { id: 'boom-cylinder', name: '大臂液压杆' },
  { id: 'arm', name: '斗杆' },
  { id: 'arm-cylinder', name: '斗杆液压杆' },
  { id: 'bucket', name: '铲斗' },
  { id: 'joint-boom-root', name: '大臂关节' },
  { id: 'joint-boom-arm', name: '臂杆关节' },
];

export default function ExcavatorColoring({ onModuleClick, moduleColors }) {
  const fill = (id) => moduleColors?.[id] || '#FFFFFF';

  return (
    <svg className="coloring-svg" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <g className="coloring-modules">
        {/* 1: 履带外框 */}
        <rect className="coloring-module" data-module-id="track-outer" data-module-name="履带外框"
              x="100" y="420" width="400" height="100" rx="50"
              fill={fill('track-outer')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('track-outer', e)} />
        {/* 2: 履带内侧 */}
        <rect className="coloring-module" data-module-id="track-inner" data-module-name="履带内侧"
              x="130" y="445" width="340" height="50" rx="25"
              fill={fill('track-inner')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('track-inner', e)} />
        {/* 3-5: 承重轮 */}
        <circle className="coloring-module" data-module-id="roller-left" data-module-name="左承重轮"
                cx="170" cy="470" r="25"
                fill={fill('roller-left')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('roller-left', e)} />
        <circle className="coloring-module" data-module-id="roller-mid" data-module-name="中承重轮"
                cx="300" cy="470" r="25"
                fill={fill('roller-mid')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('roller-mid', e)} />
        <circle className="coloring-module" data-module-id="roller-right" data-module-name="右承重轮"
                cx="430" cy="470" r="25"
                fill={fill('roller-right')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('roller-right', e)} />
        {/* 6: 平台底座 */}
        <rect className="coloring-module" data-module-id="platform" data-module-name="平台底座"
              x="150" y="380" width="300" height="40" rx="10"
              fill={fill('platform')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('platform', e)} />
        {/* 7: 发动机室 */}
        <path className="coloring-module" data-module-id="engine" data-module-name="发动机室"
              d="M160,380 L160,275 L280,275 L280,380 Z"
              fill={fill('engine')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('engine', e)} />
        {/* 8: 排气管 */}
        <path className="coloring-module" data-module-id="exhaust" data-module-name="排气管"
              d="M190,275 L190,215 L230,215 L230,275 Z"
              fill={fill('exhaust')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('exhaust', e)} />
        {/* 9: 防雨帽 */}
        <rect className="coloring-module" data-module-id="rain-cap" data-module-name="防雨帽"
              x="180" y="200" width="60" height="15" rx="5"
              fill={fill('rain-cap')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('rain-cap', e)} />
        {/* 10: 驾驶室 */}
        <path className="coloring-module" data-module-id="cab" data-module-name="驾驶室"
              d="M280,380 L280,200 L380,200 L430,380 Z"
              fill={fill('cab')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('cab', e)} />
        {/* 11: 警示灯 */}
        <path className="coloring-module" data-module-id="warning-light" data-module-name="警示灯"
              d="M310,200 L310,170 L350,170 L350,200 Z"
              fill={fill('warning-light')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('warning-light', e)} />
        {/* 12: 玻璃窗 */}
        <path className="coloring-module" data-module-id="cab-window" data-module-name="玻璃窗"
              d="M300,340 L300,230 L365,230 L400,340 Z"
              fill={fill('cab-window')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('cab-window', e)} />
        {/* 13: 机械臂底座 */}
        <path className="coloring-module" data-module-id="arm-base" data-module-name="机械臂底座"
              d="M380,380 L380,300 L440,300 L440,380 Z"
              fill={fill('arm-base')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('arm-base', e)} />
        {/* 14: 大臂 */}
        <path className="coloring-module" data-module-id="boom" data-module-name="大臂"
              d="M400,350 Q460,160 630,70 L660,105 Q490,210 430,380 Z"
              fill={fill('boom')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('boom', e)} />
        {/* 15: 大臂液压杆 */}
        <path className="coloring-module" data-module-id="boom-cylinder" data-module-name="大臂液压杆"
              d="M440,320 L610,130 L630,150 L460,340 Z"
              fill={fill('boom-cylinder')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('boom-cylinder', e)} />
        {/* 16: 斗杆 */}
        <path className="coloring-module" data-module-id="arm" data-module-name="斗杆"
              d="M665,75 L771,353 L731,373 L625,105 Z"
              fill={fill('arm')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('arm', e)} />
        {/* 17: 斗杆液压杆 */}
        <path className="coloring-module" data-module-id="arm-cylinder" data-module-name="斗杆液压杆"
              d="M635,95 L715,260 L695,280 L615,115 Z"
              fill={fill('arm-cylinder')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('arm-cylinder', e)} />
        {/* 18: 铲斗 */}
        <g transform="translate(766, 430) scale(-1, 1) rotate(-300) translate(-720, -350)">
          <path className="coloring-module" data-module-id="bucket" data-module-name="铲斗"
                d="M745,295 L767,288 L792,270 L800,310 C805,355 785,400 740,420 C695,440 650,420 635,380 L642,340 L655,300 Z"
                fill={fill('bucket')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
                onClick={(e) => onModuleClick?.('bucket', e)} />
        </g>
        {/* 19: 大臂根部关节 */}
        <circle className="coloring-module" data-module-id="joint-boom-root" data-module-name="大臂关节"
                cx="410" cy="330" r="20"
                fill={fill('joint-boom-root')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('joint-boom-root', e)} />
        {/* 20: 大小臂连接关节 */}
        <circle className="coloring-module" data-module-id="joint-boom-arm" data-module-name="臂杆关节"
                cx="645" cy="88" r="20"
                fill={fill('joint-boom-arm')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('joint-boom-arm', e)} />
      </g>
    </svg>
  );
}

export { MODULES };
