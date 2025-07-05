# Aurora Frontend

Este é o frontend da aplicação Aurora, responsável por exibir dados de auroras boreais em tempo real.

## Tecnologias Utilizadas

- React.js
- Leaflet para mapas interativos
- Axios para requisições HTTP

## Configuração

1. Clone este repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Crie um arquivo `.env` com as seguintes variáveis:
   ```
   PORT=62421
   REACT_APP_API_URL=https://auroraapi-11yt.onrender.com/api/aurora-data
   REACT_APP_ENV=production
   ```
4. Inicie o servidor:
   ```
   npm start
   ```

## Construção para Produção

Para criar uma versão otimizada para produção:

```
npm run build
```

Os arquivos de produção serão gerados na pasta `build`.

## Deploy no Netlify ou Render

Este frontend está configurado para ser facilmente implantado no Netlify ou Render:

### Netlify

1. Conecte seu repositório GitHub ao Netlify
2. Use as configurações do arquivo `netlify.toml` presente no repositório

### Render

1. Conecte seu repositório GitHub ao Render
2. Crie um novo Web Service com as seguintes configurações:
   - Build Command: `npm install && npm run build`
   - Start Command: `npx serve -s build`
   - Environment: Node.js

## Variáveis de Ambiente para Produção

No Netlify ou Render, configure as seguintes variáveis de ambiente:

- `REACT_APP_API_URL=https://auroraapi-11yt.onrender.com/api/aurora-data`
- `REACT_APP_ENV=production`