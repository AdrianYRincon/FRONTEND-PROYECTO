import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import Axios from "axios";
import Swal from 'sweetalert2';


type Producto = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
};



const ModalProduct = ({ 
  editar,
  selectedProduct,
  setEditar,
  getProducts
}: {  
  editar: boolean ,
  selectedProduct : Producto | null,
  setEditar: Function,
  getProducts: Function
}) => {
  
  
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [id, setId] = useState<number>(0);
  const [nombre, setNombre] = useState<string>("");
  const [precio, setPrecio] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(0);

  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });


  useEffect(()=>{
    if (editar && selectedProduct) {
      setIsOpen(true);
      setId(selectedProduct.id);
      setNombre(selectedProduct.nombre);
      setPrecio(selectedProduct.precio);
      setCantidad(selectedProduct.cantidad);
    }
  },[editar, selectedProduct])


  const resetForm = ()=>{
    setId(0);
    setNombre("");
    setPrecio(0);
    setCantidad(0);

  }



  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([id, precio, cantidad].includes(0) || nombre == '') {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }


    if(!editar){
      //intentamos agregar un nuevo producto
      try {
        await Axios.post("http://localhost:3001/insert",{
          id,
          nombre,
          precio,
          cantidad
        });

        getProducts();
  
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto Agregado correctamente",
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
  
    }
    else {
      //intentamos actualizar un producto
      try {
        await Axios.put("http://localhost:3001/update",{
          id,
          nombre,
          precio,
          cantidad
        });

        getProducts();
  
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto actualizado correctamente",
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
  

    }

    setIsOpen(false);
    setEditar(false);
    resetForm();
    setAlerta({
      msg: "",
      error: false,
    });
   

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
          onClick={() => {
            setIsOpen(false);
            setEditar(false);
            resetForm();
          }}
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
                  disabled = { editar }
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
                value={editar ? "Actualizar": "Agregar"}
                className={editar ? "bg-cyan-500 w-full py-2 px-2 rounded text-white uppercase font-bold mt-5 hover:bg-cyan-700 cursor-pointer": "bg-indigo-700 w-full py-2 px-2 rounded text-white uppercase font-bold mt-5 hover:bg-indigo-800 cursor-pointer"}
                
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalProduct;

