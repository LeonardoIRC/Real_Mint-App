// Detalhes do condomínio (Status)

import { useState } from "react";
import { IArrowLeft } from "../icons";
import { useCondoData } from "../../utils/helpers";

const Legend = () => (
  <div className="mt-8 text-sm text-zinc-400">
    <div className="flex items-center gap-4 flex-wrap">
      <span className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-green-500"></span> OK
      </span>
      <span className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-yellow-400"></span> Atraso na atualização
      </span>
      <span className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500"></span> Houve mudança na escritura
      </span>
    </div>
  </div>
);

export function CondoDetail({ project, onBack }) {
  const { towers, negatives, name } = useCondoData(project.key, project.name);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const maxRows = Math.max(...towers.map((t) => t.apartments.length));
  const maxPage = Math.max(0, Math.ceil(maxRows / rowsPerPage) - 1);
  const slice = (list) => list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200"
        >
          <IArrowLeft className="w-4 h-4" /> Voltar
        </button>
        <h2 className="text-2xl md:text-3xl font-semibold">{name}</h2>
      </div>

      <section className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4">
        <h3 className="text-lg font-medium text-zinc-100 mb-3">Destaques</h3>
        {negatives.length === 0 ? (
          <p className="text-zinc-400">Sem alertas no momento.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {negatives.map((n, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${
                  n.type === "vermelho"
                    ? "bg-red-500/10 text-red-300 border-red-400/40"
                    : "bg-yellow-400/10 text-yellow-300 border-yellow-400/40"
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${n.type === "vermelho" ? "bg-red-500" : "bg-yellow-400"}`} />
                <span className="font-medium">{n.id}</span>
                <span className="opacity-80">{n.text}</span>
              </span>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className={`grid gap-4 ${project.key === "vila-nova" ? "grid-cols-1 md:grid-cols-4" : "grid-cols-1 md:grid-cols-2"}`}>
          {towers.map((tower) => (
            <div key={tower.name} className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                <h4 className="font-medium text-zinc-100">{tower.name}</h4>
                <span className="text-xs text-zinc-400">{tower.apartments.length} apts</span>
              </div>
              <ul className="divide-y divide-zinc-800 max-h-[520px] overflow-auto">
                {slice(tower.apartments).map((apt) => (
                  <li key={`${tower.name}-${apt}`} className="flex items-center justify-between px-4 py-2">
                    <span className="text-zinc-200">Apto {apt}</span>
                    <a href={`#doc-${tower.name}-${apt}`} className="flex items-center gap-2 text-green-400 hover:underline">
                      <span className="w-3.5 h-3.5 rounded-full bg-green-500"></span>
                      <span className="text-xs">Ver doc</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {maxPage > 0 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 disabled:opacity-40"
            >
              ◀ Anterior
            </button>
            <span className="text-sm text-zinc-400">
              Página {page + 1} de {maxPage + 1}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
              disabled={page === maxPage}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 disabled:opacity-40"
            >
              Próxima ▶
            </button>
          </div>
        )}
      </section>

      <Legend />
    </div>
  );
}

