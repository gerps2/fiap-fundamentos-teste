import { render, screen } from '../testUtils'
import userEvent from '@testing-library/user-event'
import App from '../../App'

/**
 * Testes de Integração - Fluxo Completo da Aplicação
 * 
 * Estes testes validam o funcionamento end-to-end da aplicação,
 * testando a integração entre todos os componentes e o hook useTarefas.
 */
describe('Integração: Fluxo Completo de Tarefas', () => {
  describe('Cenário 1: Adicionar e Visualizar Tarefas', () => {
    it('deve permitir adicionar múltiplas tarefas e visualizá-las', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Verifica estado inicial
      expect(screen.getByText('Nenhuma tarefa encontrada')).toBeInTheDocument()
      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('0 ativas')

      // Adiciona primeira tarefa
      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botaoAdicionar = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Estudar React')
      await user.type(inputDescricao, 'Revisar hooks e componentes')
      await user.click(botaoAdicionar)

      // Verifica que a tarefa foi adicionada
      expect(screen.getByText('Estudar React')).toBeInTheDocument()
      expect(screen.getByText('Revisar hooks e componentes')).toBeInTheDocument()
      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('1 ativa')

      // Adiciona segunda tarefa
      await user.type(inputTitulo, 'Fazer exercícios')
      await user.type(inputDescricao, 'Praticar testes unitários')
      await user.click(botaoAdicionar)

      // Verifica que ambas as tarefas estão visíveis
      expect(screen.getByText('Estudar React')).toBeInTheDocument()
      expect(screen.getByText('Fazer exercícios')).toBeInTheDocument()
      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('2 ativas')
    })
  })

  describe('Cenário 2: Marcar Tarefas como Concluídas', () => {
    it('deve permitir marcar e desmarcar tarefas como concluídas', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Adiciona tarefas
      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botaoAdicionar = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Tarefa 1')
      await user.type(inputDescricao, 'Descrição 1')
      await user.click(botaoAdicionar)

      await user.type(inputTitulo, 'Tarefa 2')
      await user.type(inputDescricao, 'Descrição 2')
      await user.click(botaoAdicionar)

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('2 ativas')

      // Marca primeira tarefa como concluída
      const checkboxes = screen.getAllByTestId('checkbox-concluida')
      await user.click(checkboxes[0].querySelector('input')!)

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('1 ativa')

      // Desmarca a tarefa
      await user.click(checkboxes[0].querySelector('input')!)

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('2 ativas')
    })
  })

  describe('Cenário 3: Filtrar Tarefas por Status', () => {
    it('deve filtrar tarefas corretamente por todos os status', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Adiciona 3 tarefas
      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botaoAdicionar = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Tarefa Ativa 1')
      await user.type(inputDescricao, 'Descrição')
      await user.click(botaoAdicionar)

      await user.type(inputTitulo, 'Tarefa Ativa 2')
      await user.type(inputDescricao, 'Descrição')
      await user.click(botaoAdicionar)

      await user.type(inputTitulo, 'Tarefa Concluída')
      await user.type(inputDescricao, 'Descrição')
      await user.click(botaoAdicionar)

      // Marca uma como concluída
      const checkboxes = screen.getAllByTestId('checkbox-concluida')
      await user.click(checkboxes[2].querySelector('input')!)

      // Testa filtro "todas" (padrão)
      expect(screen.getByText('Tarefa Ativa 1')).toBeInTheDocument()
      expect(screen.getByText('Tarefa Ativa 2')).toBeInTheDocument()
      expect(screen.getByText('Tarefa Concluída')).toBeInTheDocument()

      // Filtra por "ativas"
      await user.click(screen.getByTestId('filtro-ativas'))
      expect(screen.getByText('Tarefa Ativa 1')).toBeInTheDocument()
      expect(screen.getByText('Tarefa Ativa 2')).toBeInTheDocument()
      expect(screen.queryByText('Tarefa Concluída')).not.toBeInTheDocument()

      // Filtra por "concluidas"
      await user.click(screen.getByTestId('filtro-concluidas'))
      expect(screen.queryByText('Tarefa Ativa 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Tarefa Ativa 2')).not.toBeInTheDocument()
      expect(screen.getByText('Tarefa Concluída')).toBeInTheDocument()

      // Volta para "todas"
      await user.click(screen.getByTestId('filtro-todas'))
      expect(screen.getByText('Tarefa Ativa 1')).toBeInTheDocument()
      expect(screen.getByText('Tarefa Ativa 2')).toBeInTheDocument()
      expect(screen.getByText('Tarefa Concluída')).toBeInTheDocument()
    })
  })

  describe('Cenário 4: Remover Tarefas', () => {
    it('deve permitir remover tarefas individualmente', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Adiciona 2 tarefas
      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botaoAdicionar = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Tarefa para Manter')
      await user.type(inputDescricao, 'Descrição')
      await user.click(botaoAdicionar)

      await user.type(inputTitulo, 'Tarefa para Remover')
      await user.type(inputDescricao, 'Descrição')
      await user.click(botaoAdicionar)

      expect(screen.getAllByTestId('item-tarefa')).toHaveLength(2)

      // Remove a segunda tarefa
      const botoesRemover = screen.getAllByTestId('botao-remover')
      await user.click(botoesRemover[1])

      // Verifica que apenas uma tarefa permanece
      expect(screen.getAllByTestId('item-tarefa')).toHaveLength(1)
      expect(screen.getByText('Tarefa para Manter')).toBeInTheDocument()
      expect(screen.queryByText('Tarefa para Remover')).not.toBeInTheDocument()
    })

    it('deve mostrar mensagem de lista vazia ao remover todas as tarefas', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Adiciona uma tarefa
      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botaoAdicionar = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Única Tarefa')
      await user.type(inputDescricao, 'Descrição')
      await user.click(botaoAdicionar)

      expect(screen.getByText('Única Tarefa')).toBeInTheDocument()

      // Remove a tarefa
      await user.click(screen.getByTestId('botao-remover'))

      // Verifica mensagem de lista vazia
      expect(screen.getByText('Nenhuma tarefa encontrada')).toBeInTheDocument()
      expect(screen.queryByTestId('item-tarefa')).not.toBeInTheDocument()
    })
  })

  describe('Cenário 5: Fluxo Completo de Gerenciamento', () => {
    it('deve executar um fluxo completo e realista de uso', async () => {
      const user = userEvent.setup()
      render(<App />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botaoAdicionar = screen.getByTestId('botao-adicionar')

      // 1. Usuário adiciona 4 tarefas
      const tarefas = [
        { titulo: 'Comprar leite', descricao: 'No supermercado' },
        { titulo: 'Estudar para prova', descricao: 'Capítulos 5 a 8' },
        { titulo: 'Ligar para mãe', descricao: 'Desejar feliz aniversário' },
        { titulo: 'Fazer exercícios', descricao: '30 minutos de corrida' },
      ]

      for (const tarefa of tarefas) {
        await user.type(inputTitulo, tarefa.titulo)
        await user.type(inputDescricao, tarefa.descricao)
        await user.click(botaoAdicionar)
      }

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('4 ativas')

      // 2. Marca 2 tarefas como concluídas
      const checkboxes = screen.getAllByTestId('checkbox-concluida')
      await user.click(checkboxes[0].querySelector('input')!) // Comprar leite
      await user.click(checkboxes[2].querySelector('input')!) // Ligar para mãe

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('2 ativas')

      // 3. Filtra para ver apenas tarefas ativas
      await user.click(screen.getByTestId('filtro-ativas'))
      let items = screen.getAllByTestId('item-tarefa')
      expect(items).toHaveLength(2)
      expect(screen.getByText('Estudar para prova')).toBeInTheDocument()
      expect(screen.getByText('Fazer exercícios')).toBeInTheDocument()

      // 4. Filtra para ver tarefas concluídas
      await user.click(screen.getByTestId('filtro-concluidas'))
      items = screen.getAllByTestId('item-tarefa')
      expect(items).toHaveLength(2)
      expect(screen.getByText('Comprar leite')).toBeInTheDocument()
      expect(screen.getByText('Ligar para mãe')).toBeInTheDocument()

      // 5. Remove uma tarefa concluída
      const botoesRemover = screen.getAllByTestId('botao-remover')
      await user.click(botoesRemover[0])

      items = screen.getAllByTestId('item-tarefa')
      expect(items).toHaveLength(1)

      // 6. Volta para ver todas as tarefas
      await user.click(screen.getByTestId('filtro-todas'))
      items = screen.getAllByTestId('item-tarefa')
      expect(items).toHaveLength(3)

      // 7. Marca mais uma tarefa como concluída
      const novosCheckboxes = screen.getAllByTestId('checkbox-concluida')
      await user.click(novosCheckboxes[0].querySelector('input')!)

      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('1 ativa')
    })
  })

  describe('Cenário 6: Validação de Formulário', () => {
    it('deve impedir adicionar tarefa com campos vazios', async () => {
      const user = userEvent.setup()
      render(<App />)

      const botaoAdicionar = screen.getByTestId('botao-adicionar')

      // Tenta adicionar sem preencher nada
      await user.click(botaoAdicionar)

      // Verifica que a mensagem de erro aparece
      expect(await screen.findByTestId('mensagem-erro')).toBeInTheDocument()

      // Verifica que nenhuma tarefa foi adicionada
      expect(screen.getByText('Nenhuma tarefa encontrada')).toBeInTheDocument()
      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('0 ativas')
    })

    it('deve limpar formulário após adicionar tarefa com sucesso', async () => {
      const user = userEvent.setup()
      render(<App />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botaoAdicionar = screen.getByTestId('botao-adicionar')

      await user.type(inputTitulo, 'Nova Tarefa')
      await user.type(inputDescricao, 'Descrição da tarefa')
      await user.click(botaoAdicionar)

      // Verifica que os campos foram limpos
      expect(inputTitulo).toHaveValue('')
      expect(inputDescricao).toHaveValue('')
    })
  })

  describe('Cenário 7: Persistência de Estado Durante Interações', () => {
    it('deve manter estado consistente durante múltiplas operações', async () => {
      const user = userEvent.setup()
      render(<App />)

      const inputTitulo = screen.getByTestId('input-titulo').querySelector('input')!
      const inputDescricao = screen.getByTestId('input-descricao').querySelector('textarea')!
      const botaoAdicionar = screen.getByTestId('botao-adicionar')

      // Adiciona 3 tarefas
      for (let i = 1; i <= 3; i++) {
        await user.type(inputTitulo, `Tarefa ${i}`)
        await user.type(inputDescricao, `Descrição ${i}`)
        await user.click(botaoAdicionar)
      }

      // Marca primeira e terceira como concluídas
      const checkboxes = screen.getAllByTestId('checkbox-concluida')
      await user.click(checkboxes[0].querySelector('input')!)
      await user.click(checkboxes[2].querySelector('input')!)

      // Filtra por ativas
      await user.click(screen.getByTestId('filtro-ativas'))
      expect(screen.getAllByTestId('item-tarefa')).toHaveLength(1)
      expect(screen.getByText('Tarefa 2')).toBeInTheDocument()

      // Adiciona nova tarefa enquanto filtro está ativo
      await user.type(inputTitulo, 'Tarefa 4')
      await user.type(inputDescricao, 'Descrição 4')
      await user.click(botaoAdicionar)

      // Nova tarefa deve aparecer (é ativa)
      expect(screen.getAllByTestId('item-tarefa')).toHaveLength(2)
      expect(screen.getByText('Tarefa 4')).toBeInTheDocument()

      // Volta para "todas" e verifica total
      await user.click(screen.getByTestId('filtro-todas'))
      expect(screen.getAllByTestId('item-tarefa')).toHaveLength(4)
      expect(screen.getByTestId('contador-ativas')).toHaveTextContent('2 ativas')
    })
  })
})
