import React, { useState } from "react";

const CartContext = React.createContext();

function CartProvider({ children }) {
  const [listaProdCart, setListaProdCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const [totalCarrito, setTotalCarrito] = useState(0);

  const removeOneUnit = (ids) => {
    const tpRepetido = listaProdCart.findIndex(
      (prod) =>
        prod.tiendaId === ids.tiendaId && prod.productoId === ids.productoId
    );

    listaProdCart[tpRepetido].cantidad -= 1;
    console.log("CANTIDAD: "+listaProdCart[tpRepetido].cantidad)
    setTotalCarrito(totalCarrito - listaProdCart[tpRepetido].precio);
    setCartCount(cartCount - 1);
    if (listaProdCart[tpRepetido].cantidad === 0) {
      listaProdCart.splice(tpRepetido, 1);
    } else {
      listaProdCart[tpRepetido].total =
        listaProdCart[tpRepetido].precio * listaProdCart[tpRepetido].cantidad;
    }
  };

  const addValue = (tp) => {
    const tpRepetido = listaProdCart.findIndex(
      (prod) =>
        prod.tiendaId === tp.tiendaId && prod.productoId === tp.productoId
    );

    //console.log(tpRepetido);
    if (tpRepetido !== -1) {
      listaProdCart[tpRepetido].cantidad += 1;
      listaProdCart[tpRepetido].total =
      listaProdCart[tpRepetido].precio * listaProdCart[tpRepetido].cantidad;
      setTotalCarrito(totalCarrito + listaProdCart[tpRepetido].precio);
    } else {
      const cantidad = 1;
      const total = tp.precio;
      setListaProdCart([...listaProdCart, { ...tp, cantidad, total }]);
      setTotalCarrito(totalCarrito + total);
    }

    setCartCount(cartCount + 1);
    //CORREGIR CARRITO
  };

  const limpiarCarrito = () => {
    setListaProdCart([]);
    setCartCount(0);
    setTotalCarrito(0);
    localStorage.clear();
  };

  return (
    <CartContext.Provider
      value={{
        addValue,
        removeOneUnit,
        cartCount,
        listaProdCart,
        totalCarrito,
        limpiarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
