// Componente de logo RealMint com três variantes

export function RealMintLogo({ variant = "dark", className = "", size = "default" }) {
  // Tamanhos predefinidos
  const sizes = {
    sm: { icon: "w-6 h-6", text: "text-base" },
    default: { icon: "w-8 h-8", text: "text-lg" },
    md: { icon: "w-10 h-10", text: "text-xl" },
    lg: { icon: "w-12 h-12", text: "text-2xl" },
  };

  const { icon: iconSize, text: textSize } = sizes[size] || sizes.default;

  // Variante 1: Dark mode - Logo com ícone teal e texto teal (fundo preto)
  if (variant === "dark") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <svg
          className={iconSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="RealMint Logo"
        >
          <defs>
            <linearGradient id="gradient-dark-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
          </defs>
          {/* Ícone geométrico - faceted diamond com três facetas em tons de teal */}
          {/* Faceta superior esquerda - mais clara */}
          <path
            d="M25 50 L50 15 L50 50 Z"
            fill="#14b8a6"
            stroke="none"
          />
          {/* Faceta superior direita - média */}
          <path
            d="M50 15 L75 50 L50 50 Z"
            fill="#0d9488"
            stroke="none"
          />
          {/* Faceta inferior - mais escura */}
          <path
            d="M25 50 L50 50 L50 85 L30 70 Z"
            fill="#0f766e"
            stroke="none"
          />
        </svg>
        <span className={`font-semibold tracking-tight text-teal-400 ${textSize}`}>
          RealMint
        </span>
      </div>
    );
  }

  // Variante 2: Dark mode alternativo - Logo com ícone verde e texto off-white (fundo preto)
  if (variant === "dark-alt") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <svg
          className={iconSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="RealMint Logo"
        >
          {/* Ícone geométrico - faceted diamond com tons de verde/mint */}
          {/* Faceta superior esquerda - mint verde claro */}
          <path
            d="M25 50 L50 15 L50 50 Z"
            fill="#34d399"
            stroke="none"
          />
          {/* Faceta superior direita - verde médio */}
          <path
            d="M50 15 L75 50 L50 50 Z"
            fill="#10b981"
            stroke="none"
          />
          {/* Faceta inferior - verde escuro */}
          <path
            d="M25 50 L50 50 L50 85 L30 70 Z"
            fill="#059669"
            stroke="none"
          />
        </svg>
        <span className={`font-semibold tracking-tight text-stone-100 ${textSize}`}>
          RealMint
        </span>
      </div>
    );
  }

  // Variante 3: Light mode - Logo com ícone teal e texto teal escuro (fundo bege/creme)
  if (variant === "light") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <svg
          className={iconSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="RealMint Logo"
        >
          {/* Ícone geométrico - faceted diamond com tons de teal */}
          {/* Faceta superior esquerda - teal claro */}
          <path
            d="M25 50 L50 15 L50 50 Z"
            fill="#14b8a6"
            stroke="none"
          />
          {/* Faceta superior direita - teal médio */}
          <path
            d="M50 15 L75 50 L50 50 Z"
            fill="#0d9488"
            stroke="none"
          />
          {/* Faceta inferior - teal escuro */}
          <path
            d="M25 50 L50 50 L50 85 L30 70 Z"
            fill="#0f766e"
            stroke="none"
          />
        </svg>
        <span className={`font-semibold tracking-tight text-teal-800 ${textSize}`}>
          RealMint
        </span>
      </div>
    );
  }

  // Fallback para variante dark
  return <RealMintLogo variant="dark" className={className} size={size} />;
}

