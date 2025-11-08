// Landing Page - Página inicial de marketing

import { useState } from "react";
import { IHome, IChart, IUsers, IArrowLeft, IWallet, IPie } from "./icons";
import { Modal } from "./Modal";
import { projects } from "../data/projects";
import { RealMintLogo } from "./RealMintLogo";

export default function Landing({ onNavigateToPlatform }) {
  const [modal, setModal] = useState(null);
  const [offerFor, setOfferFor] = useState(null);

  // Função para navegar para detalhes do projeto
  const goToProjectDetails = (slug) => {
    // Encontrar o projeto correspondente
    const project = projects.find((p) => p.key === slug);
    if (project && onNavigateToPlatform) {
      // Passar o projeto completo para a função de navegação
      onNavigateToPlatform("detalhes", project);
    }
  };

  // Handler para oferta
  const handleOfferSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("OFERTA ENVIADA:", { empreendimento: offerFor, ...data });
    setOfferFor(null);
  };

  const empreendimentos = [
    {
      slug: "vila-nova",
      title: "Vila Nova",
      price: "R$ 340.000",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&q=80",
    },
    {
      slug: "jardim-aguas",
      title: "Pedras das Cascatas",
      price: "R$ 423.000",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop&q=80",
    },
    {
      slug: "praia-azul",
      title: "Always Summer",
      price: "R$ 545.000",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-zinc-100 w-full">
      {/* Header Minimal */}
      <header className="sticky top-0 z-20 backdrop-blur bg-[#0b0c0e]/80 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <RealMintLogo variant="dark-alt" size="default" />
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToPlatform?.("empreendimentos")}
              className="px-6 py-2 rounded-2xl bg-[#6BFA7B] text-black font-semibold hover:brightness-110 transition-all text-sm shadow-inner"
            >
              COMEÇAR
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
            Powering NewFi to Real Estate
          </h1>
          <p className="text-zinc-300 leading-relaxed mb-8 text-lg">
            O <span className="font-semibold text-white">RealMint</span> tokeniza empreendimentos imobiliários reais,
            transformando cada apartamento em um <span className="font-semibold text-white">NFT Único</span>. Esses
            ativos podem ser livremente negociados e conectados a produtos financeiros modernos, trazendo liquidez e
            eficiência para um mercado tradicionalmente ilíquido.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigateToPlatform?.("empreendimentos")}
              className="px-6 py-3 rounded-2xl bg-[#6BFA7B] text-black font-semibold hover:brightness-110 transition-all shadow-inner"
            >
              COMEÇAR
            </button>
          </div>
        </div>
      </section>

      {/* Seção "Por que RealMint?" */}
      <section id="porque" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-white mb-10">
            Por que <span className="text-emerald-400">RealMint</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => onNavigateToPlatform?.("empreendimentos")}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10">
                  <IHome className="w-5 h-5 text-emerald-400" />
                </span>
                <h3 className="text-white text-lg font-semibold">Livre Negociação</h3>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Negocie ativos instantaneamente com base em seus atributos. Tenha dados analíticos completos e
                transparentes do mercado, com ofertas constantes para seus ativos.
              </p>
            </button>
            <button
              onClick={() => onNavigateToPlatform?.("newfi")}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/10">
                  <IWallet className="w-5 h-5 text-blue-400" />
                </span>
                <h3 className="text-white text-lg font-semibold">Acesso ao New Finance</h3>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Conecte seu imóvel a um sistema financeiro moderno. Use-o como colateral, gere liquidez e obtenha
                rendimentos em um ecossistema digital seguro e descentralizado.
              </p>
            </button>
            <button
              onClick={() => onNavigateToPlatform?.("status")}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-purple-500/10">
                  <IPie className="w-5 h-5 text-purple-400" />
                </span>
                <h3 className="text-white text-lg font-semibold">Propriedade Digital Real</h3>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Tenha controle total sobre seus ativos. A propriedade é sua, registrada de forma transparente,
                verificável e segura.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Seção "Serviços Financeiros" */}
      <section id="finance" className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-2">Serviços Financeiros</h2>
          <p className="text-center text-zinc-400 mb-10">Acesso a crédito e oportunidades de investimento com garantia imobiliária</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-emerald-400/30 bg-white/5 p-7">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10">
                  <IWallet className="w-5 h-5 text-emerald-400" />
                </span>
                <h3 className="text-2xl font-semibold text-white">Acesso a Crédito</h3>
              </div>
              <p className="text-emerald-400 font-bold mb-3">30% a.a.</p>
              <p className="text-zinc-300 mb-5">
                Empréstimo imediato usando seu imóvel tokenizado como garantia. Sem análise de crédito, liberação
                rápida.
              </p>
            </div>
            <div className="rounded-3xl border border-blue-400/30 bg-white/5 p-7">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/10">
                  <IPie className="w-5 h-5 text-blue-400" />
                </span>
                <h3 className="text-2xl font-semibold text-white">Empreste</h3>
              </div>
              <p className="text-blue-400 font-bold mb-3">20% a.a.</p>
              <p className="text-zinc-300 mb-5">
                Forneça liquidez e receba rendimento passivo com segurança. Colateral imobiliário tokenizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção "Últimos Lançamentos" */}
      <section id="launches" className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-white mb-8">Últimos Lançamentos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {empreendimentos.map((emp) => (
              <div key={emp.slug} className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden flex flex-col">
                <div className="w-full relative" style={{ aspectRatio: "4 / 3" }}>
                  <img
                    src={emp.image}
                    alt={emp.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-white font-semibold text-lg mb-1">{emp.title}</h4>
                  <p className="text-zinc-300 text-sm mb-4">A partir de {emp.price}</p>
                  <div className="space-y-3">
                    <button
                      onClick={() => goToProjectDetails(emp.slug)}
                      className="inline-flex items-center justify-center w-full rounded-2xl px-6 py-3 text-sm font-semibold bg-[#6BFA7B] text-black shadow-inner hover:brightness-110 transition-all"
                    >
                      COMPRE AGORA
                    </button>
                    <button
                      onClick={() => goToProjectDetails(emp.slug)}
                      className="inline-flex items-center justify-center w-full rounded-2xl px-6 py-3 text-sm font-semibold border border-white/10 text-zinc-300 hover:bg-white/5 transition-all"
                    >
                      FAÇA UMA OFERTA
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção "O que você pode fazer?" */}
      <section id="actions" className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-white mb-8">O que você pode fazer?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              onClick={() => onNavigateToPlatform?.("empreendimentos")}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10">
                  <IHome className="w-5 h-5 text-emerald-400" />
                </span>
                <h3 className="text-zinc-50 text-lg font-semibold">Marketplace Completo</h3>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Negocie livremente qualquer unidade tokenizada. Compre, venda ou troque apartamentos com base em
                atributos, localização e demanda de mercado.
              </p>
            </button>
            <button
              onClick={() => onNavigateToPlatform?.("newfi")}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/10">
                  <IWallet className="w-5 h-5 text-blue-400" />
                </span>
                <h3 className="text-zinc-50 text-lg font-semibold">Mercados Financeiros</h3>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Use seu imóvel como colateral em protocolos de empréstimo (Peer-to-Peer e Peer-to-Pool). Tome
                empréstimos instantâneos com segurança on-chain ou empreste capital para outros proprietários.
              </p>
            </button>
            <button
              onClick={() => onNavigateToPlatform?.("newfi")}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500/10">
                  <IChart className="w-5 h-5 text-cyan-400" />
                </span>
                <h3 className="text-zinc-50 text-lg font-semibold">Pools de Liquidez</h3>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Seja um provedor de liquidez em pools automatizados. Ganhe taxas sobre transações e participe da
                governança financeira do ecossistema RealMint.
              </p>
            </button>
            <button
              onClick={() => onNavigateToPlatform?.("empreendimentos")}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-purple-500/10">
                  <IUsers className="w-5 h-5 text-purple-400" />
                </span>
                <h3 className="text-zinc-50 text-lg font-semibold">Propriedade Fracionada</h3>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Adquira o imóvel dos sonhos se expondo parcialmente, pouco a pouco, mantendo controle de portfólio e
                planejamento financeiro com transparência e segurança.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400" />
              <span className="text-white font-semibold">RealMint</span>
            </div>
            <p className="mt-3 text-zinc-400 text-sm max-w-md">Powering NewFi to Real Estate</p>
          </div>
          <div className="text-zinc-400 text-sm">© RealMint — Todos os direitos reservados.</div>
        </div>
      </footer>

      {/* Modais */}
      {modal === "credito" && (
        <Modal title="Detalhes do Crédito" onClose={() => setModal(null)}>
          <p className="text-zinc-300 leading-relaxed">
            Condições, taxas e garantias para crédito com colateral imobiliário tokenizado.
          </p>
        </Modal>
      )}

      {modal === "inv" && (
        <Modal title="Detalhes para Investidor" onClose={() => setModal(null)}>
          <p className="text-zinc-300 leading-relaxed">Como prover liquidez, riscos e retornos estimados.</p>
        </Modal>
      )}

      {offerFor && (
        <Modal title={`Nova Oferta — ${offerFor}`} onClose={() => setOfferFor(null)}>
          <form onSubmit={handleOfferSubmit} className="space-y-4">
            <input
              name="valor"
              placeholder="Valor da oferta (R$)"
              required
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/20"
            />
            <input
              name="nome"
              placeholder="Nome completo"
              required
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/20"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              required
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/20"
            />
            <textarea
              name="obs"
              placeholder="Observações (opcional)"
              rows={3}
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/20 resize-none"
            />
            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setOfferFor(null)}
                className="px-4 py-2 rounded-2xl border border-white/10 text-zinc-300 hover:bg-white/5 transition-all text-sm font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-2xl bg-[#6BFA7B] text-black font-semibold hover:brightness-110 transition-all text-sm shadow-inner"
              >
                Enviar oferta
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
