import { useState } from "react";
import Alerta from "./Alerta";


type Service = {
  placa:string;
  tipo:string;
  empleado:string;
  precio:number;

} 
const ModalService = ({ enqueueService }: { enqueueService: (servicio: Service) => void }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [placa, setPlaca] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");
  const [empleado, setEmpleado] = useState<string>("");
  const [precio, setPrecio] = useState<number>(0);


  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });



  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([placa, tipo, empleado].includes('') || precio === 0) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    setAlerta({
      msg: '',
      error: false,
    });

    // Crear un objeto con la información del servicio
    const nuevoServicio = {
      placa,
      tipo,
      empleado,
      precio,
    };

    // Llamar a la función de callback del componente padre (AdminServicios)
    enqueueService(nuevoServicio);

    setIsOpen(false);
  };


  const { msg } = alerta;

  return (
    <>
      <button
        className="bg-indigo-700 w-full py-2 px-4 rounded text-white uppercase font-bold mb-5 hover:bg-indigo-800 md:w-auto"
        onClick={() => setIsOpen(true)}
      >
        Nuevo Servicio
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white p-6 md:py-18 rounded shadow-lg flex flex-col justify-center items-center gap-5 w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            {msg && <Alerta alerta={alerta} />}
            <form onSubmit={handleSubmit} className="w-full">
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">
                  Placa Vehiculo
                </label>
                <input
                  type="text"
                  placeholder="placa vehiculo"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">
                  Tipo Servicio
                </label>
                <input
                  type="text"
                  placeholder="tipo del servicio"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">
                  Empleado
                </label>
                <input
                  type="text"
                  placeholder="Cedula Empleado"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={empleado}
                  onChange={(e) => setEmpleado(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">
                  Precio
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="precio"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={precio}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                />
              </div>

              <input
                type="submit"
                value="Agregar"
                className="bg-indigo-700 w-full py-2 px-2 rounded text-white uppercase font-bold mt-5 hover:bg-indigo-800 cursor-pointer"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalService;
