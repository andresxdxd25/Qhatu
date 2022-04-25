import React from "react";

function Compra({ compra }) {
  const fecha = compra.fechaFact;
  const fechaResponse = fecha.split(" ")[0];
  const horaResponse = fecha.split(" ")[1].substring(0,8);
  const fechaArray = fechaResponse.split("-");
  const dia =fechaArray[2];
  const mes = fechaArray[1];
  const anio = fechaArray[0];
  return (
    <>
      <td>{compra.facturaId}</td>
      <td>{compra.tienda}</td>
      <td>{compra.producto}</td>
      <td>{compra.marca}</td>
      <td>{compra.descripcion}</td>
      <td>{compra.cantidad}</td>
      <td>{compra.monto.toFixed(2)}</td>

      <td>{dia + "/" + mes + "/" + anio + " " + horaResponse}</td>
    </>
  );
}

export default Compra;
