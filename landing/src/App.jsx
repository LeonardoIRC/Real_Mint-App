// App principal com navegação

import { useState } from "react";
import { AppProvider } from "./context/AppContext";
import { TopMenu } from "./components/TopMenu";
import Landing from "./components/Landing";
import { EmpreendimentosGrid } from "./components/empreendimentos/EmpreendimentosGrid";
import { ProjectDetailPage } from "./components/empreendimentos/ProjectDetailPage";
import { NFTDetailsPage } from "./components/empreendimentos/NFTDetailsPage";
import { ProjectList } from "./components/status/ProjectList";
import { CondoDetail } from "./components/status/CondoDetail";
import { NewFiHome } from "./components/newfi/NewFiHome";
import { ServicesPage } from "./components/newfi/ServicesPage";
import { LendPage } from "./components/newfi/LendPage";
import { InvestorsPage } from "./components/investors/InvestorsPage";
import { InfraDashboard } from "./components/infra/InfraDashboard";
import Cadastro from "./pages/Cadastro";
import Checkout from "./pages/Checkout";

function PlatformApp() {
  const [tab, setTab] = useState("landing");
  const [selected, setSelected] = useState(null);
  const [statusProject, setStatusProject] = useState(null);
  const [newfiView, setNewfiView] = useState("home");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedUnitProject, setSelectedUnitProject] = useState(null);
  const [checkoutSlug, setCheckoutSlug] = useState(null);

  const openDetail = (p) => {
    setSelected(p);
    setTab("detalhes");
  };
  const openStatusDetail = (p) => setStatusProject(p);
  const goToNewFiCredit = () => {
    setTab("newfi");
    setNewfiView("credit");
  };
  const goToNewFiLend = () => {
    setTab("newfi");
    setNewfiView("lend");
  };
  const openUnitDetails = (unit, project) => {
    setSelectedUnit(unit);
    setSelectedUnitProject(project);
    setTab("nft");
  };
  const navigateToPlatform = (key, subView = null) => {
    if (key === "cadastro") {
      setTab("cadastro");
    } else if (key === "checkout") {
      setCheckoutSlug(subView);
      setTab("checkout");
    } else if (key === "detalhes" && subView) {
      // Se for navegação para detalhes, usar o projeto passado
      setSelected(subView);
      setTab("detalhes");
    } else {
      setTab(key);
      if (key === "newfi" && subView) {
        setNewfiView(subView);
      } else if (key === "newfi") {
        setNewfiView("home");
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {tab !== "landing" && tab !== "cadastro" && tab !== "checkout" && (
        <TopMenu
          current={tab}
          onChange={(key) => {
            setTab(key);
            if (key !== "detalhes") setSelected(null);
            if (key !== "status") setStatusProject(null);
            if (key === "newfi") setNewfiView("home");
            if (key !== "nft") {
              setSelectedUnit(null);
              setSelectedUnitProject(null);
            }
          }}
        />
      )}
      <div className={tab === "landing" || tab === "cadastro" || tab === "checkout" ? "" : "max-w-6xl mx-auto px-6 py-8"}>
        {tab === "landing" && <Landing onNavigateToPlatform={navigateToPlatform} />}

        {tab === "empreendimentos" && <EmpreendimentosGrid onOpen={openDetail} />}

        {tab === "detalhes" && selected && (
          <ProjectDetailPage
            project={selected}
            onBack={() => setTab("empreendimentos")}
            onOpenServices={goToNewFiCredit}
            onOpenUnit={openUnitDetails}
          />
        )}

        {tab === "nft" && selectedUnit && (
          <NFTDetailsPage unit={selectedUnit} project={selectedUnitProject} onBack={() => setTab("detalhes")} />
        )}

        {tab === "status" &&
          (statusProject ? (
            <CondoDetail project={statusProject} onBack={() => setStatusProject(null)} />
          ) : (
            <ProjectList onOpen={openStatusDetail} />
          ))}

        {tab === "newfi" &&
          (newfiView === "home" ? (
            <NewFiHome
              onOpenCredit={() => setNewfiView("credit")}
              onOpenLend={() => setNewfiView("lend")}
              onOpenInvestors={() => setTab("investors")}
              onBackToMain={() => setTab("empreendimentos")}
            />
          ) : newfiView === "credit" ? (
            <ServicesPage project={selected || { name: "Condomínio Vila Nova" }} onBack={() => setNewfiView("home")} />
          ) : (
            <LendPage onBack={() => setNewfiView("home")} />
          ))}

        {tab === "investors" && <InvestorsPage onBack={() => setTab("empreendimentos")} />}

        {tab === "infra" && <InfraDashboard onNavigate={navigateToPlatform} />}

        {tab === "cadastro" && <Cadastro />}

        {tab === "checkout" && <Checkout empreendimento={checkoutSlug} />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <PlatformApp />
    </AppProvider>
  );
}
