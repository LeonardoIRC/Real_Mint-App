# Instruções de Deploy no Vercel

## Configuração Automática

O arquivo `vercel.json` já está configurado para:
- Buildar a pasta `landing`
- Instalar dependências na pasta `landing`
- Servir os arquivos do `landing/dist`
- Configurar rewrites para SPA (Single Page Application)

## Configuração Manual (Recomendado)

Para garantir que funcione perfeitamente:

1. Acesse as configurações do projeto no Vercel
2. Vá em **Settings** → **General**
3. Em **Root Directory**, selecione: `landing`
4. Salve as alterações
5. Faça um novo deploy

## Estrutura do Projeto

- **Pasta raiz**: Contém configurações gerais
- **Pasta `landing/`**: Contém o projeto React/Vite completo
  - `landing/src/`: Código fonte
  - `landing/dist/`: Build de produção (gerado pelo Vite)
  - `landing/package.json`: Dependências do projeto

## Verificação

Após o deploy, a landing page deve aparecer automaticamente, pois o `App.jsx` está configurado para começar com `tab === "landing"`.

