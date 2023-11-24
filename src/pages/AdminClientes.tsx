import { useState } from "react";
import Title from "../components/Title"
import ModalClients from "../components/ModalClients";


type Cliente = {
  cedula:string;
  nombre:string;
  apellido:string;
  email:string;
  telefono:string;

}


const AdminClientes = () => {

    const [clientes, setClientes] = useState<Array<Cliente>>([]);

    const addCliente = (cliente:Cliente)=> {

      setClientes(prevClientes => [...prevClientes, cliente]);

    }

    const eliminarCliente = (cedula: string) => {
      setClientes((prevCliente) => prevCliente.filter((cliente) => cliente.cedula !== cedula));
    };



  return (
    <>
      <Title title = "Clientes"/>
      <ModalClients addCliente={addCliente}/>
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
                {cliente.nombre}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {cliente.apellido}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {cliente.cedula}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {cliente.email}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {cliente.telefono}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <button className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium mr-5" 
                    onClick={() => eliminarCliente(cliente.cedula)}
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