import { render, screen } from '../../testUtils'
import userEvent from '@testing-library/user-event'
import { Inicio } from '../../../src/pages/Inicio/Inicio'

describe('Inicio', () => {
  describe('Renderização', () => {
    it('deve renderizar o título da página', () => {
      render(<Inicio />)

      expect(screen.getByText(/gerenciador de tarefas/i)).toBeInTheDocument()
    })

    it('deve renderizar o subtítulo', () => {
      render(<Inicio />)

      expect(screen.getByText(/organize suas tarefas/i)).toBeInTheDocument()
    })

    it('deve renderizar o formulário de adicionar tarefa', () => {
      render(<Inicio />)

      expect(screen.getByText('Adicionar Nova Tarefa')).toBeInTheDocument()
    })

    it('deve renderizar o filtro de tarefas', () => {
      render(<Inicio />)

      expect(screen.getByText('Filtrar Tarefas')).toBeInTheDocument()
    })

    it('deve renderizar mensagem de lista vazia inicialmente', () => {
      render(<Inicio />)

      expect(screen.getByText('Nenhuma tarefa encontrada')).toBeInTheDocument()
    })

    it('deve renderizar contador de tarefas ativas', () => {
      render(<Inicio />)

      expect(screen.getByTestId('contador-ativas')).toBeInTheDocument()
    })
  })

  describe('Integração de Componentes', () => {
    it('deve adicionar tarefa através do formulário', async () => {
      const user = userEvent.setup()
      render(<Inicio />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botao = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Minha Tarefa')
      await user.type(inputDescricao, 'Descrição da tarefa')
      await user.click(botao)

      expect(screen.getByText('Minha Tarefa')).toBeInTheDocument()
      expect(screen.getByText('Descrição da tarefa')).toBeInTheDocument()
    })

    it('deve atualizar contador ao adicionar tarefa', async () => {
      const user = userEvent.setup()
      render(<Inicio />)

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('0 ativas')

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botao = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Tarefa 1')
      await user.type(inputDescricao, 'Descrição 1')
      await user.click(botao)

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('1 ativa')
    })

    it('deve remover tarefa ao clicar no botão de remover', async () => {
      const user = userEvent.setup()
      render(<Inicio />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botaoAdicionar = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Tarefa para Remover')
      await user.type(inputDescricao, 'Descrição')
      await user.click(botaoAdicionar)

      expect(screen.getByText('Tarefa para Remover')).toBeInTheDocument()

      const botaoRemover = screen.getByTestId('botao-remover')
      await user.click(botaoRemover)

      expect(screen.queryByText('Tarefa para Remover')).not.toBeInTheDocument()
      expect(screen.getByText('Nenhuma tarefa encontrada')).toBeInTheDocument()
    })

    it('deve marcar tarefa como concluída', async () => {
      const user = userEvent.setup()
      render(<Inicio />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botaoAdicionar = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Tarefa a Concluir')
      await user.type(inputDescricao, 'Descrição')
      await user.click(botaoAdicionar)

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('1 ativa')

      const checkbox = screen.getByTestId('checkbox-concluida').querySelector('input')!
      await user.click(checkbox)

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('0 ativas')
    })

    it('deve filtrar tarefas por "ativas"', async () => {
      const user = userEvent.setup()
      render(<Inicio />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botaoAdicionar = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Tarefa 1')
      await user.type(inputDescricao, 'Descrição 1')
      await user.click(botaoAdicionar)

      await user.type(inputTitulo, 'Tarefa 2')
      await user.type(inputDescricao, 'Descrição 2')
      await user.click(botaoAdicionar)

      const checkboxes = screen.getAllByTestId('checkbox-concluida')
      await user.click(checkboxes[0].querySelector('input')!)

      await user.click(screen.getByTestId('filtro-ativas'))

      expect(screen.queryByText('Tarefa 1')).not.toBeInTheDocument()
      expect(screen.getByText('Tarefa 2')).toBeInTheDocument()
    })

    it('deve filtrar tarefas por "concluidas"', async () => {
      const user = userEvent.setup()
      render(<Inicio />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botaoAdicionar = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Tarefa 1')
      await user.type(inputDescricao, 'Descrição 1')
      await user.click(botaoAdicionar)

      await user.type(inputTitulo, 'Tarefa 2')
      await user.type(inputDescricao, 'Descrição 2')
      await user.click(botaoAdicionar)

      const checkboxes = screen.getAllByTestId('checkbox-concluida')
      await user.click(checkboxes[0].querySelector('input')!)

      await user.click(screen.getByTestId('filtro-concluidas'))

      expect(screen.getByText('Tarefa 1')).toBeInTheDocument()
      expect(screen.queryByText('Tarefa 2')).not.toBeInTheDocument()
    })

    it('deve mostrar todas as tarefas ao filtrar por "todas"', async () => {
      const user = userEvent.setup()
      render(<Inicio />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botaoAdicionar = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Tarefa 1')
      await user.type(inputDescricao, 'Descrição 1')
      await user.click(botaoAdicionar)

      await user.type(inputTitulo, 'Tarefa 2')
      await user.type(inputDescricao, 'Descrição 2')
      await user.click(botaoAdicionar)

      const checkboxes = screen.getAllByTestId('checkbox-concluida')
      await user.click(checkboxes[0].querySelector('input')!)

      await user.click(screen.getByTestId('filtro-ativas'))
      expect(screen.queryByText('Tarefa 1')).not.toBeInTheDocument()

      await user.click(screen.getByTestId('filtro-todas'))
      expect(screen.getByText('Tarefa 1')).toBeInTheDocument()
      expect(screen.getByText('Tarefa 2')).toBeInTheDocument()
    })
  })

  describe('Fluxo Completo', () => {
    it('deve executar fluxo completo de gerenciamento de tarefas', async () => {
      const user = userEvent.setup()
      render(<Inicio />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botaoAdicionar = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Tarefa 1')
      await user.type(inputDescricao, 'Desc 1')
      await user.click(botaoAdicionar)

      await user.type(inputTitulo, 'Tarefa 2')
      await user.type(inputDescricao, 'Desc 2')
      await user.click(botaoAdicionar)

      await user.type(inputTitulo, 'Tarefa 3')
      await user.type(inputDescricao, 'Desc 3')
      await user.click(botaoAdicionar)

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('3 ativas')

      const checkboxes = screen.getAllByTestId('checkbox-concluida')
      await user.click(checkboxes[0].querySelector('input')!)
      await user.click(checkboxes[1].querySelector('input')!)

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('1 ativa')

      await user.click(screen.getByTestId('filtro-concluidas'))
      const items = screen.getAllByTestId('item-tarefa')
      expect(items).toHaveLength(2)

      await user.click(screen.getByTestId('filtro-todas'))
      const todosItems = screen.getAllByTestId('item-tarefa')
      expect(todosItems).toHaveLength(3)

      const botoesRemover = screen.getAllByTestId('botao-remover')
      await user.click(botoesRemover[0])

      const itemsRestantes = screen.getAllByTestId('item-tarefa')
      expect(itemsRestantes).toHaveLength(2)
    })
  })
})
