
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';

//Rutas del login
import Login from './pages/Login';

//Rutas protegidas
import AdminVentas from './pages/AdminVentas';
import AdminClientes from './pages/AdminClientes';
import AdminProductos from './pages/AdminProductos';
import AdminEmpleados from './pages/AdminEmpleados';
import AdminVehiculos from './pages/AdminVehiculos';

//views
import AdminRegVentas from './pages/AdminRegVentas';
import AdminRegServices from './pages/AdminRegServices';
import ProductosNoVendidos from './pages/ProductosNoVendidos';
import ClientesFrecuentes from './pages/ClientesFrecuentes';

import { AuthProvider } from './context/AuthProvider';



/**Creamos las rutas o paginas que va tener la app */
function App() {
 
  return (

    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route path='/' element = {<AuthLayout/>}>
              <Route index element= {<Login />}/>
            </Route>

            <Route path="/admin" element={<RutaProtegida/>}>
              <Route index element = {<AdminVentas/>}/>
              <Route path="productos" element = {<AdminProductos/>}/>
              <Route path="clientes" element = {<AdminClientes/>}/>
              <Route path="vehiculos" element = {<AdminVehiculos/>}/>
              <Route path="empleados" element = {<AdminEmpleados/>}/>
              <Route path="ventasproductos" element = {<AdminRegVentas/>}/>
              <Route path="serviciosrealizados" element = {<AdminRegServices/>}/>
              <Route path="productosnovendidos" element = {<ProductosNoVendidos/>}/>
              <Route path="clientesfrecuentes" element = {<ClientesFrecuentes/>}/>
            </Route>


          </Routes>
      </AuthProvider> 
    </BrowserRouter>
  ) 
}

export default App;
