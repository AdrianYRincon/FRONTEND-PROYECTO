import { useState, useEffect } from "react";
import Title from "../components/Title";
import ModalProduct from "../components/ModalProduct";
import Axios from "axios";
import Swal from 'sweetalert2';


type Producto = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
};

const AdminProductos = () => {


  const [productos, setProductos] = useState<Array<Producto>>([]);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [editar, setEditar] = useState(false);

  const eliminarProducto = async(id: number) => {

    try {
      await Axios.delete(`http://localhost:3001/delete/${id}`);
      getProducts();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto Eliminado correctamente",
        showConfirmButton: false,
        timer: 2000
      });
      
    } catch (error:any) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data,
      });
    }
    
  };

  const editarProducto = (producto: Producto) => {
    setEditar(true);
    setSelectedProduct(producto);
  }


  //obtenemos los productos de la BD
  const getProducts = async()=>{
    const { data } = await Axios("http://localhost:3001/productos");

    const productosApi = data[0].map((producto:any) => ({
      id: producto.pro_id,
      nombre: producto.pro_nombre,
      precio: producto.pro_precio,
      cantidad: producto.pro_cantidad,
    }));
    setProductos(productosApi);
  }

  useEffect(()=>{
    getProducts();
  },[]);


  return (
    <>
      <Title title="Productos" />
      <ModalProduct 
        editar={editar} 
        selectedProduct={selectedProduct} 
        setEditar={ setEditar} 
        getProducts={getProducts} 
      />
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
                <button className="text-white bg-cyan-500 hover:bg-cyan-700 px-3 py-2 rounded-md text-sm font-medium mr-5" onClick={() => editarProducto(producto)}
                >
                  Editar
                </button>
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
