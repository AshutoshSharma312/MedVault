
import { useState,useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login(){
  const {login}=useContext(AuthContext);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  return (
    <div>
      <input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
      <input placeholder="password" onChange={e=>setPassword(e.target.value)}/>
      <button onClick={()=>login(email,password)}>Login</button>
    </div>
  );
}
