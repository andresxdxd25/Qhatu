import React, { useState,useEffect,useContext } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import {UserContext} from "../../components/Context/UserContext";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("es", es);


function DatosUsuario() {

    const {userSession,UsuarioLogeado} = useContext(UserContext);
    //console.log(userSession)
    console.log(userSession)


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
        setCambioFoto(true);
        setEnteredfoto(evt.target.files[0]);
      };
    
      const [enterednombres, setEnterednombres] = useState(`${userSession.nombres}`);
      const [enteredapepaterno, setEnteredapepaterno] = useState(`${userSession.apePaterno}`);
      const [enteredapematerno, setEnteredapematerno] = useState(`${userSession.apeMaterno}`);
      const [enteredtelefono, setEnteredtelefono] = useState(`${userSession.telefono}`);
      const [entereddni, setEntereddni] = useState(`${userSession.dni}`);
      const [enteredfechanacim, setEnteredfechanacim] = useState("");
      const [enteredrol, setEnteredrol] = useState(`${userSession.rol}`);
      const [enteredemail, setEnteredemail] = useState(`${userSession.email}`);
      const [enteredusername, setEnteredusername] = useState(`${userSession.username}`);
      const [enteredpassword, setEnteredpassword] = useState(`${userSession.password}`);
      const [enteredconfirmpassword, setEnteredconfirmpassword] = useState("");
      const [enteredfoto, setEnteredfoto] = useState(`${userSession.foto}`);
      const [confirmados, setConfirmados] = useState(false);
    
      const [cambioFoto,setCambioFoto] = useState(false);
      //console.log(userSession.password)
      async function handleGetUsuario(id) {
        const response = await fetch(`http://localhost:57296/api/Usuario/${id}`, {
          headers: {
            Authorization: "Basic YWRtaW4xMjM6YWRtaW4xMjM=",
            "Content-Type": "application/json",
          },
          //body: JSON.stringify(data)
        });
    
        const data = await response.json();
        //console.log(data)
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
        usuarioId:userSession.usuarioId,
        nombres: enterednombres,
        apePaterno: enteredapepaterno,
        apeMaterno: enteredapematerno,
        telefono: enteredtelefono,
        dni: entereddni,
        fechaNacim: enteredfechanacim,
        rol: enteredrol,
        email: enteredemail,
        username: enteredusername,
        password: enteredpassword,
        foto: enteredfoto,
      };
    
      
    
      async function handleGuardartUsuario(user) {
        //console.log("inicio foto: "+user.foto);
        user.foto = await FileToBase64(user.foto);
        user.foto = user.foto ? user.foto.replace("data:image/jpeg;base64,", ""):userSession.foto;
        //console.log("base 64 es: "+user.foto);
        
        console.log("usuario guardaarr")
        console.log(user)
        console.log("fecha modificada 1")
        user.fechaNacim=user.fechaNacim.toISOString().replace('Z','')
        console.log(user)
        console.log("fecha modificada 2")
        const response = await fetch("http://localhost:57296/api/Usuario", {
          method: "PUT",
          headers: {
            "Authorization": "Basic YWRtaW4xMjM6YWRtaW4xMjM=",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        console.log("Data 1")
        console.log(data)
        console.log("Data 2")
        // setEnterednombres("");
        // setEnteredapepaterno("");
        // setEnteredapematerno("");
        // setEnteredtelefono("");
        // setEntereddni("");
        // setEnteredfechanacim("");
        // setEnteredrol("");
        // setEnteredemail("");
        // setEnteredusername("");
        // setEnteredpassword("");
        // setEnteredconfirmpassword("");
        setConfirmados(false);
        // setEnteredfoto("");
        setCambioFoto(false);
        setEnteredconfirmpassword("");
        await UsuarioLogeado(user);
        console.log("USUARIO EN SESION 1")
        console.log(userSession)
        console.log("USUARIO EN SESION 2")
        alert("Cambios guardados!");
      }
    
      const FileToBase64 = async (file) => {
        if(!file || !cambioFoto) return null;
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
      
      useEffect(() => {
        console.log("EFFECT 1")
        console.log(userSession)
        console.log(userSession.fechaNacim)
        console.log("EFFECT 2")
        //const fechaResponse = userSession.fechaNacim.split("T")[0];
        //console.log(fechaResponse)
        const fechaArray = userSession.fechaNacim.split('-');
        const dia = parseInt(fechaArray[2]);
        const mes = parseInt(fechaArray[1]);
        const anio = parseInt(fechaArray[0]);
        setEnteredfechanacim(new Date(anio,mes-1,dia));
      },[userSession])

      useEffect(()=>{
        //handleGetUsuario(userSession.usuarioId);
        if(enteredpassword===enteredconfirmpassword){
          setConfirmados(true);
        }
        else{
          setConfirmados(false)
        }
        //setEnteredrol(rol?rol:"Cliente");
      },[enteredpassword,enteredconfirmpassword]);
    

    
    return (
        <>
      <Form>
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

        {userSession.rol === "Administrador" && (
          <Form.Group className="mb-3" controlId="formBasicRol">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              placeholder="Rol"
              value={enteredrol}
              onChange={rolHandler}
            >
              <option value="Cliente" >Cliente</option>
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

        {userSession.rol === "Administrador" &&(
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
        )}

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
                handleGuardartUsuario(usuario);
            }}
          >
            Guardar cambios
          </Button>
        ) : (
          <Button variant="success" onClick={()=>alert("Ingrese sus datos correctamente!")}>Guardar cambios</Button>
        )}
      </Form>
    </>
    )
}

export default DatosUsuario
