# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server (Vite)
npm test             # Run all tests
npm run test:watch   # Tests in watch mode
npm run test:coverage # Tests with coverage report (enforces 80% threshold)
npm run build        # TypeScript check + Vite build
npx tsc --noEmit     # TypeScript type check only
```

To run a single test file:
```bash
npx jest src/hooks/useTarefas.test.ts
```

## Architecture

This is an educational React app demonstrating testing fundamentals — a task manager (Todo list) built in Portuguese.

**State management** flows entirely through `src/hooks/useTarefas.ts`, which manages task list state and exposes `adicionarTarefa`, `removerTarefa`, `alternarConclusao`, `alterarFiltro`, `limparTarefas`, and `removerTarefasConcluidas`. The root `App.tsx` uses this hook and passes props down to components.

**Core types** are in `src/types/tarefa.ts`: `Tarefa`, `NovaTarefa` (omits `id`, `concluida`, `criadaEm`), `Prioridade` (`'baixa' | 'media' | 'alta'`), and `TipoFiltro` (`'todas' | 'ativas' | 'concluidas'`).

**Pure utility functions** live in `src/utils/tarefaHelpers.ts`: `gerarId`, `filtrarTarefas`, `contarTarefasAtivas`.

**Test utilities**: Use `render` from `src/tests/testUtils.tsx` (not directly from `@testing-library/react`) — it wraps components with MUI `ThemeProvider`. Integration tests are in `src/tests/integration/`.

## Conventions

- All identifiers, component names, and test descriptions are in **Portuguese**
- Components are in `PascalCase` folders with co-located `.test.tsx` and `.css` files
- Coverage threshold is 80% for branches, functions, lines, and statements — CI will fail below this
- CI runs on Node 18.x and 20.x via GitHub Actions (`.github/workflows/ci.yml`)
