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

React 19 + React Compiler (babel plugin, enabled in `vite.config.ts`) · TypeScript · Vite · Tailwind v4 (CSS-first, no tailwind.config) · React Router v7 · TanStack Query (server state) · Redux Toolkit (auth only) · react-hook-form · zod v4 · MUI/Headless UI/framer-motion for UI bits · ExcelJS for exports.

Path alias: `@/*` → `./src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).

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

### Barrel files

Every directory has a barrel named after itself (`domain/domain.ts`, `presentation/screens/screens.ts`, …), and each feature has a root barrel `<feature-name>/<feature-name>.ts` re-exporting all three layers. **Import from the feature root barrel**, e.g. `import { packingMaterialProvider, type PackingMaterialItemForm } from "@/features/packing-materials/packing-materials"`. Same for shared: `@/features/shared/shared`. Adding a file means adding its `export *` line to the leaf barrel.

Note this creates circular imports inside a feature (schemas import types from the root barrel and vice versa) — that's the existing convention, follow it.

### Shared layer (`src/features/shared`)

Design-system components (`Table`/`Thead`/`Tbody`/`Tr`/`Th`/`Td`, `CustomForm`, `CustomFilledButton`, `CustomNavTable`, `Title`, `Pagination`, `Modal`, `Drawer`, `Loading`, chart cards), form fields (`TextFormField`, `SelectFormField`, `DateFormField`, `FileFormField`, `PasswordFormField` — all generic over the form type and take `register`/`validation`/`errorMessage`), framer-motion animation wrappers, layouts (`ProtectedLayout` / `PublicLayout`), hooks (`usePagination`, `useUrlFilters`, `usePermissions`, `useNotification`), and `ApiResponseSchema` / `ApiPaginatedResponseSchema` which every feature's paginated schema extends.

Excel export via `exportToExcel` in `shared/infrastructure/utils/utils.ts`.

### Auth

JWT in `localStorage.AUTH_TOKEN`, injected by an axios request interceptor. `AppInitializer` (wrapping the router in `main.tsx`) calls `checkStatus()` on boot and dispatches `login`/`logout` into the Redux `auth` slice — the only Redux state. `ProtectedLayout` redirects to `/login` when `!isSignedIn`.

### Notifications

Not a toast library — a `NotificationAdapter` interface (`success` / `error` / `warning` / `information` / `question`) implemented by `ToastNotificationProvider`, exposed via `NotificationContext` and consumed with `useNotification()`. `question(message, buttonLabel, desc, callback)` is the confirm dialog used before destructive mutations.

### Routing

All routes are declared centrally in `src/router.tsx` — scaffolding a feature does not register them. Route paths are **Spanish** while feature folders are English (`/items-material-empaque` → `packing-materials`, `/planes-semanales` → `weekly-plans`). Standard CRUD shape: `/<path>`, `/<path>/crear`, `/<path>/:id`, `/<path>/:id/editar`. Sidebar links and breadcrumbs derive from `NAV_SECTIONS` in `shared/core/navigation/navigation.ts` — add new routes there too.

### Screen conventions

- Index: `useSearchParams` + `usePagination` → `useQuery` with `queryKey: ['getX', page + 1, rowsPerPage]`, table, delete `useMutation` guarded by `notification.question`, `<Pagination />`.
- Create/Update: `useForm<XForm>()` + a shared `<XFormComponent register={register} errors={errors} />` inside `CustomForm`, submit via `useMutation`, `notification.success(message)` then `navigate` back to the index.
- Guard rendering with `if (isLoading) return <Loading />` then `if (data) return (...)`.

## Skills

- **`/frontend-design`** — invocarla **siempre** que se pida generar vistas/pantallas/componentes nuevos de UI, o cambios de estilos/diseño visual. Cargarla *antes* de escribir el JSX o las clases de Tailwind, no después.
- **`/scaffold-feature`** — para crear un nuevo slice CRUD bajo `src/features`.

## Language

UI copy, notification messages, validation messages, and commit messages are in Spanish. Code identifiers are English.
