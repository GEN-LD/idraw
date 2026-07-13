export default function RabbitIcon({ className }) {
  return (
    <svg viewBox="0 0 900 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#1a1a1a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        {/* 左耳朵 */}
        <ellipse cx="330" cy="110" rx="55" ry="140" transform="rotate(-15 330 110)" />
        {/* 右耳朵 */}
        <ellipse cx="570" cy="110" rx="55" ry="140" transform="rotate(15 570 110)" />
        {/* 左耳内侧 */}
        <ellipse cx="330" cy="110" rx="30" ry="95" transform="rotate(-15 330 110)" />
        {/* 右耳内侧 */}
        <ellipse cx="570" cy="110" rx="30" ry="95" transform="rotate(15 570 110)" />
        {/* 头部 */}
        <circle cx="450" cy="280" r="170" />
        {/* 身体 */}
        <path d="M 320,430 C 280,470 290,550 340,575 L 560,575 C 610,550 620,470 580,430 C 540,390 360,390 320,430 Z" />
        {/* 尾巴 */}
        <circle cx="610" cy="510" r="35" />
        {/* 左脚 */}
        <ellipse cx="360" cy="580" rx="60" ry="35" />
        {/* 右脚 */}
        <ellipse cx="540" cy="580" rx="60" ry="35" />
        {/* 左手 */}
        <ellipse cx="400" cy="500" rx="40" ry="65" transform="rotate(-10 400 500)" />
        {/* 右手 */}
        <ellipse cx="500" cy="500" rx="40" ry="65" transform="rotate(10 500 500)" />
        {/* 面部细节 */}
        <ellipse cx="400" cy="270" rx="16" ry="20" fill="#1a1a1a" />
        <ellipse cx="500" cy="270" rx="16" ry="20" fill="#1a1a1a" />
        <ellipse cx="450" cy="310" rx="12" ry="8" fill="#1a1a1a" />
        <path d="M 430,335 Q 440,350 450,340 Q 460,350 470,335" />
      </g>
    </svg>
  );
}
