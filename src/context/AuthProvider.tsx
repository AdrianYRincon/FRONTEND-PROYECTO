import { useState, createContext, ReactNode } from "react";


const AuthContext = createContext<any>(undefined);

type User = {
  user:string;
  password:string
}

const AuthProvider = ({children}:{ children:ReactNode }) => {

  const [auth, setAuth] = useState<User>();


  return(
    <AuthContext.Provider 
    value=
    {{
      auth,
      setAuth,
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
