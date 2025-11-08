// Chips de ação (CTA)

export function CTAChips({ minPrice, bestBid, onOpenServices }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Compre agora */}
      <button className="group rounded-2xl border border-zinc-700 bg-zinc-900/70 px-6 py-5 text-left hover:border-green-500/50 hover:bg-green-500/5 transition-all">
        <div className="text-zinc-400 text-xs uppercase tracking-wide mb-2">Compre agora</div>
        <div className="text-zinc-300 text-xs mb-1">A partir de</div>
        <div className="text-green-400 text-2xl md:text-3xl font-black tracking-tight group-hover:text-green-300 transition-colors">
          {minPrice}
        </div>
      </button>
      
      {/* Faça uma oferta */}
      <button className="group rounded-2xl border border-zinc-700 bg-zinc-900/70 px-6 py-5 text-left hover:border-blue-500/50 hover:bg-blue-500/5 transition-all">
        <div className="text-zinc-400 text-xs uppercase tracking-wide mb-2">Faça uma oferta</div>
        <div className="text-zinc-300 text-xs mb-1">Maior oferta</div>
        <div className="text-blue-400 text-2xl md:text-3xl font-black tracking-tight group-hover:text-blue-300 transition-colors">
          {bestBid}
        </div>
      </button>
      
      {/* Outros serviços ativos */}
      <button
        onClick={onOpenServices}
        className="group rounded-2xl border-2 border-red-500/60 bg-red-500/5 px-6 py-5 text-left hover:bg-red-500/10 hover:border-red-500/80 transition-all"
      >
        <div className="text-red-300 text-xs uppercase tracking-wide mb-2">outros serviços ativos</div>
        <div className="text-red-200/90 text-sm font-medium mt-1">empréstimo com imóvel em garantia</div>
      </button>
    </div>
  );
}

