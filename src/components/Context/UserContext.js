import React, { useState,useEffect } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
  //const us = JSON.parse(sessionStorage.getItem("usuario"));
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

  const usuarioLog = usVacio;
  const [userSession, setUserSession] = useState({});

  const UsuarioLogeado = (user) => {
    setUserSession(user);
  };

  const CerrarSesion = () => {
    sessionStorage.clear();
  };

  useEffect(() => {
    setUserSession(usuarioLog);
  }, [])

  return (
    <UserContext.Provider value={{ userSession, UsuarioLogeado, CerrarSesion }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };