import React, { useState,useContext,useEffect } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "./Context/UserContext";
import { Link } from "react-router-dom";
import { CartContext } from "./Context/CartContext";

function NavbarSide() {
  const { userSession, UsuarioLogeado } = useContext(UserContext);
  const {cartCount,limpiarCarrito} = useContext(CartContext);

  const [nombres,setNombres] = useState(userSession.nombres);
  const [apePaterno,setApePaterno] = useState(userSession.apePaterno);

  const Logout = () => {
    limpiarCarrito();
    UsuarioLogeado({});
    localStorage.clear();
  };

  const usVacio = {
    usuarioId: 1,
    nombres: "",
    apePaterno: "",
    apeMaterno: "",
    telefono: "",
    dni: "",
    fechaNacim: "",
    rol: "",
    email: "",
    username: "",
    foto: "",
  };

  if(userSession===undefined){
    UsuarioLogeado(usVacio);
  }

  useEffect(() => {
    setNombres(userSession.nombres);
    setApePaterno(userSession.apePaterno);
  }, [userSession])

  return (
    <div className="contenedorPage NavbarSide">
      <img
        className="FotoUsuario"
        src={`data:image/jpeg;base64,${userSession.foto}`}
      />
      <br />
      <br />
      <label style={{ color: "white" }}>
        {nombres + " " + apePaterno}
      </label>
      <br />
      <br />
      <Link to={"/principal"}>
        <Button className="BotonBootstrap" variant="secondary">
          <label className="NombreBoton">🛒 Tienda de productos</label>
        </Button>
      </Link>
      <br />
      <Link to="/compras">
        <Button className="BotonBootstrap" variant="secondary">
          <label className="NombreBoton">📑 Mis compras</label>
        </Button>
      </Link>
      <br />
      <Link to="/misdatos">
        <Button className="BotonBootstrap" variant="secondary">
          <label className="NombreBoton">🙋‍♂️ Mis datos</label>
        </Button>
      </Link>
      <br />
      <div className="PosicionBTNCS">
        <Link to="/">
          <Button
            className="BotonBootstrap BTNCerrarSesion"
            variant="danger"
            onClick={Logout}
          >
            <label className="NombreBoton">❌ Cerrar sesión</label>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NavbarSide;
