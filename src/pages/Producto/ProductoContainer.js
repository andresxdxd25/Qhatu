import Button from '@restart/ui/esm/Button';
import React,{useState} from 'react'
import ProductoList from './ProductoList';

function ProductoContainer() {

    const [listaProducto,setListaProducto] = useState([]);
    

    async function handleGetProductos(){
        const response = await fetch(`http://localhost:57296/api/Producto`,{

            headers:{
                'Authorization': 'Basic YWRtaW4xMjM6YWRtaW4xMjM=',
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        setListaProducto(data);
        
        
    }



    return (
        <div>
            
            <Button onClick={handleGetProductos}>Obtener productos</Button>
            <table>
                <thead>
                    <tr>
                        <th>CategoriaId</th>
                        <th>Descripcion</th>
                        <th>Marca</th>
                        <th>Medida</th>
                        <th>Nombre</th>
                        <th>Foto</th>
                        <th>ProductoId</th>
                    </tr>
                </thead>
                <tbody>
                        <ProductoList productos={listaProducto}></ProductoList>
                </tbody>
                
                
            </table>
        </div>
    )
}

export default ProductoContainer
