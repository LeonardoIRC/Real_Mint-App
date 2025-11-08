// Página de detalhes do NFT/Imóvel

import { useState } from "react";
import { IArrowLeft, IFileText, IExternalLink } from "../icons";
import { BRL } from "../../utils/formatters";
import { statusDot } from "../../utils/helpers";
import { useApp } from "../../context/AppContext";

export function NFTDetailsPage({ unit, project, onBack }) {
  const { opBalance, buyApartment } = useApp();
  const [processing, setProcessing] = useState(false);
  if (!unit) return null;
  
  const { tower, apt, price: rawPrice, floor, number, view, bedrooms, bathrooms, suites, area } = unit;
  
  // Garantir que o preço seja sempre um número
  const price = typeof rawPrice === "string" 
    ? parseFloat(rawPrice.replace(/[^\d,.-]/g, "").replace(",", ".")) || 0
    : Number(rawPrice) || 0;
  
  // Status da tokenização - simulado (pode vir do unit ou project)
  const tokenizationStatus = project?.status || "green";
  const statusLabels = {
    green: "Tokenizado e verificado",
    yellow: "Atraso na atualização",
    red: "Houve mudança na escritura",
  };
  
  const saldoSuficiente = opBalance >= price;
  
  // Handler para compra
  const handleBuy = async () => {
    // Debug: verificar preço
    console.log("Compra iniciada:", { 
      tower, 
      apt, 
      price, 
      priceType: typeof price, 
      opBalance, 
      saldoSuficiente 
    });
    
    if (!saldoSuficiente) {
      alert(`Saldo insuficiente. Você precisa de ${BRL.format(price)} mas tem apenas ${BRL.format(opBalance)}.`);
      return;
    }
    try {
      setProcessing(true);
      // Garantir que estamos passando o preço numérico correto
      buyApartment(unit, project, price);
      await new Promise((r) => setTimeout(r, 1000));
      alert(`Compra realizada com sucesso! Apartamento ${tower} — Apto ${apt} por ${BRL.format(price)}`);
      onBack?.();
    } catch (error) {
      alert("Erro: " + error.message);
    } finally {
      setProcessing(false);
    }
  };
  
  // Handler para abrir documentos
  const handleOpenDocuments = () => {
    // Simulação: abrir em nova aba ou modal
    console.log("Abrir escritura e contrato de tokenização para:", `${project?.name} • ${tower} — Apto ${apt}`);
    // Em produção, isso abriria um PDF ou página de documentos
    window.open(`#/documentos/${project?.key}/${tower}/${apt}`, "_blank");
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200"
      >
        <IArrowLeft className="w-4 h-4" /> Voltar
      </button>
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-semibold">
          {project?.name} • {tower} — Apto {apt}
        </h1>
        <p className="text-zinc-400">{project?.city}</p>
      </header>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          {/* Planta do apartamento */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
            <div className="aspect-video w-full rounded-xl border border-zinc-800 bg-zinc-950/60 relative overflow-hidden">
              <svg
                viewBox="0 0 400 300"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Fundo */}
                <rect width="400" height="300" fill="#0a0a0f" />
                {/* Paredes externas */}
                <rect x="20" y="20" width="360" height="260" fill="none" stroke="#3f3f46" strokeWidth="2" />
                {/* Divisórias internas */}
                <line x1="20" y1="140" x2="380" y2="140" stroke="#3f3f46" strokeWidth="1.5" />
                <line x1="200" y1="20" x2="200" y2="140" stroke="#3f3f46" strokeWidth="1.5" />
                <line x1="200" y1="140" x2="200" y2="280" stroke="#3f3f46" strokeWidth="1.5" />
                <line x1="290" y1="140" x2="290" y2="280" stroke="#3f3f46" strokeWidth="1.5" />
                {/* Portas */}
                <rect x="195" y="135" width="10" height="10" fill="#52525b" rx="1" />
                <rect x="285" y="135" width="10" height="10" fill="#52525b" rx="1" />
                <rect x="195" y="270" width="10" height="10" fill="#52525b" rx="1" />
                {/* Janelas */}
                <rect x="20" y="60" width="8" height="40" fill="#14b8a6" opacity="0.3" />
                <rect x="372" y="60" width="8" height="40" fill="#14b8a6" opacity="0.3" />
                <rect x="20" y="180" width="8" height="60" fill="#14b8a6" opacity="0.3" />
                <rect x="372" y="180" width="8" height="60" fill="#14b8a6" opacity="0.3" />
                {/* Labels das salas */}
                <text x="110" y="90" fill="#71717a" fontSize="12" textAnchor="middle">Sala</text>
                <text x="110" y="110" fill="#71717a" fontSize="12" textAnchor="middle">Estar</text>
                <text x="345" y="90" fill="#71717a" fontSize="12" textAnchor="middle">Cozinha</text>
                <text x="110" y="220" fill="#71717a" fontSize="12" textAnchor="middle">Quarto 1</text>
                <text x="245" y="220" fill="#71717a" fontSize="12" textAnchor="middle">Quarto 2</text>
                <text x="345" y="220" fill="#71717a" fontSize="12" textAnchor="middle">Quarto 3</text>
                {/* Área destacada */}
                <rect x="20" y="20" width="360" height="260" fill="none" stroke="#14b8a6" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
              </svg>
              <div className="absolute left-4 bottom-4 text-zinc-500 text-xs">Planta do apartamento</div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-5">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              ["Torre", tower],
              ["Andar", floor + "º"],
              ["Número", number],
              ["Vista", view],
              ["Quartos", bedrooms],
              ["Banheiros", bathrooms],
              ["Suítes", suites],
              ["Área", area + " m²"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-zinc-800 p-3 bg-zinc-950/40">
                <div className="text-zinc-400 text-xs">{k}</div>
                <div className="text-zinc-100 font-medium capitalize">{v}</div>
              </div>
            ))}
          </div>
          
          {/* Status da Tokenização */}
          <div className="rounded-lg border border-zinc-800 p-4 bg-zinc-950/40">
            <div className="flex items-center justify-between mb-2">
              <div className="text-zinc-400 text-sm">Status da Tokenização</div>
              <span className={statusDot(tokenizationStatus)} />
            </div>
            <div className="text-zinc-100 font-medium text-sm">{statusLabels[tokenizationStatus]}</div>
          </div>
          
          {/* Escritura e Contrato */}
          <button
            onClick={handleOpenDocuments}
            className="w-full rounded-lg border border-zinc-700 hover:border-zinc-600 bg-zinc-900/60 hover:bg-zinc-800/60 p-4 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20">
                  <IFileText className="w-5 h-5 text-teal-400" />
                </div>
                <div className="text-left">
                  <div className="text-zinc-100 font-medium text-sm">Escritura e Contrato</div>
                  <div className="text-zinc-400 text-xs mt-0.5">Documentos de tokenização</div>
                </div>
              </div>
              <IExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-teal-400 transition-colors" />
            </div>
          </button>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between pt-2">
            <div className="space-y-1">
              <div className="text-zinc-400 text-sm">Preço</div>
              <div className="text-zinc-100 text-2xl font-semibold">{BRL.format(price)}</div>
              <div className="text-xs text-zinc-500">
                Saldo disponível: <span className={saldoSuficiente ? "text-green-400" : "text-red-400"}>{BRL.format(opBalance)}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button 
                onClick={handleBuy}
                disabled={!saldoSuficiente || processing}
                className="flex-1 sm:flex-none rounded-lg bg-green-600/20 hover:bg-green-600/30 border border-green-500/40 px-4 py-2.5 text-green-200 font-medium disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                {processing ? "Processando..." : saldoSuficiente ? "Compre agora" : "Saldo insuficiente"}
              </button>
              <button className="flex-1 sm:flex-none rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-zinc-200 font-medium">
                Faça uma oferta
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

