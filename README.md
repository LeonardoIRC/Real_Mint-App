# Tokenização Imobiliária — MVP (Dark)

Este projeto é um **MVP navegável** (sem backend) para uma plataforma de **tokenização imobiliária** com serviços financeiros.
Focado em **UX/UI dark mode**, dados **mockados** e infraestrutura **plugável** para integrar carteiras smart (EIP-4337), KYC e saldo operacional.

---

## Visão Geral

* **Stack:**

  * **React + JSX** (sem Next.js, sem TypeScript)
  * **TailwindCSS** (estilização)
  * **Ícones**: versão inline tipo Lucide (sem dependências)
  * **Navegação** com `useState` (sem router)
  * **Dados mockados**
  * **Dark mode** nativo
  * **Persistência**: `localStorage` (sessão, configurações, saldo, históricos)

* **Infraestrutura pronta (mock/stub):**

  * **Smart Accounts (EIP-4337)**: criação de **smart wallet** vinculada ao usuário
  * Envio de **UserOperations** simuladas via **bundler URL** configurável
  * **Paymaster ON/OFF** (modo gás patrocinado)
  * **Session key** simples (evita pop-ups)
  * **Login mock** (e-mail) e **passkey/WebAuthn stub**
  * **KYC opcional**: mock (aprovação automática) + stub para integração futura
  * **Operating Balance** (saldo segregado): depósito/saque simulados + extrato (ledger)

---

## Seções do Produto

### 1) Menu superior (Top Menu)

Navegação por abas (sem rotas):
**Empreendimentos | Status | NewFi | Conta**

---

### 2) Empreendimentos (Marketplace)

* **Vitrine ilustrada** de empreendimentos (3 por linha, até 9 por página com paginação).
* Cada card exibe **logo ilustrativa**, **nome**, **cidade** e **status** (bolinha verde/amarelo/vermelha).
* Ação **Ver detalhes** abre a página do empreendimento.

#### Detalhes do Empreendimento (Vendas primárias)

* **Chips de ação** (Compre agora / Faça uma oferta / Outros serviços ativos).
* **Regra de mercado**: a *maior oferta* (mock) **sempre** é **menor** que o *menor preço de venda*.
* **Grade de unidades** (cards) com torre, número do apto e preço.
* **Últimas negociações** (preços mockados).
* Clique numa unidade abre **NFT/Imóvel Details**.

#### NFT / Imóvel Details

Mostra os metadados da unidade:

* **Torre**, **Andar**, **Número**, **Vista**, **Quartos**, **Banheiros**, **Suítes**, **Área (m²)**
* **Preço** e CTAs: **Compre agora** | **Faça uma oferta**
* Ilustração simples da unidade (placeholder).

---

### 3) Status (Monitoramento de Tokenização)

* **Lista** de empreendimentos (até 10 por página) em **2 colunas** com **bolinha de status**:

  * **Verde**: OK
  * **Amarelo**: atraso na atualização do status
  * **Vermelho**: alteração não esperada em documento
* Ao clicar em um empreendimento, abre a **lista de apartamentos**:

  * Título com o **nome do condomínio**
  * **Destaques negativos** (chips) coerentes com o problema:

    * *amarelo* → atraso/pendência
    * *vermelho* → inconsistência/alteração inesperada
  * **Torres em colunas** (ex.: Vila Nova tem 4 colunas: Torre 1–4)
  * Apartamentos listados como **“Apto 104 — 1º andar, apto 04”** (formatação conforme o padrão)
  * Ao lado da bolinha verde, **link “Ver doc”** (simulado)
  * **Paginação** a partir da linha 10

---

### 4) NewFi (Serviços Financeiros)

**Página principal NewFi** (cards grandes tipo “pílula”):

* **EMPRESTE** — destaque **20% a.a.** (rendimento)
* **ACESSO A CRÉDITO** — destaque **30% a.a.** (taxa de empréstimo)
* **INVESTIDORES** — **60% a.a.** (rendimento atual, mock)
* **EXPOSIÇÃO FRACIONADA** — “comece com apenas **R$10.000**”

**Design:**

* Layout 3/4 texto e 1/4 número, número com **“a.a.” na mesma linha**, tamanho confortável e responsivo.

#### Acesso a Crédito (página)

* **Condições** mock: até **R$200.000**, **30% a.a.**, **24 meses**
* Texto regulatório UX:

  * imóvel **como garantia** (negociado com a *pool*, **sem alienação fiduciária**)
  * **sem análise de crédito**
  * **liberação imediata**
  * **qualquer proprietário** pode acessar
* **Controle de valor** (slider) + botão **“Pegar empréstimo de R$ X”** (simulado)

#### Empreste (página)

* **Dashboard**: rendimento anual, valor em pool, nº de empréstimos ativos, nº de emprestadores
* **Form de aporte**: valor numérico + slider
* **Regras**: LTV até 60%; liquidação no 1º lance ou pool; juros pagos à pool

> **Obs.:** O fluxo de **Empreste** foi mantido conforme solicitado.

---

### 5) Conta (Infra / “InfraDashboard”)

Infraestrutura **plugável** e **mockável**:

* **Login**

  * **E-mail (mock)** — cria sessão local
  * **Passkey/WebAuthn (stub)** — simula sucesso, sem pop-ups reais
* **Smart Wallet (EIP-4337, mock)**

  * Criar e vincular **smart wallet** ao usuário (endereço simulado)
  * **Chain**: Base / Base Sepolia
  * **Bundler URL** configurável
  * **Paymaster ON/OFF** (gás patrocinado)
  * **Session key** simples (string)
  * Envio de **UserOperation** simulada (registra no histórico)
  * **Histórico** de UOs (ledger local)
* **KYC Center (opcional)**

  * **Mock**: aprova em segundos
  * **Stub**: pronto para integrar provedor real (futuro)
  * A plataforma funciona **sem KYC**
* **Operating Balance (saldo segregado)**

  * **Depósito** e **Saque** (simulados)
  * **Extrato** (ledger em `localStorage`)

---

## Como Rodar (Zero Terminal)

Você pode rodar **sem npm**:

1. Crie um arquivo `index.html`.
2. **Cole** o conteúdo do arquivo “no-build” (React via CDN + Babel + Tailwind via CDN).
3. Abra o `index.html` no navegador (ou use o **Live Preview** do Cursor).
4. Pronto — toda a navegação funciona localmente, com persistência em `localStorage`.

> Se quiser um projeto “com build” (Vite), também há uma versão com **estrutura de pastas** que você pode usar depois.

---

## Estrutura Lógica (no-build)

Tudo está em **um único `index.html`** com as seções moduladas em componentes React:

* **TopMenu** — navegação por `useState`
* **EmpreendimentosGrid → ProjectDetailPage → NFTDetailsPage**
* **Status → ProjectList → CondoDetail (com destaques + torres + paginação)**
* **NewFi → NewFiHome → ServicesPage (Acesso a Crédito) / LendPage (Empreste)**
* **InfraDashboard → Login, WalletPanel, OperatingBalance, KYCCenter**

Persistência: `localStorage` (sessão, KYC, settings 4337, wallet, ledgers, saldo).

---

## Cenários de Demonstração

* **Vitrine**: Explore 9+ empreendimentos paginados.
* **Status**: Compare estados (verde/amarelo/vermelho) e veja **destaques negativos coerentes** com o problema.
* **CondoDetail**: Abra o condomínio, incl. **Vila Nova** com 4 torres e paginação de aptos.
* **NewFi/Acesso a Crédito**: Experimente o slider e o botão **Pegar empréstimo**.
* **NewFi/Empreste**: Ajuste o aporte e veja o painel de métricas.
* **Conta**: Faça **login mock**, crie a **smart wallet**, configure **bundler**, ative **paymaster**, defina **session key**, envie uma **UO** (simulada), **deposite/saque** no saldo e **inicie KYC** (mock).

---

## Como Integrar com Stacks Reais (Roadmap)

* **4337 real**
  Trocar o cliente **mock** por SDK de AA (ex.: Alchemy/StackUp/thirdweb/Biconomy), apontando para **Base / Base Sepolia**.

  * Substituir função `sendOp` por envio real ao **Bundler**
  * Gerar/assinar **session keys** verdadeiras
  * Integrar **Paymaster** real (gás patrocinado)

* **KYC real**
  No **stub**, iniciar provider (Sumsub/Veriff/etc.), lidar com **webhooks** e salvar status reais.

* **Backend / DB**
  Migrar o que está em `localStorage` para APIs (autenticação, saldos, carteiras, ofertas, compras, auditorias).

* **Roteamento**
  Se desejar, migrar a navegação `useState` para React Router.

---

## Padrões de UI/UX

* **Dark mode** consistente
* **Cards** com bordas suaves e contrastes (#zinc)
* **Acessibilidade**: textos claros, hierarquia visual
* **Layout responsivo** (grid adaptável)
* **Sem pop-ups excessivos** (session key e mocks evitam fricção)

---

## Dúvidas frequentes (FAQ)

* **“Não tenho npm nem terminal.”**
  Use o **`index.html` no-build**. Abra direto no navegador.

* **“Cadê os dados reais?”**
  São **mockados** para demonstrar fluxos e UI. Fácil de plugar em APIs.

* **“É seguro?”**
  Este é um **protótipo**. Nada é transmitido on-chain por padrão.

* **“Posso mudar os nomes/cores?”**
  Sim. Tailwind facilita alterar estilos diretamente nas classes.

---

## Licença & Uso

* Uso livre para **prototipagem** e **demonstração interna**.
* Ao integrar serviços reais (4337/KYC/etc.), revise requisitos de **compliance** e **segurança**.

---

## Precisa de algo?

Posso:

* Gerar um **README técnico curto** para o time (setup, variáveis, deploy).
* Transformar o `index.html` em projeto **Vite** (com `src/` modular).
* Especificar endpoints para backend (ofertas, compras, KYC callbacks, ledgers).
