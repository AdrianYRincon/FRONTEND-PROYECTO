import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import Axios from "axios";
import Swal from "sweetalert2";

type Empleado = {
  cedula: string;
  nombre: string;
  apellido: string;
  sueldo: number;
};

const ModalEmpleados = ({ 
  editar,
  setEditar,
  selectedEmployee,
  getEmployees
 }: 
 {
  editar: boolean ,
  setEditar: Function,
  selectedEmployee : Empleado | null,
  getEmployees: Function

  }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [cedula, setCedula] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [sueldo, setSueldo] = useState<number>(0);

  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });

  useEffect(()=>{
    if (editar && selectedEmployee) {
      setIsOpen(true);
      setCedula(selectedEmployee.cedula);
      setNombre(selectedEmployee.nombre);
      setApellido(selectedEmployee.apellido);
      setSueldo(selectedEmployee.sueldo);

    }
  },[editar, selectedEmployee])


  const resetForm = ()=>{
    setCedula("");
    setNombre("");
    setApellido("");
    setSueldo(0);


  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([cedula, nombre, apellido, sueldo].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if(!editar){
      //intentamos agregar un nuevo empleado
      try {
        await Axios.post("http://localhost:3001/insertemployee",{
          cedula,
          nombre,
          apellido,
          sueldo
        });

        getEmployees();
  
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Empleado Agregado correctamente",
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
      //intentamos actualizar un empleado
      try {
        await Axios.put("http://localhost:3001/updateemployee",{
          cedula,
          nombre,
          apellido,
          sueldo
        });

        getEmployees();
  
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Empleado actualizado correctamente",
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


    setAlerta({
      msg: "",
      error: false,
    });

    resetForm();
    setIsOpen(false);
    setEditar(false);
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
                <label className="uppercase text-gray-600 block text-lg font-bold">Cédula</label>
                <input
                  type="text"
                  placeholder="Cédula"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  disabled = { editar }
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

export default ModalEmpleados;
