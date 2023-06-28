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
import GestionRol from './Vistas/GestionRol/GestionRol'
import AgregarRol from './Vistas/AgregarRol/AgregarRol'
import EditarRol from './Vistas/EditarRol/EditarRol'
import GestionUsuario from './Vistas/GestionUsuario/GestionUsuario'
import EditarUsuario from './Vistas/EditarUsuario/EditarUsuario'
import GestionCiudades from './Vistas/GestionCiudades/GestionCiudades'
import EditarCiudad from './Vistas/EditarCiudad/EditarCiudad'
import AgregarCiudad from './Vistas/AgregarCiudad/AgregarCiudad'
import Reserva from './Vistas/Reserva/Reserva'
import GestionPlan from './Vistas/GestionPlan/GestionPlan'
import EditarPlan from './Vistas/EditarPlan/EditarPlan'
import ReservaContextProvider from './utils/ReservaContext'
import ReservaExitosa from './Vistas/ReservaExitosa/ReservaExitosa'
import ReservaHistorial from './Vistas/ReservaHistorial/ReservaHistorial'

function App() {
  return (
    <AuthContextProvider>
    <ReservaContextProvider>
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
          <Route path='/restaurantes/ciudad-y-plan' element={<ListaPorFiltros/>}/>
          <Route path='/administracion/gestionRol' element={<GestionRol/>}/>
          <Route path='/administracion/agregarRol' element={<AgregarRol/>}/>
          <Route path='/administracion/editarRol/:id' element={<EditarRol/>}/>
          <Route path='/administracion/gestionUsuario' element={<GestionUsuario/>}/>
          <Route path='/administracion/editarUsuario/:id' element={<EditarUsuario/>}/>
          <Route path='/administracion/agregarCiudad' element={<AgregarCiudad/>}/>
          <Route path="/administracion/gestionCiudad" element={<GestionCiudades/>} />
          <Route path='/administracion/editarCiudad/:id' element={<EditarCiudad/>}/>
          <Route path="/administracion/gestionPlan" element={<GestionPlan/>}/>
          <Route path='/administracion/editarPlan/:id' element={<EditarPlan/>}/>
          <Route path='/reserva' element={<Reserva />} />
          <Route path='/reserva/exito' element={<ReservaExitosa/>} />
          <Route path='/reserva/historial' element={<ReservaHistorial/>} />
        </Routes>
        <Footer />
      </FilterContextProvider>
      </ReservaContextProvider>
    </AuthContextProvider>
  );
}

export default App
