// Grid de empreendimentos

import { useState } from "react";
import { projects } from "../../data/projects";
import { statusDot } from "../../utils/helpers";
import { LogoSVG } from "../LogoSVG";

export function EmpreendimentosGrid({ onOpen }) {
  const [page, setPage] = useState(0);
  const perPage = 9;
  const total = Math.max(1, Math.ceil(projects.length / perPage));
  const slice = projects.slice(page * perPage, page * perPage + perPage);

  return (
    <div className="space-y-6">
      <header className="mb-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Empreendimentos</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {slice.map((p, i) => (
          <article
            key={p.key}
            className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition flex flex-col"
          >
            <div className="aspect-video w-full bg-zinc-800 flex items-center justify-center overflow-hidden">
              <LogoSVG idx={page * perPage + i} title={p.name} />
            </div>
            <div className="p-4 w-full flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-medium text-zinc-100 truncate">{p.name}</h3>
                <p className="text-xs text-zinc-400 mt-1 truncate">{p.city}</p>
              </div>
              <span className={statusDot(p.status)} />
            </div>
            <div className="px-4 pb-4 w-full">
              <button
                onClick={() => onOpen(p)}
                className="w-full text-center text-sm bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg py-2"
              >
                Ver detalhes
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 disabled:opacity-40"
        >
          ◀ Anterior
        </button>
        <span className="text-sm text-zinc-400">
          Página {page + 1} de {total}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(total - 1, p + 1))}
          disabled={page >= total - 1}
          className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 disabled:opacity-40"
        >
          Próxima ▶
        </button>
      </div>
    </div>
  );
}

