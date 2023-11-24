// ModalVehiculos.jsx
import { useState } from "react";
import Alerta from "./Alerta";

type Vehiculo = {
  placa: string;
  cedula: string;
  kilometraje: number;
  fechaUltimaRevision: string;
  marca: string;
};

const ModalVehiculos = ({ agregarVehiculo }: { agregarVehiculo: (vehiculo: Vehiculo) => void }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [placa, setPlaca] = useState<string>("");
  const [cedula, setCedula] = useState<string>("");
  const [kilometraje, setKilometraje] = useState<number>(0);
  const [fechaUltimaRevision, setFechaUltimaRevision] = useState<string>("");
  const [marca, setMarca] = useState<string>("");

  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([placa, cedula, fechaUltimaRevision, marca].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    setAlerta({
      msg: "",
      error: false,
    });

    const nuevoVehiculo = {
      placa,
      cedula,
      kilometraje,
      fechaUltimaRevision,
      marca,
    };

    agregarVehiculo(nuevoVehiculo);

    setIsOpen(false);
  };

  const { msg } = alerta;

  return (
    <>
      <button
        className="bg-indigo-700 w-full py-2 px-4 rounded text-white uppercase font-bold mb-5 hover:bg-indigo-800 md:w-auto"
        onClick={() => setIsOpen(true)}
      >
        Nuevo Vehiculo
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
                <label className="uppercase text-gray-600 block text-lg font-bold">Placa</label>
                <input
                  type="text"
                  placeholder="Placa"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">Cédula Propietario</label>
                <input
                  type="text"
                  placeholder="Cédula"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">Kilometraje</label>
                <input
                  type="number"
                  placeholder="Kilometraje"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={kilometraje}
                  onChange={(e) => setKilometraje(Number(e.target.value))}
                />
              </div>

              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">Marca</label>
                <input
                  type="text"
                  placeholder="Fecha Ultima Revision"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                />
              </div>

              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">Fecha Ultima Revisión</label>
                <input
                  type="date"
                  placeholder="Fecha Ultima Revision"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={fechaUltimaRevision}
                  onChange={(e) => setFechaUltimaRevision(e.target.value)}
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

export default ModalVehiculos;

