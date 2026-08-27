<div align="center">
  <img src="https://raw.githubusercontent.com/AgentKart/assets/main/logo.png" alt="AgentKart Logo" width="200" height="auto" />
  <h1>AgentKart: Autonomous AI Workforce Platform</h1>
  
  <p>
    <strong>A Production-Ready Orchestration & Hiring Platform for AI Agents</strong>
  </p>
  
  <p>
    <a href="#architecture"><img src="https://img.shields.io/badge/Architecture-Microservices-blue.svg" alt="Architecture" /></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Frontend-Next.js%2014-black.svg" alt="Next.js" /></a>
    <a href="https://nestjs.com/"><img src="https://img.shields.io/badge/Core%20API-NestJS-ea2845.svg" alt="NestJS" /></a>
    <a href="https://fastapi.tiangolo.com/"><img src="https://img.shields.io/badge/AI%20API-FastAPI-009688.svg" alt="FastAPI" /></a>
    <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/ORM-Prisma-2d3748.svg" alt="Prisma" /></a>
    <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Infra-Docker-2496ed.svg" alt="Docker" /></a>
  </p>
</div>

---

## 📖 Overview

**AgentKart** is a next-generation platform designed to let businesses hire, orchestrate, and manage autonomous AI agents exactly like human talent. 

Rather than deploying isolated chatbots, AgentKart enables the deployment of a **hierarchical digital workforce**. You can deploy a "CEO Agent" that breaks down strategic goals and routes sub-tasks to specialized domain agents (e.g., Sales, Marketing, Customer Support) functioning seamlessly in the background.

## ✨ Key Features

- **Hierarchical Agent Architecture**: Visual, tree-based orchestration where Manager Agents route tasks to Junior Worker Agents.
- **Agent Profiles & Hiring**: Detailed capabilities, integration support (Salesforce, Zendesk, Stripe), and one-click "Hire" and "7-Day Trial" provisioning.
- **AI Matching Engine (FastAPI)**: Evaluates natural language user goals and routes them to the correct agent using LangChain, Qdrant (Vector DB), and Neo4j (Graph DB).
- **Secure Core Platform (NestJS)**: Enterprise-grade access control, organization management, and execution auditing backed by PostgreSQL and Prisma.
- **Modern Interactive UI (Next.js)**: Glassmorphic, highly-responsive frontend designed for frictionless AI adoption.

---

## 🏗️ Architecture

AgentKart utilizes a modular microservices architecture to separate standard business logic from computationally heavy AI operations.

| Service | Technology | Port | Description |
| :--- | :--- | :--- | :--- |
| **Web Frontend** | Next.js 14, TailwindCSS, React | `3000` | The user-facing dashboard for hiring agents and viewing the live Org Chart. |
| **Core API** | NestJS, TypeScript, Prisma | `3001` | Handles traditional CRUD (Users, Orgs, Billing) and interacts with PostgreSQL. |
| **AI Orchestration API** | FastAPI, Python 3.11, LangChain | `8000` | Handles LLM intent extraction, RAG pipelines, and agent-to-agent task routing. |
| **Relational DB** | PostgreSQL 15 | `5433` | Primary source of truth for platform data (Orgs, Orders, Agents). |
| **Vector DB** | Qdrant | `6333` | Stores high-dimensional embeddings for semantic task matching. |
| **Graph DB** | Neo4j 5 | `7474` | Maps hierarchical agent relationships (e.g., CEO → CTO) and data lineage. |
| **Cache & Queue** | Redis 7 | `6379` | Handles rate limiting, temporal queueing, and fast-access session states. |
| **Observability** | Prometheus + Grafana | `9090`, `3002` | Distributed tracing, metrics, and health monitoring for all containers. |

---

## 🚀 Getting Started

Follow these steps to run the full platform locally on your machine.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) running on your machine.
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Python 3.11+](https://www.python.org/downloads/)

### 1. Spin up the Infrastructure
Start the data layer (Postgres, Redis, Neo4j, Qdrant, Grafana, Prometheus).
```bash
docker-compose up -d
```

### 2. Initialize and Start Core API (NestJS)
Push the relational schema to the database and start the backend.
```bash
cd apps/core-api
# Ensure your .env has: DATABASE_URL="postgresql://agentkart:password@localhost:5433/agentkart?schema=public"
npx prisma db push
npm run start:dev
```

### 3. Start AI Orchestration API (FastAPI)
Initialize the Python virtual environment and start the AI engine.
```bash
cd apps/ai-api
python -m venv venv
# Windows: .\venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 4. Start the Web Frontend (Next.js)
Launch the interactive marketplace UI.
```bash
cd apps/web
npm install
npm run dev
```

### 5. Run the CEO Orchestration Workflow (Phase 3 & 4)
The AI engine uses Temporal.io and Neo4j to manage the hierarchical execution of agents.
1. Download and start the local [Temporal CLI](https://docs.temporal.io/cli/#install):
```bash
temporal server start-dev
```
2. Start the AI Orchestrator Worker (in `apps/ai-api`):
```bash
python -m temporal.worker
```
3. Trigger a Multi-Agent CEO Task (in another terminal):
```bash
python -m temporal.run_workflow
```
This triggers the CEO agent to interact with Neo4j, find its subordinate agents, and execute the Marketing, Sales, and Support agents durably!

---

## 🗺️ Roadmap & Phases

- [x] **Phase 0: Foundation**: Monorepo scaffolding, Terraform stubs, Prisma Schema, Docker Compose.
- [x] **Phase 1: Marketplace UI**: 2-Column Hero, Interactive Org Chart, Agent Profiles, Trial Provisioning UI.
- [x] **Phase 2: AI Matching Engine**: Connect FastAPI to FastEmbed and Qdrant for semantic agent retrieval.
- [x] **Phase 3: Orchestration**: Implement Temporal.io for durable, long-running agent task executions.
- [x] **Phase 4: Multi-Agent Workflows**: Enable graph-based execution where the CEO Agent breaks down requirements into sub-tasks for domain agents via Neo4j.

---

## 🛡️ Security & Compliance

AgentKart is built with enterprise adoption in mind. The architecture supports:
- **SOC2 Type II & GDPR** compliance pathways.
- Strict isolation of tenant data via PostgreSQL Row Level Security (RLS).
- Ephemeral execution contexts to prevent cross-contamination of agent memory.

---

<div align="center">
  <i>Built for the future of work.</i>
</div>