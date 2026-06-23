const MODULES = [
  { id: 'steam-1', name: '蒸汽1' },
  { id: 'steam-2', name: '蒸汽2' },
  { id: 'steam-3', name: '蒸汽3' },
  { id: 'headlight-beam', name: '灯光束' },
  { id: 'sleeper-1', name: '枕木1' },
  { id: 'sleeper-2', name: '枕木2' },
  { id: 'sleeper-3', name: '枕木3' },
  { id: 'sleeper-4', name: '枕木4' },
  { id: 'sleeper-5', name: '枕木5' },
  { id: 'sleeper-6', name: '枕木6' },
  { id: 'sleeper-7', name: '枕木7' },
  { id: 'sleeper-8', name: '枕木8' },
  { id: 'sleeper-9', name: '枕木9' },
  { id: 'sleeper-10', name: '枕木10' },
  { id: 'rail', name: '铁轨' },
  { id: 'connector-1', name: '连接器上' },
  { id: 'connector-2', name: '连接器下' },
  { id: 'passenger-body', name: '车厢主体' },
  { id: 'passenger-roof', name: '车厢顶' },
  { id: 'window-1', name: '车窗1' },
  { id: 'window-2', name: '车窗2' },
  { id: 'window-3', name: '车窗3' },
  { id: 'cowcatcher', name: '排障器' },
  { id: 'boiler', name: '锅炉' },
  { id: 'chimney', name: '烟囱' },
  { id: 'headlight', name: '前照灯' },
  { id: 'cab', name: '驾驶室' },
  { id: 'cab-roof', name: '驾驶室顶' },
  { id: 'cab-window', name: '驾驶室窗' },
  { id: 'car-wheel-1-outer', name: '车厢轮1外' },
  { id: 'car-wheel-1-mid', name: '车厢轮1中' },
  { id: 'car-wheel-1-inner', name: '车厢轮1内' },
  { id: 'car-wheel-2-outer', name: '车厢轮2外' },
  { id: 'car-wheel-2-mid', name: '车厢轮2中' },
  { id: 'car-wheel-2-inner', name: '车厢轮2内' },
  { id: 'drive-wheel-outer', name: '驱动轮外' },
  { id: 'drive-wheel-mid', name: '驱动轮中' },
  { id: 'drive-wheel-inner', name: '驱动轮内' },
  { id: 'small-wheel-1-outer', name: '小轮1外' },
  { id: 'small-wheel-1-mid', name: '小轮1中' },
  { id: 'small-wheel-1-inner', name: '小轮1内' },
  { id: 'small-wheel-2-outer', name: '小轮2外' },
  { id: 'small-wheel-2-mid', name: '小轮2中' },
  { id: 'small-wheel-2-inner', name: '小轮2内' },
  { id: 'connecting-rod', name: '连接杆' },
  { id: 'rod-pin-1', name: '销1' },
  { id: 'rod-pin-2', name: '销2' },
  { id: 'rod-pin-3', name: '销3' },
];

export default function TrainColoring({ onModuleClick, moduleColors }) {
  const fill = (id) => moduleColors?.[id] || '#FFFFFF';

  return (
    <svg className="coloring-svg" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <g className="coloring-modules">
        {/* 蒸汽/烟雾 */}
        <circle className="coloring-module" data-module-id="steam-1" data-module-name="蒸汽1"
                cx="665" cy="105" r="18"
                fill={fill('steam-1')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('steam-1', e)} />
        <circle className="coloring-module" data-module-id="steam-2" data-module-name="蒸汽2"
                cx="595" cy="75" r="26"
                fill={fill('steam-2')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('steam-2', e)} />
        <circle className="coloring-module" data-module-id="steam-3" data-module-name="蒸汽3"
                cx="505" cy="55" r="34"
                fill={fill('steam-3')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('steam-3', e)} />

        {/* 车头灯光束 */}
        <path className="coloring-module" data-module-id="headlight-beam" data-module-name="灯光束"
              d="M740,350 L860,270 Q890,350 860,430 Z"
              fill={fill('headlight-beam')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('headlight-beam', e)} />

        {/* 枕木 */}
        <rect className="coloring-module" data-module-id="sleeper-1" data-module-name="枕木1"
              x="80" y="535" width="20" height="15" rx="2"
              fill={fill('sleeper-1')} stroke="#1a1a1a" strokeWidth="3"
              onClick={(e) => onModuleClick?.('sleeper-1', e)} />
        <rect className="coloring-module" data-module-id="sleeper-2" data-module-name="枕木2"
              x="160" y="535" width="20" height="15" rx="2"
              fill={fill('sleeper-2')} stroke="#1a1a1a" strokeWidth="3"
              onClick={(e) => onModuleClick?.('sleeper-2', e)} />
        <rect className="coloring-module" data-module-id="sleeper-3" data-module-name="枕木3"
              x="240" y="535" width="20" height="15" rx="2"
              fill={fill('sleeper-3')} stroke="#1a1a1a" strokeWidth="3"
              onClick={(e) => onModuleClick?.('sleeper-3', e)} />
        <rect className="coloring-module" data-module-id="sleeper-4" data-module-name="枕木4"
              x="320" y="535" width="20" height="15" rx="2"
              fill={fill('sleeper-4')} stroke="#1a1a1a" strokeWidth="3"
              onClick={(e) => onModuleClick?.('sleeper-4', e)} />
        <rect className="coloring-module" data-module-id="sleeper-5" data-module-name="枕木5"
              x="400" y="535" width="20" height="15" rx="2"
              fill={fill('sleeper-5')} stroke="#1a1a1a" strokeWidth="3"
              onClick={(e) => onModuleClick?.('sleeper-5', e)} />
        <rect className="coloring-module" data-module-id="sleeper-6" data-module-name="枕木6"
              x="480" y="535" width="20" height="15" rx="2"
              fill={fill('sleeper-6')} stroke="#1a1a1a" strokeWidth="3"
              onClick={(e) => onModuleClick?.('sleeper-6', e)} />
        <rect className="coloring-module" data-module-id="sleeper-7" data-module-name="枕木7"
              x="560" y="535" width="20" height="15" rx="2"
              fill={fill('sleeper-7')} stroke="#1a1a1a" strokeWidth="3"
              onClick={(e) => onModuleClick?.('sleeper-7', e)} />
        <rect className="coloring-module" data-module-id="sleeper-8" data-module-name="枕木8"
              x="640" y="535" width="20" height="15" rx="2"
              fill={fill('sleeper-8')} stroke="#1a1a1a" strokeWidth="3"
              onClick={(e) => onModuleClick?.('sleeper-8', e)} />
        <rect className="coloring-module" data-module-id="sleeper-9" data-module-name="枕木9"
              x="720" y="535" width="20" height="15" rx="2"
              fill={fill('sleeper-9')} stroke="#1a1a1a" strokeWidth="3"
              onClick={(e) => onModuleClick?.('sleeper-9', e)} />
        <rect className="coloring-module" data-module-id="sleeper-10" data-module-name="枕木10"
              x="800" y="535" width="20" height="15" rx="2"
              fill={fill('sleeper-10')} stroke="#1a1a1a" strokeWidth="3"
              onClick={(e) => onModuleClick?.('sleeper-10', e)} />

        {/* 铁轨主线 */}
        <rect className="coloring-module" data-module-id="rail" data-module-name="铁轨"
              x="40" y="525" width="820" height="10" rx="4"
              fill={fill('rail')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('rail', e)} />

        {/* 车厢连接器 */}
        <rect className="coloring-module" data-module-id="connector-1" data-module-name="连接器上"
              x="360" y="405" width="40" height="15"
              fill={fill('connector-1')} stroke="#1a1a1a" strokeWidth="3"
              onClick={(e) => onModuleClick?.('connector-1', e)} />
        <rect className="coloring-module" data-module-id="connector-2" data-module-name="连接器下"
              x="360" y="425" width="40" height="15"
              fill={fill('connector-2')} stroke="#1a1a1a" strokeWidth="3"
              onClick={(e) => onModuleClick?.('connector-2', e)} />

        {/* 客运车厢主体 */}
        <rect className="coloring-module" data-module-id="passenger-body" data-module-name="车厢主体"
              x="80" y="250" width="280" height="200" rx="12"
              fill={fill('passenger-body')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('passenger-body', e)} />
        {/* 车厢顶 */}
        <rect className="coloring-module" data-module-id="passenger-roof" data-module-name="车厢顶"
              x="70" y="220" width="300" height="30" rx="15"
              fill={fill('passenger-roof')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('passenger-roof', e)} />
        {/* 车厢窗户 */}
        <rect className="coloring-module" data-module-id="window-1" data-module-name="车窗1"
              x="110" y="280" width="50" height="70" rx="8"
              fill={fill('window-1')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('window-1', e)} />
        <rect className="coloring-module" data-module-id="window-2" data-module-name="车窗2"
              x="195" y="280" width="50" height="70" rx="8"
              fill={fill('window-2')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('window-2', e)} />
        <rect className="coloring-module" data-module-id="window-3" data-module-name="车窗3"
              x="280" y="280" width="50" height="70" rx="8"
              fill={fill('window-3')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('window-3', e)} />

        {/* 排障器 */}
        <path className="coloring-module" data-module-id="cowcatcher" data-module-name="排障器"
              d="M720,450 L800,520 L720,420 Z"
              fill={fill('cowcatcher')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('cowcatcher', e)} />

        {/* 锅炉 */}
        <rect className="coloring-module" data-module-id="boiler" data-module-name="锅炉"
              x="540" y="280" width="180" height="170" rx="30"
              fill={fill('boiler')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('boiler', e)} />
        {/* 烟囱 */}
        <path className="coloring-module" data-module-id="chimney" data-module-name="烟囱"
              d="M640,280 L640,160 L620,130 L700,130 L680,160 L680,280 Z"
              fill={fill('chimney')} stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
              onClick={(e) => onModuleClick?.('chimney', e)} />
        {/* 前照灯 */}
        <rect className="coloring-module" data-module-id="headlight" data-module-name="前照灯"
              x="710" y="330" width="30" height="40" rx="10"
              fill={fill('headlight')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('headlight', e)} />

        {/* 驾驶室 */}
        <rect className="coloring-module" data-module-id="cab" data-module-name="驾驶室"
              x="400" y="180" width="140" height="270" rx="10"
              fill={fill('cab')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('cab', e)} />
        {/* 驾驶室车顶 */}
        <rect className="coloring-module" data-module-id="cab-roof" data-module-name="驾驶室顶"
              x="380" y="150" width="180" height="30" rx="15"
              fill={fill('cab-roof')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('cab-roof', e)} />
        {/* 驾驶室窗户 */}
        <rect className="coloring-module" data-module-id="cab-window" data-module-name="驾驶室窗"
              x="430" y="210" width="70" height="80" rx="10"
              fill={fill('cab-window')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('cab-window', e)} />

        {/* 车厢轮子 1 */}
        <circle className="coloring-module" data-module-id="car-wheel-1-outer" data-module-name="车厢轮1外"
                cx="150" cy="485" r="40"
                fill={fill('car-wheel-1-outer')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('car-wheel-1-outer', e)} />
        <circle className="coloring-module" data-module-id="car-wheel-1-mid" data-module-name="车厢轮1中"
                cx="150" cy="485" r="20"
                fill={fill('car-wheel-1-mid')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('car-wheel-1-mid', e)} />
        <circle className="coloring-module" data-module-id="car-wheel-1-inner" data-module-name="车厢轮1内"
                cx="150" cy="485" r="8"
                fill={fill('car-wheel-1-inner')} stroke="#1a1a1a" strokeWidth="3"
                onClick={(e) => onModuleClick?.('car-wheel-1-inner', e)} />

        {/* 车厢轮子 2 */}
        <circle className="coloring-module" data-module-id="car-wheel-2-outer" data-module-name="车厢轮2外"
                cx="290" cy="485" r="40"
                fill={fill('car-wheel-2-outer')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('car-wheel-2-outer', e)} />
        <circle className="coloring-module" data-module-id="car-wheel-2-mid" data-module-name="车厢轮2中"
                cx="290" cy="485" r="20"
                fill={fill('car-wheel-2-mid')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('car-wheel-2-mid', e)} />
        <circle className="coloring-module" data-module-id="car-wheel-2-inner" data-module-name="车厢轮2内"
                cx="290" cy="485" r="8"
                fill={fill('car-wheel-2-inner')} stroke="#1a1a1a" strokeWidth="3"
                onClick={(e) => onModuleClick?.('car-wheel-2-inner', e)} />

        {/* 车头大驱动轮 */}
        <circle className="coloring-module" data-module-id="drive-wheel-outer" data-module-name="驱动轮外"
                cx="470" cy="465" r="60"
                fill={fill('drive-wheel-outer')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('drive-wheel-outer', e)} />
        <circle className="coloring-module" data-module-id="drive-wheel-mid" data-module-name="驱动轮中"
                cx="470" cy="465" r="30"
                fill={fill('drive-wheel-mid')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('drive-wheel-mid', e)} />
        <circle className="coloring-module" data-module-id="drive-wheel-inner" data-module-name="驱动轮内"
                cx="470" cy="465" r="10"
                fill={fill('drive-wheel-inner')} stroke="#1a1a1a" strokeWidth="3"
                onClick={(e) => onModuleClick?.('drive-wheel-inner', e)} />

        {/* 车头小轮 1 */}
        <circle className="coloring-module" data-module-id="small-wheel-1-outer" data-module-name="小轮1外"
                cx="600" cy="485" r="40"
                fill={fill('small-wheel-1-outer')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('small-wheel-1-outer', e)} />
        <circle className="coloring-module" data-module-id="small-wheel-1-mid" data-module-name="小轮1中"
                cx="600" cy="485" r="20"
                fill={fill('small-wheel-1-mid')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('small-wheel-1-mid', e)} />
        <circle className="coloring-module" data-module-id="small-wheel-1-inner" data-module-name="小轮1内"
                cx="600" cy="485" r="8"
                fill={fill('small-wheel-1-inner')} stroke="#1a1a1a" strokeWidth="3"
                onClick={(e) => onModuleClick?.('small-wheel-1-inner', e)} />

        {/* 车头小轮 2 */}
        <circle className="coloring-module" data-module-id="small-wheel-2-outer" data-module-name="小轮2外"
                cx="690" cy="485" r="40"
                fill={fill('small-wheel-2-outer')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('small-wheel-2-outer', e)} />
        <circle className="coloring-module" data-module-id="small-wheel-2-mid" data-module-name="小轮2中"
                cx="690" cy="485" r="20"
                fill={fill('small-wheel-2-mid')} stroke="#1a1a1a" strokeWidth="4"
                onClick={(e) => onModuleClick?.('small-wheel-2-mid', e)} />
        <circle className="coloring-module" data-module-id="small-wheel-2-inner" data-module-name="小轮2内"
                cx="690" cy="485" r="8"
                fill={fill('small-wheel-2-inner')} stroke="#1a1a1a" strokeWidth="3"
                onClick={(e) => onModuleClick?.('small-wheel-2-inner', e)} />

        {/* 驱动连接杆 */}
        <rect className="coloring-module" data-module-id="connecting-rod" data-module-name="连接杆"
              x="470" y="480" width="220" height="14" rx="7"
              fill={fill('connecting-rod')} stroke="#1a1a1a" strokeWidth="4"
              onClick={(e) => onModuleClick?.('connecting-rod', e)} />
        <circle className="coloring-module" data-module-id="rod-pin-1" data-module-name="销1"
                cx="470" cy="487" r="6"
                fill={fill('rod-pin-1')} stroke="#1a1a1a" strokeWidth="3"
                onClick={(e) => onModuleClick?.('rod-pin-1', e)} />
        <circle className="coloring-module" data-module-id="rod-pin-2" data-module-name="销2"
                cx="600" cy="487" r="6"
                fill={fill('rod-pin-2')} stroke="#1a1a1a" strokeWidth="3"
                onClick={(e) => onModuleClick?.('rod-pin-2', e)} />
        <circle className="coloring-module" data-module-id="rod-pin-3" data-module-name="销3"
                cx="690" cy="487" r="6"
                fill={fill('rod-pin-3')} stroke="#1a1a1a" strokeWidth="3"
                onClick={(e) => onModuleClick?.('rod-pin-3', e)} />
      </g>
    </svg>
  );
}

export { MODULES };
