// Página de Empreste

import { useState } from "react";
import { IArrowLeft } from "../icons";
import { BRL } from "../../utils/formatters";
import { useApp } from "../../context/AppContext";

export function LendPage({ onBack }) {
  const { opBalance, createFinancialApp } = useApp();
  const [processing, setProcessing] = useState(false);
  const stats = { rendimento: 20, poolValue: 2500000, emprestimosAtivos: 42, emprestadores: 128 };
  const maxValor = opBalance; // Limite máximo é o saldo operacional
  const [valor, setValor] = useState(Math.min(50000, maxValor));
  
  const handleInput = (e) => {
    const value = e.target.value;
    // Remove tudo exceto números
    const only = value.replace(/[^0-9]/g, "");
    const n = Number(only);
    const limited = Math.min(n, maxValor);
    setValor(isNaN(limited) ? 0 : limited);
  };
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200"
        >
          <IArrowLeft className="w-4 h-4" /> Voltar
        </button>
      </div>
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Empreste</h1>
        <p className="text-zinc-400 max-w-3xl">
          Empreste capital para os proprietários dos nossos empreendimentos e receba rendimento anual com colateral
          imobiliário tokenizado.
        </p>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <div className="text-zinc-400 text-sm">Rendimento anual</div>
          <div className="text-green-400 text-3xl font-semibold">{stats.rendimento}%</div>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <div className="text-zinc-400 text-sm">Valor total em pool</div>
          <div className="text-zinc-100 text-2xl font-semibold">{BRL.format(stats.poolValue)}</div>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <div className="text-zinc-400 text-sm">Empréstimos ativos</div>
          <div className="text-blue-400 text-2xl font-semibold">{stats.emprestimosAtivos}</div>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <div className="text-zinc-400 text-sm">Emprestadores ativos</div>
          <div className="text-purple-400 text-2xl font-semibold">{stats.emprestadores}</div>
        </div>
      </section>
      <section className="border border-zinc-800 rounded-2xl p-6 md:p-8 bg-zinc-950/60 space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">Como funciona</h2>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-3 text-zinc-300">
            <p className="leading-relaxed text-zinc-400">
              Quem empresta fornece liquidez para <span className="text-zinc-200">donos de apartamentos</span>. Crédito
              limitado a <span className="text-zinc-200">60% do valor de mercado</span> do apto como LTV.
            </p>
            <p className="leading-relaxed text-zinc-400">
              Imóvel como colateral e liberação imediata. <span className="text-zinc-200">Qualquer valor é aceito</span>{" "}
              na pool.
            </p>
            <p className="leading-relaxed text-zinc-400">
              Inadimplência: imóvel é <span className="text-zinc-200">liquidado no primeiro lance</span> ou pela pool,
              quitando o empréstimo e juros.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-zinc-400">Quanto deseja emprestar agora?</div>
                <div className="text-xs text-zinc-500">
                  Saldo disponível: <span className="text-green-400 font-medium">{BRL.format(maxValor)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={valor === 0 ? "" : valor.toLocaleString("pt-BR")}
                onChange={handleInput}
                placeholder="0"
                max={maxValor}
                className="flex-1 rounded-lg bg-zinc-950/60 border border-zinc-800 px-3 py-2 text-zinc-100 focus:outline-none focus:border-zinc-600"
              />
              </div>
              {maxValor === 0 && (
                <p className="text-xs text-red-400 mt-2">Você precisa depositar fundos para emprestar.</p>
              )}
            </div>
            <input
              type="range"
              min={0}
              max={maxValor || 1}
              step={1000}
              value={valor}
              onChange={(e) => setValor(Math.min(Number(e.target.value), maxValor))}
              disabled={maxValor === 0}
              className="w-full accent-green-500 disabled:opacity-40"
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-1">
              <span>R$ 0</span>
              <span>{BRL.format(valor)}</span>
              <span>{BRL.format(maxValor)}</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-zinc-800 p-3 bg-zinc-950/40">
                <div className="text-zinc-400">LTV por unidade</div>
                <div className="text-zinc-200 font-medium">até 60% do valor de mercado</div>
              </div>
              <div className="rounded-lg border border-zinc-800 p-3 bg-zinc-950/40">
                <div className="text-zinc-400">Liquidação</div>
                <div className="text-zinc-200 font-medium">1º lance / pool quita</div>
              </div>
            </div>
            <button 
              onClick={async () => {
                if (valor === 0 || valor > maxValor || maxValor === 0) return;
                try {
                  setProcessing(true);
                  createFinancialApp("lend", { amount: valor, rate: 20 });
                  await new Promise((r) => setTimeout(r, 1000));
                  alert("Empréstimo realizado com sucesso!");
                  setValor(0);
                } catch (error) {
                  alert("Erro: " + error.message);
                } finally {
                  setProcessing(false);
                }
              }}
              disabled={valor === 0 || valor > maxValor || maxValor === 0 || processing}
              className="mt-5 w-full px-5 py-3 rounded-lg bg-green-600/20 hover:bg-green-600/30 border border-green-500/40 text-green-200 font-medium disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              {processing
                ? "Processando..."
                : maxValor === 0
                ? "Deposite fundos para emprestar"
                : `Emprestar ${BRL.format(valor)} para a pool`}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

