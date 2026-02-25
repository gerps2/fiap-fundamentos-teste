import { renderHook, act } from '@testing-library/react'
import { useTarefas } from '../../../src/hooks/useTarefas'
import { NovaTarefa } from '../../../src/types/tarefa'

describe('useTarefas', () => {
  const novaTarefaMock: NovaTarefa = {
    titulo: 'Tarefa de Teste',
    descricao: 'Descrição da tarefa de teste',
    prioridade: 'media',
  }

  const outraTarefaMock: NovaTarefa = {
    titulo: 'Outra Tarefa',
    descricao: 'Outra descrição',
    prioridade: 'alta',
  }

  describe('Estado Inicial', () => {
    it('deve inicializar com lista de tarefas vazia', () => {
      const { result } = renderHook(() => useTarefas())
      expect(result.current.tarefas).toEqual([])
    })

    it('deve inicializar com filtro "todas"', () => {
      const { result } = renderHook(() => useTarefas())
      expect(result.current.filtroAtivo).toBe('todas')
    })

    it('deve inicializar com zero tarefas ativas', () => {
      const { result } = renderHook(() => useTarefas())
      expect(result.current.totalTarefasAtivas).toBe(0)
    })

    it('deve inicializar com tarefas filtradas vazias', () => {
      const { result } = renderHook(() => useTarefas())
      expect(result.current.tarefasFiltradas).toEqual([])
    })
  })

  describe('adicionarTarefa', () => {
    it('deve adicionar uma tarefa à lista', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
      })

      expect(result.current.tarefas).toHaveLength(1)
      expect(result.current.tarefas[0]).toMatchObject({
        titulo: novaTarefaMock.titulo,
        descricao: novaTarefaMock.descricao,
        prioridade: novaTarefaMock.prioridade,
        concluida: false,
      })
    })

    it('deve adicionar tarefa com ID único', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
      })

      expect(result.current.tarefas[0].id).toBeDefined()
      expect(typeof result.current.tarefas[0].id).toBe('string')
    })

    it('deve adicionar tarefa com data de criação', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
      })

      expect(result.current.tarefas[0].criadaEm).toBeInstanceOf(Date)
    })

    it('deve adicionar múltiplas tarefas', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
        result.current.adicionarTarefa(outraTarefaMock)
      })

      expect(result.current.tarefas).toHaveLength(2)
    })

    it('deve incrementar contador de tarefas ativas ao adicionar', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
      })

      expect(result.current.totalTarefasAtivas).toBe(1)
    })
  })

  describe('removerTarefa', () => {
    it('deve remover uma tarefa pelo ID', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
      })

      const idTarefa = result.current.tarefas[0].id

      act(() => {
        result.current.removerTarefa(idTarefa)
      })

      expect(result.current.tarefas).toHaveLength(0)
    })

    it('deve remover apenas a tarefa especificada', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
        result.current.adicionarTarefa(outraTarefaMock)
      })

      const idPrimeiraTarefa = result.current.tarefas[0].id

      act(() => {
        result.current.removerTarefa(idPrimeiraTarefa)
      })

      expect(result.current.tarefas).toHaveLength(1)
      expect(result.current.tarefas[0].titulo).toBe(outraTarefaMock.titulo)
    })

    it('não deve fazer nada se ID não existir', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
      })

      act(() => {
        result.current.removerTarefa('id-inexistente')
      })

      expect(result.current.tarefas).toHaveLength(1)
    })
  })

  describe('alternarConclusao', () => {
    it('deve marcar tarefa como concluída', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
      })

      const idTarefa = result.current.tarefas[0].id

      act(() => {
        result.current.alternarConclusao(idTarefa)
      })

      expect(result.current.tarefas[0].concluida).toBe(true)
    })

    it('deve desmarcar tarefa concluída', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
      })

      const idTarefa = result.current.tarefas[0].id

      act(() => {
        result.current.alternarConclusao(idTarefa)
        result.current.alternarConclusao(idTarefa)
      })

      expect(result.current.tarefas[0].concluida).toBe(false)
    })

    it('deve atualizar contador de tarefas ativas ao concluir', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
        result.current.adicionarTarefa(outraTarefaMock)
      })

      expect(result.current.totalTarefasAtivas).toBe(2)

      const idTarefa = result.current.tarefas[0].id

      act(() => {
        result.current.alternarConclusao(idTarefa)
      })

      expect(result.current.totalTarefasAtivas).toBe(1)
    })

    it('não deve afetar outras tarefas', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
        result.current.adicionarTarefa(outraTarefaMock)
      })

      const idPrimeiraTarefa = result.current.tarefas[0].id

      act(() => {
        result.current.alternarConclusao(idPrimeiraTarefa)
      })

      expect(result.current.tarefas[1].concluida).toBe(false)
    })
  })

  describe('alterarFiltro', () => {
    it('deve alterar filtro para "ativas"', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.alterarFiltro('ativas')
      })

      expect(result.current.filtroAtivo).toBe('ativas')
    })

    it('deve alterar filtro para "concluidas"', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.alterarFiltro('concluidas')
      })

      expect(result.current.filtroAtivo).toBe('concluidas')
    })

    it('deve alterar filtro para "todas"', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.alterarFiltro('ativas')
        result.current.alterarFiltro('todas')
      })

      expect(result.current.filtroAtivo).toBe('todas')
    })
  })

  describe('tarefasFiltradas', () => {
    it('deve retornar todas as tarefas quando filtro é "todas"', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
        result.current.adicionarTarefa(outraTarefaMock)
      })

      act(() => {
        result.current.alternarConclusao(result.current.tarefas[0].id)
      })

      expect(result.current.tarefasFiltradas).toHaveLength(2)
    })

    it('deve retornar apenas tarefas ativas quando filtro é "ativas"', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
        result.current.adicionarTarefa(outraTarefaMock)
      })

      act(() => {
        result.current.alternarConclusao(result.current.tarefas[0].id)
        result.current.alterarFiltro('ativas')
      })

      expect(result.current.tarefasFiltradas).toHaveLength(1)
      expect(result.current.tarefasFiltradas[0].concluida).toBe(false)
    })

    it('deve retornar apenas tarefas concluídas quando filtro é "concluidas"', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
        result.current.adicionarTarefa(outraTarefaMock)
      })

      act(() => {
        result.current.alternarConclusao(result.current.tarefas[0].id)
        result.current.alterarFiltro('concluidas')
      })

      expect(result.current.tarefasFiltradas).toHaveLength(1)
      expect(result.current.tarefasFiltradas[0].concluida).toBe(true)
    })

    it('deve atualizar tarefas filtradas ao mudar filtro', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
        result.current.adicionarTarefa(outraTarefaMock)
      })

      act(() => {
        result.current.alterarFiltro('ativas')
      })

      expect(result.current.tarefasFiltradas).toHaveLength(2)

      act(() => {
        result.current.alterarFiltro('concluidas')
      })

      expect(result.current.tarefasFiltradas).toHaveLength(0)
    })
  })

  describe('limparTarefas', () => {
    it('deve remover todas as tarefas', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
        result.current.adicionarTarefa(outraTarefaMock)
      })

      expect(result.current.tarefas).toHaveLength(2)

      act(() => {
        result.current.limparTarefas()
      })

      expect(result.current.tarefas).toHaveLength(0)
    })

    it('deve zerar contador de tarefas ativas', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
      })

      act(() => {
        result.current.limparTarefas()
      })

      expect(result.current.totalTarefasAtivas).toBe(0)
    })
  })

  describe('removerTarefasConcluidas', () => {
    it('deve remover apenas tarefas concluídas', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
        result.current.adicionarTarefa(outraTarefaMock)
      })

      act(() => {
        result.current.alternarConclusao(result.current.tarefas[0].id)
      })

      expect(result.current.tarefas).toHaveLength(2)

      act(() => {
        result.current.removerTarefasConcluidas()
      })

      expect(result.current.tarefas).toHaveLength(1)
      expect(result.current.tarefas[0].concluida).toBe(false)
    })

    it('não deve remover tarefas ativas', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
        result.current.adicionarTarefa(outraTarefaMock)
      })

      act(() => {
        result.current.removerTarefasConcluidas()
      })

      expect(result.current.tarefas).toHaveLength(2)
    })

    it('deve manter contador de tarefas ativas correto', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
        result.current.adicionarTarefa(outraTarefaMock)
      })

      act(() => {
        result.current.alternarConclusao(result.current.tarefas[0].id)
      })

      expect(result.current.totalTarefasAtivas).toBe(1)

      act(() => {
        result.current.removerTarefasConcluidas()
      })

      expect(result.current.totalTarefasAtivas).toBe(1)
    })

    it('deve funcionar quando todas as tarefas estão concluídas', () => {
      const { result } = renderHook(() => useTarefas())

      act(() => {
        result.current.adicionarTarefa(novaTarefaMock)
        result.current.adicionarTarefa(outraTarefaMock)
      })

      act(() => {
        result.current.alternarConclusao(result.current.tarefas[0].id)
        result.current.alternarConclusao(result.current.tarefas[1].id)
      })

      act(() => {
        result.current.removerTarefasConcluidas()
      })

      expect(result.current.tarefas).toHaveLength(0)
    })
  })
})
