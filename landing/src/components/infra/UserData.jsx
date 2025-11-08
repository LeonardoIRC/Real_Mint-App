// Componente para dados do usuário (Cadastro, Wallets, KYC)

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { WalletPanel } from "./WalletPanel";
import { KYCCenter } from "./KYCCenter";

export function UserData({ view = "user" }) {
  const { user, loginEmail, loginPasskey, logout } = useApp();
  const [email, setEmail] = useState("");

  // Se for a view de "user", mostra cadastro/login
  if (view === "user") {
    return (
      <div className="space-y-6">
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <h3 className="text-lg font-semibold mb-4">Cadastro e Autenticação</h3>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-zinc-400 text-xs">Usuário</div>
              <div className="text-zinc-100">{user ? user.email || user.id : "Não autenticado"}</div>
            </div>
            <div className="flex items-center gap-3">
              {!user ? (
                <>
                  <input
                    placeholder="email (mock)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-lg bg-zinc-950/60 border border-zinc-800 px-3 py-2 text-zinc-100"
                  />
                  <button
                    onClick={() => loginEmail(email || "demo@local")}
                    className="px-3 py-2 rounded-lg bg-green-600/20 border border-green-500/40 text-green-200"
                  >
                    Login (email mock)
                  </button>
                  <button
                    onClick={loginPasskey}
                    className="px-3 py-2 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-200"
                  >
                    Login (passkey stub)
                  </button>
                </>
              ) : (
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200"
                >
                  Sair
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Se for a view de "wallets", mostra apenas smart accounts
  if (view === "wallets") {
    return <WalletPanel />;
  }

  // Se for a view de "kyc", mostra apenas KYC
  if (view === "kyc") {
    return <KYCCenter />;
  }

  return null;
}

