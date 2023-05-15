import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './Componentes/Header/Header'
import './index.css'
import Home from './Vistas/Home'
import Footer from './Componentes/Footer/Footer'
import Detalle from './Vistas/Detalle'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detalle/:id' element={<Detalle/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
