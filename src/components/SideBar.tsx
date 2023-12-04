import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="md:w-2/5 lg:w-2/5 xl:w-1/5 bg-indigo-800 px-5 py-10">
      <h1 className="uppercase text-white tracking-wide text-2xl  font-bold mt-2">UN MECÁNICO</h1>
      <p className="mt-10 text-white">Administra tu Negocio</p>
      <nav className="mt-8">

          <Link 
            className="px-3 py-4 text-white block hover:bg-slate-500 mt-2 focus:bg-slate-500"
            to="/admin/productos">
            Productos
          </Link>
          <Link 
            className="px-3 py-4 text-white block hover:bg-slate-500 mt-2 focus:bg-slate-500"
            to="/admin/clientes">
            Clientes
          </Link>
          <Link 
            className="px-3 py-4 text-white block hover:bg-slate-500 mt-2 focus:bg-slate-500"
            to="/admin/vehiculos">
            Vehiculos
          </Link>
          <Link 
            className="px-3 py-4 text-white block hover:bg-slate-500 mt-2 focus:bg-slate-500"
            to="/admin/empleados">
            Empleado
          </Link>
          <Link 
            className="px-3 py-4 text-white block hover:bg-slate-500 focus:bg-slate-500"
            to='/admin'>
            Administra Ventas
          </Link>
          <Link 
            className="px-3 py-4 text-white block hover:bg-slate-500 focus:bg-slate-500"
            to='/admin/ventasservicios'>
            Administra Servicios
          </Link>
          <Link 
            className="px-3 py-4 text-white block hover:bg-slate-500 focus:bg-slate-500"
            to="/admin/ventasproductos">
            Registro Ventas Productos
          </Link>
          <Link 
            className="px-3 py-4 text-white block hover:bg-slate-500 focus:bg-slate-500"
            to="/admin/serviciosrealizados">
            Registro Servicios Realizados
          </Link>
          <Link 
            className="px-3 py-4 text-white block hover:bg-slate-500 focus:bg-slate-500"
            to="/">
            Cerrar sesión
          </Link>
      </nav>
    </aside>
  )
}

export default Sidebar;