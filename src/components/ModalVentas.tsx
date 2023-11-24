import { useState } from "react";
import Alerta from "./Alerta";

type Venta = {
  id:number;
  nombreProducto: string;
  precio: number;
  cantidad: number;
  fechaVenta: string;
};

const ModalVentas = ({ agregarVenta }: { agregarVenta: (venta: Venta) => void }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [id, setId] = useState(0);
  const [nombreProducto, setNombreProducto] = useState<string>("");
  const [precio, setPrecio] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(0);
  const [fechaVenta, setFechaVenta] = useState<string>("");

  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setId(id+1);

    if ([nombreProducto, precio, cantidad, fechaVenta].includes("")) {
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

    const nuevaVenta = {
      id,
      nombreProducto,
      precio,
      cantidad,
      fechaVenta,
    };

    agregarVenta(nuevaVenta);

    setIsOpen(false);
  };

  const { msg } = alerta;

  return (
    <>
      <button
        className="bg-indigo-700 w-full py-2 px-4 rounded text-white uppercase font-bold mb-5 hover:bg-indigo-800 md:w-auto"
        onClick={() => setIsOpen(true)}
      >
        Agregar Venta
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
                  Nombre Producto
                </label>
                <input
                  type="text"
                  placeholder="nombre producto"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={nombreProducto}
                  onChange={(e) => setNombreProducto(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">
                  Precio
                </label>
                <input
                  type="number"
                  placeholder="Precio"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={precio}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">
                  Cantidad
                </label>
                <input
                  type="number"
                  step={1}
                  placeholder="cantidad"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">
                  Fecha
                </label>
                <input
                  type="date"
                  placeholder="fecha venta"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={fechaVenta}
                  onChange={(e) => setFechaVenta(e.target.value)}
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

export default ModalVentas;