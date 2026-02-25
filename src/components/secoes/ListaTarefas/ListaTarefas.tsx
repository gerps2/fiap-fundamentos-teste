import { Box, Typography, List } from '@mui/material'
import { Tarefa } from '../../../types/tarefa'
import { ItemTarefa } from '../../compostos/ItemTarefa/ItemTarefa'
import './ListaTarefas.css'

interface ListaTarefasProps {
  tarefas: Tarefa[]
  onAlternarConclusao: (id: string) => void
  onRemover: (id: string) => void
}

/**
 * Componente que renderiza uma lista de tarefas
 */
export const ListaTarefas = ({
  tarefas,
  onAlternarConclusao,
  onRemover,
}: ListaTarefasProps) => {
  if (tarefas.length === 0) {
    return (
      <Box className="lista-tarefas-vazia" data-testid="lista-vazia">
        <Typography variant="h6" color="text.secondary" align="center">
          Nenhuma tarefa encontrada
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Adicione uma nova tarefa para começar!
        </Typography>
      </Box>
    )
  }

  return (
    <List className="lista-tarefas" data-testid="lista-tarefas">
      {tarefas.map((tarefa) => (
        <ItemTarefa
          key={tarefa.id}
          tarefa={tarefa}
          onAlternarConclusao={onAlternarConclusao}
          onRemover={onRemover}
        />
      ))}
    </List>
  )
}
