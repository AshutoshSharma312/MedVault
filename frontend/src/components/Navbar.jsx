
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar(){
  const {user,logout}=useContext(AuthContext);
  const nav=useNavigate();

  return (
    <nav>
      <Link to="/">MedVault</Link>
      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ):(
        <button onClick={()=>{logout();nav('/login')}}>Logout</button>
      )}
    </nav>
  );
}
