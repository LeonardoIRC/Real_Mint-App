// Página de detalhes do projeto

import { IArrowLeft } from "../icons";
import { getPrimaryUnits, enrichUnit } from "../../utils/helpers";
import { BRL } from "../../utils/formatters";
import { UnitCard } from "./UnitCard";
import { PriceCard } from "./PriceCard";
import { CTAChips } from "./CTAChips";

export function ProjectDetailPage({ project, onBack, onOpenServices, onOpenUnit }) {
  const units = getPrimaryUnits(project);
  const minPrice = Math.min(...units.map((u) => u.price));
  const bestBid = Math.max(0, minPrice - 20000);
  const recent = [minPrice, minPrice + 10000, minPrice + 20000];

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200"
      >
        <IArrowLeft className="w-4 h-4" /> Voltar
      </button>
      <h1 className="text-2xl md:text-3xl font-semibold">{project.name}</h1>
      <p className="text-zinc-400">{project.city} • Localização e detalhes</p>

      <CTAChips minPrice={BRL.format(minPrice)} bestBid={BRL.format(bestBid)} onOpenServices={onOpenServices} />

      <section className="border border-zinc-800 rounded-2xl p-4 md:p-6 bg-zinc-950/60">
        <h3 className="text-zinc-300 text-sm mb-4">Apartamentos disponíveis</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          {units.map((u) => (
            <UnitCard
              key={u.id}
              unit={{ ...u, price: BRL.format(u.price) }}
              onOpen={() => {
                // Passar o unit original (com preço numérico) para enrichUnit
                const enriched = enrichUnit(u);
                onOpenUnit(enriched, project);
              }}
            />
          ))}
        </div>
        <h4 className="text-zinc-300 text-sm mb-3">Últimas negociações</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {recent.map((p, idx) => (
            <PriceCard key={idx} price={BRL.format(p)} />
          ))}
        </div>
      </section>
    </div>
  );
}

