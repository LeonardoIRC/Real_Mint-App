// Card de unidade

export const UnitCard = ({ unit, onOpen }) => (
  <button
    onClick={() => onOpen?.(unit)}
    className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 flex flex-col items-center gap-3 hover:border-zinc-700 transition"
  >
    <div className="w-16 h-16 rounded-xl border border-zinc-700 bg-zinc-800 relative overflow-hidden">
      <div className="absolute inset-x-2 top-2 h-2 bg-zinc-600/40 rounded" />
      <div className="absolute left-2 top-5 w-4 h-8 bg-zinc-700/60 rounded" />
      <div className="absolute right-2 top-4 w-5 h-9 bg-zinc-700/80 rounded" />
    </div>
    <div className="text-center">
      <div className="text-sm text-zinc-300">{unit.tower}</div>
      <div className="text-xs text-zinc-400">Apto {unit.apt}</div>
    </div>
    <div className="text-center text-zinc-100 font-medium">{unit.price}</div>
  </button>
);

