import { Tarefa, TipoFiltro, NovaTarefa } from '../types/tarefa'

/**
 * Filtra tarefas baseado no tipo de filtro selecionado
 */
export const filtrarTarefas = (tarefas: Tarefa[], filtro: TipoFiltro): Tarefa[] => {
  switch (filtro) {
    case 'ativas':
      return tarefas.filter(tarefa => !tarefa.concluida)
    case 'concluidas':
      return tarefas.filter(tarefa => tarefa.concluida)
    case 'todas':
    default:
      return tarefas
  }
}

/**
 * Conta quantas tarefas estão ativas (não concluídas)
 */
export const contarTarefasAtivas = (tarefas: Tarefa[]): number => {
  return tarefas.filter(tarefa => !tarefa.concluida).length
}

/**
 * Valida se os dados de uma nova tarefa são válidos
 */
export const validarTarefa = (tarefa: NovaTarefa): boolean => {
  return (
    tarefa.titulo.trim().length > 0 &&
    tarefa.descricao.trim().length > 0 &&
    ['baixa', 'media', 'alta'].includes(tarefa.prioridade)
  )
}

/**
 * Formata uma data para exibição em português
 */
export const formatarData = (data: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(data)
}

/**
 * Gera um ID único para uma tarefa
 */
export const gerarId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
