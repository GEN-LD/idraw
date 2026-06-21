const MODULES = [
  { id: 'track-frame', name: '履带框架' },
  { id: 'left-wheel', name: '左驱动轮' },
  { id: 'right-wheel', name: '右驱动轮' },
  { id: 'chassis', name: '底盘支架' },
  { id: 'turntable', name: '转台' },
  { id: 'engine', name: '引擎舱' },
  { id: 'exhaust-pipe', name: '排气管' },
  { id: 'exhaust-cap', name: '排气帽' },
  { id: 'cab', name: '驾驶室' },
  { id: 'cab-window', name: '驾驶室窗户' },
  { id: 'boom', name: '大臂' },
  { id: 'arm', name: '斗杆' },
  { id: 'bucket', name: '铲斗' },
  { id: 'bucket-teeth', name: '铲斗齿' },
];

export default function ExcavatorColoring({ onModuleClick, moduleColors }) {
  return (
    <svg className="coloring-svg" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="track-clip">
          <rect x="130" y="440" width="410" height="60" rx="30" />
        </clipPath>
        <clipPath id="cab-clip">
          <path d="M160,340 L160,240 L175,220 L285,220 L300,240 L300,340 Z" />
        </clipPath>
        <clipPath id="cab-window-clip">
          <rect x="178" y="245" width="104" height="70" rx="5" />
        </clipPath>
        <clipPath id="boom-clip">
          <path d="M478,268 L465,242 C540,132 642,82 722,86 L744,110 C672,124 572,206 502,292 Z" />
        </clipPath>
        <clipPath id="arm-clip">
          <path d="M722,86 L744,110 L796,270 L772,288 Z" />
        </clipPath>
        <clipPath id="bucket-clip">
          <path d="M745,290 L772,288 L796,270 C828,274 844,298 840,334 C837,356 833,372 830,378 L770,386 C748,380 741,362 740,342 C738,318 742,300 745,290 Z" />
        </clipPath>
      </defs>

      <g className="coloring-deco-bg">
        <line x1="40" y1="525" x2="860" y2="525" strokeDasharray="10 8" />
        <circle cx="780" cy="90" r="26" />
        <g stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round">
          <line x1="780" y1="44" x2="780" y2="34" />
          <line x1="780" y1="146" x2="780" y2="156" />
          <line x1="728" y1="90" x2="718" y2="90" />
          <line x1="832" y1="90" x2="842" y2="90" />
          <line x1="744" y1="54" x2="737" y2="47" />
          <line x1="816" y1="54" x2="823" y2="47" />
          <line x1="744" y1="126" x2="737" y2="133" />
          <line x1="816" y1="126" x2="823" y2="133" />
        </g>
        <path d="M80,110 Q80,92 98,92 Q105,75 128,82 Q148,75 152,92 Q170,92 170,110 Q170,128 152,128 L98,128 Q80,128 80,110 Z" />
        <path d="M60,515 Q70,498 88,503 Q105,498 110,515" />
        <path d="M820,518 Q832,500 855,506 Q875,500 880,518" />
        <path d="M150,522 L156,515 L162,522 Z" fill="rgba(0,0,0,0.05)" />
        <path d="M720,524 L728,514 L736,524 Z" fill="rgba(0,0,0,0.05)" />
      </g>

      <g className="coloring-deco">
        <line x1="205" y1="445" x2="205" y2="495" />
        <line x1="235" y1="445" x2="235" y2="495" />
        <line x1="265" y1="445" x2="265" y2="495" />
        <line x1="295" y1="445" x2="295" y2="495" />
        <line x1="325" y1="445" x2="325" y2="495" />
        <line x1="355" y1="445" x2="355" y2="495" />
        <line x1="385" y1="445" x2="385" y2="495" />
        <line x1="415" y1="445" x2="415" y2="495" />
        <line x1="445" y1="445" x2="445" y2="495" />
        <line x1="475" y1="445" x2="475" y2="495" />
        <circle cx="170" cy="470" r="10" />
        <circle cx="500" cy="470" r="10" />
        <circle cx="170" cy="470" r="3" fill="#1a1a1a" opacity="0.4" />
        <circle cx="500" cy="470" r="3" fill="#1a1a1a" opacity="0.4" />
        <line x1="320" y1="285" x2="350" y2="285" />
        <line x1="320" y1="295" x2="350" y2="295" />
        <line x1="320" y1="305" x2="350" y2="305" />
        <line x1="320" y1="315" x2="350" y2="315" />
        <line x1="320" y1="325" x2="350" y2="325" />
        <circle cx="500" cy="195" r="5" />
        <circle cx="510" cy="180" r="6" />
        <circle cx="525" cy="168" r="7" />
        <line x1="230" y1="245" x2="230" y2="315" />
        <path d="M508,268 L588,192" />
        <circle cx="508" cy="268" r="5" />
        <circle cx="588" cy="192" r="4" />
        <path d="M500,280 Q590,210 660,145" />
        <circle cx="500" cy="280" r="7" />
        <circle cx="500" cy="280" r="3" fill="#1a1a1a" opacity="0.4" />
        <line x1="733" y1="98" x2="784" y2="279" />
        <path d="M705,130 L758,210" />
        <path d="M760,298 Q772,332 784,362" />
        <path d="M804,285 Q814,322 820,360" />
        <path d="M772,288 Q800,320 830,378" strokeDasharray="3 4" />
        <circle cx="733" cy="98" r="9" />
        <circle cx="733" cy="98" r="4" fill="#1a1a1a" opacity="0.4" />
        <circle cx="784" cy="279" r="8" />
        <circle cx="784" cy="279" r="3.5" fill="#1a1a1a" opacity="0.4" />
      </g>

      <g className="coloring-modules">
        <g className="coloring-module" data-module-id="track-frame" data-module-name="履带框架"
           onClick={(e) => onModuleClick?.('track-frame', e)}>
          <rect x="130" y="440" width="410" height="60" rx="30"
                fill={moduleColors?.['track-frame'] || '#FFFFFF'}
                stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round" />
        </g>
        <g className="coloring-module" data-module-id="left-wheel" data-module-name="左驱动轮"
           onClick={(e) => onModuleClick?.('left-wheel', e)}>
          <circle cx="170" cy="470" r="28"
                  fill={moduleColors?.['left-wheel'] || '#FFFFFF'}
                  stroke="#1a1a1a" strokeWidth="4" />
        </g>
        <g className="coloring-module" data-module-id="right-wheel" data-module-name="右驱动轮"
           onClick={(e) => onModuleClick?.('right-wheel', e)}>
          <circle cx="500" cy="470" r="28"
                  fill={moduleColors?.['right-wheel'] || '#FFFFFF'}
                  stroke="#1a1a1a" strokeWidth="4" />
        </g>
        <g className="coloring-module" data-module-id="chassis" data-module-name="底盘支架"
           onClick={(e) => onModuleClick?.('chassis', e)}>
          <polygon points="220,385 460,385 510,440 170,440"
                   fill={moduleColors?.['chassis'] || '#FFFFFF'}
                   stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round" />
        </g>
        <g className="coloring-module" data-module-id="turntable" data-module-name="转台"
           onClick={(e) => onModuleClick?.('turntable', e)}>
          <rect x="150" y="340" width="370" height="45" rx="8"
                fill={moduleColors?.['turntable'] || '#FFFFFF'}
                stroke="#1a1a1a" strokeWidth="4" />
        </g>
        <g className="coloring-module" data-module-id="engine" data-module-name="引擎舱"
           onClick={(e) => onModuleClick?.('engine', e)}>
          <rect x="300" y="265" width="220" height="75" rx="5"
                fill={moduleColors?.['engine'] || '#FFFFFF'}
                stroke="#1a1a1a" strokeWidth="4" />
        </g>
        <g className="coloring-module" data-module-id="exhaust-pipe" data-module-name="排气管"
           onClick={(e) => onModuleClick?.('exhaust-pipe', e)}>
          <rect x="480" y="215" width="14" height="50" rx="3"
                fill={moduleColors?.['exhaust-pipe'] || '#FFFFFF'}
                stroke="#1a1a1a" strokeWidth="4" />
        </g>
        <g className="coloring-module" data-module-id="exhaust-cap" data-module-name="排气帽"
           onClick={(e) => onModuleClick?.('exhaust-cap', e)}>
          <circle cx="487" cy="212" r="9"
                  fill={moduleColors?.['exhaust-cap'] || '#FFFFFF'}
                  stroke="#1a1a1a" strokeWidth="4" />
        </g>
        <g className="coloring-module" data-module-id="cab" data-module-name="驾驶室"
           onClick={(e) => onModuleClick?.('cab', e)}>
          <path d="M160,340 L160,240 L175,220 L285,220 L300,240 L300,340 Z"
                fill={moduleColors?.['cab'] || '#FFFFFF'}
                stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round" />
        </g>
        <g className="coloring-module" data-module-id="cab-window" data-module-name="驾驶室窗户"
           onClick={(e) => onModuleClick?.('cab-window', e)}>
          <rect x="178" y="245" width="104" height="70" rx="5"
                fill={moduleColors?.['cab-window'] || '#FFFFFF'}
                stroke="#1a1a1a" strokeWidth="4" />
        </g>
        <g className="coloring-module" data-module-id="boom" data-module-name="大臂"
           onClick={(e) => onModuleClick?.('boom', e)}>
          <path d="M478,268 L465,242 C540,132 642,82 722,86 L744,110 C672,124 572,206 502,292 Z"
                fill={moduleColors?.['boom'] || '#FFFFFF'}
                stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round" />
        </g>
        <g className="coloring-module" data-module-id="arm" data-module-name="斗杆"
           onClick={(e) => onModuleClick?.('arm', e)}>
          <path d="M722,86 L744,110 L796,270 L772,288 Z"
                fill={moduleColors?.['arm'] || '#FFFFFF'}
                stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round" />
        </g>
        <g className="coloring-module" data-module-id="bucket" data-module-name="铲斗"
           onClick={(e) => onModuleClick?.('bucket', e)}>
          <path d="M745,290 L772,288 L796,270 C828,274 844,298 840,334 C837,356 833,372 830,378 L770,386 C748,380 741,362 740,342 C738,318 742,300 745,290 Z"
                fill={moduleColors?.['bucket'] || '#FFFFFF'}
                stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round" />
        </g>
        <g className="coloring-module" data-module-id="bucket-teeth" data-module-name="铲斗齿"
           onClick={(e) => onModuleClick?.('bucket-teeth', e)}>
          <path d="M830,378 L824,397 L816,385 L809,399 L802,386 L795,400 L788,387 L781,398 L774,386 L770,386 Z"
                fill={moduleColors?.['bucket-teeth'] || '#FFFFFF'}
                stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}

export { MODULES };
