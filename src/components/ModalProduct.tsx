import { useState } from "react";
import Alerta from "./Alerta";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
};

const ModalProduct = ({ agregarProducto }: { agregarProducto: (producto: Producto) => void }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [id, setId] = useState<number>(0);
  const [nombre, setNombre] = useState<string>("");
  const [precio, setPrecio] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(0);

  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([id, precio, cantidad].includes(0) || nombre == '') {
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

    const nuevoProducto = {
      id,
      nombre,
      precio,
      cantidad,
    };

    agregarProducto(nuevoProducto);

    setIsOpen(false);
  };

  const { msg } = alerta;

  return (
    <>
      <button
        className="bg-indigo-700 w-full py-2 px-4 rounded text-white uppercase font-bold mb-5 hover:bg-indigo-800 md:w-auto"
        onClick={() => setIsOpen(true)}
      >
        Agregar Producto
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
                <label className="uppercase text-gray-600 block text-lg font-bold">id</label>
                <input
                  type="number"
                  placeholder="id"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={id}
                  onChange={(e) => setId(Number(e.target.value))}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">Nombre</label>
                <input
                  type="text"
                  placeholder="nombre del producto"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">Precio</label>
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
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">Cantidad</label>
                <input
                  type="number"
                  min="0"
                  placeholder="Cantidad"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
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

export default ModalProduct;

