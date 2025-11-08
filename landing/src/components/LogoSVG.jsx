// Componente de logo SVG para projetos

const palettes = [
  ["#22c55e", "#14532d"],
  ["#38bdf8", "#0e7490"],
  ["#f59e0b", "#78350f"],
  ["#a78bfa", "#5b21b6"],
  ["#f43f5e", "#7f1d1d"],
  ["#34d399", "#065f46"],
  ["#60a5fa", "#1e3a8a"],
  ["#eab308", "#713f12"],
  ["#c084fc", "#581c87"],
];

export const LogoSVG = ({ idx, title }) => {
  const [c1, c2] = palettes[idx % palettes.length];
  return (
    <svg viewBox="0 0 300 170" role="img" aria-label={`Logo ${title}`} className="w-full h-full">
      <defs>
        <linearGradient id={`g-${idx}`} x1="0" x2="1">
          <stop offset="0%" stopColor={c2} />
          <stop offset="100%" stopColor={c1} />
        </linearGradient>
      </defs>
      <rect width="300" height="170" fill="#0b0b0f" />
      <g transform="translate(20,20)">
        <rect x="0" y="120" width="260" height="8" fill={c2} opacity="0.8" />
        <rect x="110" y="40" width="40" height="80" fill={`url(#g-${idx})`} rx="4" />
        <rect x="60" y="60" width="30" height="60" fill={`url(#g-${idx})`} opacity="0.8" rx="3" />
        <rect x="170" y="55" width="30" height="65" fill={`url(#g-${idx})`} opacity="0.9" rx="3" />
        {Array.from({ length: 5 }).map((_, r) => (
          <g key={r}>
            <rect x="68" y={65 + r * 10} width="14" height="4" fill="#0ea5e9" opacity="0.6" />
            <rect x="118" y={45 + r * 12} width="24" height="5" fill="#a3e635" opacity="0.6" />
            <rect x="178" y={60 + r * 10} width="14" height="4" fill="#fde047" opacity="0.6" />
          </g>
        ))}
      </g>
      <text x="150" y="160" textAnchor="middle" fontSize="14" fill="#e5e7eb" fontFamily="ui-sans-serif, system-ui">
        {title}
      </text>
    </svg>
  );
};

