import React, { useState } from "react";
import TiendaProducto from "./TiendaProducto";

function TiendaProductoList({ productos, tiendaproductos, tiendas }) {
  

  return (
    <>
      {tiendaproductos.map((tp) => {
        const productoElegido = productos.find(
          (p) => p.productoId === tp.productoId
        );
        const tiendaElegida = tiendas.find((t) => t.tiendaId === tp.tiendaId);
        const llave = tp.tiendaId + "-" + tp.productoId;
        return (
            // <tr key={llave}>
            //   <TiendaProducto
            //     key={llave}
            //     tiendaproducto={tp}
            //     producto={productoElegido}
            //     tienda={tiendaElegida}
            //   ></TiendaProducto>
            // </tr>
            <div key={llave} className="divProductosChild">
              <TiendaProducto
                key={llave}
                tiendaproducto={tp}
                producto={productoElegido}
                tienda={tiendaElegida}
              ></TiendaProducto>
            </div>
        );
      })}
    </>
  );
}

export default TiendaProductoList;
