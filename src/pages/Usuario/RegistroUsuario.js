import React, { useState,useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import {Link} from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

import "./RegistroUsuario.css";

registerLocale("es", es);

function RegistroUsuario() {
  const idHandler = (evt) => {
    setEnteredid(evt.target.value);
  };
  const nombresHandler = (evt) => {
    setEnterednombres(evt.target.value);
  };

  const apepaternoHandler = (evt) => {
    setEnteredapepaterno(evt.target.value);
  };
  const apematernoHandler = (evt) => {
    setEnteredapematerno(evt.target.value);
  };

  const telefonoHandler = (evt) => {
    setEnteredtelefono(evt.target.value);
  };
  const dniHandler = (evt) => {
    setEntereddni(evt.target.value);
  };

  const fechanacimHandler = (fecha) => {
    setEnteredfechanacim(fecha);
  };
  const rolHandler = (evt) => {
    setEnteredrol(evt.target.value);
  };
  const emailHandler = (evt) => {
    setEnteredemail(evt.target.value);
  };
  const usernameHandler = (evt) => {
    setEnteredusername(evt.target.value);
  };
  const passwordHandler = (evt) => {
    setEnteredpassword(evt.target.value);
  };
  const confirmpasswordHandler = (evt) => {
    setEnteredconfirmpassword(evt.target.value);
  };
  const fotoHandler = (evt) => {
    setEnteredfoto(evt.target.files[0]);
  };

  const enSesion=JSON.parse(sessionStorage.getItem("usuario"))
  const usuarioSesion = enSesion?enSesion:{rol:"Cliente"};

  const [enteredid, setEnteredid] = useState("");
  const [enterednombres, setEnterednombres] = useState("");

  const [enteredapepaterno, setEnteredapepaterno] = useState("");
  const [enteredapematerno, setEnteredapematerno] = useState("");
  const [enteredtelefono, setEnteredtelefono] = useState("");
  const [entereddni, setEntereddni] = useState("");
  const [enteredfechanacim, setEnteredfechanacim] = useState("");
  const [enteredrol, setEnteredrol] = useState("Cliente");

  const [enteredemail, setEnteredemail] = useState("");
  const [enteredusername, setEnteredusername] = useState("");
  const [enteredpassword, setEnteredpassword] = useState("");
  const [enteredconfirmpassword, setEnteredconfirmpassword] = useState("");

  const [enteredfoto, setEnteredfoto] = useState("");

  const [confirmados, setConfirmados] = useState(false);

  async function handleGetUsuario(id) {
    const response = await fetch(`http://localhost:57296/api/Usuario/${id}`, {
      headers: {
        Authorization: "Basic YWRtaW4xMjM6YWRtaW4xMjM=",
        "Content-Type": "application/json",
      },
      //body: JSON.stringify(data)
    });

    const data = await response.json();
    const fechaResponse = data.fechaNacim.split("T")[0];
    const fechaArray = fechaResponse.split("-");
    const dia = parseInt(fechaArray[2]);
    const mes = parseInt(fechaArray[1]);
    const anio = parseInt(fechaArray[0]);
    // console.log(data);
    // console.log(dia);
    // console.log(mes);
    // console.log(anio);
    setEnterednombres(data.nombres);
    setEnteredapepaterno(data.apePaterno);
    setEnteredapematerno(data.apeMaterno);
    setEnteredtelefono(data.telefono);
    setEntereddni(data.dni);
    setEnteredfechanacim(new Date(anio, mes - 1, dia));
    setEnteredrol(data.rol);
    setEnteredemail(data.email);
    setEnteredusername(data.username);
    setEnteredpassword(data.password);
    setEnteredfoto(data.foto);
  }

  let usuario = {
    nombres: enterednombres,
    apepaterno: enteredapepaterno,
    apematerno: enteredapematerno,
    telefono: enteredtelefono,
    dni: entereddni,
    fechanacim: enteredfechanacim,
    rol: enteredrol,
    email: enteredemail,
    username: enteredusername,
    password: enteredpassword,
    foto: enteredfoto,
  };

  

  async function handleInsertUsuario(user) {
    //console.log("inicio foto: "+user.foto);
    user.foto = await FileToBase64(user.foto);
    user.foto = user.foto && user.foto.replace("data:image/jpeg;base64,", "");
    //console.log("base 64 es: "+user.foto);

    //console.log(user)

    const response = await fetch("http://localhost:57296/api/Usuario", {
      method: "POST",
      headers: {
        "Authorization": "Basic YWRtaW4xMjM6YWRtaW4xMjM=",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log("data 1")
    console.log(data)
    
    setEnterednombres("");
    setEnteredapepaterno("");
    setEnteredapematerno("");
    setEnteredtelefono("");
    setEntereddni("");
    setEnteredfechanacim("");
    setEnteredrol("");
    setEnteredemail("");
    setEnteredusername("");
    setEnteredpassword("");
    setEnteredconfirmpassword("");
    setConfirmados(false);
    setEnteredfoto("");
    alert("Usuario registrado!");
  }

  const FileToBase64 = async (file) => {
    if(!file) return null;
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  useEffect(()=>{
    if(enteredpassword===enteredconfirmpassword){
      setConfirmados(true);
    }
    else{
      setConfirmados(false)
    }
    //setEnteredrol(rol?rol:"Cliente");
  },[enteredpassword,enteredconfirmpassword]);

  return (
    <div className="contenedorRegistro">
      <div className="DivRegistro">

      
      <Form>
        {/* <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label>UsuarioId</Form.Label>
          <Form.Control type="text" placeholder="Enter Id" value={enteredid} onChange={idHandler}/>
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="formBasicNombres">
          <Form.Label>Nombres</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombres"
            value={enterednombres}
            onChange={nombresHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicApepaterno">
          <Form.Label>Apellido paterno</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apellido paterno"
            value={enteredapepaterno}
            onChange={apepaternoHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicApematerno">
          <Form.Label>Apellido materno</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apellido materno"
            value={enteredapematerno}
            onChange={apematernoHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTelefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            placeholder="Teléfono"
            value={enteredtelefono}
            onChange={telefonoHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDni">
          <Form.Label>D.N.I.</Form.Label>
          <Form.Control
            type="text"
            placeholder="D.N.I."
            value={entereddni}
            onChange={dniHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicFechanacim">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <DatePicker
            selected={enteredfechanacim}
            dateFormat="dd/MM/yyyy"
            dateFormatCalendar="MMMM"
            onChange={fechanacimHandler}
            minDate={new Date("1920", "01", "01")}
            maxDate={new Date()}
            yearDropdownItemNumber={15}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            scrollableYearDropdown
            locale="es"
          />
        </Form.Group>

        {usuarioSesion.rol === "Administrador" && (
          <Form.Group className="mb-3" controlId="formBasicRol">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              placeholder="Rol"
              value={enteredrol}
              onChange={rolHandler}
            >
              <option value="Cliente">Cliente</option>
              <option value="Vendedor">Vendedor</option>
            </Form.Select>
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={enteredemail}
            onChange={emailHandler}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre de usuario"
            value={enteredusername}
            onChange={usernameHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={enteredpassword}
            onChange={passwordHandler}
          />{
            (enteredpassword) ? (!confirmados ? <label>❌</label>:<label>✔</label>):(<label>🔴</label>)
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={enteredconfirmpassword}
            onChange={confirmpasswordHandler}
          />{
            (enteredconfirmpassword) ? (!confirmados ? <label>❌</label>:<label>✔</label>):(<label>🔴</label>)
          }
        </Form.Group>

        <Form.Group controlId="formFileFoto" className="mb-3">
          <Form.Label>Foto</Form.Label>
          <Form.Control
            type="file"
            accept="image/jpeg"
            onChange={fotoHandler}
          />
        </Form.Group>

        {confirmados ? (
          <Button
            variant="success"
            
            onClick={() => {
              handleInsertUsuario(usuario);
            }}
          >
            Registrar
          </Button>
        ) : (
          <Button variant="success">Registrar</Button>
        )}
        <Link to="/">
        <Button variant="secondary">
          Login
        </Button>
        </Link>
      </Form>
      </div>
    </div>
  );
}

export default RegistroUsuario;