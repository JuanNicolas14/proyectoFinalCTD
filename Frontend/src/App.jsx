import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './Componentes/Header/Header'
import './index.css'
import Home from './Vistas/Home'
import Footer from './Componentes/Footer/Footer'
import Detalle from './Vistas/Detalle/Detalle'
import Listado from './Vistas/Listado'
import Administracion from './Vistas/Administracion'
import AgregarProducto from './Vistas/AgregarProducto/AgregarProducto'
import EliminarProducto from './Vistas/EliminarProducto/EliminarProducto'
import ListaPorPlan from './Vistas/ListaPorPlan/ListaPorPlan'
import AgregarPlan from './Vistas/AgregarPlan/AgregarPlan'
import Login from './Vistas/Login/login'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/restaurantes" element={<Listado />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/restaurantes" element={<Listado />} />
        <Route path="/restaurantes/:plan" element={<ListaPorPlan />} />
        <Route path="/administracion" element={<Administracion />} />
        <Route path="/administracion/agregarProducto" element={<AgregarProducto />} />
        <Route path="/administracion/eliminarProducto" element={<EliminarProducto />} />
        <Route path="/plan/registrar" element={<AgregarPlan />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App
