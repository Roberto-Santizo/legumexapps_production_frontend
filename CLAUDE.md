# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build
npm run lint       # eslint .
npm run preview
npx tsc -b --noEmit   # typecheck only
```

No test setup exists in this repo.

Env: `VITE_BASE_URL` (API base URL) in `.env`.

## Stack

React 19 + React Compiler (babel plugin, enabled in `vite.config.ts`) · TypeScript · Vite · Tailwind v4 (CSS-first, no tailwind.config) · React Router v7 · TanStack Query (server state) · Redux Toolkit (auth only) · react-hook-form · zod v4 · MUI/Headless UI/framer-motion for UI bits · lucide-react icons · react-select · react-dropzone · recharts (charts) · ExcelJS + file-saver (Excel export) · @react-pdf/renderer (PDF).

Path alias: `@/*` → `./src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).

### Styling

Tailwind v4 CSS-first: design tokens live in `@theme` in `src/index.css` — `canvas` / `surface` / `line` / `line-strong` / `ink` / `ink-muted` / `ink-subtle` (warm neutral palette, no color accents). Same file defines the reusable component classes used across screens: `.text_form_field(_error)`, `.form`, `.title` / `.title-2` / `.main_title`, `.table-wrapper` / `.table` / `.thead` / `.thead-th` / `.tbody` / `.tbody-tr` / `.tbody-td`, `.input-filter`, `.loading-sweep`. Prefer these tokens/classes over ad-hoc hex colors.

## Architecture

Feature-sliced clean architecture. Each feature under `src/features/<kebab-name>/` has three layers:

```
domain/           datasources/ (abstract class), repositories/ (abstract class), schemas/ (zod), types/ (z.infer + *Form types)
infrastructure/   datasources/ (Impl against AxiosInstance), repositories/ (Impl, pure delegation)
presentation/     screens/, components/, providers/
```

Data flow: **Screen → provider singleton → Repository → Datasource → axios**.

- Datasource impls own all error handling and zod validation: `safeParse` the response, throw `"Información no válida"` / `"Error no controlado"` on failure, and in `catch` do `if (isAxiosError(error)) throw new Error(error.response?.data.message)`.
- Repository impls delegate straight through — no try/catch, no logic.
- Providers are classes that wrap a repository, instantiated once at the bottom of their own file and exported as a camelCase singleton (e.g. `packingMaterialProvider`), wired with `api` from `@/config/http/axios`.

`src/features/packing-materials` is the canonical reference implementation of the full CRUD slice. Read it before writing a new feature. The `/scaffold-feature` skill (`.claude/skills/scaffold-feature/SKILL.md`) generates a slice following it.

Current features: `auth`, `clients`, `dashboard`, `draft-weekly-plans`, `draft-weekly-plan-tasks`, `lines`, `packing-materials`, `packing-material-transactions`, `packing-material-transaction-items`, `performances`, `positions`, `raw-materials`, `shared`, `skus`, `sku-packing-materials`, `skus-raw-materials`, `timeouts`, `users`, `weekly-plans`, `weekly-plan-tasks`, `weekly-plan-task-observations`. Not every feature is a full CRUD slice — some (e.g. `packing-material-transaction-items`, `weekly-plan-task-observations`) exist only as sub-resources consumed from another feature's screens through modals/drawers/panels.

### Barrel files

Every directory has a barrel named after itself (`domain/domain.ts`, `presentation/screens/screens.ts`, …), and each feature has a root barrel `<feature-name>/<feature-name>.ts` re-exporting all three layers. **Import from the feature root barrel**, e.g. `import { packingMaterialProvider, type PackingMaterialItemForm } from "@/features/packing-materials/packing-materials"`. Same for shared: `@/features/shared/shared`. Adding a file means adding its `export *` line to the leaf barrel.

Note this creates circular imports inside a feature (schemas import types from the root barrel and vice versa) — that's the existing convention, follow it.

### Shared layer (`src/features/shared`)

`shared` does **not** follow the three-layer feature shape. Its top-level dirs (each with its own barrel, all re-exported from `shared/shared.ts`):

```
components/       design system + form fields (flat, one file per component)
hooks/            usePagination, usePermissions, useNotification, useUrlFilters, useFilters
animations/       framer-motion wrappers: FadeIn(Up|Down|Left|Right), BlurIn, ScaleIn(Bounce), RotateIn, SlideInUp, StaggerContainer/StaggerItem
core/             initializer/AppInitializer, navigation/NAV_SECTIONS, notifications/
domain/           schemas, types, interfaces, errors (DomainError)
infrastructure/   utils/utils.ts
presentation/     screens/ (Loading, LoadingData, Spinner, NotFound), layouts/ (ProtectedLayout, PublicLayout)
references/       @react-pdf/renderer documents (e.g. PackingMaterialTransactionDocument)
```

- Components: `Table`/`Thead`/`Tbody`/`Tr`/`Th`/`Td`, `CustomForm`, `CustomFilledButton`, `CustomNavTable`, `CustomNavLink`, `CustomHeader`, `CustomSideBar`, `Title`, `Pagination`, `Modal`, `Drawer`, `ActionsMenu`, `Toaster`, `ErrorComponent`, `SpinnerComponent`, and cards `BarChartCard` / `DonutSummaryCard` / `InfoCard` / `DateCard`.
- Form fields: `TextFormField`, `TextAreaFormField`, `SelectFormField`, `DateFormField`, `FileFormField`, `PasswordFormField` — all generic over the form type, taking `register` / `validation` / `errorMessage`.
- Schemas: `ApiResponseSchema` / `ApiPaginatedResponseSchema` (every feature's paginated schema extends one), plus `FileResponseSchema` and chart datum schemas.
- `useUrlFilters` is exported from `hooks/useUrlFilters` but **not** from the `hooks` barrel — import it by path. Feature-specific filter hooks wrap it under `<feature>/infrastructure/filters/` (see `usePerformanceFilters`).
- `useFilters` (`hooks/useFilters`, also **not** in the barrel) is the local-state twin of `useUrlFilters`: same `{ filters, setFilters, clearFilters }` contract and same `{ schema, defaults }` props, but backed by `useState` — use it when the filters should not appear in the URL (see `useWeeklyPlanTaskFilters`).

`shared/infrastructure/utils/utils.ts`: query-param helpers (`getQueryParam`, `queryParamExists`, `handleSetQueryParam`, `handleDeleteQueryParam`, `setQueryParams`), date helpers (`formatDateValue`, `getCurrentDate`, `parseDateValue`, `getIsoWeekDates`), `downloadBase64File` (for base64 payloads returned by the API), and `exportToExcel`.

### Auth

JWT in `localStorage.AUTH_TOKEN`, injected by an axios request interceptor. `AppInitializer` (wrapping the router in `main.tsx`) calls `checkStatus()` on boot and dispatches `login`/`logout` into the Redux `auth` slice — the only Redux state. `ProtectedLayout` redirects to `/login` when `!isSignedIn`.

### Notifications

Not a toast library — a `NotificationAdapter` interface (`success` / `error` / `warning` / `information` / `question`) implemented by `ToastNotificationProvider`, exposed via `NotificationContext` and consumed with `useNotification()`. `question(message, buttonLabel, desc, callback)` is the confirm dialog used before destructive mutations.

### Routing

All routes are declared centrally in `src/router.tsx` — scaffolding a feature does not register them. Route paths are **Spanish** while feature folders are English. Standard CRUD shape: `/<path>`, `/<path>/crear`, `/<path>/:id`, `/<path>/:id/editar`, each group wrapped in its own `<Route element={<ProtectedLayout />}>`. Sidebar links and breadcrumbs derive from `NAV_SECTIONS` in `shared/core/navigation/navigation.ts` — add new routes there too.

Path → feature: `/lineas` lines · `/posiciones` positions · `/skus` skus · `/items-material-empaque` packing-materials · `/items-materia-prima` raw-materials · `/tiempos-muertos` timeouts · `/clientes` clients · `/rendimientos` performances · `/planes-semanales` weekly-plans · `/draft-planes-semanales` draft-weekly-plans · `/material-empaque-transacciones` packing-material-transactions (no create route) · `/dashboard` · `/login`.

Non-CRUD routes exist too: `/planes-semanales/calendario/:id`, `/planes-semanales/tareas/:id`, `/planes-semanales/tareas/:lineCode/:date`.

### Screen conventions

- Index: `useSearchParams` + `usePagination` → `useQuery` with `queryKey: ['getX', page + 1, rowsPerPage]`, table, delete `useMutation` guarded by `notification.question`, `<Pagination />`.
- Create/Update: `useForm<XForm>()` + a shared `<XFormComponent register={register} errors={errors} />` inside `CustomForm`, submit via `useMutation`, `notification.success(message)` then `navigate` back to the index.
- Guard rendering with `if (isLoading) return <Loading />` then `if (data) return (...)`.
- Sub-resources (transaction items, task observations, …) are edited in place from the parent screen via `Modal` / `Drawer` / side panels driven by query params (`handleSetQueryParam` / `queryParamExists`), not by their own routes; after mutating, `queryClient.invalidateQueries` / `refetch` the parent query.

## Skills

- **`/frontend-design`** — invocarla **siempre** que se pida generar vistas/pantallas/componentes nuevos de UI, o cambios de estilos/diseño visual. Cargarla *antes* de escribir el JSX o las clases de Tailwind, no después.
- **`/scaffold-feature`** — para crear un nuevo slice CRUD bajo `src/features`.

## Language

UI copy, notification messages, validation messages, and commit messages are in Spanish. Code identifiers are English.
