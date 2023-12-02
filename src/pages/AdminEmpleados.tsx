import { useState , useEffect} from "react";
import Title from "../components/Title";
import ModalEmpleados from "../components/ModalEmpleados";
import  Axios  from "axios";
import Swal from "sweetalert2";

type Empleado = {
  cedula: string;
  nombre: string;
  apellido: string;
  sueldo: number;
};

const AdminEmpleados = () => {

  const [empleados, setEmpleados] = useState<Array<Empleado>>([]);
  const [selectedEmployee, setSelectEmployee] = useState<Empleado | null>(null);

  const [editar,setEditar] = useState(false);

  
  const eliminarEmpleado = async(cedula:string) => {
    try {
      await Axios.delete(`http://localhost:3001/deleteemployee/${cedula}`);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto Eliminado correctamente",
        showConfirmButton: false,
        timer: 2000
      });
      getEmployees();
      
    } catch (error:any) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data,
      });
    }
    
  };

  const editarEmployee = (employee: Empleado) => {
    setEditar(true);
    setSelectEmployee(employee);
  }

  
    //obtenemos los clientes de la BD
    const getEmployees = async()=>{

      const { data } = await Axios("http://localhost:3001/empleados");
  
      const empleadosApi = data[0].map((employee:any) => ({
        cedula:employee.emp_cedula,
        nombre:employee.emp_nombre,
        apellido:employee.emp_apellido,
        sueldo:employee.emp_sueldo,
      }));
      setEmpleados(empleadosApi);
    }
  
    useEffect(()=>{
      getEmployees();
    },[]);


  return (
    <>
      <Title title="Empleados" />
      <ModalEmpleados  
        editar = { editar}
        setEditar={ setEditar}
        selectedEmployee={ selectedEmployee }
        getEmployees={ getEmployees }
      />
      <table className="min-w-full">
        <thead className="bg-gray-100 ">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Cédula
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Apellido
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Sueldo
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody id="listado-empleados" className="bg-white">
          {empleados.map((empleado) => (
            <tr key={empleado.cedula}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{empleado.cedula}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{empleado.nombre}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{empleado.apellido}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{empleado.sueldo}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <button className="text-white bg-cyan-500 hover:bg-cyan-700 px-3 py-2 rounded-md text-sm font-medium mr-5" onClick={() => editarEmployee(empleado)}
                >
                  Editar
                </button>
                <button className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium mr-5" 
                    onClick={() => eliminarEmpleado(empleado.cedula)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminEmpleados;