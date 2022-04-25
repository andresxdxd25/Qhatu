import React from 'react'

function Producto({producto}) {

    return (
        <>
            <td>{producto.categoriaId}</td>
            <td>{producto.descripcion}</td>
            <td>{producto.marca}</td>
            <td>{producto.medida}</td>
            <td>{producto.nombre}</td>
            <td><img src={`data:image/jpeg;base64,${producto.foto}`}/></td>
            <td>{producto.productoId}</td>
        </>
    )
}

export default Producto
