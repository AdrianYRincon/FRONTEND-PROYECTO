// fuente de los datos del state global de la app
import { useState, useEffect, createContext, ReactNode } from "react";

interface AuthContextProps {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
  cargando: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);


const AuthProvider = ({children}:{ children:ReactNode }) => {

  const [auth, setAuth] = useState<any>({});
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(()=>{
    
    const autenticarUsuario = async () => {
      const token  = localStorage.getItem('token');

      if(!token){
        setCargando(false);
        return;
      };
   
      setCargando(false);


    }
    autenticarUsuario()
  },[])



  return(
    <AuthContext.Provider 
    value=
    {{
      auth,
      setAuth,
      cargando
    }}
    >
      {children}
    </AuthContext.Provider>
  )

}


export {
  AuthProvider
};

export default AuthContext;
