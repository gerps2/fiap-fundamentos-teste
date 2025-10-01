import { render, screen } from '../../tests/testUtils'
import userEvent from '@testing-library/user-event'
import { FiltroTarefas } from './FiltroTarefas'

describe('FiltroTarefas', () => {
  const mockOnAlterarFiltro = jest.fn()

  beforeEach(() => {
    mockOnAlterarFiltro.mockClear()
  })

  describe('Renderização', () => {
    it('deve renderizar o componente', () => {
      render(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      expect(screen.getByTestId('filtro-tarefas')).toBeInTheDocument()
    })

    it('deve renderizar título do filtro', () => {
      render(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      expect(screen.getByText('Filtrar Tarefas')).toBeInTheDocument()
    })

    it('deve renderizar todos os botões de filtro', () => {
      render(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      expect(screen.getByTestId('filtro-todas')).toBeInTheDocument()
      expect(screen.getByTestId('filtro-ativas')).toBeInTheDocument()
      expect(screen.getByTestId('filtro-concluidas')).toBeInTheDocument()
    })

    it('deve renderizar labels corretos nos botões', () => {
      render(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      expect(screen.getByText('Todas')).toBeInTheDocument()
      expect(screen.getByText('Ativas')).toBeInTheDocument()
      expect(screen.getByText('Concluídas')).toBeInTheDocument()
    })
  })

  describe('Contador de Tarefas Ativas', () => {
    it('deve mostrar 0 ativas quando não há tarefas', () => {
      render(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('0 ativas')
    })

    it('deve mostrar 1 ativa no singular', () => {
      render(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={1}
        />
      )

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('1 ativa')
    })

    it('deve mostrar múltiplas ativas no plural', () => {
      render(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={5}
        />
      )

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('5 ativas')
    })

    it('deve atualizar contador quando totalAtivas muda', () => {
      const { rerender } = render(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={3}
        />
      )

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('3 ativas')

      rerender(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={7}
        />
      )

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('7 ativas')
    })
  })

  describe('Estado do Filtro Ativo', () => {
    it('deve marcar "todas" como ativo', () => {
      render(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      const botaoTodas = screen.getByTestId('filtro-todas')
      expect(botaoTodas).toHaveAttribute('aria-pressed', 'true')
    })

    it('deve marcar "ativas" como ativo', () => {
      render(
        <FiltroTarefas
          filtroAtivo="ativas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      const botaoAtivas = screen.getByTestId('filtro-ativas')
      expect(botaoAtivas).toHaveAttribute('aria-pressed', 'true')
    })

    it('deve marcar "concluidas" como ativo', () => {
      render(
        <FiltroTarefas
          filtroAtivo="concluidas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      const botaoConcluidas = screen.getByTestId('filtro-concluidas')
      expect(botaoConcluidas).toHaveAttribute('aria-pressed', 'true')
    })

    it('deve marcar apenas um filtro como ativo por vez', () => {
      render(
        <FiltroTarefas
          filtroAtivo="ativas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      expect(screen.getByTestId('filtro-todas')).toHaveAttribute('aria-pressed', 'false')
      expect(screen.getByTestId('filtro-ativas')).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByTestId('filtro-concluidas')).toHaveAttribute('aria-pressed', 'false')
    })
  })

  describe('Interações', () => {
    it('deve chamar onAlterarFiltro ao clicar em "todas"', async () => {
      const user = userEvent.setup()
      render(
        <FiltroTarefas
          filtroAtivo="ativas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      await user.click(screen.getByTestId('filtro-todas'))

      expect(mockOnAlterarFiltro).toHaveBeenCalledTimes(1)
      expect(mockOnAlterarFiltro).toHaveBeenCalledWith('todas')
    })

    it('deve chamar onAlterarFiltro ao clicar em "ativas"', async () => {
      const user = userEvent.setup()
      render(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      await user.click(screen.getByTestId('filtro-ativas'))

      expect(mockOnAlterarFiltro).toHaveBeenCalledTimes(1)
      expect(mockOnAlterarFiltro).toHaveBeenCalledWith('ativas')
    })

    it('deve chamar onAlterarFiltro ao clicar em "concluidas"', async () => {
      const user = userEvent.setup()
      render(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      await user.click(screen.getByTestId('filtro-concluidas'))

      expect(mockOnAlterarFiltro).toHaveBeenCalledTimes(1)
      expect(mockOnAlterarFiltro).toHaveBeenCalledWith('concluidas')
    })

    it('deve permitir clicar no filtro já ativo', async () => {
      const user = userEvent.setup()
      render(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      await user.click(screen.getByTestId('filtro-todas'))

      expect(mockOnAlterarFiltro).toHaveBeenCalledTimes(1)
      expect(mockOnAlterarFiltro).toHaveBeenCalledWith('todas')
    })

    it('deve permitir múltiplas mudanças de filtro', async () => {
      const user = userEvent.setup()
      render(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      await user.click(screen.getByTestId('filtro-ativas'))
      await user.click(screen.getByTestId('filtro-concluidas'))
      await user.click(screen.getByTestId('filtro-todas'))

      expect(mockOnAlterarFiltro).toHaveBeenCalledTimes(3)
      expect(mockOnAlterarFiltro).toHaveBeenNthCalledWith(1, 'ativas')
      expect(mockOnAlterarFiltro).toHaveBeenNthCalledWith(2, 'concluidas')
      expect(mockOnAlterarFiltro).toHaveBeenNthCalledWith(3, 'todas')
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter aria-label descritivo nos botões', () => {
      render(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      expect(screen.getByTestId('filtro-todas')).toHaveAttribute('aria-label')
      expect(screen.getByTestId('filtro-ativas')).toHaveAttribute('aria-label')
      expect(screen.getByTestId('filtro-concluidas')).toHaveAttribute('aria-label')
    })

    it('deve ter ButtonGroup com aria-label', () => {
      render(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      const buttonGroup = screen.getByRole('group')
      expect(buttonGroup).toHaveAttribute('aria-label', 'Filtros de tarefas')
    })
  })

  describe('Atualização de Props', () => {
    it('deve atualizar filtro ativo quando prop muda', () => {
      const { rerender } = render(
        <FiltroTarefas
          filtroAtivo="todas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      expect(screen.getByTestId('filtro-todas')).toHaveAttribute('aria-pressed', 'true')

      rerender(
        <FiltroTarefas
          filtroAtivo="ativas"
          onAlterarFiltro={mockOnAlterarFiltro}
          totalAtivas={0}
        />
      )

      expect(screen.getByTestId('filtro-todas')).toHaveAttribute('aria-pressed', 'false')
      expect(screen.getByTestId('filtro-ativas')).toHaveAttribute('aria-pressed', 'true')
    })
  })
})
