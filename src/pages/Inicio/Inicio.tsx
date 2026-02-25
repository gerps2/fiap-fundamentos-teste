import { Container, Typography, Box, Divider } from '@mui/material'
import { FormularioTarefa } from '../../components/secoes/FormularioTarefa/FormularioTarefa'
import { FiltroTarefas } from '../../components/secoes/FiltroTarefas/FiltroTarefas'
import { ListaTarefas } from '../../components/secoes/ListaTarefas/ListaTarefas'
import { useTarefas } from '../../hooks/useTarefas'
import './Inicio.css'

/**
 * Página principal da aplicação de gerenciamento de tarefas
 */
export const Inicio = () => {
  const {
    tarefasFiltradas,
    filtroAtivo,
    totalTarefasAtivas,
    adicionarTarefa,
    removerTarefa,
    alternarConclusao,
    alterarFiltro,
  } = useTarefas()

  return (
    <Container maxWidth="md" className="pagina-inicio">
      <Box className="pagina-inicio__header">
        <Typography variant="h3" component="h1" gutterBottom>
          📝 Gerenciador de Tarefas
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Organize suas tarefas de forma simples e eficiente
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <FormularioTarefa onAdicionar={adicionarTarefa} />

      <FiltroTarefas
        filtroAtivo={filtroAtivo}
        onAlterarFiltro={alterarFiltro}
        totalAtivas={totalTarefasAtivas}
      />

      <ListaTarefas
        tarefas={tarefasFiltradas}
        onAlternarConclusao={alternarConclusao}
        onRemover={removerTarefa}
      />
    </Container>
  )
}
