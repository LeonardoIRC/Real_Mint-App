// Lista de projetos para Status

import { projects } from "../../data/projects";
import { statusDot } from "../../utils/helpers";

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

export function ProjectList({ onOpen }) {
  const rows = projects.slice(0, 10);
  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Status de Tokenização</h1>
        <p className="text-zinc-400 mt-2">Clique em um empreendimento para ver os apartamentos</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rows.map((p) => (
          <button
            key={p.key}
            onClick={() => onOpen(p)}
            className="flex items-center justify-between bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 transition rounded-2xl px-4 py-3 text-left"
          >
            <span className="text-base md:text-lg truncate pr-3">{p.name}</span>
            <span className={statusDot(p.status)} />
          </button>
        ))}
      </div>
      <Legend />
    </>
  );
}

