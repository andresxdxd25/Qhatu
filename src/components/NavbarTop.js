import React, { useContext } from "react";
import { Container, Button, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartContext } from "./Context/CartContext";

function NavbarTop() {

    const {cartCount}=useContext(CartContext);

  return (
    <div className="NavbarTop">
      <Navbar bg="dark" variant="dark">
      <div className="NavbarTopComponentes">
        <Navbar.Brand>EDAS Store</Navbar.Brand>
        <Link to={"/carrito"}>
          <Button>Carrito: {cartCount} items</Button>
        </Link>
      </div>
    </Navbar>
    </div>
  );
}

export default NavbarTop;
