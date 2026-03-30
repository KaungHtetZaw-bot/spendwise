import './App.css'
import { ThemeProvider } from './providers/ThemeProvider'
import AppRoute from './routes/AppRoute'


function App() {

  return (
    <>
      <ThemeProvider>
        <AppRoute/>
      </ThemeProvider>
    </>
  )
}

export default App
