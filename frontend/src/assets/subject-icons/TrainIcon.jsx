export default function TrainIcon({ className }) {
  return (
    <svg viewBox="0 0 900 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#1a1a1a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        {/* 蒸汽 */}
        <circle cx="665" cy="105" r="16" />
        <circle cx="595" cy="75" r="24" />
        <circle cx="505" cy="55" r="32" />
        {/* 铁轨 */}
        <rect x="40" y="525" width="820" height="10" rx="4" />
        {/* 客运车厢 */}
        <rect x="80" y="250" width="280" height="200" rx="12" />
        <rect x="70" y="220" width="300" height="30" rx="15" />
        <rect x="110" y="280" width="50" height="70" rx="8" />
        <rect x="195" y="280" width="50" height="70" rx="8" />
        <rect x="280" y="280" width="50" height="70" rx="8" />
        {/* 车厢连接器 */}
        <rect x="360" y="405" width="40" height="35" />
        {/* 驾驶室 */}
        <rect x="400" y="180" width="140" height="270" rx="10" />
        <rect x="380" y="150" width="180" height="30" rx="15" />
        <rect x="430" y="210" width="70" height="80" rx="10" />
        {/* 锅炉 */}
        <rect x="540" y="280" width="180" height="170" rx="30" />
        {/* 烟囱 */}
        <path d="M640,280 L640,160 L620,130 L700,130 L680,160 L680,280 Z" />
        {/* 前照灯 */}
        <rect x="710" y="330" width="30" height="40" rx="10" />
        {/* 排障器 */}
        <path d="M720,450 L800,520 L720,420 Z" />
        {/* 车厢轮子 */}
        <circle cx="150" cy="485" r="38" />
        <circle cx="150" cy="485" r="18" />
        <circle cx="290" cy="485" r="38" />
        <circle cx="290" cy="485" r="18" />
        {/* 驱动轮 */}
        <circle cx="470" cy="465" r="58" />
        <circle cx="470" cy="465" r="28" />
        {/* 小轮 */}
        <circle cx="600" cy="485" r="38" />
        <circle cx="690" cy="485" r="38" />
        {/* 连接杆 */}
        <rect x="470" y="480" width="220" height="14" rx="7" />
      </g>
    </svg>
  );
}
