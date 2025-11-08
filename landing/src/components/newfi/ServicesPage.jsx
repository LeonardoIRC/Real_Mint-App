// Página de Acesso a Crédito

import { useState } from "react";
import { IArrowLeft } from "../icons";
import { BRL } from "../../utils/formatters";
import { useApp } from "../../context/AppContext";

export function ServicesPage({ project, onBack }) {
  const { opBalance, createFinancialApp } = useApp();
  const [processing, setProcessing] = useState(false);
  const MAX = Math.min(200000, opBalance); // Limite máximo é o menor entre 200k e o saldo operacional
  const RATE_AA = 0.3,
    TERM = 24;
  const [valor, setValor] = useState(0);
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200"
      >
        <IArrowLeft className="w-4 h-4" /> Voltar
      </button>
      <h1 className="text-2xl md:text-3xl font-semibold">Acesso a Crédito • {project.name}</h1>
      <p className="text-zinc-400">
        Empréstimo disponível para proprietários de unidades tokenizadas. O imóvel fica como{" "}
        <span className="text-zinc-200">garantia do crédito</span> e é negociado diretamente com a{" "}
        <span className="text-zinc-200">pool de empréstimos</span> (não há alienação fiduciária).
      </p>
      <section className="border border-zinc-800 rounded-2xl p-4 md:p-6 bg-zinc-950/60 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-zinc-800 p-4">
            <div className="text-zinc-400 text-sm">Valor até</div>
            <div className="text-zinc-100 text-2xl font-semibold">{BRL.format(MAX)}</div>
            <div className="text-zinc-500 text-xs mt-1">
              Saldo disponível: {BRL.format(opBalance)}
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-800 p-4">
            <div className="text-zinc-400 text-sm">Juros estimados</div>
            <div className="text-green-400 text-2xl font-semibold">{(RATE_AA * 100).toFixed(1)}% a.a.</div>
            <div className="text-zinc-500 text-xs mt-1">abaixo da taxa média de hipoteca</div>
          </div>
          <div className="rounded-2xl border border-zinc-800 p-4">
            <div className="text-zinc-400 text-sm">Prazo</div>
            <div className="text-zinc-100 text-2xl font-semibold">{TERM} meses</div>
          </div>
        </div>
        <ul className="list-disc pl-6 text-zinc-300 space-y-1">
          <li>
            Imóvel como <strong>garantia</strong>, negociado com a pool de empréstimos (sem alienação fiduciária).
          </li>
          <li>Não há análise de crédito.</li>
          <li>Liberação imediata.</li>
          <li>Qualquer proprietário pode acessar o crédito diretamente.</li>
        </ul>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-zinc-300 text-sm">Quanto deseja pegar emprestado?</label>
            {opBalance < 200000 && (
              <span className="text-xs text-yellow-400">Limitado pelo saldo disponível</span>
            )}
          </div>
          <input
            type="range"
            min="0"
            max={MAX || 1}
            step="1000"
            value={valor}
            onChange={(e) => setValor(Math.min(Number(e.target.value), MAX))}
            disabled={MAX === 0}
            className="w-full accent-green-500 disabled:opacity-40"
          />
          <div className="flex justify-between text-zinc-400 text-sm">
            <span>R$ 0</span>
            <span>{BRL.format(valor)}</span>
            <span>{BRL.format(MAX)}</span>
          </div>
          {MAX === 0 && (
            <p className="text-xs text-red-400">Você precisa depositar fundos para acessar o crédito.</p>
          )}
          <button 
            onClick={async () => {
              if (valor === 0 || valor > MAX || MAX === 0) return;
              try {
                setProcessing(true);
                createFinancialApp("borrow", { 
                  amount: valor, 
                  rate: RATE_AA * 100, 
                  term: TERM,
                  project: project.name 
                });
                await new Promise((r) => setTimeout(r, 1000));
                alert("Empréstimo realizado com sucesso!");
                setValor(0);
              } catch (error) {
                alert("Erro: " + error.message);
              } finally {
                setProcessing(false);
              }
            }}
            disabled={valor === 0 || valor > MAX || MAX === 0 || processing}
            className="w-full rounded-lg bg-green-600/20 border border-green-500/40 hover:bg-green-600/30 px-4 py-3 text-green-200 mt-2 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {processing
              ? "Processando..."
              : MAX === 0
              ? "Deposite fundos para acessar crédito"
              : `Pegar empréstimo de ${BRL.format(valor)}`}
          </button>
        </div>
      </section>
      <p className="text-xs text-zinc-500">*Valores e taxas ilustrativos para protótipo.</p>
    </div>
  );
}

