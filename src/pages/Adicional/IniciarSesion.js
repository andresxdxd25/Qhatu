import React, { useState,useContext,useEffect } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import {UserContext} from "../../components/Context/UserContext";

import "./IniciarSesion.css";

function IniciarSesion() {

  const {userSession,UsuarioLogeado} = useContext(UserContext);

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const usernameHandler = (evt) => {
    setEnteredUsername(evt.target.value);
  };
  const passwordHandler = (evt) => {
    setEnteredPassword(evt.target.value);
  };

  const InicioSesion = async (usuario, clave) => {
    const response = await fetch(`http://localhost:57296/login`, {
      method: "POST",
      headers: {
        Authorization: "Basic YWRtaW4xMjM6YWRtaW4xMjM=",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usuario,
        password: clave,
      }),
    });

    const data = await response.json();

    if (data.usuaioId !== 0) {
      
      const fechaResponse = data.fechaNacim.split("T")[0];
        const fechaArray = fechaResponse.split("-");
        const dia = parseInt(fechaArray[2]);
        const mes = parseInt(fechaArray[1]);
        const anio = parseInt(fechaArray[0]);
        data.fechaNacim=anio+"-"+mes+"-"+dia;
        console.log("iniciando sesion")
        console.log(data)
        console.log("entra sesion")
      UsuarioLogeado(data);
      
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, [])

  return (
    <div className="divBodyAlt">
      <table className="tablaInicio">
        <tbody>
          <tr>
            <td className="tdLogo">
              <div className="divLogoInicio">
                <img src={"images/logo.jpg"} className="LogoInicio"></img>
              </div>
            </td>
            <td className="tdForm">
            <div className="contenedorAlt">
        <h1>EDAS Store</h1>
        <form id="forma" name="forma">
            <table className="TablaForm">
              <tbody>
                <tr>
                  <td style={{textAlign:"left"}}>
                  <label htmlFor="usuario">Usuario: </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="usuario"
                      name="usuario"
                      className="input"
                      value={enteredUsername}
                      onChange={usernameHandler}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign:"left"}}>
                    <label htmlFor="password">Password: </label>
                  </td>
                  <td>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="input"
                      value={enteredPassword}
                      onChange={passwordHandler}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Link to="/registrousuario">
                      <label className="linkLabelAlt" htmlFor="password">
                        ¿Aún no te registras?
                      </label>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Link to="/principal">
                      <input
                        type="submit"
                        className="btnIngresar"
                        value="Ingresar"
                        onClick={() => InicioSesion(enteredUsername, enteredPassword)}
                      />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
        </form>
      </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default IniciarSesion;
