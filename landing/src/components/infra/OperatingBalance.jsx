// Saldo Operacional

import { useState } from "react";
import { useApp } from "../../context/AppContext";

export function OperatingBalance() {
  const { opBalance, opLedger, deposit, withdraw } = useApp();
  const [amount, setAmount] = useState("");
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
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Operating Balance</h2>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
        <div className="text-zinc-400 text-sm">Saldo</div>
        <div className="text-2xl font-semibold text-zinc-100">
          {opBalance.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </div>
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
              <span>{tx.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
              <span className="text-zinc-500">{new Date(tx.timestamp).toLocaleString()}</span>
              <span className="text-zinc-400">
                saldo: {tx.balance.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

