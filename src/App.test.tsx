import { render, screen } from './tests/testUtils'
import App from './App'

describe('App', () => {
  it('deve renderizar a aplicação completa', () => {
    render(<App />)
    
    // Verifica se a página Inicio foi renderizada
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
