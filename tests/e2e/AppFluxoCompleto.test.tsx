import { render, screen } from '../testUtils'
import userEvent from '@testing-library/user-event'
import App from '../../src/App'

describe('E2E: Fluxo Completo da Aplicação', () => {
  it('deve adicionar 2 tarefas e verificar contador', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByTestId('contador-ativas')).toHaveTextContent('0 ativas')

    const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
    const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
    const botaoAdicionar = screen.getByTestId('botao-adicionar')

    await user.type(inputTitulo, 'Tarefa E2E 1')
    await user.type(inputDescricao, 'Descrição da primeira tarefa')
    await user.click(botaoAdicionar)

    await user.type(inputTitulo, 'Tarefa E2E 2')
    await user.type(inputDescricao, 'Descrição da segunda tarefa')
    await user.click(botaoAdicionar)

    expect(screen.getByText('Tarefa E2E 1')).toBeInTheDocument()
    expect(screen.getByText('Tarefa E2E 2')).toBeInTheDocument()
    expect(screen.getByTestId('contador-ativas')).toHaveTextContent('2 ativas')
  })

  it('deve marcar tarefa como concluída e filtrar por ativas', async () => {
    const user = userEvent.setup()
    render(<App />)

    const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
    const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
    const botaoAdicionar = screen.getByTestId('botao-adicionar')

    await user.type(inputTitulo, 'Tarefa Ativa')
    await user.type(inputDescricao, 'Vai continuar ativa')
    await user.click(botaoAdicionar)

    await user.type(inputTitulo, 'Tarefa para Concluir')
    await user.type(inputDescricao, 'Será marcada como concluída')
    await user.click(botaoAdicionar)

    const checkboxes = screen.getAllByTestId('checkbox-concluida')
    await user.click(checkboxes[1].querySelector('input')!)

    expect(screen.getByTestId('contador-ativas')).toHaveTextContent('1 ativa')

    await user.click(screen.getByTestId('filtro-ativas'))

    expect(screen.getByText('Tarefa Ativa')).toBeInTheDocument()
    expect(screen.queryByText('Tarefa para Concluir')).not.toBeInTheDocument()
  })

  it('deve verificar que tarefa concluída some da lista filtrada por ativas', async () => {
    const user = userEvent.setup()
    render(<App />)

    const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
    const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
    const botaoAdicionar = screen.getByTestId('botao-adicionar')

    await user.type(inputTitulo, 'Pendente')
    await user.type(inputDescricao, 'Ainda não feita')
    await user.click(botaoAdicionar)

    await user.type(inputTitulo, 'Concluída')
    await user.type(inputDescricao, 'Já foi feita')
    await user.click(botaoAdicionar)

    await user.click(screen.getByTestId('filtro-ativas'))
    expect(screen.getAllByTestId('item-tarefa')).toHaveLength(2)

    const checkboxes = screen.getAllByTestId('checkbox-concluida')
    await user.click(checkboxes[1].querySelector('input')!)

    expect(screen.getAllByTestId('item-tarefa')).toHaveLength(1)
    expect(screen.getByText('Pendente')).toBeInTheDocument()
    expect(screen.queryByText('Concluída')).not.toBeInTheDocument()
  })

  it('deve remover tarefa e verificar lista atualizada', async () => {
    const user = userEvent.setup()
    render(<App />)

    const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
    const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
    const botaoAdicionar = screen.getByTestId('botao-adicionar')

    await user.type(inputTitulo, 'Tarefa Permanente')
    await user.type(inputDescricao, 'Não será removida')
    await user.click(botaoAdicionar)

    await user.type(inputTitulo, 'Tarefa Temporária')
    await user.type(inputDescricao, 'Será removida')
    await user.click(botaoAdicionar)

    expect(screen.getAllByTestId('item-tarefa')).toHaveLength(2)

    const botoesRemover = screen.getAllByTestId('botao-remover')
    await user.click(botoesRemover[1])

    expect(screen.getAllByTestId('item-tarefa')).toHaveLength(1)
    expect(screen.getByText('Tarefa Permanente')).toBeInTheDocument()
    expect(screen.queryByText('Tarefa Temporária')).not.toBeInTheDocument()
    expect(screen.getByTestId('contador-ativas')).toHaveTextContent('1 ativa')
  })
})
