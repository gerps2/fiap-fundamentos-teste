/**
 * Tipos de prioridade para uma tarefa
 */
export type Prioridade = 'baixa' | 'media' | 'alta'

/**
 * Tipos de filtro disponíveis
 */
export type TipoFiltro = 'todas' | 'ativas' | 'concluidas'

/**
 * Interface que representa uma tarefa
 */
export interface Tarefa {
  id: string
  titulo: string
  descricao: string
  prioridade: Prioridade
  concluida: boolean
  criadaEm: Date
}

/**
 * Tipo para criar uma nova tarefa (sem id, concluida e criadaEm)
 */
export type NovaTarefa = Omit<Tarefa, 'id' | 'concluida' | 'criadaEm'>
