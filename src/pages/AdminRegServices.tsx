import { useState, useEffect } from "react";
import Title from "../components/Title";
import  Axios  from "axios";
import { v4 as uuidv4 } from 'uuid';

type Servicio = {
  id: number;
  nombre: string;
  empleado: string;
  precio: number;
  fechaServicio: string;
};

const AdminRegServices = () => {
  const [servicios, setServicios] = useState<Array<Servicio>>([]);
  const [totalGanancias, setTotalGanancias] = useState<number>(0);

  const getServicios = async()=>{
    const { data } = await Axios("http://localhost:3001/serviciosrealizados");

    const serviciosApi = data[0].map((servicio:any) => ({
      id: servicio.Id,
      nombre: servicio.Nombre,
      empleado:servicio.Empleado,
      precio:servicio.Precio,
      fechaServicio:servicio.Fecha
    }));

    setServicios(serviciosApi);
  }

  const getTotalServicios = async()=>{
    const { data } = await Axios("http://localhost:3001/totalServicios");

    const [ {total_price} ] = data[0];

    setTotalGanancias(total_price);
  }

  useEffect(()=>{
    getServicios();
    getTotalServicios();
  },[]);

  return (
    <>
      <Title title="Servicios Realizados" />
      <h2 className="text-3xl text-green-600 font-bold mb-4">
        Total Servicios: ${totalGanancias}
      </h2>
      <table className="min-w-full">
        <thead className="bg-gray-100 ">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Id
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Tipo Servicio
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Empleado asignado
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              precio total
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Fecha Servicio
            </th>
          </tr>
        </thead>
        <tbody id="listado-Servicios" className="bg-white">
           {servicios.map((servicio) => (
            <tr key={uuidv4()}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {servicio.id}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {servicio.nombre}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {servicio.empleado}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {servicio.precio}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {servicio.fechaServicio.split('T')[0]}
              </td>
            </tr>
          ))} 
        </tbody>
      </table>
    </>
  );
};

export default AdminRegServices;
