import React, { useState, useContext,useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { CartContext } from "../../components/Context/CartContext";

function TiendaProducto({ tiendaproducto, producto, tienda }) {
  const contadorHandler = (evt) => {
    setContador(evt.target.value);
  };

  const { cartCount, addValue } = useContext(CartContext);
  const [contador, setContador] = useState(0);
  const { removeOneUnit } = useContext(CartContext);

  
  const removeOneProduct=(tiendaIdCar,productoIdCar)=>{
    const ids={
        tiendaId:tiendaIdCar,
        productoId:productoIdCar
    }
    setContador(contador - 1);
    
    if (contador===0) {
      localStorage.removeItem(`producto-${tiendaIdCar}-${productoIdCar}`);
    }
    else{
      localStorage.setItem(`producto-${tiendaIdCar}-${productoIdCar}`,JSON.stringify(contador));
    }
    removeOneUnit(ids);
}

  const addProductToCart = (tp, p, t) => {
    // console.log("Cantidad: "+tp.cantidad)
     if (contador < tp.stock) {
      setContador(contador + 1);
      const tiendaprod = {
        tiendaId: tp.tiendaId,
        productoId: tp.productoId,
        nombreProd: p.nombre,
        marca: p.marca,
        descripcion: p.descripcion,
        nombreTienda: t.nombre,
        precio: tp.precio,
        foto: p.foto,
      };
      addValue(tiendaprod);
    }
  };

  useEffect(() => {
    const storedItem = JSON.parse(localStorage.getItem(`producto-${tienda.tiendaId}-${producto.productoId}`));
    if (storedItem) {
      setContador(parseInt(storedItem));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(`producto-${tienda.tiendaId}-${producto.productoId}`,JSON.stringify(contador));
  },[contador])

  return (
    <>
      <>
        <Card className="CardProd">
          <img
            src={`data:image/jpeg;base64,${producto.foto}`}
            style={{ width: "18rem" }}
          />
          <Card.Body>
            <Card.Title>{producto.nombre}</Card.Title>
            <Card.Subtitle>Marca: {producto.marca}</Card.Subtitle>
            <Card.Text>
              Detalle: {producto.descripcion}
              <br />
              Tienda: {tienda.nombre}
              <br />
              Stock: {tiendaproducto.stock}
              <br />
              Precio: S/.{tiendaproducto.precio.toFixed(2)}
            </Card.Text>
          </Card.Body>
        </Card>
        {contador === 0 && (
          <Button
            variant="primary"
            onClick={() => addProductToCart(tiendaproducto, producto, tienda)}
          >
            Al carrito!
          </Button>
        )}
        {contador !== 0 && (
          <>
            <button
              className="btnProducto"
              variant="success"
              onClick={() => addProductToCart(tiendaproducto, producto, tienda)}
            >
              ➕
            </button>
            <input
              className="txtProducto"
              disabled={true}
              type="text"
              value={contador}
              onChange={() => contadorHandler()}
            ></input>
            <button
              className="btnProducto"
              type="button"
              onClick={() =>
                removeOneProduct(tienda.tiendaId,producto.productoId)
              }
            >
              ➖
            </button>
          </>
        )}
      </>
    </>
  );
}

export default TiendaProducto;
