import { Tarefa, NovaTarefa } from '../types/tarefa'
import {
  filtrarTarefas,
  contarTarefasAtivas,
  validarTarefa,
  formatarData,
  gerarId,
} from './tarefaHelpers'

describe('tarefaHelpers', () => {
  // Mock de tarefas para testes
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

  describe('filtrarTarefas', () => {
    it('deve retornar todas as tarefas quando filtro é "todas"', () => {
      const resultado = filtrarTarefas(tarefasMock, 'todas')
      expect(resultado).toHaveLength(3)
      expect(resultado).toEqual(tarefasMock)
    })

    it('deve retornar apenas tarefas ativas quando filtro é "ativas"', () => {
      const resultado = filtrarTarefas(tarefasMock, 'ativas')
      expect(resultado).toHaveLength(2)
      expect(resultado.every(t => !t.concluida)).toBe(true)
    })

    it('deve retornar apenas tarefas concluídas quando filtro é "concluidas"', () => {
      const resultado = filtrarTarefas(tarefasMock, 'concluidas')
      expect(resultado).toHaveLength(1)
      expect(resultado.every(t => t.concluida)).toBe(true)
    })

    it('deve retornar array vazio quando não há tarefas', () => {
      const resultado = filtrarTarefas([], 'todas')
      expect(resultado).toHaveLength(0)
    })
  })

  describe('contarTarefasAtivas', () => {
    it('deve contar corretamente o número de tarefas ativas', () => {
      const resultado = contarTarefasAtivas(tarefasMock)
      expect(resultado).toBe(2)
    })

    it('deve retornar 0 quando todas as tarefas estão concluídas', () => {
      const tarefasConcluidas = tarefasMock.map(t => ({ ...t, concluida: true }))
      const resultado = contarTarefasAtivas(tarefasConcluidas)
      expect(resultado).toBe(0)
    })

    it('deve retornar 0 quando não há tarefas', () => {
      const resultado = contarTarefasAtivas([])
      expect(resultado).toBe(0)
    })

    it('deve contar todas quando nenhuma está concluída', () => {
      const tarefasAtivas = tarefasMock.map(t => ({ ...t, concluida: false }))
      const resultado = contarTarefasAtivas(tarefasAtivas)
      expect(resultado).toBe(3)
    })
  })

  describe('validarTarefa', () => {
    const tarefaValida: NovaTarefa = {
      titulo: 'Título válido',
      descricao: 'Descrição válida',
      prioridade: 'media',
    }

    it('deve retornar true para uma tarefa válida', () => {
      expect(validarTarefa(tarefaValida)).toBe(true)
    })

    it('deve retornar false quando título está vazio', () => {
      const tarefaInvalida = { ...tarefaValida, titulo: '' }
      expect(validarTarefa(tarefaInvalida)).toBe(false)
    })

    it('deve retornar false quando título contém apenas espaços', () => {
      const tarefaInvalida = { ...tarefaValida, titulo: '   ' }
      expect(validarTarefa(tarefaInvalida)).toBe(false)
    })

    it('deve retornar false quando descrição está vazia', () => {
      const tarefaInvalida = { ...tarefaValida, descricao: '' }
      expect(validarTarefa(tarefaInvalida)).toBe(false)
    })

    it('deve retornar false quando descrição contém apenas espaços', () => {
      const tarefaInvalida = { ...tarefaValida, descricao: '   ' }
      expect(validarTarefa(tarefaInvalida)).toBe(false)
    })

    it('deve retornar false quando prioridade é inválida', () => {
      const tarefaInvalida = { ...tarefaValida, prioridade: 'invalida' as any }
      expect(validarTarefa(tarefaInvalida)).toBe(false)
    })
  })

  describe('formatarData', () => {
    it('deve formatar data corretamente em português', () => {
      const data = new Date('2024-01-15T14:30:00')
      const resultado = formatarData(data)
      expect(resultado).toMatch(/15\/01\/2024/)
      expect(resultado).toMatch(/14:30/)
    })

    it('deve formatar data com zeros à esquerda', () => {
      const data = new Date('2024-03-05T09:05:00')
      const resultado = formatarData(data)
      expect(resultado).toMatch(/05\/03\/2024/)
      expect(resultado).toMatch(/09:05/)
    })
  })

  describe('gerarId', () => {
    it('deve gerar um ID único', () => {
      const id1 = gerarId()
      const id2 = gerarId()
      expect(id1).not.toBe(id2)
    })

    it('deve gerar um ID no formato esperado', () => {
      const id = gerarId()
      expect(id).toMatch(/^\d+-[a-z0-9]+$/)
    })

    it('deve gerar IDs diferentes em múltiplas chamadas', () => {
      const ids = Array.from({ length: 10 }, () => gerarId())
      const idsUnicos = new Set(ids)
      expect(idsUnicos.size).toBe(10)
    })
  })
})
