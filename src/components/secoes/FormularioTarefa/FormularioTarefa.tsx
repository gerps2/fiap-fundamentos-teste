import { useState, FormEvent } from 'react'
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Box,
  Paper,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { NovaTarefa, Prioridade } from '../../../types/tarefa'
import { validarTarefa } from '../../../utils/tarefaHelpers'
import './FormularioTarefa.css'

interface FormularioTarefaProps {
  onAdicionar: (tarefa: NovaTarefa) => void
}

/**
 * Componente de formulário para adicionar novas tarefas
 */
export const FormularioTarefa = ({ onAdicionar }: FormularioTarefaProps) => {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState<Prioridade>('media')
  const [erro, setErro] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const novaTarefa: NovaTarefa = {
      titulo,
      descricao,
      prioridade,
    }

    if (!validarTarefa(novaTarefa)) {
      setErro('Por favor, preencha todos os campos corretamente')
      return
    }

    setErro('')
    onAdicionar(novaTarefa)
    limparFormulario()
  }

  const limparFormulario = () => {
    setTitulo('')
    setDescricao('')
    setPrioridade('media')
    setErro('')
  }

  return (
    <Paper elevation={3} className="formulario-tarefa">
      <Typography variant="h6" component="h2" gutterBottom>
        Adicionar Nova Tarefa
      </Typography>

      <Box component="form" onSubmit={handleSubmit} className="formulario-tarefa__form">
        <TextField
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          fullWidth
          error={!!erro && !titulo.trim()}
          helperText={erro && !titulo.trim() ? 'Título é obrigatório' : ''}
          data-testid="input-titulo"
        />

        <TextField
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          fullWidth
          multiline
          rows={3}
          error={!!erro && !descricao.trim()}
          helperText={erro && !descricao.trim() ? 'Descrição é obrigatória' : ''}
          data-testid="input-descricao"
        />

        <FormControl fullWidth>
          <InputLabel id="prioridade-label">Prioridade</InputLabel>
          <Select
            labelId="prioridade-label"
            value={prioridade}
            label="Prioridade"
            onChange={(e) => setPrioridade(e.target.value as Prioridade)}
            data-testid="select-prioridade"
          >
            <MenuItem value="baixa">Baixa</MenuItem>
            <MenuItem value="media">Média</MenuItem>
            <MenuItem value="alta">Alta</MenuItem>
          </Select>
        </FormControl>

        {erro && (
          <Typography 
            color="error" 
            variant="body2" 
            data-testid="mensagem-erro"
            sx={{ mt: 1 }}
          >
            {erro}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          fullWidth
          data-testid="botao-adicionar"
        >
          Adicionar Tarefa
        </Button>
      </Box>
    </Paper>
  )
}
