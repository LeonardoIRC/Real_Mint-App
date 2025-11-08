// Menu superior de navegação

import { IHome, IChart, IWallet, ISettings } from "./icons";
import { RealMintLogo } from "./RealMintLogo";
import { AccountIndicator } from "./AccountIndicator";

export function TopMenu({ current, onChange }) {
  const items = [
    { key: "landing", label: "Real Mint", icon: null, isLogo: true },
    { key: "empreendimentos", label: "Empreendimentos", icon: IHome },
    { key: "status", label: "Status", icon: IChart },
    { key: "newfi", label: "NewFi", icon: IWallet },
    { key: "infra", label: "Conta", icon: ISettings },
  ];
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800 sticky top-0 z-10">
      <div className="flex items-center justify-center gap-8">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => onChange(it.key)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition ${
              current === it.key ? "bg-zinc-800 text-green-400" : "text-zinc-300 hover:text-white"
            } ${it.isLogo ? "font-bold text-lg" : ""}`}
          >
            {it.isLogo ? (
              <RealMintLogo variant="dark" size="sm" />
            ) : (
              <>
                {it.icon({ className: "w-4 h-4" })}
                <span>{it.label}</span>
              </>
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center">
        <AccountIndicator />
      </div>
    </nav>
  );
}
