import { useState } from "react";
import Title from "../components/Title";
import ModalProduct from "../components/ModalProduct";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
};

const AdminProductos = () => {
  const [productos, setProductos] = useState<Array<Producto>>([]);

  const agregarProducto = (producto: Producto) => {
    setProductos((prevProductos) => [...prevProductos, producto]);
  };

  const eliminarProducto = (id: number) => {
    setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== id));
  };


  return (
    <>
      <Title title="Productos" />
      <ModalProduct agregarProducto={agregarProducto} />
      <table className="min-w-full">
        <thead className="bg-gray-100 ">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">id</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Precio</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Cantidad</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody id="listado-productos" className="bg-white">
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{producto.id}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{producto.nombre}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{producto.precio}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{producto.cantidad}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <button className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium mr-5" 
                    onClick={() => eliminarProducto(producto.id)}
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

export default AdminProductos;
