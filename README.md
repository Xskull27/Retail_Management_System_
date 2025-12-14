# Retail Sales Management System 🛒

## Overview

Managing large-scale retail data efficiently is challenging. This project tackles that by building a performant dashboard that handles **1 million sales records** from AWS DynamoDB. The system combines a modern React + TypeScript frontend with an optimized Node.js backend, featuring intelligent caching, progressive loading, and multi-dimensional filtering to ensure smooth user experience even at scale.

![Project screenshot](./image.png)


![alt text](image.png)
## Features

- **Fast search** with debounce and server-assisted full-text matching (customer name, phone).
- **Multi-dimensional filters** (region, age, product category, date range, payment method, etc.).
- **Stable sorting** (date, quantity, customer name) applied server-side for large results.
- **Chunked DynamoDB scanning** to process large datasets efficiently and avoid memory spikes.
- **App-level pagination** with consistent page sizes for dashboard UX.

## Backend Techniques & Optimizations

### Data Scale
- **10 Lakh (1,000,000) records** stored in AWS DynamoDB
- Data fetched directly from **AWS Console DynamoDB** using AWS SDK v3

### Performance Optimizations
- **Adaptive chunking:** Uses 100k item chunks for search-only queries, 10k chunks when filters applied
- **Smart caching:** In-memory cache with 5-min TTL stores search results, filters applied client-side for instant filtering
- **Background scanning:** Continues fetching data in background while returning quick results for page 1
- **Cancellation mechanism:** Automatically cancels old scans when new search initiated
- **Quick return threshold:** Returns first 100+ matches immediately for faster UX

### Search & Filter Strategy
- **Case-insensitive search:** Implemented client-side for better user experience
  - **Note:** DynamoDB doesn't support case-sensitive partial text search without ElasticSearch integration
  - Creating GSI (Global Secondary Index) for exact-match queries is available but incurs additional AWS costs
- **Multi-tier filtering:** Search applied server-side, complex filters (age range, tags) applied client-side
- **Progressive loading:** Scans up to 1M items with early termination when enough results found

### Known Limitations
- **Rendering may be slow** due to free-tier hosting on Render.com
- **Initial search latency** on cold starts (serverless wake-up time)
- DynamoDB scan operations are slower than indexed queries but necessary for flexible search across large datasets

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

### 1. Clone and install dependencies:

```bash
git clone <repository-url>
cd RetailManagementSystem
```

### 2. Backend setup:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
DYNAMO_TABLE_NAME=your-table-name
AWS_REGION=your-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
PORT=5000
```

Start the backend server:
```bash
node src/index.js
# or
npm run dev
```

### 3. Frontend setup:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` and backend on `http://localhost:5000`.

## Live Demo

- **Frontend:** Deployed on Vercel/Netlify (if applicable)
- **Backend:** Deployed on Render.com (free tier - may experience cold starts)

> **Note:** First load may take 30-60 seconds due to free-tier instance spin-up on Render.
