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
import RegistrarUsuario from './Componentes/RegistrarUsuario/RegistrarUsuario'
import ListaPorPlan from './Vistas/ListaPorPlan/ListaPorPlan'
import AgregarPlan from './Vistas/AgregarPlan/AgregarPlan'
import Login from './Vistas/Login/Login'
import DetalleUser from './Vistas/DetalleUser/DetalleUser'
import AuthContextProvider from './utils/AuthContext'
import FilterContextProvider from './utils/FilterContext'
import ListaPorFiltros from './Vistas/ListaPorFiltros/ListaPorFiltros'
import ValidarUsuario from './Vistas/ValidarUsuario/ValidarUsuario'
import ListaFavoritos from "./Vistas/ListaFavoritos/ListaFavoritos";

function App() {
  return (
    <AuthContextProvider>
      <FilterContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restaurantes" element={<Listado />} />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/restaurantes" element={<Listado />} />
          <Route path="/restaurantes/:plan" element={<ListaPorPlan />} />
          <Route path="/administracion" element={<Administracion />} />
          <Route
            path="/administracion/agregarProducto"
            element={<AgregarProducto />}
          />
          <Route
            path="/administracion/eliminarProducto"
            element={<EliminarProducto />}
          />
          <Route path="/usuario/detalle" element={<DetalleUser />} />
          <Route path="/usuario/registrar" element={<RegistrarUsuario />} />
          <Route path="/usuario/validar/:id" element={<ValidarUsuario />} />
          <Route path="/plan/registrar" element={<AgregarPlan />} />
          <Route
            path="/restaurantes/ciudad-y-plan"
            element={<ListaPorFiltros />}
          />
          <Route path="/favoritos/:id" element={<ListaFavoritos />} />
        </Routes>
        <Footer />
      </FilterContextProvider>
    </AuthContextProvider>
  );
}

export default App
