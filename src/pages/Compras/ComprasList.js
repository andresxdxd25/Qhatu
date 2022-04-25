import React, { useEffect, useState } from "react";
import Compra from "./Compra";

function ComprasList({ compras }) {
  const [comprasOrden, setComprasOrden] = useState([]);

  useEffect(() => {
    setComprasOrden(compras.sort((a, b) => {
        if(a.facturaId>b.facturaId) return -1;
        if(a.facturaId<b.facturaId) return 1;
        return 0;
    }));
  }, [compras]);

  return (
    <>
      {comprasOrden.map((compra) => (
        <tr
          key={
            compra.facturaId + "-" + compra.tiendaId + "-" + compra.productoId
          }
        >
          <Compra
            key={
              compra.facturaId + "-" + compra.tiendaId + "-" + compra.productoId
            }
            compra={compra}
          />
        </tr>
      ))}
    </>
  );
}

export default ComprasList;
