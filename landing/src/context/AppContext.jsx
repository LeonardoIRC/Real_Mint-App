// Contexto global da aplicação

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { store } from "../utils/store";

const AppCtx = createContext(null);

export const useApp = () => useContext(AppCtx);

export function AppProvider({ children }) {
  // Sessão
  const [user, setUser] = useState(store.get("user", null));
  const loginEmail = (email) => {
    const u = {
      id: "user_" + Math.random().toString(36).slice(2),
      email,
      createdAt: Date.now(),
      method: "email_mock",
    };
    setUser(u);
    store.set("user", u);
    return u;
  };
  const loginPasskey = async () => {
    await new Promise((r) => setTimeout(r, 500));
    const u = {
      id: "user_" + Math.random().toString(36).slice(2),
      email: null,
      createdAt: Date.now(),
      method: "passkey_stub",
    };
    setUser(u);
    store.set("user", u);
    return u;
  };
  const logout = () => {
    setUser(null);
    store.rem("user");
  };

  // KYC
  const [kyc, setKyc] = useState(store.get("kyc_status", { status: "not_started" }));
  useEffect(() => {
    store.set("kyc_status", kyc);
  }, [kyc]);
  const startKycMock = async () => {
    setKyc({ status: "in_progress", provider: "mock", startedAt: Date.now() });
    await new Promise((r) => setTimeout(r, 1200));
    setKyc({ status: "approved", provider: "mock", approvedAt: Date.now() });
  };

  // Wallet 4337 (mock) - múltiplas contas com nomes
  const [settings, setSettings] = useState(
    store.get("4337_settings", {
      chain: "base",
      bundlerUrl: "https://bundler.realmint.io",
      paymasterEnabled: true,
      sessionKey: null,
    })
  );
  useEffect(() => {
    store.set("4337_settings", settings);
  }, [settings]);

  // Múltiplas smart accounts
  const [accounts, setAccounts] = useState(store.get("4337_accounts", []));
  const [activeAccountId, setActiveAccountId] = useState(store.get("4337_active_account", null));
  useEffect(() => {
    store.set("4337_accounts", accounts);
  }, [accounts]);
  useEffect(() => {
    store.set("4337_active_account", activeAccountId);
  }, [activeAccountId]);

  const activeAccount = accounts.find((a) => a.id === activeAccountId) || null;
  const wallet = activeAccount ? { address: activeAccount.address, chain: activeAccount.chain } : null;

  const createWallet = (name) => {
    if (!user) throw new Error("Faça login antes.");
    const addr = "0x" + btoa(user.id + Date.now()).slice(0, 38).replace(/[^a-zA-Z0-9]/g, "a");
    const account = {
      id: "acc_" + Math.random().toString(36).slice(2),
      name: name || "Minha Conta",
      address: (addr + "0".repeat(42)).slice(0, 42),
      owner: user.id,
      createdAt: Date.now(),
      chain: settings.chain,
    };
    const newAccounts = [...accounts, account];
    setAccounts(newAccounts);
    setActiveAccountId(account.id);
    return account;
  };

  const switchAccount = (accountId) => {
    setActiveAccountId(accountId);
  };

  const updateAccountName = (accountId, newName) => {
    setAccounts((accs) => accs.map((a) => (a.id === accountId ? { ...a, name: newName } : a)));
  };

  const updateBundler = (url) => setSettings((s) => ({ ...s, bundlerUrl: url }));
  const updateChain = (chain) => {
    setSettings((s) => ({ ...s, chain }));
    if (activeAccount) {
      setAccounts((accs) =>
        accs.map((a) => (a.id === activeAccount.id ? { ...a, chain } : a))
      );
    }
  };
  const togglePaymaster = (flag) => setSettings((s) => ({ ...s, paymasterEnabled: !!flag }));
  const setSessKey = (key) => setSettings((s) => ({ ...s, sessionKey: key || null }));

  const [uoLedger, setUoLedger] = useState(store.get("4337_ledger", []));
  useEffect(() => {
    store.set("4337_ledger", uoLedger);
  }, [uoLedger]);
  const sendOp = async ({ to, data = "0x", value = "0", note }) => {
    if (!wallet) throw new Error("Wallet inexistente");
    const entry = {
      id: "uo_" + Math.random().toString(36).slice(2),
      from: wallet.address,
      to,
      value,
      data,
      chain: settings.chain,
      bundlerUrl: settings.bundlerUrl,
      paymaster: settings.paymasterEnabled ? "sponsored" : "none",
      sessionKeyUsed: !!settings.sessionKey,
      note: note || "op",
      status: "included",
      timestamp: Date.now(),
    };
    await new Promise((r) => setTimeout(r, 600));
    setUoLedger((l) => [entry, ...l]);
    return entry;
  };

  // Operating balance
  const [opBalance, setOpBalance] = useState(store.get("operating_balance", 0));
  const [opLedger, setOpLedger] = useState(store.get("operating_balance_ledger", []));
  useEffect(() => {
    store.set("operating_balance", opBalance);
  }, [opBalance]);
  useEffect(() => {
    store.set("operating_balance_ledger", opLedger);
  }, [opLedger]);
  const deposit = (amount) => {
    const a = Math.max(0, Number(amount) || 0);
    const nb = opBalance + a;
    setOpBalance(nb);
    setOpLedger((l) => [
      {
        id: "tx_" + Math.random().toString(36).slice(2),
        type: "deposit",
        amount: a,
        balance: nb,
        timestamp: Date.now(),
      },
      ...l,
    ]);
  };
  const withdraw = (amount) => {
    const a = Math.max(0, Number(amount) || 0);
    const nb = Math.max(0, opBalance - a);
    setOpBalance(nb);
    setOpLedger((l) => [
      {
        id: "tx_" + Math.random().toString(36).slice(2),
        type: "withdraw",
        amount: -a,
        balance: nb,
        timestamp: Date.now(),
      },
      ...l,
    ]);
  };

  // Portfólio de apartamentos
  const [portfolio, setPortfolio] = useState(store.get("portfolio", []));
  useEffect(() => {
    store.set("portfolio", portfolio);
  }, [portfolio]);

  const buyApartment = (unit, project, price) => {
    // Garantir que o preço seja um número
    const numericPrice = typeof price === "string" 
      ? parseFloat(price.replace(/[^\d,.-]/g, "").replace(",", ".")) || 0
      : Number(price) || 0;
    
    if (numericPrice <= 0) throw new Error("Preço inválido");
    if (opBalance < numericPrice) throw new Error(`Saldo insuficiente. Necessário: ${numericPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`);
    
    const apartment = {
      id: "apt_" + Math.random().toString(36).slice(2),
      unit: { ...unit, price: numericPrice }, // Garantir que o unit tenha o preço numérico
      project,
      purchasePrice: numericPrice,
      purchasedAt: Date.now(),
      nftId: `nft_${project.key}_${unit.tower}_${unit.apt}`,
    };
    setPortfolio((p) => [...p, apartment]);
    // Deduz do saldo
    const nb = opBalance - numericPrice;
    setOpBalance(nb);
    setOpLedger((l) => [
      {
        id: "tx_" + Math.random().toString(36).slice(2),
        type: "purchase",
        amount: -numericPrice,
        balance: nb,
        timestamp: Date.now(),
        note: `${project.name} • ${unit.tower} — Apto ${unit.apt}`,
      },
      ...l,
    ]);
    return apartment;
  };

  const sellApartment = (apartmentId, price) => {
    const apt = portfolio.find((a) => a.id === apartmentId);
    if (!apt) throw new Error("Apartamento não encontrado");
    setPortfolio((p) => p.filter((a) => a.id !== apartmentId));
    // Adiciona ao saldo
    const nb = opBalance + price;
    setOpBalance(nb);
    setOpLedger((l) => [
      {
        id: "tx_" + Math.random().toString(36).slice(2),
        type: "sale",
        amount: price,
        balance: nb,
        timestamp: Date.now(),
        note: `${apt.project.name} • ${apt.unit.tower} — Apto ${apt.unit.apt}`,
      },
      ...l,
    ]);
  };

  // Aplicações financeiras (empréstimos dados, empréstimos recebidos, investimentos)
  const [financialApps, setFinancialApps] = useState(store.get("financial_apps", []));
  useEffect(() => {
    store.set("financial_apps", financialApps);
  }, [financialApps]);

  // Pools de liquidez (investidores)
  const [liquidityPools, setLiquidityPools] = useState(store.get("liquidity_pools", []));
  useEffect(() => {
    store.set("liquidity_pools", liquidityPools);
  }, [liquidityPools]);

  const createLiquidityPool = (data) => {
    const { numApartments, capitalAmount, priceRange, apartments } = data;
    
    // Validar saldo
    if (opBalance < capitalAmount) {
      throw new Error(`Saldo insuficiente. Necessário: ${capitalAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`);
    }
    
    // Remover apartamentos do portfólio (eles agora estão na pool)
    const apartmentIds = apartments.map((a) => a.id);
    setPortfolio((p) => p.filter((apt) => !apartmentIds.includes(apt.id)));
    
    // Deduzir capital do saldo
    const nb = opBalance - capitalAmount;
    setOpBalance(nb);
    setOpLedger((l) => [
      {
        id: "tx_" + Math.random().toString(36).slice(2),
        type: "liquidity_pool",
        amount: -capitalAmount,
        balance: nb,
        timestamp: Date.now(),
        note: `Pool de liquidez criada`,
      },
      ...l,
    ]);
    
    const pool = {
      id: "pool_" + Math.random().toString(36).slice(2),
      ...data,
      createdAt: Date.now(),
      annualYield: 18, // 18% a.a.
      totalValue: capitalAmount + apartments.reduce((sum, apt) => sum + (apt.purchasePrice || 0), 0),
    };
    
    setLiquidityPools((pools) => [...pools, pool]);
    return pool;
  };

  const createFinancialApp = (type, data) => {
    // type: "lend" (emprestou), "borrow" (pegou emprestado), "investment" (investimento)
    const app = {
      id: "app_" + Math.random().toString(36).slice(2),
      type,
      ...data,
      createdAt: Date.now(),
    };
    setFinancialApps((apps) => [...apps, app]);
    
    // Se for empréstimo dado, deduz do saldo
    if (type === "lend" && data.amount) {
      const nb = opBalance - data.amount;
      setOpBalance(nb);
      setOpLedger((l) => [
        {
          id: "tx_" + Math.random().toString(36).slice(2),
          type: "lend",
          amount: -data.amount,
          balance: nb,
          timestamp: Date.now(),
          note: `Empréstimo para pool`,
        },
        ...l,
      ]);
    }
    
    // Se for empréstimo recebido (borrow), adiciona ao saldo
    if (type === "borrow" && data.amount) {
      const nb = opBalance + data.amount;
      setOpBalance(nb);
      setOpLedger((l) => [
        {
          id: "tx_" + Math.random().toString(36).slice(2),
          type: "borrow",
          amount: data.amount,
          balance: nb,
          timestamp: Date.now(),
          note: `Empréstimo recebido${data.project ? ` • ${data.project}` : ""}`,
        },
        ...l,
      ]);
    }
    
    return app;
  };

  const value = useMemo(
    () => ({
      user,
      loginEmail,
      loginPasskey,
      logout,
      kyc,
      setKyc,
      startKycMock,
      wallet,
      activeAccount,
      accounts,
      activeAccountId,
      settings,
      createWallet,
      switchAccount,
      updateAccountName,
      updateBundler,
      updateChain,
      togglePaymaster,
      setSessKey,
      sendOp,
      uoLedger,
      opBalance,
      opLedger,
      deposit,
      withdraw,
      portfolio,
      buyApartment,
      sellApartment,
      financialApps,
      createFinancialApp,
      liquidityPools,
      createLiquidityPool,
    }),
    [user, kyc, wallet, activeAccount, accounts, activeAccountId, settings, uoLedger, opBalance, opLedger, portfolio, financialApps, liquidityPools]
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

