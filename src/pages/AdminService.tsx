import { useState, useEffect } from "react";
import Title from "../components/Title";
import Axios from "axios";
import Swal from 'sweetalert2';
import ModalService from '../components/ModalService';
import { v4 as uuidv4 } from 'uuid';

type Servicio = {
  id:number;
  placa:string;
  serId:number;
  cedula:string;
  facId:number;
  precio:number;
  cantidad:number
};


const AdminService = () => {


  const [servicios, setServicios] = useState<Array<Servicio>>([]);
  const [selectedServicio, setselectedServicio] = useState<Servicio | null>(null);
  const [editar, setEditar] = useState(false);

  const eliminarServicio = async(id: number | null) => {
    if(id == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'det_id is null',
      });
      return;
    }

    try {
      await Axios.delete(`http://localhost:3001/deleteservice/${id}`);
      getServices();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Servicio eliminado correctamente",
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

  const editarServicio = (servicio: Servicio) => {
    setEditar(true);
    setselectedServicio(servicio);
  }


  //obtenemos los servicios de la BD
  const getServices = async()=>{
    const { data } = await Axios("http://localhost:3001/servicios");
    

    const serviciosApi = data[0].map((servicio:any) => ({
      id:servicio.det_id,
      placa:servicio.veh_placa,
      serId:servicio.ser_id,
      cedula:servicio.emp_cedula,
      facId: servicio.fac_id,
      precio: servicio.det_precio_servicio,
      cantidad: servicio.det_cantidad
    }));
    setServicios(serviciosApi);

  }



  useEffect(()=>{
    getServices();
  },[]);


  return (
    <>
      <Title title="Agrega tus servicios Aqui" />
      <ModalService
      editar={editar} 
      selectedService={selectedServicio}
      setEditar={ setEditar} 
      getServices={ getServices }
      
      />
      <table className="min-w-full">
        <thead className="bg-gray-100 ">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Id</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Servicio id</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Factura id</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Placa</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Cedula Empleado</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Precio</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Cantidad</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody id="listado-ventas" className="bg-white">
          {servicios.map((servicio) => (
            <tr key={uuidv4()}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{servicio.id}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{servicio.serId}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{servicio.facId}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{servicio.placa}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{servicio.cedula}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{servicio.precio}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{servicio.cantidad}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <button className="text-white bg-cyan-500 hover:bg-cyan-700 px-3 py-2 rounded-md text-sm font-medium mr-5" onClick={() => editarServicio(servicio)}
                >
                  Editar
                </button>
                <button className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium mr-5" 
                    onClick={() => eliminarServicio(servicio.id)}
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

export default AdminService;
