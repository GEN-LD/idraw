const MODULES = [
  { id: 'left-ear', name: '左耳朵' },
  { id: 'right-ear', name: '右耳朵' },
  { id: 'left-inner-ear', name: '左耳内侧' },
  { id: 'right-inner-ear', name: '右耳内侧' },
  { id: 'head', name: '头部' },
  { id: 'body', name: '身体' },
  { id: 'left-paw', name: '左手' },
  { id: 'right-paw', name: '右手' },
  { id: 'left-foot', name: '左脚' },
  { id: 'right-foot', name: '右脚' },
  { id: 'tail', name: '尾巴' },
];

export default function RabbitColoring({ onModuleClick, moduleColors }) {
  const fill = (id) => moduleColors?.[id] || '#FFFFFF';

  return (
    <svg className="coloring-svg" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <g className="coloring-modules">
        {/* 1: 左耳朵 */}
        <ellipse className="coloring-module" data-module-id="left-ear" data-module-name="左耳朵"
                 cx="330" cy="110" rx="55" ry="140"
                 transform="rotate(-15 330 110)"
                 fill={fill('left-ear')} stroke="#1a1a1a" strokeWidth="4"
                 onClick={(e) => onModuleClick?.('left-ear', e)} />
        {/* 2: 右耳朵 */}
        <ellipse className="coloring-module" data-module-id="right-ear" data-module-name="右耳朵"
                 cx="570" cy="110" rx="55" ry="140"
                 transform="rotate(15 570 110)"
                 fill={fill('right-ear')} stroke="#1a1a1a" strokeWidth="4"
                 onClick={(e) => onModuleClick?.('right-ear', e)} />
        {/* 3: 左耳内侧 */}
        <ellipse className="coloring-module" data-module-id="left-inner-ear" data-module-name="左耳内侧"
                 cx="330" cy="110" rx="30" ry="95"
                 transform="rotate(-15 330 110)"
                 fill={fill('left-inner-ear')} stroke="#1a1a1a" strokeWidth="4"
                 onClick={(e) => onModuleClick?.('left-inner-ear', e)} />
        {/* 4: 右耳内侧 */}
        <ellipse className="coloring-module" data-module-id="right-inner-ear" data-module-name="右耳内侧"
                 cx="570" cy="110" rx="30" ry="95"
                 transform="rotate(15 570 110)"
                 fill={fill('right-inner-ear')} stroke="#1a1a1a" strokeWidth="4"
                 onClick={(e) => onModuleClick?.('right-inner-ear', e)} />
        {/* 5: 头部 */}
        <circle className="coloring-module" data-module-id="head" data-module-name="头部"
                cx="450" cy="280" r="170"
                fill={fill('head')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('head', e)} />
        {/* 6: 身体 */}
        <path className="coloring-module" data-module-id="body" data-module-name="身体"
              d="M 320,430 C 280,470 290,550 340,575 L 560,575 C 610,550 620,470 580,430 C 540,390 360,390 320,430 Z"
              fill={fill('body')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('body', e)} />
        {/* 7: 尾巴 */}
        <circle className="coloring-module" data-module-id="tail" data-module-name="尾巴"
                cx="610" cy="510" r="35"
                fill={fill('tail')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('tail', e)} />
        {/* 8: 左脚 */}
        <ellipse className="coloring-module" data-module-id="left-foot" data-module-name="左脚"
                 cx="360" cy="580" rx="60" ry="35"
                 fill={fill('left-foot')} stroke="#1a1a1a" strokeWidth="4"
                 onClick={(e) => onModuleClick?.('left-foot', e)} />
        {/* 9: 右脚 */}
        <ellipse className="coloring-module" data-module-id="right-foot" data-module-name="右脚"
                 cx="540" cy="580" rx="60" ry="35"
                 fill={fill('right-foot')} stroke="#1a1a1a" strokeWidth="4"
                 onClick={(e) => onModuleClick?.('right-foot', e)} />
        {/* 10: 左手 */}
        <ellipse className="coloring-module" data-module-id="left-paw" data-module-name="左手"
                 cx="400" cy="500" rx="40" ry="65"
                 transform="rotate(-10 400 500)"
                 fill={fill('left-paw')} stroke="#1a1a1a" strokeWidth="4"
                 onClick={(e) => onModuleClick?.('left-paw', e)} />
        {/* 11: 右手 */}
        <ellipse className="coloring-module" data-module-id="right-paw" data-module-name="右手"
                 cx="500" cy="500" rx="40" ry="65"
                 transform="rotate(10 500 500)"
                 fill={fill('right-paw')} stroke="#1a1a1a" strokeWidth="4"
                 onClick={(e) => onModuleClick?.('right-paw', e)} />
        {/* 面部细节：不参与涂色 */}
        <g style={{ pointerEvents: 'none' }}>
          <ellipse cx="400" cy="270" rx="16" ry="20" fill="#1a1a1a" />
          <ellipse cx="500" cy="270" rx="16" ry="20" fill="#1a1a1a" />
          <ellipse cx="450" cy="310" rx="12" ry="8" fill="#1a1a1a" />
          <path d="M 430,335 Q 440,350 450,340 Q 460,350 470,335"
                fill="none" stroke="#1a1a1a" strokeWidth="4"
                strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}

export { MODULES };
