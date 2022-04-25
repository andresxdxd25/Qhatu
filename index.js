import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { CartProvider } from "./components/Context/CartContext";
import {UserProvider} from "./components/Context/UserContext"

import IniciarSesion from "./pages/Adicional/IniciarSesion";
import RegistroUsuario from "./pages/Usuario/RegistroUsuario";
import ProductoContainer from "./pages/Producto/ProductoContainer";
import Carrito from "./pages/Carrito/Carrito";
import TiendaProductoContainer from "./pages/TiendaProducto/TiendaProductoContainer";
import NavbarSide from "./components/NavbarSide";
import NavbarTop from "./components/NavbarTop";
import ComprasContainer from "./pages/Compras/ComprasContainer";
import DatosUsuario from "./pages/Usuario/DatosUsuario";
import TiendaProductoContainerFlex from "./pages/TiendaProducto/TiendaProductoContainerFlex";

function App() {
  return (
    <Router>
      <UserProvider>
      <CartProvider>
        <div className="contenedorPage">
          <Switch>
            <Route exact path="/" component={IniciarSesion} />
            <Route exact path="/registrousuario" component={RegistroUsuario} />
          </Switch>
          <header>
            <NavbarTop />
          </header>
          <aside>
            <NavbarSide />
          </aside>
          <div className="PanelPrincipal">
            <table className="TablaData">
              <tbody>
                <tr>
                  <td>
                    <Switch>
                      <Route
                        exact
                        path="/principal"
                        component={TiendaProductoContainerFlex}
                      />
                      <Route
                        exact
                        path="/productos"
                        component={ProductoContainer}
                      />
                      <Route exact path="/carrito" component={Carrito} />
                      <Route
                        exact
                        path="/compras"
                        component={ComprasContainer}
                      />
                      <Route exact path="/misdatos" component={DatosUsuario} />
                    </Switch>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
