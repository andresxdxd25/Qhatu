import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { CartContext } from "../../components/Context/CartContext";
import { UserContext } from "../../components/Context/UserContext";

import CarritoItem from "./CarritoItem";

function Carrito() {
  const { cartCount,limpiarCarrito } = useContext(CartContext);
  const { listaProdCart } = useContext(CartContext);
  const { totalCarrito } = useContext(CartContext);
  const {userSession}=useContext(UserContext);
  
    //CREA LA FACTURA, necesita usuarioId, fecha
    //RETORNA EL NÚMERO DE FACTURA (facturaId)
    const usuarioId = (userSession)?(userSession.usuarioId):0;

    const datoFact = {
        usuarioId:usuarioId,
        fechaFact:new Date()
    }

    const CrearFactura = async(datoFactura)=>{
      console.log("FECHA: "+datoFactura.fechaFact)
        const response = await fetch('http://localhost:57296/api/Factura',{
          method:'POST',
          headers:{
            'Authorization': 'Basic YWRtaW4xMjM6YWRtaW4xMjM=',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(datoFactura)
        })
  
        const data = await response.json();
        console.log("Factura: "+data)
        return data;
    }

    const LlenarFactura = async(datoFactura,listaCarrito)=>{
        
        listaCarrito.map(item=>{
            const detfact={
                facturaId: datoFactura,
                tiendaId: item.tiendaId,
                productoId: item.productoId,
                cantidad: item.cantidad,
                monto: item.total
            }
            LlenarFacturaItem(detfact);
        });
    }

    const LlenarFacturaItem = async(detalleFactura)=>{
        
        const response = await fetch('http://localhost:57296/api/DetalleFactura',{
          method:'POST',
          headers:{
            'Authorization': 'Basic YWRtaW4xMjM6YWRtaW4xMjM=',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(detalleFactura)
        })
  
        const data = await response.json();
        console.log(data)
    }

    const ConfirmarCompra=async(datoFactura,listaCarrito)=>{
        const facturaId = await CrearFactura(datoFactura);
        LlenarFactura(facturaId,listaCarrito);
        limpiarCarrito();
        alert("Venta exitosa!");
    };

    //REGISTRA EL NUMERO DE FACTURA(facturaId), tiendaId, productoId, cantidad y monto


  return (
    <>
      {cartCount===0? (
        <>
        <Table className="TablaData">
          <thead>
            <tr>
              <th>Carrito de compras</th>
            </tr>
          </thead>
        </Table>
        <div>
            El carrito está vacío!
        </div>
        </>
      ): (
        <>
          <Table className="TablaData">
            <thead>
              <tr>
                <th>Carrito de compras</th>
              </tr>
              <tr style={{ textAlign: "center" }}>
              <th style={{ textAlign: "left" }}>Tienda</th>
                <th>Producto</th>
                <th>Marca</th>
                <th>Detalle</th>
                <th>Precio (S/.)</th>
                <th>Cantidad</th>
                <th>Total (S/.)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listaProdCart.map((prod) => (
                <tr style={{ textAlign: "center" }} key={prod.TiendaId + "-" + prod.productoId}>
                  <CarritoItem item={prod} />
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="divTotal" style={{ textAlign: "right" }}>
            Total parcial: S/.{(totalCarrito * 0.82).toFixed(2)}
            <br />
            I.G.V: S/.{(totalCarrito * 0.18).toFixed(2)}
            <br />
            Total: S/.{totalCarrito.toFixed(2)}
            <br />
            <br />
            <Button variant="success" onClick={()=>ConfirmarCompra(datoFact,listaProdCart)}>Confirmar compra</Button>
          </div>
        </>
      )}
    </>
  );
}

export default Carrito;