import React, { useEffect, useContext, useState } from "react";
import { Table } from "react-bootstrap";
import { UserContext } from "../../components/Context/UserContext";
import ComprasList from "./ComprasList";

function ComprasContainer() {
  const [listaCompras, setListaCompras] = useState([]);
  const { userSession } = useContext(UserContext);
  const [listaProductos, setListaProductos] = useState([]);
  const [listaTiendas, setListaTiendas] = useState([]);

  const ObtenerFacturas = async (userId) => {
    const responseFactura = await fetch(
      `http://localhost:57296/api/Factura/${userId}`,
      {
        method: "GET",
        headers: {
          "Authorization": "Basic YWRtaW4xMjM6YWRtaW4xMjM=",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await responseFactura.json();

    //console.log(data);
    const listaProductos = await ObtenerProductos();
    const listaTiendas = await ObtenerTiendas();

    const listaDetalleFacturas = data.map(async (fact) => {

      const detFact = await ObtenerDetalleFacturas(fact.facturaId);
      
      detFact.map((det) => {
        const producto = listaProductos.find(x=>x.productoId===det.productoId);
        const tienda = listaTiendas.find(x=>x.tiendaId===det.tiendaId).nombre;
        det.producto=producto.nombre;
        det.tienda=tienda;
        det.marca=producto.marca;
        det.descripcion=producto.descripcion;
        setListaCompras((miLista) => {
          return [
            ...miLista,
            { ...det, fechaFact: fact.fechaFact.replace("T", " ") },
          ];
        });
      });
    });
  };

  const ObtenerDetalleFacturas = async (facturaId) => {
    const responseDetalleFactura = await fetch(
      `http://localhost:57296/api/DetalleFactura/${facturaId}`,
      {
        method: "GET",
        headers: {
          "Authorization": "Basic YWRtaW4xMjM6YWRtaW4xMjM=",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await responseDetalleFactura.json();
    return data;
  };

  const ObtenerProductos = async ()=>{
    const responseProducto = await fetch(
      `http://localhost:57296/api/Producto`,
      {
        method: "GET",
        headers: {
          "Authorization": "Basic YWRtaW4xMjM6YWRtaW4xMjM=",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await responseProducto.json();
    return data;
  }

  const ObtenerTiendas = async ()=>{
    const responseTienda = await fetch(
      `http://localhost:57296/api/Tienda`,
      {
        method: "GET",
        headers: {
          "Authorization": "Basic YWRtaW4xMjM6YWRtaW4xMjM=",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await responseTienda.json();
    return data;
  }

  useEffect(async () => {
    setListaCompras([]);
    const usuarioId = userSession ? userSession.usuarioId : 0;
    await ObtenerFacturas(usuarioId);
    
  }, []);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Factura</th>
            <th>Tienda</th>
            <th>Producto</th>
            <th>Marca</th>
            <th>Descripcion</th>
            <th>Cantidad</th>
            <th>Monto</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <ComprasList compras={listaCompras} />
        </tbody>
      </Table>
    </div>
  );
}

export default ComprasContainer;
