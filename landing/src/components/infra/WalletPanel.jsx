// Painel de Wallet (EIP-4337) - Simplificado

import { useState } from "react";
import { useApp } from "../../context/AppContext";

export function WalletPanel() {
  const { user, wallet, activeAccount, accounts, createWallet, switchAccount, updateAccountName } = useApp();
  const [accountName, setAccountName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    if (!accountName.trim()) {
      alert("Digite um nome para sua conta");
      return;
    }
    createWallet(accountName.trim());
    setAccountName("");
    setIsCreating(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Smart Account</h2>

      {!user && <p className="text-zinc-400 text-sm">Faça login para criar sua smart wallet.</p>}

      {wallet && activeAccount && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="space-y-3">
            <div>
              <div className="text-zinc-400 text-xs mb-1">Nome da Conta</div>
              <div className="text-zinc-100 font-medium">{activeAccount.name}</div>
            </div>
            <div>
              <div className="text-zinc-400 text-xs mb-1">Endereço</div>
              <div className="font-mono text-sm text-zinc-100 break-all">{wallet.address}</div>
            </div>
            <div className="pt-2 border-t border-zinc-800">
              <div className="text-zinc-400 text-xs mb-2">Rede</div>
              <div className="text-zinc-100 text-sm">Base</div>
            </div>
          </div>
          {!isCreating && (
            <button
              onClick={() => setIsCreating(true)}
              className="w-full mt-4 px-4 py-2 rounded-lg bg-zinc-800/60 border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition text-sm"
            >
              Criar Nova Conta
            </button>
          )}
        </div>
      )}

      {user && !wallet && !isCreating && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <p className="text-zinc-400 text-sm mb-4">Crie sua primeira smart account para começar.</p>
          <button
            onClick={() => setIsCreating(true)}
            className="w-full px-4 py-3 rounded-lg bg-green-600/20 border border-green-500/40 text-green-200 hover:bg-green-600/30 transition"
          >
            Criar Smart Account
          </button>
        </div>
      )}

      {isCreating && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-4">
          <div>
            <div className="text-zinc-400 text-xs mb-2">Nome da Conta</div>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Ex: Conta Principal"
              className="w-full rounded-lg bg-zinc-950/60 border border-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500"
              autoFocus
            />
            <p className="text-zinc-500 text-xs mt-1">Escolha um nome para identificar esta conta</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="flex-1 px-4 py-2 rounded-lg bg-green-600/20 border border-green-500/40 text-green-200 hover:bg-green-600/30 transition"
            >
              Criar
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setAccountName("");
              }}
              className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {accounts.length > 1 && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="text-sm text-zinc-400 mb-3">Trocar de Conta</div>
          <div className="space-y-2">
            {accounts.map((acc) => (
              <button
                key={acc.id}
                onClick={() => switchAccount(acc.id)}
                className={`w-full text-left px-3 py-2 rounded-lg border transition ${
                  activeAccount?.id === acc.id
                    ? "border-green-500/50 bg-green-500/10 text-green-200"
                    : "border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:border-zinc-700"
                }`}
              >
                <div className="font-medium">{acc.name}</div>
                <div className="text-xs font-mono text-zinc-500 truncate">{acc.address}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

