import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Inicio } from './pages/Inicio/Inicio'
import './App.css'

// Tema customizado do Material-UI
const tema = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
})

function App() {
  return (
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <Inicio />
    </ThemeProvider>
  )
}

export default App
