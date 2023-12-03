import { useState, useEffect } from "react";
import Title from "../components/Title";
import  Axios  from "axios";
import { Link } from "react-router-dom";


type Producto = {
  id: number;
  nombre: string;
};

const ProductosNoVendidos = () => {

  
  const [productos, setProductos] = useState<Array<Producto>>([]);

  const getProductos = async()=>{

    const { data } = await Axios("http://localhost:3001/productosnovendidos");

    const productosApi = data[0].map((producto:any) => ({
      id: producto.ID,
      nombre: producto.Nombre,
    }));
    setProductos(productosApi);
  }

  useEffect(()=>{
    getProductos();
  },[]);

  return (
    <>
      <Title title="Productos sin ventas" />
      <Link 
            className="bg-cyan-500 py-2 px-4 rounded text-white uppercase font-bold mb-10 hover:bg-cyan-700 md:w-auto" to="/admin/productos">
            Regresar
          </Link>
      <table className="min-w-full mt-10">
        <thead className="bg-gray-100 ">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Id
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Nombre Producto
            </th>         
          </tr>
        </thead>
        <tbody id="listado-productos" className="bg-white">
           {productos.map((producto) => (
            <tr key={producto.id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {producto.id}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {producto.nombre}
              </td>
            </tr>
          ))} 
        </tbody>
      </table>
    </>
  );
};

export default ProductosNoVendidos;