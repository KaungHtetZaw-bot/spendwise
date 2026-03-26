import './App.css'
import MainLayout from './components/layouts/MainLayout'
import MainPage from './pages/MainPage'
import { ThemeProvider } from './providers/ThemeProvider'

function App() {

  return (
    <>
      <ThemeProvider>
        <MainLayout>
          <MainPage />
        </MainLayout>
      </ThemeProvider>
    </>
  )
}

export default App
