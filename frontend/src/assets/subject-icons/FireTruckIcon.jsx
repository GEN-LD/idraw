export default function FireTruckIcon({ className }) {
  return (
    <svg viewBox="0 0 900 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
        {/* 后车厢主体 */}
        <rect x="320" y="200" width="460" height="230" rx="15" />
        {/* 驾驶室主体 */}
        <path d="M320,430 L320,240 Q320,220 300,220 L220,220 L180,300 L180,430 Z" />
        {/* 侧车窗 */}
        <path d="M305,310 L305,250 L240,250 L240,310 Z" />
        {/* 前挡风玻璃 */}
        <path d="M225,310 L225,250 L195,300 L195,310 Z" />
        {/* 器材厢 1 */}
        <rect x="460" y="280" width="120" height="120" rx="10" />
        {/* 器材厢 2 */}
        <rect x="610" y="280" width="140" height="120" rx="10" />
        {/* 消防水带 */}
        <circle cx="390" cy="320" r="32" />
        {/* 车轮（前后各一） */}
        <circle cx="250" cy="430" r="42" />
        <circle cx="680" cy="430" r="42" />
        {/* 挡泥板弧线 */}
        <path d="M190,430 A60 60 0 0 1 310 430" />
        <path d="M620,430 A60 60 0 0 1 740 430" />
        {/* 警示灯 */}
        <path d="M290,220 L280,190 L250,190 L240,220 Z" />
        <rect x="750" y="170" width="20" height="30" rx="5" />
        {/* 云梯（简化） */}
        <g transform="translate(230, 0)">
          <rect x="150" y="140" width="350" height="15" rx="5" />
          <rect x="150" y="175" width="350" height="15" rx="5" />
          {/* 踏板竖线 */}
          <line x1="200" y1="155" x2="200" y2="175" />
          <line x1="270" y1="155" x2="270" y2="175" />
          <line x1="340" y1="155" x2="340" y2="175" />
          <line x1="410" y1="155" x2="410" y2="175" />
          <line x1="480" y1="155" x2="480" y2="175" />
          {/* 救援斗 */}
          <path d="M80,120 L150,120 L150,190 L100,190 Z" />
        </g>
      </g>
    </svg>
  );
}
