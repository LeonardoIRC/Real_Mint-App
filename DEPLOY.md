# Instruções de Deploy no Vercel

## ⚠️ IMPORTANTE: Configuração Obrigatória

O Vercel **PRECISA** ter o Root Directory configurado manualmente nas settings do projeto.

### Passo a Passo:

1. Acesse o [Dashboard do Vercel](https://vercel.com/dashboard)
2. Selecione seu projeto **Real_Mint-App**
3. Vá em **Settings** → **General**
4. Role até a seção **Root Directory**
5. Clique em **Edit**
6. Digite: `landing`
7. Clique em **Save**
8. Vá em **Deployments** e faça um novo deploy (ou aguarde o deploy automático após push)

## Configuração do vercel.json

O arquivo `vercel.json` na raiz do projeto está configurado com:
- `rootDirectory: "landing"` - Define a pasta raiz do projeto
- `buildCommand: "npm install && npm run build"` - Instala dependências e faz build
- `outputDirectory: "dist"` - Pasta de saída (relativa ao rootDirectory)
- `framework: "vite"` - Framework detectado
- `rewrites` - Configuração para SPA (todas as rotas vão para index.html)

## Estrutura do Projeto

```
RealMintGPT/
├── vercel.json          # Configuração do Vercel
├── package.json         # Scripts auxiliares
└── landing/             # ⬅️ Root Directory do Vercel
    ├── package.json     # Dependências do projeto
    ├── vite.config.js   # Configuração do Vite
    ├── index.html       # HTML principal
    ├── src/             # Código fonte
    └── dist/            # Build de produção (gerado)
```

## Troubleshooting

### Se o site não aparecer:

1. **Verifique o Root Directory**: Deve estar como `landing` nas settings
2. **Verifique os logs de build**: Vá em Deployments → [último deploy] → Build Logs
3. **Verifique se o build gerou a pasta `dist`**: Deve conter `index.html` e assets
4. **Verifique se há erros de build**: Procure por erros nos logs

### Se aparecer erro 404:

- O `rewrites` no `vercel.json` deve estar configurado corretamente
- Verifique se o `index.html` está na pasta `dist` após o build

## Verificação Pós-Deploy

Após o deploy, a landing page deve aparecer automaticamente, pois o `App.jsx` está configurado para começar com `tab === "landing"`.

