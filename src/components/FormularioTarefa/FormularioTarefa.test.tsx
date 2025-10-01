import { render, screen } from '../../tests/testUtils'
import userEvent from '@testing-library/user-event'
import { FormularioTarefa } from './FormularioTarefa'

describe('FormularioTarefa', () => {
  const mockOnAdicionar = jest.fn()

  beforeEach(() => {
    mockOnAdicionar.mockClear()
  })

  describe('Renderização', () => {
    it('deve renderizar o formulário com todos os campos', () => {
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      expect(screen.getByTestId('input-titulo')).toBeInTheDocument()
      expect(screen.getByTestId('input-descricao')).toBeInTheDocument()
      expect(screen.getByTestId('select-prioridade')).toBeInTheDocument()
      expect(screen.getByTestId('botao-adicionar')).toBeInTheDocument()
    })

    it('deve renderizar o título do formulário', () => {
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      expect(screen.getByText('Adicionar Nova Tarefa')).toBeInTheDocument()
    })

    it('deve renderizar campo de título vazio inicialmente', () => {
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')
      expect(inputTitulo).toHaveValue('')
    })

    it('deve renderizar campo de descrição vazio inicialmente', () => {
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')
      expect(inputDescricao).toHaveValue('')
    })

    it('deve renderizar prioridade "media" como padrão', () => {
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      const selectPrioridade = screen.getByTestId('select-prioridade').querySelector('input')
      expect(selectPrioridade).toHaveValue('media')
    })
  })

  describe('Interações do Usuário', () => {
    it('deve permitir digitar no campo título', async () => {
      const user = userEvent.setup()
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      await user.type(inputTitulo, 'Minha Tarefa')

      expect(inputTitulo).toHaveValue('Minha Tarefa')
    })

    it('deve permitir digitar no campo descrição', async () => {
      const user = userEvent.setup()
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      await user.type(inputDescricao, 'Descrição da tarefa')

      expect(inputDescricao).toHaveValue('Descrição da tarefa')
    })

    it('deve ter prioridade média como padrão', () => {
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      const selectInput = screen.getByTestId('select-prioridade').querySelector('input')
      expect(selectInput).toHaveValue('media')
    })
  })

  describe('Submissão do Formulário', () => {
    it('deve chamar onAdicionar com dados corretos ao submeter', async () => {
      const user = userEvent.setup()
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botao = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Tarefa Teste')
      await user.type(inputDescricao, 'Descrição Teste')
      await user.click(botao)

      expect(mockOnAdicionar).toHaveBeenCalledTimes(1)
      expect(mockOnAdicionar).toHaveBeenCalledWith({
        titulo: 'Tarefa Teste',
        descricao: 'Descrição Teste',
        prioridade: 'media',
      })
    })

    it('deve limpar o formulário após submissão bem-sucedida', async () => {
      const user = userEvent.setup()
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botao = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Tarefa Teste')
      await user.type(inputDescricao, 'Descrição Teste')
      await user.click(botao)

      expect(inputTitulo).toHaveValue('')
      expect(inputDescricao).toHaveValue('')
    })

    it('deve manter prioridade "media" após submissão', async () => {
      const user = userEvent.setup()
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botao = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Tarefa Teste')
      await user.type(inputDescricao, 'Descrição Teste')
      await user.click(botao)

      const selectInput = screen.getByTestId('select-prioridade').querySelector('input')
      expect(selectInput).toHaveValue('media')
    })
  })

  describe('Validação', () => {
    it('deve mostrar erro quando título está vazio', async () => {
      const user = userEvent.setup()
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botao = screen.getByTestId('botao-adicionar')

      await user.type(inputDescricao, 'Descrição Teste')
      await user.click(botao)

      expect(await screen.findByTestId('mensagem-erro')).toBeInTheDocument()
      expect(mockOnAdicionar).not.toHaveBeenCalled()
    })

    it('deve mostrar erro quando descrição está vazia', async () => {
      const user = userEvent.setup()
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const botao = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Tarefa Teste')
      await user.click(botao)

      expect(await screen.findByTestId('mensagem-erro')).toBeInTheDocument()
      expect(mockOnAdicionar).not.toHaveBeenCalled()
    })

    it('deve mostrar erro quando ambos os campos estão vazios', async () => {
      const user = userEvent.setup()
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      const botao = screen.getByTestId('botao-adicionar')
      await user.click(botao)

      expect(await screen.findByTestId('mensagem-erro')).toBeInTheDocument()
      expect(mockOnAdicionar).not.toHaveBeenCalled()
    })

    it('deve mostrar erro quando campos contêm apenas espaços', async () => {
      const user = userEvent.setup()
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botao = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, '   ')
      await user.type(inputDescricao, '   ')
      await user.click(botao)

      expect(await screen.findByTestId('mensagem-erro')).toBeInTheDocument()
      expect(mockOnAdicionar).not.toHaveBeenCalled()
    })

    it('deve limpar mensagem de erro ao submeter com sucesso', async () => {
      const user = userEvent.setup()
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botao = screen.getByTestId('botao-adicionar')

      // Primeiro submit com erro
      await user.click(botao)
      expect(await screen.findByTestId('mensagem-erro')).toBeInTheDocument()

      // Segundo submit com sucesso
      await user.type(inputTitulo, 'Tarefa Teste')
      await user.type(inputDescricao, 'Descrição Teste')
      await user.click(botao)

      expect(screen.queryByTestId('mensagem-erro')).not.toBeInTheDocument()
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter labels associados aos inputs', () => {
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/prioridade/i)).toBeInTheDocument()
    })

    it('deve ter botão com texto descritivo', () => {
      render(<FormularioTarefa onAdicionar={mockOnAdicionar} />)

      expect(screen.getByRole('button', { name: /adicionar tarefa/i })).toBeInTheDocument()
    })
  })
})
