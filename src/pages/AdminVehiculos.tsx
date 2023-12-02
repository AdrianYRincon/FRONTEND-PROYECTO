import { useState, useEffect } from "react";
import Title from "../components/Title";
import ModalVehiculos from "../components/ModalVehiculos";
import Axios  from "axios";
import Swal from "sweetalert2";


type Vehiculo = {
  placa: string;
  cedula: string;
  kilometraje: number;
  fechaUltimaRevision: string;
  marca: string;
};

const AdminVehiculos = () => {
  const [vehiculos, setVehiculos] = useState<Array<Vehiculo>>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehiculo| null>(null);
  const [editar, setEditar] = useState(false);


  const eliminarVehiculo = async(placa:string) => {
    try {
      await Axios.delete(`http://localhost:3001/deletevehicle/${placa}`);
      getVehicles();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Vehiculo Eliminado correctamente",
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

  const editarVehicle = (vehicle: Vehiculo) => {
    setEditar(true);
    setSelectedVehicle(vehicle);
  }

  //obtenemos los vehiculos de la BD
  const getVehicles = async()=>{
    const { data } = await Axios("http://localhost:3001/vehiculos");

    const vehiclesApi = data[0].map((vehicle:any) => ({
      placa: vehicle.veh_placa,
      cedula: vehicle.cli_cedula,
      kilometraje: vehicle.veh_kilometraje,
      fechaUltimaRevision: vehicle.veh_fecha_ultima_revision,
      marca: vehicle.veh_marca,
    }));
    setVehiculos(vehiclesApi);
  }

  useEffect(()=>{
    getVehicles();
  },[]);





  return (
    <>
      <Title title="Vehiculos" />
      <ModalVehiculos 
        editar={editar} 
        setEditar={ setEditar} 
        selectedVehicle={ selectedVehicle} 
        getVehicles={getVehicles}
      />
      <table className="min-w-full">
        <thead className="bg-gray-100 ">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Placa
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Cédula Propietario
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Kilometraje
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Marca
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Fecha Ultima Revision
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody id="listado-vehiculos" className="bg-white">
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo.placa}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {vehiculo.placa}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {vehiculo.cedula}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {vehiculo.kilometraje}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {vehiculo.marca}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {vehiculo.fechaUltimaRevision.split('T')[0]}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <button className="text-white bg-cyan-500 hover:bg-cyan-700 px-3 py-2 rounded-md text-sm font-medium mr-5" onClick={() => editarVehicle(vehiculo)}
                >
                  Editar
                </button>
                <button className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium mr-5" 
                    onClick={() => eliminarVehiculo(vehiculo.placa)}
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

export default AdminVehiculos;
