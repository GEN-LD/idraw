export default function ExcavatorIcon({ className }) {
  return (
    <svg viewBox="0 0 900 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#1a1a1a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        {/* 履带外框 */}
        <rect x="100" y="420" width="400" height="100" rx="50" />
        {/* 三个承重轮 */}
        <circle cx="170" cy="470" r="22" />
        <circle cx="300" cy="470" r="22" />
        <circle cx="430" cy="470" r="22" />
        {/* 平台底座 */}
        <rect x="150" y="380" width="300" height="40" rx="10" />
        {/* 发动机室 */}
        <path d="M160,380 L160,275 L280,275 L280,380 Z" />
        {/* 排气管 */}
        <path d="M195,275 L195,215 L225,215 L225,275 Z" />
        {/* 驾驶室 */}
        <path d="M280,380 L280,200 L380,200 L430,380 Z" />
        {/* 警示灯 */}
        <path d="M310,200 L310,170 L350,170 L350,200 Z" />
        {/* 玻璃窗 */}
        <path d="M300,340 L300,230 L365,230 L400,340 Z" />
        {/* 机械臂底座 */}
        <path d="M380,380 L380,300 L440,300 L440,380 Z" />
        {/* 大臂 */}
        <path d="M400,350 Q460,160 630,70 L660,105 Q490,210 430,380 Z" />
        {/* 斗杆 */}
        <path d="M665,75 L771,353 L731,373 L625,105 Z" />
        {/* 铲斗（用 transform 旋转） */}
        <g transform="translate(766, 430) scale(-1, 1) rotate(-300) translate(-720, -350)">
          <path d="M745,295 L767,288 L792,270 L800,310 C805,355 785,400 740,420 C695,440 650,420 635,380 L642,340 L655,300 Z" />
        </g>
        {/* 大臂根部关节 */}
        <circle cx="410" cy="330" r="18" />
        {/* 大小臂关节 */}
        <circle cx="645" cy="88" r="18" />
      </g>
    </svg>
  );
}
