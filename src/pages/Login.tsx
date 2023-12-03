import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imglogin from '../assets/imglogin.jpg';
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';



const Login = () => {

  type Alertatype = {
    msg: string;
    error: boolean;
  };

  const [user, setUser] = useState('');
  const [password,setPassword] = useState('');

  const [alerta, setAlerta] = useState<Alertatype>({ msg: "", error: false });
  const { setAuth } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if([user,password].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error:true
      })
      return

    }


    if((user == "admin" && password == "12345") || (user == "vendedor" && password == "00000")){
      
      setAlerta({
        msg: '',
        error:false
      })

      setAuth({user,password});
      navigate('/admin/productos')

    }
    else{
      setAlerta({
        msg: 'Usuario o contraseña incorrectos',
        error:true
      })
      return
    }

    
  }



  const { msg } = alerta;

  return (

    <>
        <div>
          <h1 className="text-indigo-600 font-black text-5xl">
            Inicia Sesión y Administra tu  
            <span className="text-black"> Negocio</span>
          </h1>
          <img className="w-70 h-80 mt-12 rounded-xl" src={imglogin} alt="Mecánico"></img>
        </div>


        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        { msg && <Alerta 
          alerta={alerta}
          />}
          <form onSubmit={handleSubmit}>
            <div className='my-5'>
              <label className='uppercase text-gray-600 block text-xl font-bold'>
                USER
              </label>
              <input 
                type='text' 
                placeholder='user' 
                className='border  w-full p-3 mt-3 bg-gray-50 rounded'
                value={user}
                onChange={e => setUser(e.target.value)}
                />
            </div>
            <div className='my-5'>
              <label className='uppercase text-gray-600 block text-xl font-bold'>
                Password
              </label>
              <input 
                type='password' 
                placeholder='Tu password' 
                className='border  w-full p-3 mt-3 bg-gray-50 rounded'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <input type='submit' value='Iniciar Sesión' 
            className='bg-indigo-700 w-full py-3 p-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'/>
          </form>
        </div>    
    </>
  )
};

export default Login;