# RealMintGPT - Landing Page

Landing page do projeto RealMintGPT, construída com React, Vite, Tailwind CSS e Lucide React.

## Stack Tecnológica

- **React 18** - Biblioteca UI
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Ícones SVG

## Como executar

1. Instale as dependências:
```bash
cd landing
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra [http://localhost:5174](http://localhost:5174) no navegador.

## Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento na porta 5174
- `npm run build` - Cria a build de produção
- `npm run preview` - Preview da build de produção
- `npm run lint` - Executa o linter

## Estrutura do projeto

```
landing/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Notas

- Este é um projeto independente do projeto principal
- Roda em uma porta diferente (5174) para não conflitar
- Usa o mesmo padrão visual (dark theme com zinc colors)

