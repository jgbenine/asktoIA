# asktoIA - Sistema de Chat com IA

## 📋 Descrição do Projeto

O **asktoIA** é uma aplicação full-stack moderna que implementa um sistema de chat inteligente com IA. O projeto utiliza uma arquitetura robusta com backend em Node.js/Fastify e frontend em React/Vite, oferecendo uma experiência de usuário fluida e responsiva.

## 🏗️ Arquitetura do Sistema

### Estrutura do Projeto

```
asktoIA/
├── server/                 # Backend API (Node.js + Fastify)
│   ├── src/
│   │   ├── db/            # Configuração e schemas do banco
│   │   │   ├── schema/    # Schemas do Drizzle ORM
│   │   │   ├── migrations/ # Migrações do banco
│   │   │   └── connection.ts
│   │   ├── http/          # Rotas e handlers HTTP
│   │   │   └── routes/    # Endpoints da API
│   │   ├── services/      # Serviços (Gemini AI)
│   │   ├── env.ts         # Configuração de ambiente
│   │   └── server.ts      # Servidor principal
│   ├── docker/            # Configurações Docker
│   ├── package.json       # Dependências do backend
│   └── docker-compose.yml # Orquestração de containers
├── web/                   # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   │   └── ui/       # Componentes de UI
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── http/          # Hooks e tipos HTTP
│   │   ├── lib/           # Utilitários e configurações
│   │   └── main.tsx       # Entry point
│   └── package.json       # Dependências do frontend
└── README.md              # Documentação principal
```

## 🛠️ Stack Tecnológica

### Backend (Server)

- **Runtime**: Node.js 18+ com TypeScript
- **Framework**: Fastify 5.4.0 (alta performance)
- **Banco de Dados**: PostgreSQL 17 com pgvector
- **ORM**: Drizzle ORM 0.44.2
- **Validação**: Zod 4.0.2
- **IA**: Google Gemini AI (@google/genai)
- **CORS**: @fastify/cors
- **Upload**: @fastify/multipart
- **Linting**: Biome 2.0.6
- **Containerização**: Docker & Docker Compose

### Frontend (Web)

- **Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Styling**: Tailwind CSS 4.1.11
- **State Management**: TanStack Query 5.83.0
- **Routing**: React Router DOM 7.6.3
- **UI Components**: Radix UI + Lucide React
- **Forms**: React Hook Form + Zod
- **TypeScript**: Configuração completa
- **Linting**: Biome 2.1.1

````

## 🎯 Padrões de Projeto

### Backend

- **Arquitetura**: Clean Architecture com separação de responsabilidades
- **Roteamento**: Fastify com validação Zod
- **Banco de Dados**: Drizzle ORM com migrations automáticas
- **Validação**: Schema validation com Zod
- **CORS**: Configurado para desenvolvimento local
- **TypeScript**: Configuração estrita com ESM
- **IA Integration**: Google Gemini AI para processamento de texto

### Frontend

- **Arquitetura**: Component-based com React 19
- **Styling**: Utility-first com Tailwind CSS 4
- **State Management**: Server state com TanStack Query
- **Routing**: Client-side routing com React Router
- **Forms**: React Hook Form com validação Zod
- **TypeScript**: Configuração completa
- **Build**: Vite para desenvolvimento rápido

## 🚀 Instruções de Setup

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- Git

### 1. Clone do Repositório

```bash
git clone <repository-url>
cd asktoIA
````

### 2. Configuração do Backend

#### Instalar dependências

```bash
cd server
npm install
```

#### Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `server/`:

```env
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
PORT=3333
GEMINI_API_KEY=sua_chave_api_gemini
```

#### Iniciar banco de dados

```bash
# Iniciar container PostgreSQL
docker compose up -d

# Executar seed do banco
npm run db:seed
```

#### Iniciar servidor de desenvolvimento

```bash
npm run dev
```

#### Visualizar dados (opcional)

```bash
npx drizzle-kit studio
```

### 3. Configuração do Frontend

#### Instalar dependências

```bash
cd web
npm install
```

#### Iniciar servidor de desenvolvimento

```bash
npm run dev
```

## 🔧 Configurações

### Backend

- **Porta**: 3333 (configurável via env)
- **CORS**: Configurado para `http://localhost:5173`
- **Database**: PostgreSQL 17 com pgvector na porta 5432
- **Health Check**: `/health` endpoint
- **Upload**: Suporte a multipart para upload de áudio

### Frontend

- **Porta**: 5173 (Vite default)
- **Alias**: `@` aponta para `./src`
- **Hot Reload**: Habilitado
- **TypeScript**: Configuração estrita

### Docker

- **PostgreSQL**: pgvector/pgvector:pg17
- **Porta**: 5432
- **Credenciais**: docker/docker
- **Database**: agents
- **Extensões**: pgvector habilitado

## 📁 Estrutura de Arquivos Importantes

### Backend

- `server/src/server.ts` - Configuração principal do Fastify
- `server/src/env.ts` - Variáveis de ambiente
- `server/src/db/connection.ts` - Conexão com banco
- `server/src/db/schema/` - Schemas do Drizzle (rooms, questions, audio-chunks)
- `server/src/http/routes/` - Rotas da API
- `server/src/services/gemini.ts` - Integração com IA
- `server/docker-compose.yml` - Orquestração Docker

### Frontend

- `web/src/main.tsx` - Entry point da aplicação
- `web/src/app.tsx` - Componente raiz
- `web/src/components/` - Componentes reutilizáveis
- `web/src/pages/` - Páginas da aplicação (create-room, room, record-room-audio)
- `web/src/http/` - Hooks e tipos para comunicação com API
- `web/src/lib/` - Utilitários e configurações
- `web/vite.config.ts` - Configuração do Vite

## 🧪 Scripts Disponíveis

### Backend

```bash
npm run dev          # Desenvolvimento com hot reload
npm run start        # Produção
npm run db:generate  # Gerar migrations
npm run db:migrate   # Executar migrations
npm run db:seed      # Executar seed do banco
```

### Frontend

```bash
npm run dev          # Desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
```

## 🔍 Endpoints da API

- `GET /health` - Health check
- `GET /rooms` - Listar salas
- `POST /rooms` - Criar sala
- `GET /rooms/:id/questions` - Buscar perguntas de uma sala
- `POST /questions` - Criar pergunta
- `POST /upload-audio` - Upload de áudio

## 🎨 Padrões de Código

### Linting e Formatação

- **Backend**: Biome para linting e formatação
- **Frontend**: Biome para linting e formatação
- **TypeScript**: Configuração estrita em ambos

### Convenções

- **Naming**: camelCase para variáveis, PascalCase para componentes
- **Imports**: Organizados automaticamente pelo Biome
- **TypeScript**: Uso extensivo de tipos e interfaces
- **Components**: Estrutura modular com separação de responsabilidades

## 🐳 Docker

### Serviços Disponíveis

- **PostgreSQL**: pgvector/pgvector:pg17
- **Porta**: 5432
- **Credenciais**: docker/docker
- **Database**: agents
- **Extensões**: pgvector habilitado automaticamente

### Comandos Docker

```bash
# Iniciar serviços
docker compose up -d

# Parar serviços
docker compose down

# Ver logs
docker compose logs -f

# Rebuild containers
docker compose up -d --build
```

## 🤖 Integração com IA

### Google Gemini AI

- **Serviço**: @google/genai
- **Funcionalidade**: Processamento de texto e respostas inteligentes
- **Configuração**: Via GEMINI_API_KEY no .env
- **Uso**: Análise de perguntas e geração de respostas

## 📝 Funcionalidades Principais

### Backend

- ✅ Sistema de salas (rooms)
- ✅ Sistema de perguntas (questions)
- ✅ Upload e processamento de áudio
- ✅ Integração com Google Gemini AI
- ✅ Validação de dados com Zod
- ✅ Migrations automáticas com Drizzle

### Frontend

- ✅ Interface moderna com Tailwind CSS
- ✅ Sistema de rotas com React Router
- ✅ Gerenciamento de estado com TanStack Query
- ✅ Formulários com React Hook Form
- ✅ Componentes reutilizáveis
- ✅ Gravação de áudio

## 🔗 Links Úteis

- [Fastify Documentation](https://www.fastify.io/docs/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query)
- [Google Gemini AI](https://ai.google.dev/)
- [Radix UI](https://www.radix-ui.com/)

## 🚀 Deploy

### Backend

```bash
# Build para produção
npm run build

# Executar em produção
npm start
```

### Frontend

```bash
# Build para produção
npm run build

# Servir arquivos estáticos
npm run preview
```

## 📊 Monitoramento

- **Health Check**: `/health` endpoint
- **Logs**: Console logging configurado
- **Database**: Drizzle Studio para visualização
- **Performance**: Fastify com alta performance

## 🔒 Segurança

- **CORS**: Configurado para desenvolvimento
- **Validação**: Zod para validação de entrada
- **TypeScript**: Tipagem estrita
- **Environment**: Variáveis sensíveis em .env

---

**Desenvolvido com tecnologias modernas e boas práticas de desenvolvimento.**
