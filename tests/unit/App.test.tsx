import { render, screen } from '../testUtils'
import App from '../../src/App'

describe('App', () => {
  it('deve renderizar a aplicação completa', () => {
    render(<App />)

    expect(screen.getByText(/gerenciador de tarefas/i)).toBeInTheDocument()
    expect(screen.getByText(/organize suas tarefas/i)).toBeInTheDocument()
  })

  it('deve renderizar o formulário de tarefas', () => {
    render(<App />)

    expect(screen.getByText('Adicionar Nova Tarefa')).toBeInTheDocument()
  })

  it('deve renderizar o filtro de tarefas', () => {
    render(<App />)

    expect(screen.getByText('Filtrar Tarefas')).toBeInTheDocument()
  })
})
