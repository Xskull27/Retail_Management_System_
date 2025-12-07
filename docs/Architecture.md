# Architecture — Retail Sales Management System

## 1. Overview

The Retail Sales Management System is a full-stack application built to demonstrate production-level engineering concepts such as large-dataset handling, performant search, multi-filters, sorting, pagination, clean frontend state management, and modular backend architecture.

The application processes over 10 lakh (1 million) records stored in AWS DynamoDB and exposes a secure API accessed by a React + TypeScript client.

## 2. Backend Architecture

### 2.1 Tech Stack

- Node.js + Express.js (API development)
- AWS DynamoDB (NoSQL database)
- AWS SDK v3 (DynamoDB document client)
- Chunked scan algorithm (to process large datasets in batches)
- Environment management with `dotenv`
- Modular folder structure with Separation of Concerns (SoC)

### 2.2 Backend Folder Structure

```
backend/
 ├── src/
 │   ├── controllers/
 │   │     └── salesController.js
 │   ├── services/
 │   │     └── salesService.js
 │   ├── utils/
 │   │     └── dynamoClient.js
 │   ├── routes/
 │   │     └── salesRoutes.js
 │   ├── models/ (optional)
 │   └── index.js
 ├── package.json
 └── README.md
```

### 2.3 Backend Modules & Responsibilities

- `controllers/salesController.js`

	- Accepts API query params (search, filters, pagination, sort).
	- Delegates processing to the `salesService`.
	- Sends JSON response to frontend.

- `services/salesService.js`

	Core business logic:

	- Performs chunked DynamoDB scans (2000 rows per chunk).
	- Applies backend-side filters:
		- Region, Gender, Age Range
		- Product Category
		- Tags
		- Payment Method
		- Date Range
	- Performs smart full-text search on:
		- CustomerName
		- PhoneNumber
	- Performs sorting:
		- Date
		- Quantity
		- Customer Name (A–Z)
	- Performs app-level pagination (page-based, always 10 results).
	- Returns:
		- `items: []`
		- `pageInfo: { page, pageSize, hasNextPage, totalFiltered }`

- `utils/dynamoClient.js`

	- Creates and exports DynamoDB DocumentClient.
	- Reads credentials from environment variables.

- `routes/salesRoutes.js`

	- Defines API endpoint `/api/sales`
	- Maps to controller function.

- `index.js`

	- Bootstraps Express server.
	- Loads environment variables.
	- Registers routes.
	- Runs server on defined `PORT`.

### 2.4 Backend Data Flow

```
Client (React)
	 |
	 |--- GET /api/sales?search=&filters=&sortBy=&page=
	 |
Controller (salesController)
	 |
	 |--- calls salesService.fetchSales()
	 |
Service (salesService)
	 |
	 |--- DynamoDB Chunked Scan (2000 rows per scan)
					 ↓
				 Apply Filters
					 ↓
				 Apply Search
					 ↓
				 Apply Sorting
					 ↓
				 App-level Pagination (slice)
	 |
	 |--- return results to Controller
	 |
Response → JSON → React Frontend Table
```

## 3. Frontend Architecture

### 3.1 Tech Stack

- React (Vite)
- TypeScript
- Tailwind CSS
- Axios
- Modular component-based architecture
- Custom hooks for data and state management

### 3.2 Frontend Folder Structure

```
frontend/
 ├── src/
 │   ├── components/
 │   │     ├── Sidebar.tsx
 │   │     ├── TopBar.tsx
 │   │     ├── FiltersRow.tsx
 │   │     ├── SummaryCards.tsx
 │   │     ├── SalesTable.tsx
 │   │     └── Pagination.tsx
 │   ├── pages/
 │   │     └── SalesDashboard.tsx
 │   ├── services/
 │   │     └── api.ts
 │   ├── hooks/
 │   │     └── useSalesData.ts
 │   ├── utils/
 │   ├── styles/
 │   ├── App.tsx
 │   └── main.tsx
 ├── public/
 └── package.json
```

### 3.3 Frontend Module Responsibilities

- `useSalesData.ts`

	- Centralized state management:
		- Holds search, filters, sorting, pagination.
		- Makes API calls.
		- Returns ready-to-render data.

- `api.ts`

	- Axios instance for backend communication.
	- Exports function `fetchSales(params)`.

- `Sidebar.tsx`

	- Left navigation panel.
	- Mimics screenshot UI with collapsible sections.

- `TopBar.tsx`

	- Search input (Name, Phone No.).
	- Sort dropdown.

- `FiltersRow.tsx`

	Dropdowns for:

	- Region
	- Gender
	- Age Range
	- Product Category
	- Tags
	- Payment Method
	- Date

- `SummaryCards.tsx`

	Shows:

	- Total Units Sold
	- Total Amount
	- Total Discount

- `SalesTable.tsx`

	Renders paginated table with:

	- Transaction ID
	- Date
	- Customer ID
	- Customer Name
	- Phone Number
	- Gender
	- Age
	- Product Category
	- Quantity
	- Total Amount
	- Customer Region
	- Product ID
	- Employee Name

- `Pagination.tsx`

	- Page navigation (1, 2, 3… Next/Prev)
	- Retains active search/filter/sort states.

### 3.4 Frontend Data Flow

```
User interacts with UI →
	Search input / Filter dropdown / Sort selector / Pagination buttons
			 |
			 ↓
useSalesData hook updates state
			 |
			 ↓
fetchSales(params) API call
			 |
			 ↓
Backend returns:
	- filtered + searched + sorted + paginated items
			 |
			 ↓
SalesTable renders data
SummaryCards update values
Pagination updates page buttons
```

## 4. Data Flow Diagram (End-to-End)

```
USER
 | 
 | Interacts with UI (search, filters, sort, pagination)
 ↓
React State (useSalesData)
 |
 |-- axios → GET /api/sales?params
 ↓
Express Router
 ↓
Sales Controller
 ↓
Sales Service
 |
 |-- DynamoDB Chunked Scan
 |-- Apply Filters
 |-- Apply Search
 |-- Apply Sorting
 |-- Paginate
 ↓
Response JSON
 ↓
Frontend Renders Table + Summary + Pagination
```

## 5. Key Design Decisions

- ✔ Chunked Scanning for Big Data

	- Efficient handling of 10 lakh rows.
	- Prevents memory overflow.
	- Stops scanning once required results limit reached.

- ✔ App-Level Pagination

	- Stable across search, filters, sorting.
	- Matches enterprise CRM dashboards.

- ✔ Clean Separation of Concerns

	- Controller → orchestrates
	- Service → business logic
	- Utils → shared resources
	- Components → UI layout
	- Hook → state + API logic

- ✔ TypeScript for correctness

	- Strong typing for filters, params, API layer.

- ✔ Reusable, atomic components in UI

	- Sidebar, SearchBar, FiltersRow, SummaryCards, Table, Pagination.

-----------------------------------------------
Indexing Could have been done,for better Searching and Filtering of Data.