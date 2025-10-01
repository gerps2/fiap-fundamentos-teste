import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Chip,
  Box,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Tarefa } from '../../types/tarefa'
import { formatarData } from '../../utils/tarefaHelpers'
import './ItemTarefa.css'

interface ItemTarefaProps {
  tarefa: Tarefa
  onAlternarConclusao: (id: string) => void
  onRemover: (id: string) => void
}

/**
 * Componente que representa um item individual de tarefa
 */
export const ItemTarefa = ({ tarefa, onAlternarConclusao, onRemover }: ItemTarefaProps) => {
  const corPrioridade = {
    baixa: 'success',
    media: 'warning',
    alta: 'error',
  } as const

  const labelPrioridade = {
    baixa: 'Baixa',
    media: 'Média',
    alta: 'Alta',
  }

  return (
    <Card
      className={`item-tarefa ${tarefa.concluida ? 'item-tarefa--concluida' : ''}`}
      data-testid="item-tarefa"
    >
      <CardContent className="item-tarefa__content">
        <Box className="item-tarefa__header">
          <Checkbox
            checked={tarefa.concluida}
            onChange={() => onAlternarConclusao(tarefa.id)}
            color="primary"
            data-testid="checkbox-concluida"
            aria-label={`Marcar tarefa "${tarefa.titulo}" como ${tarefa.concluida ? 'não concluída' : 'concluída'}`}
          />
          <Box className="item-tarefa__info">
            <Typography
              variant="h6"
              component="h3"
              className={tarefa.concluida ? 'item-tarefa__titulo--concluida' : ''}
              data-testid="titulo-tarefa"
            >
              {tarefa.titulo}
            </Typography>
            <Chip
              label={labelPrioridade[tarefa.prioridade]}
              color={corPrioridade[tarefa.prioridade]}
              size="small"
              data-testid="chip-prioridade"
            />
          </Box>
          <IconButton
            onClick={() => onRemover(tarefa.id)}
            color="error"
            aria-label={`Remover tarefa "${tarefa.titulo}"`}
            data-testid="botao-remover"
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          className={tarefa.concluida ? 'item-tarefa__descricao--concluida' : ''}
          data-testid="descricao-tarefa"
        >
          {tarefa.descricao}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          className="item-tarefa__data"
          data-testid="data-criacao"
        >
          Criada em: {formatarData(tarefa.criadaEm)}
        </Typography>
      </CardContent>
    </Card>
  )
}
