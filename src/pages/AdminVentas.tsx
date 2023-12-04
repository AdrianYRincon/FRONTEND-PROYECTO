import { useState, useEffect } from "react";
import Title from "../components/Title";
import Axios from "axios";
import Swal from 'sweetalert2';
import ModalVenta from "../components/ModalVenta";
import { v4 as uuidv4 } from 'uuid';

type Venta = {
  det_id: number;
  fac_id: number;
  pro_id: number;
  precio: number;
  cantidad: number;
};
const AdminVentas = () => {


  const [ventas, setVentas] = useState<Array<Venta>>([]);
  const [selectedVenta, setselectedVenta] = useState<Venta | null>(null);
  const [editar, setEditar] = useState(false);

  const eliminarVenta = async(id: number | null) => {
    if(id == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'det_is is null',
      });
      return;
    }

    try {
      await Axios.delete(`http://localhost:3001/deleteventa/${id}`);
      getVentas();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Venta Eliminada correctamente",
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

  const editarVenta = (venta: Venta) => {
    setEditar(true);
    setselectedVenta(venta);
  }


  //obtenemos los ventas de la BD
  const getVentas = async()=>{
    const { data } = await Axios("http://localhost:3001/ventas");

    const ventasApi = data[0].map((venta:any) => ({
      det_id:venta.det_id,
      fac_id: venta.fac_id,
      pro_id: venta.pro_id,
      precio: venta.det_precio_unitario,
      cantidad: venta.det_cantidad,
    }));
    setVentas(ventasApi);
  }



  useEffect(()=>{
    getVentas();
  },[]);


  return (
    <>
      <Title title="Agrega tus ventas Aqui" />
      <ModalVenta 
        editar={editar} 
        selectedVenta={selectedVenta}
        setEditar={ setEditar} 
        getVentas={ getVentas }
      />
      <table className="min-w-full">
        <thead className="bg-gray-100 ">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">det id</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">factura id</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">producto id</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Precio</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Cantidad</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody id="listado-ventas" className="bg-white">
          {ventas.map((venta) => (
            <tr key={uuidv4()}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{venta.det_id}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{venta.fac_id}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{venta.pro_id}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{venta.precio}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{venta.cantidad}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <button className="text-white bg-cyan-500 hover:bg-cyan-700 px-3 py-2 rounded-md text-sm font-medium mr-5" onClick={() => editarVenta(venta)}
                >
                  Editar
                </button>
                <button className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium mr-5" 
                    onClick={() => eliminarVenta(venta.det_id)}
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
