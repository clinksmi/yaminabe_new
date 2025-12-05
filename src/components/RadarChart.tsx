// src/components/RadarChart.tsx
'use client';

interface RadarChartProps {
  stats: {
    label: string;
    value: number; // 0-10の値
  }[];
}

export default function RadarChart({ stats }: RadarChartProps) {
  // 7つの頂点の座標を計算（中心が100, 100、半径70）
  const calculatePoints = (values: number[]) => {
    const center = 100;
    const maxRadius = 70;
    const angleStep = (2 * Math.PI) / 7;
    const startAngle = -Math.PI / 2;

    return values.map((value, index) => {
      const angle = startAngle + angleStep * index;
      const radius = (value / 10) * maxRadius;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y };
    });
  };

  const values = stats.map(stat => stat.value);
  const points = calculatePoints(values);
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // 背景の7角形（ガイドライン）
  const maxPoints = calculatePoints([10, 10, 10, 10, 10, 10, 10]);
  const guidelines = [2, 4, 6, 8, 10].map(level => {
    const guidePoints = calculatePoints(Array(7).fill(level));
    return guidePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  });

  // ラベルの位置を計算
  const calculateLabelPosition = (index: number) => {
    const center = 100;
    const labelRadius = 85; // ラベルを少し外側に配置
    const angleStep = (2 * Math.PI) / 7;
    const startAngle = -Math.PI / 2;
    const angle = startAngle + angleStep * index;
    
    const x = center + labelRadius * Math.cos(angle);
    const y = center + labelRadius * Math.sin(angle);
    
    return { x, y };
  };

  return (
    <div className="radar-chart">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
        {/* 中心から各頂点への線 */}
        <g stroke="#dce5eb" strokeWidth="1">
          {maxPoints.map((point, index) => (
            <path key={index} d={`M 100 100 L ${point.x} ${point.y}`} />
          ))}
        </g>
        
        {/* ガイドライン（同心7角形） */}
        <g stroke="#dce5eb" fill="none" strokeWidth="1">
          {guidelines.map((guidePath, index) => (
            <path key={index} d={guidePath} />
          ))}
        </g>
        
        {/* データの7角形 */}
        <path 
          d={pathData} 
          fill="#080eb430" 
          stroke="#080eb4" 
          strokeWidth="2"
        />
        
        {/* データポイントの円 */}
        <g fill="#080eb4">
          {points.map((point, index) => (
            <circle key={index} cx={point.x} cy={point.y} r="3" />
          ))}
        </g>
        
        {/* ラベル */}
        <g fill="#080eb4" fontSize="10" fontWeight="600" textAnchor="middle">
          {stats.map((stat, index) => {
            const pos = calculateLabelPosition(index);
            return (
              <text key={index} x={pos.x} y={pos.y} dominantBaseline="middle">
                {stat.label}
              </text>
            );
          })}
        </g>
      </svg>
    </div>
  );
}


