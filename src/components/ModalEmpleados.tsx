import { useState } from "react";
import Alerta from "./Alerta";

type Empleado = {
  cedula: string;
  nombre: string;
  apellido: string;
  sueldo: number;
};

const ModalEmpleados = ({ agregarEmpleado }: { agregarEmpleado: (empleado: Empleado) => void }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [cedula, setCedula] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [sueldo, setSueldo] = useState<number>(0);

  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([cedula, nombre, apellido, sueldo].includes("")) {
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

    const nuevoEmpleado = {
      cedula,
      nombre,
      apellido,
      sueldo,
    };

    agregarEmpleado(nuevoEmpleado);

    setIsOpen(false);
  };

  const { msg } = alerta;

  return (
    <>
      <button
        className="bg-indigo-700 w-full py-2 px-4 rounded text-white uppercase font-bold mb-5 hover:bg-indigo-800 md:w-auto"
        onClick={() => setIsOpen(true)}
      >
        Agregar Empleado
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
                <label className="uppercase text-gray-600 block text-lg font-bold">Cédula</label>
                <input
                  type="text"
                  placeholder="Cédula"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">Nombre</label>
                <input
                  type="text"
                  placeholder="Nombre"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">Apellido</label>
                <input
                  type="text"
                  placeholder="Apellido"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">Sueldo</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Sueldo"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={sueldo}
                  onChange={(e) => setSueldo(Number(e.target.value))}
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

export default ModalEmpleados;
