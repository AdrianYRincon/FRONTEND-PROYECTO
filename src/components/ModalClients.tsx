import { useState } from "react";
import Alerta from "./Alerta";


type Cliente = {
  cedula:string;
  nombre:string;
  apellido:string;
  email:string;
  telefono:string;

} 
const ModalClients = ({ addCliente }: { addCliente: (cliente: Cliente) => void }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [cedula, setCedula] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");


  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });



  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([cedula,nombre,apellido,email,telefono].includes('')) {
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
    const nuevoCliente = {
      cedula,
      nombre,
      apellido,
      email,
      telefono
    };

    // Llamar a la función de callback del componente padre (AdminServicios)
    addCliente(nuevoCliente);

    setIsOpen(false);
  };


  const { msg } = alerta;

  return (
    <>
      <button
        className="bg-indigo-700 w-full py-2 px-4 rounded text-white uppercase font-bold mb-5 hover:bg-indigo-800 md:w-auto"
        onClick={() => setIsOpen(true)}
      >
        Nuevo Cliente
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
                  Cedula
                </label>
                <input
                  type="text"
                  placeholder="cédula"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Nombre"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">
                  Apellido
                </label>
                <input
                  type="text"
                  placeholder="Apellido"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">
                  Telefono
                </label>
                <input
                  type="text"
                  placeholder="telefono"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
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

export default ModalClients;
