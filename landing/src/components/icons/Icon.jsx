// Componente base de ícone (Lucide-style inline)

export const Icon = ({ d, stroke = "currentColor", className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {Array.isArray(d) ? d.map((seg, i) => <path d={seg} key={i} />) : <path d={d} />}
  </svg>
);

