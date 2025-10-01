# 🧪 Fundamentos de Testes em React

[![CI](https://github.com/seu-usuario/fiap-fundamentos-teste/actions/workflows/ci.yml/badge.svg)](https://github.com/seu-usuario/fiap-fundamentos-teste/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/badge/coverage-99.24%25-brightgreen)](https://github.com/seu-usuario/fiap-fundamentos-teste)
[![Tests](https://img.shields.io/badge/tests-143%20passing-success)](https://github.com/seu-usuario/fiap-fundamentos-teste)

Projeto educacional para demonstrar fundamentos de testes automatizados em aplicações React para alunos de pós-graduação em frontend.

## 📚 Objetivo

Demonstrar na prática:
- ✅ **Testes Unitários** - 134 testes
- ✅ **Testes de Integração** - 9 testes
- ✅ **CI/CD com GitHub Actions**
- ✅ **Code Coverage de 99.24%** (acima do mínimo de 80%)
- ✅ **Boas Práticas de Teste**

## 🚀 Tecnologias

### Core
- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server

### UI/Estilização
- **Material-UI (MUI) v5** - Biblioteca de componentes
- **CSS puro** - Estilos customizados
- **@mui/icons-material** - Ícones

### Testes
- **Jest** - Framework de testes
- **@testing-library/react** - Testes de componentes React
- **@testing-library/jest-dom** - Matchers customizados
- **@testing-library/user-event** - Simulação de eventos do usuário

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar aplicação em desenvolvimento
npm run dev

# Rodar testes
npm test

# Rodar testes em modo watch
npm run test:watch

# Gerar relatório de coverage
npm run test:coverage

# Build de produção
npm run build
```

## 📁 Estrutura do Projeto

```
src/
├── components/                    # Componentes reutilizáveis
│   ├── FormularioTarefa/         # Formulário de adicionar tarefas
│   │   ├── FormularioTarefa.tsx
│   │   ├── FormularioTarefa.test.tsx (18 testes)
│   │   └── FormularioTarefa.css
│   ├── ItemTarefa/               # Card individual de tarefa
│   │   ├── ItemTarefa.tsx
│   │   ├── ItemTarefa.test.tsx (18 testes)
│   │   └── ItemTarefa.css
│   ├── ListaTarefas/             # Lista de tarefas
│   │   ├── ListaTarefas.tsx
│   │   ├── ListaTarefas.test.tsx (21 testes)
│   │   └── ListaTarefas.css
│   └── FiltroTarefas/            # Filtros de visualização
│       ├── FiltroTarefas.tsx
│       ├── FiltroTarefas.test.tsx (33 testes)
│       └── FiltroTarefas.css
├── pages/                         # Páginas da aplicação
│   └── Inicio/                   # Página principal
│       ├── Inicio.tsx
│       ├── Inicio.test.tsx (14 testes)
│       └── Inicio.css
├── hooks/                         # Custom hooks
│   ├── useTarefas.ts             # Hook de gerenciamento de estado
│   └── useTarefas.test.ts (29 testes)
├── utils/                         # Funções utilitárias
│   ├── tarefaHelpers.ts          # Helpers de tarefas
│   └── tarefaHelpers.test.ts (21 testes)
├── types/                         # Tipos TypeScript
│   └── tarefa.ts                 # Tipos: Tarefa, Prioridade, TipoFiltro
├── tests/                         # Utilitários de teste
│   ├── setup.ts                  # Configuração do Jest
│   ├── testUtils.tsx             # Helpers de teste
│   └── integration/              # Testes de integração
│       └── FluxoTarefas.test.tsx (9 testes)
├── App.tsx
├── App.test.tsx (3 testes)
└── main.tsx
```

## 🧪 Estratégia de Testes

### Testes Unitários
Cada componente e função possui seu arquivo de teste (`*.test.tsx` ou `*.test.ts`):
- Testar componentes isoladamente
- Testar funções utilitárias
- Testar custom hooks
- Mocking de dependências

### Testes de Integração
Localizados em `src/tests/integration/`:
- Testar fluxos completos da aplicação
- Testar interação entre múltiplos componentes
- Validar comportamento end-to-end

## 📊 Coverage

O projeto está configurado com threshold mínimo de **80%** de cobertura em:
- Branches
- Functions
- Lines
- Statements

## 🎓 Conceitos Demonstrados

### Padrões de Teste
- **AAA Pattern** (Arrange, Act, Assert)
- **Test Isolation** - Testes independentes
- **Descriptive Names** - Nomes descritivos
- **Test Utilities** - Helpers reutilizáveis

### Técnicas
- Mocking de props e callbacks
- Renderização condicional
- Interações do usuário (click, input, etc.)
- Testes de hooks customizados
- Testes de funções puras

## 🔄 CI/CD

O projeto utiliza GitHub Actions para:
1. ✅ Executar todos os testes
2. ✅ Validar coverage mínimo (80%)
3. ✅ Build da aplicação
4. ✅ Proteção de branch main (apenas via PR)

## 📝 Nomenclatura

Todo o código está em **português** para facilitar o entendimento:
- `FormularioTarefa` ao invés de `TaskForm`
- `useTarefas` ao invés de `useTasks`
- `tarefaHelpers` ao invés de `taskHelpers`


## 🤝 Contribuindo

Este é um projeto educacional. Para contribuir:
1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request

## 📖 Exemplos Práticos de Testes

### Exemplo 1: Teste Unitário de Componente

```typescript
// FormularioTarefa.test.tsx
it('deve chamar onAdicionar com dados corretos ao submeter', async () => {
  const user = userEvent.setup()
  const mockOnAdicionar = jest.fn()
  render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

  // Arrange: Preencher formulário
  await user.type(screen.getByTestId('input-titulo').querySelector('input')!, 'Minha Tarefa')
  await user.type(screen.getByTestId('input-descricao').querySelector('textarea')!, 'Descrição')
  
  // Act: Submeter formulário
  await user.click(screen.getByTestId('botao-adicionar'))

  // Assert: Verificar callback
  expect(mockOnAdicionar).toHaveBeenCalledWith({
    titulo: 'Minha Tarefa',
    descricao: 'Descrição',
    prioridade: 'media',
  })
})
```

### Exemplo 2: Teste de Hook Customizado

```typescript
// useTarefas.test.ts
it('deve adicionar tarefa e atualizar contador', () => {
  const { result } = renderHook(() => useTarefas())

  act(() => {
    result.current.adicionarTarefa({
      titulo: 'Nova Tarefa',
      descricao: 'Descrição',
      prioridade: 'alta',
    })
  })

  expect(result.current.tarefas).toHaveLength(1)
  expect(result.current.totalTarefasAtivas).toBe(1)
})
```

### Exemplo 3: Teste de Integração

```typescript
// FluxoTarefas.test.tsx
it('deve executar fluxo completo de gerenciamento', async () => {
  const user = userEvent.setup()
  render(<App />)

  // 1. Adicionar tarefa
  await user.type(screen.getByTestId('input-titulo').querySelector('input')!, 'Tarefa 1')
  await user.type(screen.getByTestId('input-descricao').querySelector('textarea')!, 'Desc 1')
  await user.click(screen.getByTestId('botao-adicionar'))

  // 2. Marcar como concluída
  await user.click(screen.getByTestId('checkbox-concluida').querySelector('input')!)

  // 3. Filtrar por concluídas
  await user.click(screen.getByTestId('filtro-concluidas'))

  // 4. Verificar resultado
  expect(screen.getByText('Tarefa 1')).toBeInTheDocument()
  expect(screen.getByTestId('contador-ativas')).toHaveTextContent('0 ativas')
})
```

## 🎯 Conceitos de Teste Demonstrados

### AAA Pattern (Arrange, Act, Assert)
Todos os testes seguem o padrão AAA para clareza:
- **Arrange**: Preparar o cenário de teste
- **Act**: Executar a ação a ser testada
- **Assert**: Verificar o resultado esperado

### Test Isolation
Cada teste é independente e não afeta outros testes:
- Uso de `beforeEach` para limpar mocks
- Renderização isolada de componentes
- Estado limpo entre testes

### Mocking
Demonstra diferentes técnicas de mocking:
- Mocking de funções callback (`jest.fn()`)
- Mocking de módulos
- Mocking de interações do usuário

### Cobertura de Casos
- Casos de sucesso (happy path)
- Casos de erro e validação
- Casos extremos (edge cases)
- Renderização condicional
- Interações do usuário

## 🔧 Configuração do Projeto

### Jest Configuration
```javascript
// jest.config.js
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

### GitHub Actions
O projeto está configurado com CI/CD que executa:
1. ✅ Testes em Node 18.x e 20.x
2. ✅ Verificação de coverage mínimo
3. ✅ Build da aplicação
4. ✅ Verificação de TypeScript

## 📚 Recursos para Aprendizado

### Documentação Oficial
- [React Testing Library](https://testing-library.com/react)
- [Jest](https://jestjs.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

### Padrões Utilizados
- **Testing Trophy**: Foco em testes de integração
- **User-Centric Testing**: Testar como usuário interage
- **Accessibility Testing**: Validar acessibilidade

## 📄 Licença

MIT

---

**Status do Projeto:** ✅ Completo e Funcional

**Última atualização:** 2025-10-01

**Estatísticas:**
- 📊 143 testes passando
- 🎯 99.24% de coverage
- ⚡ 9 suítes de teste
- 🚀 CI/CD configurado
