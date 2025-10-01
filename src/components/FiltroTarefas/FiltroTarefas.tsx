import { Box, ButtonGroup, Button, Chip, Typography } from '@mui/material'
import { TipoFiltro } from '../../types/tarefa'
import './FiltroTarefas.css'

interface FiltroTarefasProps {
  filtroAtivo: TipoFiltro
  onAlterarFiltro: (filtro: TipoFiltro) => void
  totalAtivas: number
}

/**
 * Componente de filtros para visualização de tarefas
 */
export const FiltroTarefas = ({
  filtroAtivo,
  onAlterarFiltro,
  totalAtivas,
}: FiltroTarefasProps) => {
  const filtros: { valor: TipoFiltro; label: string }[] = [
    { valor: 'todas', label: 'Todas' },
    { valor: 'ativas', label: 'Ativas' },
    { valor: 'concluidas', label: 'Concluídas' },
  ]

  return (
    <Box className="filtro-tarefas" data-testid="filtro-tarefas">
      <Box className="filtro-tarefas__header">
        <Typography variant="h6" component="h3">
          Filtrar Tarefas
        </Typography>
        <Chip
          label={`${totalAtivas} ativa${totalAtivas !== 1 ? 's' : ''}`}
          color="primary"
          size="small"
          data-testid="contador-ativas"
        />
      </Box>

      <ButtonGroup
        variant="outlined"
        fullWidth
        aria-label="Filtros de tarefas"
        className="filtro-tarefas__buttons"
      >
        {filtros.map((filtro) => (
          <Button
            key={filtro.valor}
            onClick={() => onAlterarFiltro(filtro.valor)}
            variant={filtroAtivo === filtro.valor ? 'contained' : 'outlined'}
            data-testid={`filtro-${filtro.valor}`}
            aria-pressed={filtroAtivo === filtro.valor}
            aria-label={`Filtrar por tarefas ${filtro.label.toLowerCase()}`}
          >
            {filtro.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  )
}
