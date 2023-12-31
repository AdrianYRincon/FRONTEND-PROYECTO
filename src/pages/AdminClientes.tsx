import { useState, useEffect } from "react";
import Title from "../components/Title"
import ModalClients from "../components/ModalClients";
import  Axios  from "axios";
import Swal from "sweetalert2";

type Cliente = {
  cedula:string;
  nombre:string;
  apellido:string;
  email:string;
  telefono:string;

}

const AdminClientes = () => {

    const [clientes, setClientes] = useState<Array<Cliente>>([]);
    const [selectedClient, setSelectClient] = useState<Cliente | null>(null);
    const [editar,setEditar] = useState(false);
    const [cedulaBuscar, setCedulaBuscar] = useState("");

    const eliminarCliente = async(cedula: string) => {

      
    try {
      await Axios.delete(`http://localhost:3001/deleteclient/${cedula}`);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto Eliminado correctamente",
        showConfirmButton: false,
        timer: 2000
      });
      getClients();
      
    } catch (error:any) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data,
      });
    }
    
    };

    const editarCliente = (cliente: Cliente) => {
      setEditar(true);
      setSelectClient(cliente);
    }
  
  
    //obtenemos los clientes de la BD
    const getClients = async()=>{
      const { data } = await Axios("http://localhost:3001/clientes");
  
      const clientesApi = data[0].map((cliente:any) => ({
        cedula:cliente.cli_cedula,
        nombre:cliente.cli_nombre,
        apellido:cliente.cli_apellido,
        email:cliente.cli_email,
        telefono:cliente.cli_telefono,
      }));
      setClientes(clientesApi);
    }

    const buscarClientePorCedula = async () => {
      
      try {
        const { data } = await Axios.get(
          `http://localhost:3001/getclient/${cedulaBuscar}`
        );

        const clienteEncontrado: Cliente = {
          cedula: data[0][0].cli_cedula,
          nombre: data[0][0].cli_nombre,
          apellido: data[0][0].cli_apellido,
          email: data[0][0].cli_email,
          telefono: data[0][0].cli_telefono,
        };
        

        setClientes([clienteEncontrado]);
        // getClients();
      } catch (error: any) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Cliente no encontrado",
        });
      }
    };

    const limpiarBusqueda = () => {
      getClients();
      setCedulaBuscar("");
    };
  
    useEffect(()=>{
      getClients();
    },[]);

  return (
    <>
      <Title title = "Clientes"/>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Buscar por cédula"
          className="border rounded-l py-2 px-4"
          value={cedulaBuscar}
          onChange={(e) => setCedulaBuscar(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-r"
          onClick={buscarClientePorCedula}
        >
          Buscar
        </button>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-r ml-2"
          onClick={limpiarBusqueda}
        >
          Refresh
        </button>
      </div>
      <ModalClients
        editar = {editar}
        selectedClient={ selectedClient}
        setEditar={ setEditar}
        getClientes={ getClients}
      />
      <table className ="min-w-full">
          <thead className ="bg-gray-100 ">
            <tr>
                <th className ="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        Cédula
                </th>
                <th className ="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        Nombre
                </th>
                <th className ="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        Apellido
                </th>
                <th className ="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        Email
                </th>
                <th className ="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        Telefono
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Acciones
                </th>
            </tr>
          </thead>
          <tbody id="listado-clientes" className="bg-white">
          {clientes.map((cliente) => (  
            <tr key={cliente.cedula}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {cliente.cedula}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {cliente.nombre}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {cliente.apellido}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {cliente.email}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {cliente.telefono}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <button className="text-white bg-cyan-500 hover:bg-cyan-700 px-3 py-2 rounded-md text-sm font-medium mr-5" onClick={() => editarCliente(cliente)}
                >
                  Editar
                </button>
                <button className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium mr-5" 
                onClick={ () => eliminarCliente(cliente.cedula)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
            ))}
        </tbody>
          
      </table>
    </>
  )
}

export default AdminClientes;