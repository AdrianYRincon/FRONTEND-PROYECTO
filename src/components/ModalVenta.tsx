import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import Axios from "axios";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";




type Venta = {
  det_id:number;
  fac_id: number;
  pro_id: number;
  precio: number;
  cantidad: number;
};

const ModalVenta = ({
  editar,
  selectedVenta,
  setEditar,
  getVentas
}: {  
  editar: boolean ,
  selectedVenta : Venta | null,
  setEditar: Function,
  getVentas: Function
}) => {
  
  
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [detId, setDetId] = useState<number>(0);
  const [facId, setFacId] = useState<number>(0);
  const [proId, setProId] = useState<number>(0);
  const [precio, setPrecio] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(0);


  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });


  useEffect(()=>{
    if (editar && selectedVenta) {
      setIsOpen(true);
      setDetId(selectedVenta.det_id);
      setFacId(selectedVenta.fac_id);
      setProId(selectedVenta.pro_id);
      setPrecio(selectedVenta.precio);
      setCantidad(selectedVenta.cantidad);
    }
  },[editar, selectedVenta])


  const resetForm = ()=>{
    setFacId(0);
    setProId(0);
    setPrecio(0);
    setCantidad(0);

  }



  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([facId,proId,precio,cantidad].includes(0)) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }


    if(!editar){
      //intentamos agregar una nueva venta
      try {
        await Axios.post("http://localhost:3001/addventa",{
          facId,
          proId,
          precio,
          cantidad
        });

        getVentas();
  
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Venta Agregada correctamente",
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
      //intentamos actualizar una ventaS
      try {
        await Axios.put("http://localhost:3001/updateventa",{
          detId,
          facId,
          proId,
          precio,
          cantidad
        });

        getVentas();
  
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Venta actualizada correctamente",
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
      <div className="flex justify-between">
        <button
          className="bg-indigo-700 w-full py-2 px-4 rounded text-white uppercase font-bold mb-5 hover:bg-indigo-800 md:w-auto"
          onClick={() => setIsOpen(true)}
        >
          Agregar Venta
        </button>
        <Link 
            className="bg-orange-500 w-full py-2 px-4 rounded text-white uppercase font-bold mb-5 hover:bg-orange-700 md:w-auto" to="/admin/ventasproductos">
            Ver Registro Ventas
          </Link>
      </div>
     

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
                <label className="uppercase text-gray-600 block text-lg font-bold">factura id</label>
                <input
                  type="number"
                  placeholder="factura id"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={facId}
                  onChange={(e) =>setFacId(Number(e.target.value))}
                  disabled = { editar }
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lg font-bold">producto id</label>
                <input
                  type="number"
                  placeholder="producto id"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={proId}
                  onChange={(e) => setProId(Number(e.target.value))}
                  disabled = { editar }
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

export default ModalVenta;