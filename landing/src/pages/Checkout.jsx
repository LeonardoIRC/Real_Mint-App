// Página de Checkout

import { useState } from "react";
import { useApp } from "../context/AppContext";
import { BRL } from "../utils/formatters";
import { projects } from "../data/projects";

export default function Checkout({ empreendimento = "N/A", onNavigate }) {
  const { opBalance, buyApartment } = useApp();
  const [processing, setProcessing] = useState(false);
  
  // Simulação: encontrar projeto e unidade (em produção viria dos dados)
  const project = projects.find((p) => p.key === empreendimento) || projects[0];
  const preco = 350000;
  const unit = { tower: "Torre 1", apt: "101", price: preco };

  const saldoSuficiente = opBalance >= preco;

  const handlePurchase = async () => {
    if (!saldoSuficiente) return;
    try {
      setProcessing(true);
      buyApartment(unit, project, preco);
      // Simular delay
      await new Promise((r) => setTimeout(r, 1000));
      alert("Compra realizada com sucesso!");
      if (onNavigate) onNavigate("empreendimentos");
    } catch (error) {
      alert("Erro: " + error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0c0e] text-zinc-100 p-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
          <div>
            <div className="text-zinc-400 text-sm">Empreendimento</div>
            <div className="text-zinc-100 font-medium">{empreendimento}</div>
          </div>
          
          <div className="pt-4 border-t border-zinc-800">
            <div className="text-zinc-400 text-sm mb-1">Valor total</div>
            <div className="text-zinc-100 text-3xl font-semibold">{BRL.format(preco)}</div>
          </div>

          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-zinc-400 text-sm">Saldo disponível</div>
              <div className={`text-lg font-semibold ${saldoSuficiente ? "text-green-400" : "text-red-400"}`}>
                {BRL.format(opBalance)}
              </div>
            </div>
            
            {!saldoSuficiente && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="text-red-300 text-sm font-medium mb-1">Saldo insuficiente</div>
                <div className="text-red-200/80 text-xs">
                  Você precisa depositar mais {BRL.format(preco - opBalance)} para completar esta compra.
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <button
              onClick={handlePurchase}
              disabled={!saldoSuficiente || processing}
              className="w-full px-5 py-3 rounded-lg bg-green-600/20 hover:bg-green-600/30 border border-green-500/40 text-green-200 font-medium disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              {processing
                ? "Processando..."
                : saldoSuficiente
                ? `Confirmar compra de ${BRL.format(preco)}`
                : "Deposite fundos para continuar"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

