# Retail Sales Management System 🛒

## Overview

This repository contains a full-stack Retail Sales Management System: a Vite + React + TypeScript frontend and a Node.js + Express backend that reads from AWS DynamoDB. The app demonstrates handling very large datasets (≈1,000,000 records) with performant search, multi-filters, sorting, and pagination.

<img src="./docs/Screenshot%202025-12-08%20011616.png" alt="Sales Dashboard" width="100%" />

## Features

- **Fast search** with debounce and server-assisted full-text matching (customer name, phone).
- **Multi-dimensional filters** (region, age, product category, date range, payment method, etc.).
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
- `docs/` — Architecture and design docs (`docs/Architecture.md`).  

## Quick Start

### 1. Start the backend:

```bash
cd backend
npm install
node src/index.js
