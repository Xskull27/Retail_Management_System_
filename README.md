# Retail Sales Management System 🛒

## Overview

This repository contains a full-stack Retail Sales Management System: a Vite + React + TypeScript frontend and a Node.js + Express backend that reads from AWS DynamoDB. The app demonstrates handling very large datasets (≈1,000,000 records) with performant search, multi-filters, sorting, and pagination.

## Features

- **Fast search** with debounce and server-assisted full-text matching (customer name, phone).
- **Multi-dimensional filters** (region,age, product category, date range, payment method, etc.).
- **Stable sorting** (date, quantity, customer name) applied server-side for large results.
- **Chunked DynamoDB scanning** to process large datasets efficiently and avoid memory spikes.
- **App-level pagination** with consistent page sizes for dashboard UX.

## Tech Stack

- **Frontend:** React (Vite) + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** AWS DynamoDB (accessed via AWS SDK v3)
- **HTTP client:** Axios

## Repo Structure (high level)

- `backend/` — Express API, DynamoDB integration, `src/` contains controllers, services, utils and `index.js`.
- `frontend/` — Vite + React app located in `frontend/` with components, hooks and services.
- `docs/` — Architecture and design docs (see `docs/Architecture.md`).

## Quick Start

1. Start the backend (from repository root):

```powershell
cd backend
npm install
# Run the backend (if no npm start script is defined)
node src/index.js
```

2. Start the frontend in a separate terminal:

```powershell
cd frontend
npm install
npm run dev
```

## Environment / AWS notes

- Copy `backend/.env.example` to `backend/.env` and fill in real values before running the backend.
- The backend expects AWS credentials (or a local DynamoDB endpoint configured via `DYNAMODB_ENDPOINT`).

Example `backend/.env` (from `backend/.env.example`):

```
PORT=3000
NODE_ENV=development
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
DYNAMODB_ENDPOINT=http://localhost:8000
SALES_TABLE_NAME=SalesTable
```

## Development notes

- Frontend dev server uses Vite (default port `5173`).
- Backend uses AWS SDK v3 for DynamoDB; ensure `AWS_*` env vars or local endpoints are configured.

## Docs and references

- Architecture: `docs/Architecture.md`
- Frontend-specific README: `frontend/README.md`


