// Página de Investidores - Pool de Liquidez (SUDOSWAP/Uniswap V3)

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { BRL } from "../../utils/formatters";
import { IArrowLeft, IPie } from "../icons";

export function InvestorsPage({ onBack }) {
  const appContext = useApp();
  const portfolio = appContext?.portfolio || [];
  const opBalance = appContext?.opBalance || 0;
  const liquidityPools = appContext?.liquidityPools || [];
  const createLiquidityPool = appContext?.createLiquidityPool || (() => {
    console.error("createLiquidityPool não está disponível no contexto");
    throw new Error("createLiquidityPool não está disponível");
  });
  
  // Debug: verificar se o componente está sendo renderizado
  console.log("InvestorsPage renderizado", { portfolio, opBalance, liquidityPools, hasCreateLiquidityPool: !!createLiquidityPool });
  const [showInfo, setShowInfo] = useState(true);
  const [formData, setFormData] = useState({
    projectKey: "",
    numApartments: 5,
    capitalAmount: 0,
    priceMin: 200000,
    priceMax: 500000,
  });
  const [processing, setProcessing] = useState(false);

  // Calcular colateral necessário (baseado nos apartamentos e capital)
  const calculateCollateral = () => {
    const avgPrice = (formData.priceMin + formData.priceMax) / 2;
    const apartmentsValue = formData.numApartments * avgPrice;
    const totalValue = apartmentsValue + formData.capitalAmount;
    return totalValue;
  };

  // Rendimento anual estimado (exemplo: 18% a.a.)
  const ANNUAL_YIELD = 18; // 18% a.a.
  const estimatedAnnualYield = (calculateCollateral() * ANNUAL_YIELD) / 100;

  const availableApartments = portfolio.filter(
    (apt) => !formData.projectKey || apt.project.key === formData.projectKey
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.numApartments > availableApartments.length) {
      alert(`Você precisa de ${formData.numApartments} apartamentos, mas possui apenas ${availableApartments.length}.`);
      return;
    }
    if (formData.capitalAmount > opBalance) {
      alert(`Saldo insuficiente. Você precisa de ${BRL.format(formData.capitalAmount)} mas tem apenas ${BRL.format(opBalance)}.`);
      return;
    }
    if (formData.priceMin >= formData.priceMax) {
      alert("O preço mínimo deve ser menor que o preço máximo.");
      return;
    }

    try {
      setProcessing(true);
      const pool = createLiquidityPool({
        projectKey: formData.projectKey,
        numApartments: formData.numApartments,
        capitalAmount: formData.capitalAmount,
        priceRange: { min: formData.priceMin, max: formData.priceMax },
        apartments: availableApartments.slice(0, formData.numApartments),
      });
      await new Promise((r) => setTimeout(r, 1500));
      alert(`Pool de liquidez criada com sucesso! Rendimento estimado: ${BRL.format(estimatedAnnualYield)}/ano`);
      // Reset form
      setFormData({
        projectKey: "",
        numApartments: 5,
        capitalAmount: 0,
        priceMin: 200000,
        priceMax: 500000,
      });
    } catch (error) {
      alert("Erro: " + error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200"
      >
        <IArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <header>
        <h1 className="text-3xl font-bold">Investidores</h1>
        <p className="text-zinc-400 mt-2">Pool de Liquidez para Investidores de Longo Prazo</p>
      </header>

      {/* Mensagem Informativa */}
      {showInfo && (
        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6 relative">
          <button
            onClick={() => setShowInfo(false)}
            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200 transition"
          >
            ✕
          </button>
          <div className="flex items-start gap-4">
            <IPie className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-blue-200">Para Investidores com Tickets Maiores</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Esta seção é destinada a investidores com tickets maiores e objetivo de longo prazo que desejam gerar
                renda passiva a partir dos imóveis que possuem e até mesmo comprar mais imóveis com uma visão de longo
                prazo, atuando como <strong className="text-blue-200">provedores de liquidez</strong>.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                O modelo funciona similar ao <strong>SUDOSWAP</strong> / <strong>Uniswap V3</strong>, onde você define uma
                faixa de preços e garante liquidez dentro desse range, comprando e vendendo apartamentos automaticamente
                e gerando renda através das taxas de negociação.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rendimento Anual em Destaque */}
      {formData.numApartments > 0 && formData.capitalAmount > 0 && (
        <div className="rounded-2xl border-2 border-green-500/50 bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-zinc-400 text-sm mb-1">Rendimento Anual Estimado</div>
              <div className="text-4xl font-black text-green-400">{ANNUAL_YIELD}% a.a.</div>
              <div className="text-zinc-300 text-lg font-semibold mt-2">
                {BRL.format(estimatedAnnualYield)}/ano
              </div>
            </div>
            <div className="text-right">
              <div className="text-zinc-400 text-xs mb-1">Valor Total da Pool</div>
              <div className="text-2xl font-semibold text-zinc-100">{BRL.format(calculateCollateral())}</div>
            </div>
          </div>
        </div>
      )}

      {/* Formulário de Criação de Pool */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-5">
          <h2 className="text-xl font-semibold">Criar Pool de Liquidez</h2>

          {/* Número de Apartamentos */}
          <div>
            <label className="block text-zinc-300 text-sm mb-2">
              Número de Apartamentos na Pool
            </label>
            <input
              type="number"
              min="1"
              max={availableApartments.length}
              value={formData.numApartments}
              onChange={(e) =>
                setFormData({ ...formData, numApartments: Math.max(1, parseInt(e.target.value) || 1) })
              }
              className="w-full rounded-lg bg-zinc-950/60 border border-zinc-800 px-4 py-2.5 text-zinc-100"
            />
            <p className="text-zinc-500 text-xs mt-1">
              Você possui {availableApartments.length} apartamento(s) disponível(is)
            </p>
          </div>

          {/* Capital em Reais */}
          <div>
            <label className="block text-zinc-300 text-sm mb-2">
              Capital em Reais (R$)
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={formData.capitalAmount}
              onChange={(e) =>
                setFormData({ ...formData, capitalAmount: Math.max(0, parseFloat(e.target.value) || 0) })
              }
              className="w-full rounded-lg bg-zinc-950/60 border border-zinc-800 px-4 py-2.5 text-zinc-100"
            />
            <p className="text-zinc-500 text-xs mt-1">
              Saldo disponível: <span className="text-green-400">{BRL.format(opBalance)}</span>
            </p>
          </div>

          {/* Faixa de Preços */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-300 text-sm mb-2">Preço Mínimo (R$)</label>
              <input
                type="number"
                min="0"
                step="10000"
                value={formData.priceMin}
                onChange={(e) =>
                  setFormData({ ...formData, priceMin: Math.max(0, parseFloat(e.target.value) || 0) })
                }
                className="w-full rounded-lg bg-zinc-950/60 border border-zinc-800 px-4 py-2.5 text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-zinc-300 text-sm mb-2">Preço Máximo (R$)</label>
              <input
                type="number"
                min={formData.priceMin}
                step="10000"
                value={formData.priceMax}
                onChange={(e) =>
                  setFormData({ ...formData, priceMax: Math.max(formData.priceMin, parseFloat(e.target.value) || formData.priceMin) })
                }
                className="w-full rounded-lg bg-zinc-950/60 border border-zinc-800 px-4 py-2.5 text-zinc-100"
              />
            </div>
          </div>

          {/* Resumo */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Valor dos Apartamentos</span>
              <span className="text-zinc-200 font-medium">
                {BRL.format((formData.numApartments * (formData.priceMin + formData.priceMax)) / 2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Capital em Reais</span>
              <span className="text-zinc-200 font-medium">{BRL.format(formData.capitalAmount)}</span>
            </div>
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-zinc-300 font-medium">Valor Total da Pool</span>
              <span className="text-green-400 text-lg font-semibold">{BRL.format(calculateCollateral())}</span>
            </div>
          </div>

          {/* Botão de Submit */}
          <button
            type="submit"
            disabled={
              processing ||
              formData.numApartments > availableApartments.length ||
              formData.capitalAmount > opBalance ||
              formData.priceMin >= formData.priceMax ||
              formData.capitalAmount === 0
            }
            className="w-full px-5 py-3 rounded-lg bg-green-600/20 hover:bg-green-600/30 border border-green-500/40 text-green-200 font-medium disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {processing ? "Criando Pool..." : "Criar Pool de Liquidez"}
          </button>
        </div>
      </form>

      {/* Pools Ativas */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h2 className="text-xl font-semibold mb-4">Suas Pools Ativas</h2>
        {liquidityPools.length === 0 ? (
          <p className="text-zinc-400 text-sm">Você ainda não possui pools de liquidez ativas.</p>
        ) : (
          <div className="space-y-4">
            {liquidityPools.map((pool) => {
              const annualYield = (pool.totalValue * pool.annualYield) / 100;
              return (
                <div key={pool.id} className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-lg font-semibold text-zinc-100 mb-1">
                        Pool de Liquidez
                      </div>
                      <div className="text-zinc-400 text-sm">
                        Criada em {new Date(pool.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-zinc-400 text-xs mb-1">Rendimento Anual</div>
                      <div className="text-2xl font-bold text-green-400">{pool.annualYield}% a.a.</div>
                      <div className="text-zinc-300 text-sm mt-1">{BRL.format(annualYield)}/ano</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="rounded-lg border border-zinc-800 p-3 bg-zinc-900/40">
                      <div className="text-zinc-400 text-xs mb-1">Apartamentos</div>
                      <div className="text-zinc-100 font-semibold">{pool.numApartments}</div>
                    </div>
                    <div className="rounded-lg border border-zinc-800 p-3 bg-zinc-900/40">
                      <div className="text-zinc-400 text-xs mb-1">Capital</div>
                      <div className="text-zinc-100 font-semibold">{BRL.format(pool.capitalAmount)}</div>
                    </div>
                    <div className="rounded-lg border border-zinc-800 p-3 bg-zinc-900/40">
                      <div className="text-zinc-400 text-xs mb-1">Valor Total</div>
                      <div className="text-zinc-100 font-semibold">{BRL.format(pool.totalValue)}</div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-zinc-800 p-3 bg-zinc-900/40">
                    <div className="text-zinc-400 text-xs mb-2">Faixa de Preços</div>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-300 font-medium">{BRL.format(pool.priceRange.min)}</span>
                      <span className="text-zinc-500">→</span>
                      <span className="text-zinc-300 font-medium">{BRL.format(pool.priceRange.max)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

