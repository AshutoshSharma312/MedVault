
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({children}){
  const [user,setUser]=useState(null);

  const login=(email,password)=>{
    setUser({email});
    localStorage.setItem("medvault_token","MOCK_TOKEN");
  };

  const logout=()=>{
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user,login,logout}}>
      {children}
    </AuthContext.Provider>
  );
}
