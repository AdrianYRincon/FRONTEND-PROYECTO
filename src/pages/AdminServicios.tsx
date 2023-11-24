
import { useState } from 'react';
import Title from '../components/Title';
import ModalService from '../components/ModalService';

type Service = {
  placa: string;
  tipo: string;
  empleado: string;
  precio: number;
};

const AdminServicios = () => {
  const [serviciosQueue, setServiciosQueue] = useState<Array<Service>>([]);
  const [currentService, setCurrentService] = useState<Service | null>(null);

  const enqueueService = (servicio: Service) => {
    setServiciosQueue((prevQueue) => [...prevQueue, servicio]);

    if (!currentService) {
      setCurrentService(servicio);
    }
  };

  const dequeueService = () => {

    setServiciosQueue((prevQueue) => prevQueue.slice(1));

    const nextService = serviciosQueue[0] || null;
    setCurrentService(nextService);
    console.log(serviciosQueue.length)
  };

  return (
    <>
      <Title title="Servicios en curso" />
      <div className='flex justify-between flex-col md:flex-row'>
      <ModalService enqueueService={enqueueService} />
      <button
        className="bg-indigo-700 w-full py-2 px-4 rounded text-white uppercase font-bold mb-5 hover:bg-indigo-800 md:w-auto cursor-pointer"
        onClick={dequeueService}
        disabled={serviciosQueue.length === 0}
      >
        Servicio Completado
      </button>
      </div>
      
      <table className="min-w-full">
      <thead className="bg-gray-100 ">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Placa</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Tipo Servicio</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Nombre empleado</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Precio</th>
          </tr>
        </thead>
        {serviciosQueue.map((servicio, index) => (
        <tbody  >
            <tr key={servicio.placa} className={`bg-white ${currentService && index === 0 ? 'bg-sky-500' : ''}`}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {servicio.placa}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {servicio.tipo}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {servicio.empleado}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {servicio.precio}
              </td>
            </tr>
        </tbody>
        ))}
      </table>
    </>
  );
};

export default AdminServicios;
