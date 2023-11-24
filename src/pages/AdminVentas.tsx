import { useState } from "react";
import Title from "../components/Title";
import ModalVentas from "../components/ModalVentas";


type Venta = {
  id: number;
  nombreProducto: string;
  precio: number;
  cantidad: number;
  fechaVenta: string;
};

const AdminVentas = () => {

  
  const [ventas, setVentas] = useState<Array<Venta>>([]);

  const agregarVenta = (venta: Venta) => {
    setVentas((prevVentas) => [...prevVentas, venta]);
  };

  const eliminarVenta = (id: number) => {
    setVentas((prevVentas) => prevVentas.filter((venta) => venta.id !== id));
  };


  return (
    <>
      <Title title="Ventas" />
      <ModalVentas agregarVenta={agregarVenta} />
      <table className="min-w-full">
        <thead className="bg-gray-100 ">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Nombre Producto
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Cantidad
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Fecha Venta
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody id="listado-ventas" className="bg-white">
          {ventas.map((venta) => (
            <tr key={venta.id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {venta.nombreProducto}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {venta.precio}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {venta.cantidad}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {venta.fechaVenta}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <button className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium mr-5" 
                    onClick={() => eliminarVenta(venta.id)}
                >
                  Eliminar
                </button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminVentas;