const MODULES = [
  { id: 'cargo-crate', name: '货物木箱' },
  { id: 'hook', name: '吊钩' },
  { id: 'pulley', name: '滑轮组' },
  { id: 'boom-inner', name: '吊臂内段' },
  { id: 'boom-tip-pulley', name: '臂尖滑轮' },
  { id: 'boom-middle', name: '吊臂中段' },
  { id: 'boom-outer', name: '吊臂外段' },
  { id: 'hydraulic-base', name: '液压基座' },
  { id: 'turret', name: '旋转基座' },
  { id: 'turret-pin', name: '旋转轴心' },
  { id: 'upper-cab', name: '上车操作室' },
  { id: 'upper-window', name: '操作室窗户' },
  { id: 'exhaust-pipe', name: '排气管' },
  { id: 'exhaust-cap', name: '排气帽' },
  { id: 'chassis', name: '车辆底盘' },
  { id: 'lower-cab', name: '下车驾驶室' },
  { id: 'lower-window', name: '驾驶室窗户' },
  { id: 'door-handle', name: '门把手' },
  { id: 'warning-light', name: '顶部警示灯' },
  { id: 'bumper', name: '前保险杠' },
  { id: 'headlight', name: '前灯' },
  { id: 'fender-rear', name: '后挡泥板' },
  { id: 'fender-front', name: '前挡泥板' },
  { id: 'wheel-1-outer', name: '第一轴外轮' },
  { id: 'wheel-1-inner', name: '第一轴内轮' },
  { id: 'wheel-2-outer', name: '第二轴外轮' },
  { id: 'wheel-2-inner', name: '第二轴内轮' },
  { id: 'wheel-3-outer', name: '第三轴外轮' },
  { id: 'wheel-3-inner', name: '第三轴内轮' },
  { id: 'wheel-4-outer', name: '第四轴外轮' },
  { id: 'wheel-4-inner', name: '第四轴内轮' },
];

export default function CraneColoring({ onModuleClick, moduleColors }) {
  const fill = (id) => moduleColors?.[id] || '#FFFFFF';

  return (
    <svg className="coloring-svg" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <g className="coloring-modules">
        {/* 货物木箱 */}
        <rect className="coloring-module" data-module-id="cargo-crate" data-module-name="货物木箱"
              x="765" y="340" width="100" height="80" rx="6"
              fill={fill('cargo-crate')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('cargo-crate', e)} />
        {/* 吊钩 */}
        <path className="coloring-module" data-module-id="hook" data-module-name="吊钩"
              d="M 810,285 L 820,285 L 820,305 A 20,20 0 0 1 780,305 L 790,305 A 10,10 0 0 0 810,305 Z"
              fill={fill('hook')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('hook', e)} />
        {/* 滑轮组 */}
        <rect className="coloring-module" data-module-id="pulley" data-module-name="滑轮组"
              x="800" y="260" width="30" height="25" rx="5"
              fill={fill('pulley')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('pulley', e)} />
        {/* 吊臂内段 */}
        <polygon className="coloring-module" data-module-id="boom-inner" data-module-name="吊臂内段"
                 points="495,160 775,40 785,65 505,185"
                 fill={fill('boom-inner')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
                 onClick={(e) => onModuleClick?.('boom-inner', e)} />
        {/* 臂尖滑轮 */}
        <circle className="coloring-module" data-module-id="boom-tip-pulley" data-module-name="臂尖滑轮"
                cx="780" cy="52" r="12"
                fill={fill('boom-tip-pulley')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('boom-tip-pulley', e)} />
        {/* 吊臂中段 */}
        <polygon className="coloring-module" data-module-id="boom-middle" data-module-name="吊臂中段"
                 points="345,220 575,120 590,155 360,255"
                 fill={fill('boom-middle')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
                 onClick={(e) => onModuleClick?.('boom-middle', e)} />
        {/* 吊臂外段 */}
        <polygon className="coloring-module" data-module-id="boom-outer" data-module-name="吊臂外段"
                 points="200,280 370,208 390,255 220,327"
                 fill={fill('boom-outer')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
                 onClick={(e) => onModuleClick?.('boom-outer', e)} />
        {/* 液压基座 */}
        <polygon className="coloring-module" data-module-id="hydraulic-base" data-module-name="液压基座"
                 points="270,340 295,340 380,250 355,230"
                 fill={fill('hydraulic-base')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
                 onClick={(e) => onModuleClick?.('hydraulic-base', e)} />
        {/* 旋转基座 */}
        <path className="coloring-module" data-module-id="turret" data-module-name="旋转基座"
              d="M 170,340 L 310,340 L 290,290 L 190,290 Z"
              fill={fill('turret')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('turret', e)} />
        {/* 旋转轴心 */}
        <circle className="coloring-module" data-module-id="turret-pin" data-module-name="旋转轴心"
                cx="220" cy="300" r="12"
                fill={fill('turret-pin')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('turret-pin', e)} />
        {/* 上车操作室 */}
        <path className="coloring-module" data-module-id="upper-cab" data-module-name="上车操作室"
              d="M 190,290 L 190,180 Q 190,160 210,160 L 250,160 Q 270,160 270,180 L 270,290 Z"
              fill={fill('upper-cab')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('upper-cab', e)} />
        {/* 操作室窗户 */}
        <rect className="coloring-module" data-module-id="upper-window" data-module-name="操作室窗户"
              x="205" y="175" width="50" height="55" rx="5"
              fill={fill('upper-window')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('upper-window', e)} />
        {/* 排气管 */}
        <rect className="coloring-module" data-module-id="exhaust-pipe" data-module-name="排气管"
              x="550" y="200" width="15" height="140"
              fill={fill('exhaust-pipe')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('exhaust-pipe', e)} />
        {/* 排气帽 */}
        <polygon className="coloring-module" data-module-id="exhaust-cap" data-module-name="排气帽"
                 points="545,200 570,200 565,180 550,180"
                 fill={fill('exhaust-cap')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
                 onClick={(e) => onModuleClick?.('exhaust-cap', e)} />
        {/* 车辆底盘 */}
        <rect className="coloring-module" data-module-id="chassis" data-module-name="车辆底盘"
              x="140" y="340" width="580" height="50" rx="8"
              fill={fill('chassis')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('chassis', e)} />
        {/* 下车驾驶室 */}
        <path className="coloring-module" data-module-id="lower-cab" data-module-name="下车驾驶室"
              d="M 580,340 L 580,230 Q 580,210 600,210 L 670,210 Q 700,210 720,270 L 730,340 Z"
              fill={fill('lower-cab')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('lower-cab', e)} />
        {/* 驾驶室窗户 */}
        <path className="coloring-module" data-module-id="lower-window" data-module-name="驾驶室窗户"
              d="M 600,230 L 660,230 L 700,280 L 600,280 Z"
              fill={fill('lower-window')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('lower-window', e)} />
        {/* 门把手 */}
        <rect className="coloring-module" data-module-id="door-handle" data-module-name="门把手"
              x="610" y="295" width="20" height="8" rx="4"
              fill={fill('door-handle')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('door-handle', e)} />
        {/* 顶部警示灯 */}
        <rect className="coloring-module" data-module-id="warning-light" data-module-name="顶部警示灯"
              x="620" y="195" width="25" height="15" rx="5"
              fill={fill('warning-light')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('warning-light', e)} />
        {/* 前保险杠 */}
        <rect className="coloring-module" data-module-id="bumper" data-module-name="前保险杠"
              x="720" y="350" width="30" height="30" rx="5"
              fill={fill('bumper')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('bumper', e)} />
        {/* 前灯 */}
        <rect className="coloring-module" data-module-id="headlight" data-module-name="前灯"
              x="725" y="315" width="15" height="20" rx="4"
              fill={fill('headlight')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('headlight', e)} />
        {/* 后挡泥板 */}
        <path className="coloring-module" data-module-id="fender-rear" data-module-name="后挡泥板"
              d="M 140,410 L 140,390 Q 140,330 245,330 Q 350,330 350,390 L 350,410 L 330,410 L 330,390 Q 330,350 245,350 Q 160,350 160,390 L 160,410 Z"
              fill={fill('fender-rear')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('fender-rear', e)} />
        {/* 前挡泥板 */}
        <path className="coloring-module" data-module-id="fender-front" data-module-name="前挡泥板"
              d="M 500,410 L 500,390 Q 500,330 605,330 Q 710,330 710,390 L 710,410 L 690,410 L 690,390 Q 690,350 605,350 Q 520,350 520,390 L 520,410 Z"
              fill={fill('fender-front')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('fender-front', e)} />
        {/* 第一轴外轮 */}
        <circle className="coloring-module" data-module-id="wheel-1-outer" data-module-name="第一轴外轮"
                cx="200" cy="400" r="35"
                fill={fill('wheel-1-outer')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-1-outer', e)} />
        {/* 第一轴内轮 */}
        <circle className="coloring-module" data-module-id="wheel-1-inner" data-module-name="第一轴内轮"
                cx="200" cy="400" r="15"
                fill={fill('wheel-1-inner')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-1-inner', e)} />
        {/* 第二轴外轮 */}
        <circle className="coloring-module" data-module-id="wheel-2-outer" data-module-name="第二轴外轮"
                cx="290" cy="400" r="35"
                fill={fill('wheel-2-outer')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-2-outer', e)} />
        {/* 第二轴内轮 */}
        <circle className="coloring-module" data-module-id="wheel-2-inner" data-module-name="第二轴内轮"
                cx="290" cy="400" r="15"
                fill={fill('wheel-2-inner')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-2-inner', e)} />
        {/* 第三轴外轮 */}
        <circle className="coloring-module" data-module-id="wheel-3-outer" data-module-name="第三轴外轮"
                cx="560" cy="400" r="35"
                fill={fill('wheel-3-outer')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-3-outer', e)} />
        {/* 第三轴内轮 */}
        <circle className="coloring-module" data-module-id="wheel-3-inner" data-module-name="第三轴内轮"
                cx="560" cy="400" r="15"
                fill={fill('wheel-3-inner')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-3-inner', e)} />
        {/* 第四轴外轮 */}
        <circle className="coloring-module" data-module-id="wheel-4-outer" data-module-name="第四轴外轮"
                cx="650" cy="400" r="35"
                fill={fill('wheel-4-outer')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-4-outer', e)} />
        {/* 第四轴内轮 */}
        <circle className="coloring-module" data-module-id="wheel-4-inner" data-module-name="第四轴内轮"
                cx="650" cy="400" r="15"
                fill={fill('wheel-4-inner')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('wheel-4-inner', e)} />
      </g>

      {/* 非涂色装饰线 */}
      {/* 货物绑带 */}
      <line x1="815" y1="305" x2="765" y2="340" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
      <line x1="815" y1="305" x2="865" y2="340" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
      {/* 货箱分割线 */}
      <line x1="765" y1="380" x2="865" y2="380" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
      {/* 主钢缆 */}
      <line x1="780" y1="52" x2="815" y2="260" stroke="#1a1a1a" strokeWidth="6" />
      {/* 液压活塞杆 */}
      <line x1="367" y1="240" x2="430" y2="175" stroke="#1a1a1a" strokeWidth="10" strokeLinecap="round" />
      {/* 底盘分割线 */}
      <line x1="140" y1="365" x2="720" y2="365" stroke="#1a1a1a" strokeWidth="6" />
      {/* 操作杆 */}
      <line x1="220" y1="230" x2="240" y2="230" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export { MODULES };
