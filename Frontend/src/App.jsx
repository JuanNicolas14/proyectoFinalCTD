import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './Componentes/Header'
import './index.css'
import Home from './Vistas/Home'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
