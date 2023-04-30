import { createContext } from "react";
import { ICartProduct } from "../interfaces/cart";

interface ContextProps {
  cart: ICartProduct[];
  subTotal: number;
  tax: number;
  total: number;
  numberOfItems: number;
  //Methos
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
