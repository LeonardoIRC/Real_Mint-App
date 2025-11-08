// Componente de Balances - mostra saldo, apartamentos e aplicações financeiras

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { BRL } from "../../utils/formatters";
import { ICoins, IHome, IPie } from "../icons";

// Hook para navegação (simulado)
const useNavigate = () => {
  // Em produção, isso seria um hook de roteamento real
  return (path) => {
    window.location.hash = `#${path}`;
  };
};

export function Balances({ onNavigate }) {
  const { opBalance, opLedger, deposit, withdraw, portfolio, sellApartment, financialApps, liquidityPools } = useApp();
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState("overview"); // overview, apartments, financial
  const navigate = useNavigate();

  // Calcular valores totais
  const totalPortfolioValue = portfolio.reduce((sum, apt) => apt.purchasePrice || 0, 0);
  // Aplicações financeiras: apenas empréstimos dados e investimentos contam como ativos
  const totalFinancialAssets = financialApps.reduce((sum, app) => {
    if (app.type === "lend" || app.type === "investment") return sum + (app.amount || 0);
    return sum; // borrow não conta como ativo
  }, 0);
  // Pools de liquidez também contam como ativos
  const totalLiquidityPools = liquidityPools.reduce((sum, pool) => sum + (pool.totalValue || 0), 0);
  // Dívidas (empréstimos recebidos)
  const totalDebts = financialApps.reduce((sum, app) => {
    if (app.type === "borrow") return sum + (app.amount || 0);
    return sum;
  }, 0);
  const totalAssets = opBalance + totalPortfolioValue + totalFinancialAssets + totalLiquidityPools;

  const dep = () => {
    const v = Number((amount || "0").replace(",", "."));
    if (v > 0) {
      deposit(v);
      setAmount("");
    }
  };
  const wit = () => {
    const v = Number((amount || "0").replace(",", "."));
    if (v > 0) {
      withdraw(v);
      setAmount("");
    }
  };

  // Para cada apartamento, calcular valor de empréstimo disponível (60% LTV) e maior bid
  const getApartmentInfo = (apt) => {
    const marketValue = apt.purchasePrice || apt.unit?.price || 0;
    const maxLoan = Math.floor(marketValue * 0.6); // 60% LTV
    const bestBid = Math.max(0, marketValue - 20000); // Simulação: maior bid é 20k abaixo
    return { marketValue, maxLoan, bestBid };
  };

  return (
    <div className="space-y-6">
      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <div className="flex items-center gap-2 mb-2">
            <ICoins className="w-5 h-5 text-green-400" />
            <div className="text-zinc-400 text-sm">Saldo Operacional</div>
          </div>
          <div className="text-2xl font-semibold text-zinc-100">{BRL.format(opBalance)}</div>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <div className="flex items-center gap-2 mb-2">
            <IHome className="w-5 h-5 text-blue-400" />
            <div className="text-zinc-400 text-sm">Portfólio Imobiliário</div>
          </div>
          <div className="text-2xl font-semibold text-zinc-100">{BRL.format(totalPortfolioValue)}</div>
          <div className="text-xs text-zinc-500 mt-1">{portfolio.length} apartamento(s)</div>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <div className="flex items-center gap-2 mb-2">
            <IPie className="w-5 h-5 text-purple-400" />
            <div className="text-zinc-400 text-sm">Aplicações Financeiras</div>
          </div>
          <div className="text-2xl font-semibold text-zinc-100">{BRL.format(totalFinancialAssets + totalLiquidityPools)}</div>
          <div className="text-xs text-zinc-500 mt-1">
            {financialApps.filter((a) => a.type === "lend" || a.type === "investment").length} aplicação(ões)
            {liquidityPools.length > 0 && ` + ${liquidityPools.length} pool(s)`}
          </div>
          {totalDebts > 0 && (
            <div className="text-xs text-red-400 mt-1">Dívidas: {BRL.format(totalDebts)}</div>
          )}
        </div>
      </div>

      {/* Total de Ativos */}
      <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="text-zinc-400 text-sm">Total de Ativos</div>
          {totalDebts > 0 && (
            <div className="text-xs text-red-400">Dívidas: {BRL.format(totalDebts)}</div>
          )}
        </div>
        <div className="text-3xl font-bold text-green-400">{BRL.format(totalAssets)}</div>
        {totalDebts > 0 && (
          <div className="text-sm text-zinc-400 mt-2">
            Patrimônio líquido: <span className="text-zinc-200">{BRL.format(totalAssets - totalDebts)}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-800">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-t-lg transition ${
            activeTab === "overview"
              ? "bg-zinc-800 text-green-400 border-t border-x border-zinc-700"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Saldo Operacional
        </button>
        <button
          onClick={() => setActiveTab("apartments")}
          className={`px-4 py-2 rounded-t-lg transition ${
            activeTab === "apartments"
              ? "bg-zinc-800 text-green-400 border-t border-x border-zinc-700"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Meus Apartamentos ({portfolio.length})
        </button>
        <button
          onClick={() => setActiveTab("financial")}
          className={`px-4 py-2 rounded-t-lg transition ${
            activeTab === "financial"
              ? "bg-zinc-800 text-green-400 border-t border-x border-zinc-700"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Aplicações Financeiras ({financialApps.length})
        </button>
      </div>

      {/* Conteúdo das Tabs */}
      <div className="mt-4">
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
              <div className="text-zinc-400 text-sm mb-1">Saldo</div>
              <div className="text-2xl font-semibold text-zinc-100">{BRL.format(opBalance)}</div>
              <div className="mt-4 grid md:grid-cols-3 gap-3">
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Valor (ex: 1000)"
                  className="rounded-lg bg-zinc-950/60 border border-zinc-800 px-3 py-2 text-zinc-100"
                />
                <button
                  onClick={dep}
                  className="rounded-lg bg-green-600/20 hover:bg-green-600/30 border border-green-500/40 text-green-200 px-4 py-2"
                >
                  Depositar
                </button>
                <button
                  onClick={wit}
                  className="rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-200 px-4 py-2"
                >
                  Sacar
                </button>
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
              <div className="text-sm text-zinc-400 mb-2">Extrato</div>
              <ul className="space-y-2 max-h-56 overflow-auto">
                {opLedger.length === 0 && <li className="text-zinc-500 text-sm">Sem movimentações.</li>}
                {opLedger.map((tx) => (
                  <li key={tx.id} className="flex items-center justify-between text-xs border border-zinc-800 rounded-lg p-2">
                    <span className="uppercase tracking-wide text-zinc-400">{tx.type}</span>
                    <span>{BRL.format(tx.amount)}</span>
                    <span className="text-zinc-500">{new Date(tx.timestamp).toLocaleString()}</span>
                    <span className="text-zinc-400">saldo: {BRL.format(tx.balance)}</span>
                    {tx.note && <span className="text-zinc-500 text-xs truncate max-w-xs">{tx.note}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "apartments" && (
          <div className="space-y-4">
            {portfolio.length === 0 ? (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center">
                <IHome className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                <p className="text-zinc-400">Você ainda não possui apartamentos.</p>
                <p className="text-zinc-500 text-sm mt-1">Compre apartamentos na seção Empreendimentos.</p>
              </div>
            ) : (
              portfolio.map((apt) => {
                const { marketValue, maxLoan, bestBid } = getApartmentInfo(apt);
                return (
                  <div key={apt.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-lg font-semibold text-zinc-100">
                          {apt.project.name} • {apt.unit.tower} — Apto {apt.unit.apt}
                        </div>
                        <div className="text-zinc-400 text-sm mt-1">
                          Comprado por {BRL.format(apt.purchasePrice)} em{" "}
                          {new Date(apt.purchasedAt).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-zinc-400 text-xs">Valor de mercado</div>
                        <div className="text-xl font-semibold text-zinc-100">{BRL.format(marketValue)}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="rounded-lg border border-zinc-800 p-3 bg-zinc-950/40">
                        <div className="text-zinc-400 text-xs mb-1">Crédito Disponível</div>
                        <div className="text-green-400 text-lg font-semibold">{BRL.format(maxLoan)}</div>
                        <div className="text-zinc-500 text-xs mt-1">até 60% do valor de mercado</div>
                      </div>
                      <div className="rounded-lg border border-zinc-800 p-3 bg-zinc-950/40">
                        <div className="text-zinc-400 text-xs mb-1">Maior Oferta</div>
                        <div className="text-blue-400 text-lg font-semibold">{BRL.format(bestBid)}</div>
                        <div className="text-zinc-500 text-xs mt-1">no mercado</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => {
                          // Navegar para página de crédito
                          if (onNavigate) {
                            onNavigate("newfi", "credit");
                          } else {
                            navigate("newfi/credit");
                          }
                        }}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-200 font-medium transition"
                      >
                        Pegar Empréstimo
                      </button>
                      <div className="text-xs text-zinc-500 text-center sm:text-left">
                        Disponível: {BRL.format(maxLoan)}
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Vender por ${BRL.format(bestBid)}?`)) {
                            sellApartment(apt.id, bestBid);
                            alert("Venda realizada com sucesso!");
                          }
                        }}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-green-600/20 hover:bg-green-600/30 border border-green-500/40 text-green-200 font-medium transition"
                      >
                        Vender por {BRL.format(bestBid)}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === "financial" && (
          <div className="space-y-4">
            {financialApps.length === 0 && liquidityPools.length === 0 ? (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center">
                <IPie className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                <p className="text-zinc-400">Você ainda não possui aplicações financeiras.</p>
                <p className="text-zinc-500 text-sm mt-1">Acesse NewFi ou Investidores para criar aplicações.</p>
              </div>
            ) : (
              <>
                {/* Pools de Liquidez */}
                {liquidityPools.map((pool) => {
                  const annualYield = (pool.totalValue * pool.annualYield) / 100;
                  return (
                    <div key={pool.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                              Pool de Liquidez
                            </span>
                          </div>
                          <div className="text-2xl font-semibold text-zinc-100 mb-2">
                            {BRL.format(pool.totalValue)}
                          </div>
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div className="rounded-lg border border-zinc-800 p-2 bg-zinc-950/40">
                              <div className="text-zinc-400 text-xs">Apartamentos</div>
                              <div className="text-zinc-200 text-sm font-medium">{pool.numApartments}</div>
                            </div>
                            <div className="rounded-lg border border-zinc-800 p-2 bg-zinc-950/40">
                              <div className="text-zinc-400 text-xs">Rendimento</div>
                              <div className="text-green-400 text-sm font-medium">{pool.annualYield}% a.a.</div>
                            </div>
                          </div>
                          <div className="text-zinc-500 text-xs mt-3">
                            Faixa: {BRL.format(pool.priceRange.min)} - {BRL.format(pool.priceRange.max)}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-zinc-400 text-xs mb-1">Rendimento Anual</div>
                          <div className="text-green-400 text-xl font-bold">{BRL.format(annualYield)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Aplicações Financeiras */}
                {financialApps.map((app) => (
                <div key={app.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            app.type === "lend"
                              ? "bg-green-500/10 text-green-300 border border-green-500/20"
                              : app.type === "borrow"
                              ? "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                              : "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                          }`}
                        >
                          {app.type === "lend" ? "Emprestou" : app.type === "borrow" ? "Empréstimo" : "Investimento"}
                        </span>
                      </div>
                      <div className="text-2xl font-semibold text-zinc-100 mb-2">
                        {app.amount ? BRL.format(app.amount) : "—"}
                      </div>
                      {app.project && (
                        <div className="text-zinc-400 text-sm mb-1">{app.project}</div>
                      )}
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        {app.rate && (
                          <div className="rounded-lg border border-zinc-800 p-2 bg-zinc-950/40">
                            <div className="text-zinc-400 text-xs">Taxa</div>
                            <div className="text-zinc-200 text-sm font-medium">{app.rate}% a.a.</div>
                          </div>
                        )}
                        {app.term && (
                          <div className="rounded-lg border border-zinc-800 p-2 bg-zinc-950/40">
                            <div className="text-zinc-400 text-xs">Prazo</div>
                            <div className="text-zinc-200 text-sm font-medium">{app.term} meses</div>
                          </div>
                        )}
                      </div>
                      {app.createdAt && (
                        <div className="text-zinc-500 text-xs mt-3">
                          Criado em {new Date(app.createdAt).toLocaleDateString("pt-BR")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

