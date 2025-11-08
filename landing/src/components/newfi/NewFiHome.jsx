// Página principal do NewFi

import { IArrowLeft, ICoins, IWallet, IUsers, IPie } from "../icons";

const PercentMetric = ({ value, color = "text-green-400", caption }) => (
  <div className={`col-span-1 text-right ${color}`}>
    <div className="flex items-baseline justify-end font-semibold text-2xl leading-none">
      <span>{value}%</span>
      <span className="text-[0.6em] ml-1 opacity-90">a.a.</span>
    </div>
    {caption && <div className="mt-1 text-xs">{caption}</div>}
  </div>
);

const AmountMetric = ({ amount, color = "text-purple-400", label }) => (
  <div className={`col-span-1 text-right ${color}`}>
    {label && <div className="text-xs mb-1">{label}</div>}
    <div className="font-semibold text-2xl leading-none">{amount}</div>
  </div>
);

const PillCard = ({ title, icon: IconCmp, description, metric, onClick }) => (
  <button
    onClick={onClick}
    className="grid grid-cols-4 w-full rounded-[28px] border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 transition p-5 md:p-6 items-center"
  >
    <div className="col-span-3 text-left">
      <div className="flex items-center gap-2 text-zinc-100 font-semibold mb-2">
        <IconCmp className="w-4 h-4" />
        <span>{title}</span>
      </div>
      <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">{description}</div>
    </div>
    {metric}
  </button>
);

export const NewFiHome = ({ onOpenCredit, onOpenLend, onOpenInvestors, onBackToMain }) => (
  <div className="space-y-8">
    <header>
      <button
        onClick={onBackToMain}
        className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200"
      >
        <IArrowLeft className="w-4 h-4" /> Voltar
      </button>
      <h1 className="text-3xl font-bold">NewFi</h1>
      <p className="text-zinc-400 mt-2">Diferentes serviços financeiros estão disponíveis em nossa plataforma</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PillCard
        title="EMPRESTE"
        icon={ICoins}
        description={`Empreste reais para os donos dos nossos apartamentos e tenha um rendimento passivo com a segurança do imóvel em colateral.`}
        metric={<PercentMetric value={20} color="text-green-400" caption={<span className="text-green-400">de rendimento atual</span>} />}
        onClick={onOpenLend}
      />
      <PillCard
        title="ACESSO A CRÉDITO"
        icon={IWallet}
        description={`Donos de apartamento têm acesso imediato a crédito sem análise usando o imóvel como colateral.`}
        metric={<PercentMetric value={30} color="text-blue-400" caption={<span className="text-blue-400">taxa de emprestimo atual</span>} />}
        onClick={onOpenCredit}
      />
      <PillCard
        title="INVESTIDORES"
        icon={IUsers}
        description={`Deixem apartamentos em liquidez e ganhem trading fees garantindo liquidez para todo o ecossistema.`}
        metric={<PercentMetric value={60} color="text-green-400" caption={<span className="text-green-400">de rendimento atual</span>} />}
        onClick={onOpenInvestors}
      />
      <PillCard
        title="EXPOSIÇÃO FRACIONADA"
        icon={IPie}
        description={`Facilitamos o sonho da casa própria. Compre as primeiras frações de seu apartamento em nosso condomínio e tenha acesso a todos os nossos serviços financeiros.`}
        metric={<AmountMetric amount={"R$10.000"} color="text-purple-400" label="comece com apenas" />}
      />
    </div>
  </div>
);

