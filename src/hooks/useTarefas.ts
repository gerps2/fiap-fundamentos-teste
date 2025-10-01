import { useState, useCallback } from 'react'
import { Tarefa, NovaTarefa, TipoFiltro } from '../types/tarefa'
import { gerarId, filtrarTarefas, contarTarefasAtivas } from '../utils/tarefaHelpers'

/**
 * Custom hook para gerenciar o estado das tarefas
 * 
 * @returns Objeto com estado e funções para manipular tarefas
 */
export const useTarefas = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [filtroAtivo, setFiltroAtivo] = useState<TipoFiltro>('todas')

  /**
   * Adiciona uma nova tarefa à lista
   */
  const adicionarTarefa = useCallback((novaTarefa: NovaTarefa) => {
    const tarefa: Tarefa = {
      ...novaTarefa,
      id: gerarId(),
      concluida: false,
      criadaEm: new Date(),
    }
    setTarefas(tarefasAtuais => [...tarefasAtuais, tarefa])
  }, [])

  /**
   * Remove uma tarefa da lista pelo ID
   */
  const removerTarefa = useCallback((id: string) => {
    setTarefas(tarefasAtuais => tarefasAtuais.filter(tarefa => tarefa.id !== id))
  }, [])

  /**
   * Alterna o estado de conclusão de uma tarefa
   */
  const alternarConclusao = useCallback((id: string) => {
    setTarefas(tarefasAtuais =>
      tarefasAtuais.map(tarefa =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    )
  }, [])

  /**
   * Atualiza o filtro ativo
   */
  const alterarFiltro = useCallback((novoFiltro: TipoFiltro) => {
    setFiltroAtivo(novoFiltro)
  }, [])

  /**
   * Limpa todas as tarefas
   */
  const limparTarefas = useCallback(() => {
    setTarefas([])
  }, [])

  /**
   * Remove todas as tarefas concluídas
   */
  const removerTarefasConcluidas = useCallback(() => {
    setTarefas(tarefasAtuais => tarefasAtuais.filter(tarefa => !tarefa.concluida))
  }, [])

  // Tarefas filtradas baseado no filtro ativo
  const tarefasFiltradas = filtrarTarefas(tarefas, filtroAtivo)

  // Contagem de tarefas ativas
  const totalTarefasAtivas = contarTarefasAtivas(tarefas)

  return {
    tarefas,
    tarefasFiltradas,
    filtroAtivo,
    totalTarefasAtivas,
    adicionarTarefa,
    removerTarefa,
    alternarConclusao,
    alterarFiltro,
    limparTarefas,
    removerTarefasConcluidas,
  }
}
