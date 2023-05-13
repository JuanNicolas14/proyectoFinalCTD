import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './Componentes/Header/Header'
import './index.css'
import Home from './Vistas/Home'
import Footer from './Componentes/Footer/Footer'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
