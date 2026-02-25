# Fundamentos de Testes em React

[![CI](https://github.com/seu-usuario/fiap-fundamentos-teste/actions/workflows/ci.yml/badge.svg)](https://github.com/seu-usuario/fiap-fundamentos-teste/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/badge/coverage-97%25-brightgreen)](https://github.com/seu-usuario/fiap-fundamentos-teste)
[![Tests](https://img.shields.io/badge/tests-226%20passing-success)](https://github.com/seu-usuario/fiap-fundamentos-teste)
[![Cucumber](https://img.shields.io/badge/cucumber-6%20scenarios-green)](https://github.com/seu-usuario/fiap-fundamentos-teste)

Projeto educacional para demonstrar fundamentos de testes automatizados em aplicações React — cobrindo testes unitários, integração, E2E, acessibilidade e BDD com Cucumber + Playwright.

---

## Objetivo

Demonstrar na prática as 5 camadas de testes modernas:

- **Unitários** — componentes, hooks e utilitários isolados (134 testes)
- **Integração** — fluxos completos entre múltiplos componentes (18 testes)
- **E2E via Testing Library** — cenários realistas no jsdom (4 testes)
- **Usabilidade / Acessibilidade** — jest-axe (5 testes)
- **BDD com Cucumber + Playwright** — browser real no the-internet.herokuapp.com (6 cenários)

---

## Estrutura do Projeto

```
fiap-fundamentos-teste/
├── src/
│   ├── components/
│   │   ├── base/                       # Placeholder para primitivos futuros
│   │   ├── compostos/
│   │   │   └── ItemTarefa/             # Card individual de tarefa
│   │   └── secoes/
│   │       ├── FormularioTarefa/       # Formulário de adicionar tarefas
│   │       ├── ListaTarefas/           # Lista de tarefas
│   │       └── FiltroTarefas/          # Filtros de visualização
│   ├── hooks/
│   │   └── useTarefas.ts              # Hook central de estado
│   ├── pages/
│   │   └── Inicio/                    # Página principal
│   ├── types/tarefa.ts                # Tipos: Tarefa, Prioridade, TipoFiltro
│   └── utils/tarefaHelpers.ts         # Funções puras utilitárias
│
├── tests/
│   ├── setup.ts                       # Configuração global do Jest
│   ├── testUtils.tsx                  # render() com ThemeProvider
│   ├── unit/
│   │   ├── App.test.tsx
│   │   ├── components/                # FormularioTarefa, ItemTarefa, ListaTarefas, FiltroTarefas, Inicio
│   │   ├── hooks/useTarefas.test.ts
│   │   └── utils/tarefaHelpers.test.ts
│   ├── integration/FluxoTarefas.test.tsx
│   ├── e2e/AppFluxoCompleto.test.tsx
│   ├── usabilidade/acessibilidade.test.tsx
│   └── cucumber/
│       ├── features/                  # login, checkboxes, add-remove-elements
│       ├── steps/                     # Steps Playwright
│       └── support/hooks.ts           # Lifecycle do browser
│
├── jest.config.js
├── cucumber.json
├── tsconfig.json
└── package.json
```

---

## Instalação

```bash
npm install
npx playwright install chromium
```

---

## Comandos

### Desenvolvimento
```bash
npm run dev              # Dev server (Vite)
npm run build            # TypeScript check + Vite build
```

### Testes Jest
```bash
npm test                 # Todos os testes (unit + integration + e2e + usabilidade)
npm run test:watch       # Modo watch
npm run test:coverage    # Com relatório de coverage (threshold ≥ 80%)

npm run test:unit        # Só testes unitários
npm run test:integration # Só testes de integração
npm run test:e2e         # Só testes E2E (Testing Library)
npm run test:usability   # Só testes de acessibilidade (jest-axe)
```

### Cucumber + Playwright
```bash
npm run test:cucumber          # Headless (CI)
npm run test:cucumber:headed   # Com browser visível (ver navegação ao vivo)
npm run test:cucumber:report   # Abrir relatório HTML no browser
npm run test:all               # Jest + Cucumber juntos
```

> **Dica:** Use `npm run test:cucumber:headed` para ver o Playwright navegando no browser em tempo real.

---

## Tecnologias

| Categoria | Tecnologia |
|---|---|
| Framework UI | React 18 + TypeScript |
| Build | Vite |
| Componentes | Material-UI v5 |
| Testes unitários | Jest + Testing Library |
| Acessibilidade | jest-axe |
| BDD / E2E real | Cucumber 12 + Playwright |
| CI/CD | GitHub Actions |

---

## Estratégia de Testes

### Pirâmide de Testes

```
         [Cucumber/Playwright]     ← 6 cenários, browser real
        [E2E Testing Library]      ← 4 testes, jsdom completo
       [Integração]                ← 18 testes, múltiplos componentes
      [Unitários]                  ← 134 testes, isolados
     [Usabilidade/a11y]            ← 5 testes, jest-axe
```

### Padrões Utilizados

- **AAA** (Arrange, Act, Assert) — estrutura clara em cada teste
- **Atomic Design** — componentes organizados em `base`, `compostos`, `secoes`
- **BDD** (Behavior-Driven Development) — Gherkin em português + Playwright
- **User-Centric Testing** — testar como o usuário interage, não implementação

---

## CI/CD — Jobs em Paralelo

O pipeline do GitHub Actions executa 7 jobs **simultaneamente**:

```
┌─────────────────┐  ┌──────────────────┐  ┌────────────────┐
│  lint           │  │ testes-unitarios  │  │ testes-integracao│
│  (tsc --noEmit) │  │ (Node 18 e 20)   │  │                │
└────────┬────────┘  └────────┬─────────┘  └────────────────┘
         │                    │
         └──────────┬─────────┘
                    ▼
             ┌────────────┐
             │   build    │  ← só roda após lint + unit tests
             └────────────┘

┌────────────────┐  ┌────────────────┐  ┌────────────────────┐
│ testes-e2e     │  │  coverage      │  │ cucumber           │
│ (Testing Lib.) │  │  (≥ 80%)       │  │ (Playwright real)  │
└────────────────┘  └────────────────┘  └────────────────────┘
```

Relatório HTML do Cucumber fica disponível nos **Artifacts** do GitHub Actions.

---

## Coverage

Threshold mínimo de **80%** em:
- Branches, Functions, Lines, Statements

Coverage atual: **97%+** em todos os indicadores.

---

## Cenários BDD (Cucumber)

Todos testam o site [The Internet](https://the-internet.herokuapp.com) — site oficial de prática Playwright:

| Feature | Cenários |
|---|---|
| `login.feature` | Login válido e inválido |
| `checkboxes.feature` | Marcar e desmarcar checkboxes |
| `add-remove-elements.feature` | Adicionar e remover elementos do DOM |

---

## Exemplos de Testes

### Teste Unitário de Hook

```typescript
// tests/unit/hooks/useTarefas.test.ts
it('deve adicionar tarefa e atualizar contador', () => {
  const { result } = renderHook(() => useTarefas())

  act(() => {
    result.current.adicionarTarefa({ titulo: 'Nova', descricao: 'Desc', prioridade: 'alta' })
  })

  expect(result.current.tarefas).toHaveLength(1)
  expect(result.current.totalTarefasAtivas).toBe(1)
})
```

### Teste de Acessibilidade

```typescript
// tests/usabilidade/acessibilidade.test.tsx
it('App não deve ter violações de acessibilidade', async () => {
  const { container } = render(<App />)
  expect(await axe(container, { rules: regrasDesabilitadas })).toHaveNoViolations()
})
```

### Cenário BDD (Gherkin)

```gherkin
# tests/cucumber/features/login.feature
Cenário: Login com credenciais válidas
  Dado que estou na página de login do The Internet
  Quando preencho o usuário com "tomsmith"
  E preencho a senha com "SuperSecretPassword!"
  E clico no botão de login
  Então devo ver a mensagem de boas-vindas "You logged into a secure area!"
```

---

## Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feat/minha-feature`
3. Commit seguindo Conventional Commits: `feat: adicionar novo cenário`
4. Abra um Pull Request para `main`

---

## Recursos

- [React Testing Library](https://testing-library.com/react)
- [Jest](https://jestjs.io)
- [Playwright](https://playwright.dev)
- [Cucumber.js](https://cucumber.io/docs/installation/javascript/)
- [jest-axe](https://github.com/nickcolley/jest-axe)
- [The Internet — site de prática](https://the-internet.herokuapp.com)

---

**Status:** Completo e funcional | **226 testes** passando | **97%+ coverage** | **6 cenários BDD**
