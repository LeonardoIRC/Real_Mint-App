// Dashboard de Infraestrutura com menu lateral

import { useState } from "react";
import { IMenu, IChevronLeft, IChevronRight, IUsers, IWallet, IFileText, ICoins } from "../icons";
import { UserData } from "./UserData";
import { Balances } from "./Balances";

const menuItems = [
  {
    id: "user",
    label: "Dados de Usuário",
    icon: IUsers,
    group: "user",
  },
  {
    id: "wallets",
    label: "Smart Accounts",
    icon: IWallet,
    group: "user",
  },
  {
    id: "kyc",
    label: "KYC",
    icon: IFileText,
    group: "user",
  },
  {
    id: "balance",
    label: "Saldo Operacional",
    icon: ICoins,
    group: "balance",
  },
];

export function InfraDashboard({ onNavigate }) {
  const [selectedItem, setSelectedItem] = useState("user");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const currentItem = menuItems.find((item) => item.id === selectedItem) || menuItems[0];
  const userGroupItems = menuItems.filter((item) => item.group === "user");
  const balanceGroupItems = menuItems.filter((item) => item.group === "balance");

  const renderContent = () => {
    if (selectedItem === "user" || selectedItem === "wallets" || selectedItem === "kyc") {
      return <UserData view={selectedItem} />;
    }
    if (selectedItem === "balance") {
      return <Balances onNavigate={onNavigate} />;
    }
    return null;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? "w-16" : "w-full md:w-64"
        } transition-all duration-300 flex-shrink-0 border-r border-zinc-800 bg-zinc-950/40 rounded-lg`}
      >
        <div className="sticky top-8 h-fit">
          {/* Header do Sidebar */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            {!sidebarCollapsed && <h2 className="text-lg font-semibold">Conta</h2>}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg hover:bg-zinc-800 transition"
              title={sidebarCollapsed ? "Expandir menu" : "Colapsar menu"}
            >
              {sidebarCollapsed ? (
                <IChevronRight className="w-4 h-4 text-zinc-400" />
              ) : (
                <IChevronLeft className="w-4 h-4 text-zinc-400" />
              )}
            </button>
          </div>

          {/* Menu Items */}
          <nav className="p-2 space-y-1">
            {/* Grupo: Dados de Usuário */}
            {!sidebarCollapsed && (
              <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Dados de Usuário
              </div>
            )}
            {userGroupItems.map((item) => {
              const Icon = item.icon;
              const isActive = selectedItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                    isActive
                      ? "bg-zinc-800 text-green-400"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
                </button>
              );
            })}

            {/* Separador */}
            <div className="my-2 border-t border-zinc-800" />

            {/* Grupo: Balances */}
            {!sidebarCollapsed && (
              <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Balances
              </div>
            )}
            {balanceGroupItems.map((item) => {
              const Icon = item.icon;
              const isActive = selectedItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                    isActive
                      ? "bg-zinc-800 text-green-400"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 min-w-0">
        <div className="space-y-6">
          <header>
            <h1 className="text-3xl font-bold">{currentItem.label}</h1>
            <p className="text-zinc-400 mt-1">
              {selectedItem === "user" || selectedItem === "wallets" || selectedItem === "kyc"
                ? "Gerencie seus dados pessoais, contas e verificação de identidade"
                : "Gerencie seu saldo operacional e movimentações"}
            </p>
          </header>

          {renderContent()}
        </div>
      </main>
    </div>
  );
}

