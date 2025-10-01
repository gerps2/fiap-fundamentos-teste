import { render, screen } from '../../tests/testUtils'
import userEvent from '@testing-library/user-event'
import { ItemTarefa } from './ItemTarefa'
import { Tarefa } from '../../types/tarefa'

describe('ItemTarefa', () => {
  const tarefaMock: Tarefa = {
    id: '1',
    titulo: 'Tarefa de Teste',
    descricao: 'Descrição da tarefa de teste',
    prioridade: 'media',
    concluida: false,
    criadaEm: new Date('2024-01-15T10:30:00'),
  }

  const mockOnAlternarConclusao = jest.fn()
  const mockOnRemover = jest.fn()

  beforeEach(() => {
    mockOnAlternarConclusao.mockClear()
    mockOnRemover.mockClear()
  })

  describe('Renderização', () => {
    it('deve renderizar o título da tarefa', () => {
      render(
        <ItemTarefa
          tarefa={tarefaMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      expect(screen.getByTestId('titulo-tarefa')).toHaveTextContent('Tarefa de Teste')
    })

    it('deve renderizar a descrição da tarefa', () => {
      render(
        <ItemTarefa
          tarefa={tarefaMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      expect(screen.getByTestId('descricao-tarefa')).toHaveTextContent(
        'Descrição da tarefa de teste'
      )
    })

    it('deve renderizar a data de criação formatada', () => {
      render(
        <ItemTarefa
          tarefa={tarefaMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      const dataCriacao = screen.getByTestId('data-criacao')
      expect(dataCriacao).toHaveTextContent(/15\/01\/2024/)
    })

    it('deve renderizar checkbox não marcado para tarefa não concluída', () => {
      render(
        <ItemTarefa
          tarefa={tarefaMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      const checkbox = screen.getByTestId('checkbox-concluida').querySelector('input')
      expect(checkbox).not.toBeChecked()
    })

    it('deve renderizar checkbox marcado para tarefa concluída', () => {
      const tarefaConcluida = { ...tarefaMock, concluida: true }
      render(
        <ItemTarefa
          tarefa={tarefaConcluida}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      const checkbox = screen.getByTestId('checkbox-concluida').querySelector('input')
      expect(checkbox).toBeChecked()
    })

    it('deve renderizar botão de remover', () => {
      render(
        <ItemTarefa
          tarefa={tarefaMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      expect(screen.getByTestId('botao-remover')).toBeInTheDocument()
    })
  })

  describe('Chip de Prioridade', () => {
    it('deve renderizar chip de prioridade baixa', () => {
      const tarefaBaixa = { ...tarefaMock, prioridade: 'baixa' as const }
      render(
        <ItemTarefa
          tarefa={tarefaBaixa}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      expect(screen.getByTestId('chip-prioridade')).toHaveTextContent('Baixa')
    })

    it('deve renderizar chip de prioridade média', () => {
      render(
        <ItemTarefa
          tarefa={tarefaMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      expect(screen.getByTestId('chip-prioridade')).toHaveTextContent('Média')
    })

    it('deve renderizar chip de prioridade alta', () => {
      const tarefaAlta = { ...tarefaMock, prioridade: 'alta' as const }
      render(
        <ItemTarefa
          tarefa={tarefaAlta}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      expect(screen.getByTestId('chip-prioridade')).toHaveTextContent('Alta')
    })
  })

  describe('Estilos Condicionais', () => {
    it('deve aplicar classe de concluída quando tarefa está concluída', () => {
      const tarefaConcluida = { ...tarefaMock, concluida: true }
      render(
        <ItemTarefa
          tarefa={tarefaConcluida}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      const card = screen.getByTestId('item-tarefa')
      expect(card).toHaveClass('item-tarefa--concluida')
    })

    it('não deve aplicar classe de concluída quando tarefa não está concluída', () => {
      render(
        <ItemTarefa
          tarefa={tarefaMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      const card = screen.getByTestId('item-tarefa')
      expect(card).not.toHaveClass('item-tarefa--concluida')
    })

    it('deve aplicar estilo de texto riscado no título quando concluída', () => {
      const tarefaConcluida = { ...tarefaMock, concluida: true }
      render(
        <ItemTarefa
          tarefa={tarefaConcluida}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      const titulo = screen.getByTestId('titulo-tarefa')
      expect(titulo).toHaveClass('item-tarefa__titulo--concluida')
    })

    it('deve aplicar estilo de texto riscado na descrição quando concluída', () => {
      const tarefaConcluida = { ...tarefaMock, concluida: true }
      render(
        <ItemTarefa
          tarefa={tarefaConcluida}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      const descricao = screen.getByTestId('descricao-tarefa')
      expect(descricao).toHaveClass('item-tarefa__descricao--concluida')
    })
  })

  describe('Interações', () => {
    it('deve chamar onAlternarConclusao ao clicar no checkbox', async () => {
      const user = userEvent.setup()
      render(
        <ItemTarefa
          tarefa={tarefaMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      const checkbox = screen.getByTestId('checkbox-concluida').querySelector('input')!
      await user.click(checkbox)

      expect(mockOnAlternarConclusao).toHaveBeenCalledTimes(1)
      expect(mockOnAlternarConclusao).toHaveBeenCalledWith('1')
    })

    it('deve chamar onRemover ao clicar no botão de remover', async () => {
      const user = userEvent.setup()
      render(
        <ItemTarefa
          tarefa={tarefaMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      const botaoRemover = screen.getByTestId('botao-remover')
      await user.click(botaoRemover)

      expect(mockOnRemover).toHaveBeenCalledTimes(1)
      expect(mockOnRemover).toHaveBeenCalledWith('1')
    })

    it('não deve chamar callbacks sem interação do usuário', () => {
      render(
        <ItemTarefa
          tarefa={tarefaMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      expect(mockOnAlternarConclusao).not.toHaveBeenCalled()
      expect(mockOnRemover).not.toHaveBeenCalled()
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter checkbox com aria-label', () => {
      render(
        <ItemTarefa
          tarefa={tarefaMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      const checkbox = screen.getByTestId('checkbox-concluida')
      expect(checkbox).toHaveAttribute('aria-label')
    })

    it('deve ter aria-label descritivo no botão de remover', () => {
      render(
        <ItemTarefa
          tarefa={tarefaMock}
          onAlternarConclusao={mockOnAlternarConclusao}
          onRemover={mockOnRemover}
        />
      )

      const botaoRemover = screen.getByTestId('botao-remover')
      expect(botaoRemover).toHaveAttribute('aria-label')
      expect(botaoRemover.getAttribute('aria-label')).toContain('Tarefa de Teste')
    })
  })
})
