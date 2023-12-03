import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Alerta from "./Alerta";
import Axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";


type Cliente = {
  cedula:string;
  nombre:string;
  apellido:string;
  email:string;
  telefono:string;

} 
const ModalClients = ({ 
  editar,
  selectedClient,
  setEditar,
  getClientes
 }: { 
  editar: boolean ,
  selectedClient : Cliente | null,
  setEditar: Function,
  getClientes: Function
 }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [cedula, setCedula] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");

  const { auth } = useAuth();
  let isValid = true;
  if(auth){
    const { user } = auth;
    if(user == 'vendedor'){
      isValid = false;
    }
  }

  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });

  useEffect(()=>{
    if (editar && selectedClient) {
      setIsOpen(true);
      setCedula(selectedClient.cedula);
      setNombre(selectedClient.nombre);
      setApellido(selectedClient.apellido);
      setEmail(selectedClient.email);
      setTelefono(selectedClient.telefono);
    }
  },[editar, selectedClient])

  const resetForm = ()=>{
    setCedula("");
    setNombre("");
    setApellido("");
    setEmail("");
    setTelefono("");

  }


  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([cedula,nombre,apellido,email,telefono].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    if(!editar){
      //intentamos agregar un nuevo cliente
      try {
        await Axios.post("http://localhost:3001/insertClient",{
          cedula,
          nombre,
          apellido,
          email,
          telefono
        });

        getClientes();
  
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Cliente Agregado correctamente",
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
      //intentamos actualizar un cliente
      try {
        await Axios.put("http://localhost:3001/updateClient",{
          cedula,
          nombre,
          apellido,
          email,
          telefono
        });

        getClientes();
  
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Cliente actualizado correctamente",
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
     <div className="flex justify-between">
     <button
        className="bg-indigo-700 w-full py-2 px-4 rounded text-white uppercase font-bold mb-5 hover:bg-indigo-800 md:w-auto"
        onClick={() => setIsOpen(true)}
      >
        Nuevo Cliente
      </button>
        {isValid ?  <Link 
            className="bg-green-500 w-full py-2 px-4 rounded text-white uppercase font-bold mb-5 hover:bg-green-700 md:w-auto" to="/admin/clientesfrecuentes">
            Clientes Frecuentes
        </Link> : ''}
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
                <label className="uppercase text-gray-600 block text-lg font-bold">
                  Cedula
                </label>
                <input
                  type="text"
                  placeholder="cédula"
                  className="border w-full p-3 mt-2 bg-gray-50 rounded px-4"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  disabled = { editar }
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

export default ModalClients;
