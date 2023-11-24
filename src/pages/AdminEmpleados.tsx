import { useState } from "react";
import Title from "../components/Title";
import ModalEmpleados from "../components/ModalEmpleados";

type Empleado = {
  cedula: string;
  nombre: string;
  apellido: string;
  sueldo: number;
};

const AdminEmpleados = () => {
  const [empleados, setEmpleados] = useState<Array<Empleado>>([]);

  const agregarEmpleado = (empleado: Empleado) => {
    setEmpleados((prevEmpleados) => [...prevEmpleados, empleado]);
  };

  const eliminarEmpleado = (cedula:string) => {
    setEmpleados((prevEmpleados) => prevEmpleados.filter((empleado) => empleado.cedula !== cedula));
  };

  return (
    <>
      <Title title="Empleados" />
      <ModalEmpleados agregarEmpleado={agregarEmpleado} />
      <table className="min-w-full">
        <thead className="bg-gray-100 ">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Cédula
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Apellido
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Sueldo
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody id="listado-empleados" className="bg-white">
          {empleados.map((empleado) => (
            <tr key={empleado.cedula}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{empleado.cedula}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{empleado.nombre}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{empleado.apellido}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{empleado.sueldo}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <button className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium mr-5" 
                    onClick={() => eliminarEmpleado(empleado.cedula)}
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

export default AdminEmpleados;