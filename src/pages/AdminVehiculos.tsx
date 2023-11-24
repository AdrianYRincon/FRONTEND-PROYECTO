import { useState } from "react";
import Title from "../components/Title";
import ModalVehiculos from "../components/ModalVehiculos";

type Vehiculo = {
  placa: string;
  cedula: string;
  kilometraje: number;
  fechaUltimaRevision: string;
  marca: string;
};

const AdminVehiculos = () => {
  const [vehiculos, setVehiculos] = useState<Array<Vehiculo>>([]);

  const agregarVehiculo = (vehiculo: Vehiculo) => {
    setVehiculos((prevVehiculos) => [...prevVehiculos, vehiculo]);
  };

  const eliminarVehiculo = (placa:string) => {
    setVehiculos((prevProductos) => prevProductos.filter((vehiculo) => vehiculo.placa !== placa));
  };

  return (
    <>
      <Title title="Vehiculos" />
      <ModalVehiculos agregarVehiculo={agregarVehiculo} />
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
              Fecha Ultima Revision
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Marca
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
                {vehiculo.fechaUltimaRevision}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
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
