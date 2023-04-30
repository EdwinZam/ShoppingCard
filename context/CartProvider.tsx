import { FC, useEffect, useReducer } from "react";
import { CartContext, cartReducer } from "./";
import { ICartProduct } from "../interfaces/cart";

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

type Props = {
  children?: React.ReactNode;
};

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );
    const taxRate = 0.19;

    const orderSumary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    dispatch({ type: "Cart - Update order sumary", payload: orderSumary });
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p.slug === product.slug);
    if (!productInCart)
      return dispatch({
        type: "Cart - Update products in cart",
        payload: [...state.cart, product],
      });
    // Acumular
    const updateProducts = state.cart.map((p) => {
      if (p.slug !== product.slug) return p;
      //Actualizar la cantidad
      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: "Cart - Update products in cart",
      payload: updateProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: "Cart - Change cart quantity", payload: product });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: "Cart - Remove product in cart", payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        //Methos
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
