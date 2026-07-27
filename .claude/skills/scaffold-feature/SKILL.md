---
name: scaffold-feature
description: Scaffolds the standard domain/infrastructure/presentation folder structure with barrel files for a new feature under src/features. Use when the user asks to create, scaffold, or set up a new feature/module folder.
---

# Scaffold Feature

Creates a new feature module under `src/features/<feature-name>` following this
project's layered convention (domain / infrastructure / presentation), with a
barrel file in every directory.

## Steps

1. **Get the feature name.**
   - If the user already gave a name when invoking this skill (as an argument
     or in their message), use it.
   - Otherwise ask the user directly: "What is the name of the feature to
     scaffold?"
   - Normalize to kebab-case (matches existing features, e.g. `my-vehicles`,
     `dashboard`, `places`).
   - Check `src/features/<feature-name>` doesn't already exist. If it does,
     stop and tell the user instead of overwriting anything.

2. **Create the folder structure** under `src/features/<feature-name>`:

   ```
   <feature-name>/
     domain/
       datasources/
       repositories/
       schemas/
       types/
     infrastructure/
       datasources/
       repositories/
       utils/
     presentation/
       screens/
       components/
       providers/
   ```

3. **Create barrel files.** Every directory — including the feature root —
   gets a `.ts` file named after that directory, re-exporting its children.

   - **Leaf directories** (`datasources`, `repositories`, `schemas`, `types`,
     `utils`, `screens`, `components`, `providers`) have no source files yet,
     so their barrel file is created **empty**. Do not add placeholder
     exports or comments — this matches the existing convention in the repo
     (e.g. an empty `screens.ts` until a screen file is added). When real
     files are added later under a leaf directory, that barrel should be
     updated with `export * from './FileName';` per file.

   - `domain/domain.ts`:
     ```ts
     export * from './datasources/datasources';
     export * from './repositories/repositories';
     export * from './schemas/schemas';
     export * from './types/types';
     ```

   - `infrastructure/infrastructure.ts`:
     ```ts
     export * from './datasources/datasources';
     export * from './repositories/repositories';
     export * from './utils/utils';
     ```

   - `presentation/presentation.ts`:
     ```ts
     export * from './screens/screens';
     export * from './components/components';
     export * from './providers/providers';
     ```

   - Root `<feature-name>.ts` (e.g. `places.ts` for the `places` feature):
     ```ts
     export * from './domain/domain';
     export * from './infrastructure/infrastructure';
     export * from './presentation/presentation';
     ```

4. **Report** the created tree back to the user, briefly.

## Reference

`src/features/positions` is a filled-out example of this exact convention
(datasource/repository implementation files, schema/type files, and the
barrel re-exports at every level) — look at it if unsure how a populated
version should look.
