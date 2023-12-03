import { useState, useEffect } from "react";
import Title from "../components/Title";
import  Axios  from "axios";
import { v4 as uuidv4 } from 'uuid';

type Venta = {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  fechaVenta: string;
};

const AdminRegVentas = () => {

  
  const [ventas, setVentas] = useState<Array<Venta>>([]);
  const [totalGanancias, setTotalGanancias] = useState<number>(0);

  const getVentasProductos = async()=>{
    const { data } = await Axios("http://localhost:3001/ventasproductos");

    const ventasApi = data[0].map((producto:any) => ({
      id: producto.Id,
      nombre: producto.Nombre,
      cantidad:producto.Cantidad,
      precio:producto.Total,
      fechaVenta:producto.Fecha
    }));
    setVentas(ventasApi);


  }

  const getTotalProductos = async()=>{
    const { data } = await Axios("http://localhost:3001/totalproductos");

    const [ {totalVentas} ] = data[0];

    setTotalGanancias(totalVentas);

  }


  useEffect(()=>{
    getVentasProductos();
    getTotalProductos();
  },[]);

  return (
    <>
      <Title title="Registro de productos vendidos" />
      <h2 className="text-3xl text-green-600 font-bold mb-4">
        Total Ventas: ${totalGanancias}
      </h2>
      <table className="min-w-full">
        <thead className="bg-gray-100 ">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Id
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Nombre Producto
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Cantidad
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              precio total
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Fecha venta
            </th>
          </tr>
        </thead>
        <tbody id="listado-ventas" className="bg-white">
           {ventas.map((venta) => (
            <tr key={uuidv4()}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {venta.id}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {venta.nombre}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {venta.cantidad}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {venta.precio}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {venta.fechaVenta.split('T')[0]}
              </td>
            </tr>
          ))} 
        </tbody>
      </table>
    </>
  );
};

export default AdminRegVentas;