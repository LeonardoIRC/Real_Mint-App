// Card de preço

export const PriceCard = ({ price }) => (
  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 h-28 flex flex-col items-center gap-3">
    <div className="w-16 h-16 rounded-xl border border-zinc-700 bg-zinc-800 relative overflow-hidden">
      <div className="absolute inset-x-2 top-2 h-2 bg-zinc-600/40 rounded" />
      <div className="absolute left-2 top-5 w-4 h-8 bg-zinc-700/60 rounded" />
      <div className="absolute right-2 top-4 w-5 h-9 bg-zinc-700/80 rounded" />
    </div>
    <span className="text-zinc-100 font-medium">{price}</span>
  </div>
);

