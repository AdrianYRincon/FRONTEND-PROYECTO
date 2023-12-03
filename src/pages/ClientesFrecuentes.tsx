import { useState, useEffect } from "react";
import Title from "../components/Title";
import  Axios  from "axios";
import { Link } from "react-router-dom";


type Cliente = {
  cedula:string;
  nombre:string;
  apellido:string;
  numeroCompras:string
};

const ClientesFrecuentes = () => {

  
  const [clientes, setClientes] = useState<Array<Cliente>>([]);

  const getClientes = async()=>{

    const { data } = await Axios("http://localhost:3001/clientesfrecuentes");

    const ClientesApi = data[0].map((cliente:any) => ({
      cedula:cliente.Cedula,
      nombre:cliente.Nombre_cliente,
      apellido:cliente.Apellido_cliente,
      numeroCompras:cliente.NumeroCompras
    }));
    setClientes(ClientesApi);
  }

  useEffect(()=>{
    getClientes();
  },[]);

  return (
    <>
      <Title title="Productos sin ventas" />
      <Link 
            className="bg-cyan-500 py-2 px-4 rounded text-white uppercase font-bold mb-10 hover:bg-cyan-700 md:w-auto" to="/admin/clientes">
            Regresar
          </Link>
      <table className="min-w-full mt-10">
        <thead className="bg-gray-100 ">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Cedula
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Nombre
            </th>         
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Apellido
            </th>         
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Número de compras
            </th>         
          </tr>
        </thead>
        <tbody id="listado-productos" className="bg-white">
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
                {cliente.numeroCompras}
              </td>
            </tr>
          ))} 
        </tbody>
      </table>
    </>
  );
};

export default ClientesFrecuentes;