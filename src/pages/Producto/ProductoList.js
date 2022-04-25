import React from "react";
import Producto from "./Producto";

function ProductoList({ productos }) {
  return (
    <>
      {productos.map((producto) => (
        <tr>
          <Producto key={producto.productoId} producto={producto}></Producto>
        </tr>
      ))}
    </>
  );
}

export default ProductoList;
