# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    # Retail Management System — Frontend

    ## Overview

    This frontend is a Vite + React + TypeScript single-page app that displays sales data and metrics. It fetches data from the repository's backend service and provides search, filter, sort, and pagination controls to explore the dataset. Components live in `src/components` and data-fetching logic is in `src/hooks` and `src/services`.

    ## Tech Stack

    - **Framework:** React (v19)
    - **Language:** TypeScript
    - **Bundler:** Vite
    - **HTTP client:** Axios
    - **Styling:** Tailwind CSS

    ## Search Implementation Summary

    Search uses `src/components/SearchBar.tsx` and the debounce hook `src/hooks/useDebouncedValue.ts`. The debounced query flows into `src/hooks/useSalesData.ts`, which sends the search term to the backend via `src/services/api.ts`. Debouncing reduces requests and improves user experience.

    ## Filter Implementation Summary

    Filtering UI is provided by `src/components/Filters.tsx`. Filter selections (date range, region, product, etc.) are managed in component state and passed to `useSalesData.ts`, which includes them as query parameters in API requests. The separation keeps UI and data concerns isolated.

    ## Sorting Implementation Summary

    `src/components/SortBar.tsx` exposes sort field and direction. `useSalesData.ts` forwards these to the API; sorting is performed server-side for large datasets, with client-side sorting used for small cached result sets.

    ## Pagination Implementation Summary

    Pagination is implemented in `src/components/Pagination.tsx`. `useSalesData.ts` accepts `page` and `pageSize` and requests the appropriate page from the backend (offset/limit or cursor). The UI shows next/previous and page selectors.

    ## Setup Instructions

    1. Start the backend (from repository root):

    ```
    cd backend
    npm install
    # If no start script exists, run the main file directly
    node src/index.js
    ```

    2. Start the frontend in a separate terminal:

    ```
    cd frontend
    npm install
    npm run dev
    ```

    Notes:
    - Provide AWS/DynamoDB credentials and any required env vars in `backend/.env` if using AWS services.
    - Vite dev server defaults to port `5173`.
