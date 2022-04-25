import React,{useState,useEffect} from 'react'
import TiendaProductoList from './TiendaProductoList'
import { Table } from 'react-bootstrap';

import "./TiendaProducto.css";

function TiendaProductoContainerFlex() {

    const [listaTiendaProducto,setListaTiendaProducto] = useState([]);
    const [listaProducto,setListaProducto]=useState([]);
    const [listaTienda,setListaTienda]=useState([]);

    async function handleGetTiendaProductos (){
        const response = await fetch(`http://localhost:57296/api/TiendaProducto`,{

            headers:{
                'Authorization': 'Basic YWRtaW4xMjM6YWRtaW4xMjM=',
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        setListaTiendaProducto(data);
        console.log(data);
    }

    async function handleGetTiendas(){
        const response = await fetch(`http://localhost:57296/api/Tienda`,{

            headers:{
                'Authorization': 'Basic YWRtaW4xMjM6YWRtaW4xMjM=',
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        setListaTienda(data);
        //console.log(data);
    }

    async function handleGetProductos(){
        const response = await fetch(`http://localhost:57296/api/Producto`,{

            headers:{
                'Authorization': 'Basic YWRtaW4xMjM6YWRtaW4xMjM=',
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        setListaProducto(data);
        //console.log(data);
    }

    async function retornoValores(){
        await handleGetProductos();
        await handleGetTiendas();
        await handleGetTiendaProductos();
    }

    useEffect(() => {
        retornoValores();
    }, [])

    return (
        <div className='divProductos'>
                {listaTiendaProducto && listaTienda && listaProducto  && <TiendaProductoList productos={listaProducto} tiendas={listaTienda} tiendaproductos={listaTiendaProducto}/>}
        </div>
    )
}

export default TiendaProductoContainerFlex
