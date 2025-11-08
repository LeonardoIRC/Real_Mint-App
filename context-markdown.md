# Contexto do Projeto — RealMint MVP

Este repositório contém dois elementos principais:

1. **README.md** — documentação explicando toda a estrutura do projeto e suas seções.
2. **exemplo.md** — contém um exemplo funcional completo em HTML + React (sem build), representando o produto MVP de tokenização imobiliária com dark mode e dados mockados.

## Objetivo

Quero transformar o conteúdo do arquivo `exemplo.md` (que é um código HTML completo com React via CDN e Babel Standalone) em um **projeto React funcional** dentro da pasta `src`, usando o stack atual do repositório:

- React + JSX (sem Next.js nem TypeScript)
- TailwindCSS já configurado
- Navegação por `useState`
- Ícones Lucide (ou inline, se mais simples)
- Dados mockados
- Dark mode
- Tudo modularizado, dividindo as partes principais em componentes

## O que quero que o Cursor faça

1. **Ler e entender o código em `exemplo.md`.**
2. Reestruturar esse código em **arquivos React dentro de `src/`**, mantendo a mesma aparência e comportamento.
3. Criar os componentes necessários:
   - `App.jsx` (com o roteamento por `useState`)
   - `components/TopMenu.jsx`
   - `components/Empreendimentos.jsx`
   - `components/Status.jsx`
   - `components/NewFi.jsx`
   - `components/Infra.jsx`
   - e quaisquer subcomponentes que o Cursor julgar necessários (UnitCard, ProjectDetailPage, etc.).
4. Manter **Tailwind** funcionando.
5. Garantir que o app rode com `npm run dev` (Vite).
6. Deixar o `index.html` e o `main.jsx` prontos para renderizar o app.
7. Manter tudo modular, limpo e fiel ao visual e comportamento do exemplo.
8. Caso o código de `exemplo.md` tenha scripts inline, o Cursor deve convertê-los para o formato correto de componentes React modernos (sem Babel inline).
9. O `README.md` já explica toda a lógica — o Cursor pode usá-lo como referência para nomear os componentes.

## Resultado esperado

Ao final, eu quero poder rodar:

```bash
npm install
npm run dev
