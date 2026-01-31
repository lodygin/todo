# Todo App

Full-stack todo application built with NestJS and Angular.

## Tech Stack

- **Backend:** NestJS, TypeORM, PostgreSQL
- **Frontend:** Angular, NgRx Signals
- **Monorepo:** pnpm workspaces

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) or [Podman](https://podman.io/) (optional, for PostgreSQL)

## Installation

```bash
pnpm install
```

## Environment Setup

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Default values for local development:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=todo
DB_PASSWORD=todo
DB_NAME=todo
```

## Running PostgreSQL

```bash
# Docker
docker compose up -d

# or Podman
podman compose up -d
```

## In-Memory Mode

If you don't want to run a database, switch to the in-memory driver.

In `packages/server/src/main.ts`, change:

```ts
AppModule.register({ driver: 'orm' });
```

to:

```ts
AppModule.register({ driver: 'in-memory' });
```

## Running the App

```bash
# Start both server and client
pnpm dev

# Or run separately
pnpm server:dev
pnpm client:dev
```

## API Client Generation

Generate the API client from the OpenAPI spec (requires a running server):

```bash
pnpm --filter client api:generate
```

## API Documentation

Swagger UI is available at [http://localhost:3000/api/docs](http://localhost:3000/api/docs) when the server is running.
