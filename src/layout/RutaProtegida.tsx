import { Outlet } from "react-router-dom";
//import useAuth from "../hooks/useAuth";
import Sidebar from "../components/SideBar";

const RutaProtegida = () => {
  
  //verificamos si el admin esta autenticado
  //const { auth, cargando } = useAuth();
  //if(cargando) return 'cargando....';

  return (

    <>     
        <div className="md:flex min-h-screen md:align-top">
          <Sidebar/>
          <main className ="md:w-3/5  xl:w-4/5 px-5 py-10 bg-gray-200">
            
            {/* <h2 className ="text-3xl font-light text-center">Compras</h2> */}

            <div className ="flex flex-col mt-10">
                <div className ="py-2 overflow-x-auto">
                  <div className ="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                  <Outlet/>
                  </div>
                </div>
              </div>
        </main>
          
        </div>
      
      {/* si hay algun usuario muestra el Outlet sino lo envia a iniciar sesion */}
      {/* { auth?._id ? <Outlet/> : <Navigate to="/"/>} */}
    </>
    
  ) 
}

export default RutaProtegida