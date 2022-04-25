import React,{useContext} from 'react'
import {Button} from 'react-bootstrap'
import { CartContext } from '../../components/Context/CartContext'

function CarritoItem({item}) {

    const {cartCount,removeOneUnit}=useContext(CartContext)

    const removeOneProduct=(tiendaIdCar,productoIdCar)=>{
        const ids={
            tiendaId:tiendaIdCar,
            productoId:productoIdCar
        }
        localStorage.setItem(`producto-${tiendaIdCar}-${productoIdCar}`,JSON.stringify(item.cantidad-1));
        removeOneUnit(ids);
    }

    return (
        <>
            <td style={{textAlign:"left"}}>{item.nombreTienda}</td>
            <td>{item.nombreProd}</td>
            <td>{item.marca}</td>
            <td>{item.descripcion}</td>
            <td>{item.precio.toFixed(2)}</td>
            <td>{item.cantidad}</td>
            <td>{item.total.toFixed(2)}</td>
            <td><Button variant="warning" onClick={()=>removeOneProduct(item.tiendaId,item.productoId)}>➖</Button></td>
        </>
    )
}

export default CarritoItem
