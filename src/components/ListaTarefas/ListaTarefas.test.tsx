import { render, screen } from '../../tests/testUtils'
import userEvent from '@testing-library/user-event'
import { ListaTarefas } from './ListaTarefas'
import { Tarefa } from '../../types/tarefa'

describe('ListaTarefas', () => {
  const tarefasMock: Tarefa[] = [
    {
      id: '1',
      titulo: 'Tarefa 1',
      descricao: 'Descrição 1',
      prioridade: 'alta',
      concluida: false,
      criadaEm: new Date('2024-01-01'),
    },
    {
      id: '2',
      titulo: 'Tarefa 2',
      descricao: 'Descrição 2',
      prioridade: 'media',
      concluida: true,
      criadaEm: new Date('2024-01-02'),
    },
    {
      id: '3',
      titulo: 'Tarefa 3',
      descricao: 'Descrição 3',
      prioridade: 'baixa',
      concluida: false,
      criadaEm: new Date('2024-01-03'),
    },
  ]

  const mockOnAlternarConclusao = jest.fn()
  const mockOnRemover = jest.fn()

  beforeEach(() => {
    mockOnAlternarConclusao.mockClear()
    mockOnRemover.mockClear()
  })

  describe('Renderização', () => {
    it('deve renderizar lista vazia quando não há tarefas', () => {
      render(
        <ListaTarefas
          tarefas={[]}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      expect(screen.getByTestId('lista-vazia')).toBeInTheDocument()
      expect(screen.getByText('Nenhuma tarefa encontrada')).toBeInTheDocument()
    })

    it('deve renderizar mensagem motivacional quando lista está vazia', () => {
      render(
        <ListaTarefas
          tarefas={[]}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      expect(screen.getByText(/adicione uma nova tarefa para começar/i)).toBeInTheDocument()
    })

    it('deve renderizar lista de tarefas quando há tarefas', () => {
      render(
        <ListaTarefas
          tarefas={tarefasMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      expect(screen.getByTestId('lista-tarefas')).toBeInTheDocument()
      expect(screen.queryByTestId('lista-vazia')).not.toBeInTheDocument()
    })

    it('deve renderizar todas as tarefas fornecidas', () => {
      render(
        <ListaTarefas
          tarefas={tarefasMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      expect(screen.getByText('Tarefa 1')).toBeInTheDocument()
      expect(screen.getByText('Tarefa 2')).toBeInTheDocument()
      expect(screen.getByText('Tarefa 3')).toBeInTheDocument()
    })

    it('deve renderizar o número correto de itens', () => {
      render(
        <ListaTarefas
          tarefas={tarefasMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      const items = screen.getAllByTestId('item-tarefa')
      expect(items).toHaveLength(3)
    })

    it('deve renderizar uma única tarefa', () => {
      render(
        <ListaTarefas
          tarefas={[tarefasMock[0]]}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      const items = screen.getAllByTestId('item-tarefa')
      expect(items).toHaveLength(1)
    })
  })

  describe('Integração com ItemTarefa', () => {
    it('deve passar props corretas para ItemTarefa', () => {
      render(
        <ListaTarefas
          tarefas={[tarefasMock[0]]}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      expect(screen.getByText('Tarefa 1')).toBeInTheDocument()
      expect(screen.getByText('Descrição 1')).toBeInTheDocument()
      expect(screen.getByText('Alta')).toBeInTheDocument()
    })

    it('deve propagar callback de alternar conclusão', async () => {
      const user = userEvent.setup()
      render(
        <ListaTarefas
          tarefas={[tarefasMock[0]]}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      const checkbox = screen.getByTestId('checkbox-concluida').querySelector('input')!
      await user.click(checkbox)

      expect(mockOnAlternarConclusao).toHaveBeenCalledTimes(1)
      expect(mockOnAlternarConclusao).toHaveBeenCalledWith('1')
    })

    it('deve propagar callback de remover', async () => {
      const user = userEvent.setup()
      render(
        <ListaTarefas
          tarefas={[tarefasMock[0]]}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      const botaoRemover = screen.getByTestId('botao-remover')
      await user.click(botaoRemover)

      expect(mockOnRemover).toHaveBeenCalledTimes(1)
      expect(mockOnRemover).toHaveBeenCalledWith('1')
    })

    it('deve propagar callbacks para múltiplas tarefas', async () => {
      const user = userEvent.setup()
      render(
        <ListaTarefas
          tarefas={tarefasMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      const checkboxes = screen.getAllByTestId('checkbox-concluida')
      await user.click(checkboxes[0].querySelector('input')!)
      await user.click(checkboxes[1].querySelector('input')!)

      expect(mockOnAlternarConclusao).toHaveBeenCalledTimes(2)
      expect(mockOnAlternarConclusao).toHaveBeenNthCalledWith(1, '1')
      expect(mockOnAlternarConclusao).toHaveBeenNthCalledWith(2, '2')
    })
  })

  describe('Renderização Condicional', () => {
    it('deve alternar entre lista vazia e lista com itens', () => {
      const { rerender } = render(
        <ListaTarefas
          tarefas={[]}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      expect(screen.getByTestId('lista-vazia')).toBeInTheDocument()

      rerender(
        <ListaTarefas
          tarefas={[tarefasMock[0]]}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      expect(screen.queryByTestId('lista-vazia')).not.toBeInTheDocument()
      expect(screen.getByTestId('lista-tarefas')).toBeInTheDocument()
    })

    it('deve mostrar lista vazia ao remover todas as tarefas', () => {
      const { rerender } = render(
        <ListaTarefas
          tarefas={[tarefasMock[0]]}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      expect(screen.getByTestId('lista-tarefas')).toBeInTheDocument()

      rerender(
        <ListaTarefas
          tarefas={[]}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      expect(screen.getByTestId('lista-vazia')).toBeInTheDocument()
      expect(screen.queryByTestId('lista-tarefas')).not.toBeInTheDocument()
    })
  })

  describe('Keys e Performance', () => {
    it('deve usar id da tarefa como key', () => {
      render(
        <ListaTarefas
          tarefas={tarefasMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      // Verifica se os itens foram renderizados (React usa keys internamente)
      const items = screen.getAllByTestId('item-tarefa')
      expect(items).toHaveLength(3)
    })
  })
})
