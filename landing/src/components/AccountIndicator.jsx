// Indicador de conta no canto superior direito

import { useState } from "react";
import { useApp } from "../context/AppContext";

export function AccountIndicator() {
  const { user, wallet, activeAccount, accounts, switchAccount, logout } = useApp();
  const [showMenu, setShowMenu] = useState(false);

  if (!user || !wallet || !activeAccount) return null;

  const shortAddress = `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`;

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/60 border border-zinc-700 hover:border-zinc-600 transition"
      >
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <div className="text-left">
          <div className="text-xs text-zinc-400">{activeAccount.name}</div>
          <div className="text-xs font-mono text-zinc-300">{shortAddress}</div>
        </div>
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl z-50">
            <div className="p-3 border-b border-zinc-800">
              <div className="text-xs text-zinc-400 mb-1">Conta Ativa</div>
              <div className="text-sm font-medium text-zinc-100">{activeAccount.name}</div>
              <div className="text-xs font-mono text-zinc-500 break-all">{wallet.address}</div>
            </div>

            {accounts.length > 1 && (
              <div className="p-2 border-b border-zinc-800">
                <div className="text-xs text-zinc-400 mb-2 px-2">Trocar de Conta</div>
                <div className="space-y-1">
                  {accounts.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => {
                        switchAccount(acc.id);
                        setShowMenu(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded text-sm transition ${
                        activeAccount.id === acc.id
                          ? "bg-green-500/10 text-green-200"
                          : "text-zinc-300 hover:bg-zinc-800"
                      }`}
                    >
                      <div className="font-medium">{acc.name}</div>
                      <div className="text-xs font-mono text-zinc-500 truncate">
                        {acc.address.slice(0, 6)}...{acc.address.slice(-4)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-2">
              <button
                onClick={() => {
                  logout();
                  setShowMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded text-sm text-zinc-300 hover:bg-zinc-800 transition"
              >
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

