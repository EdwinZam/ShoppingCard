import { ICartProduct } from "../interfaces/cart";
import { CartState } from "./";

type CartActionType =
  | { type: "Cart - Load"; payload: ICartProduct[] }
  | { type: "Cart - Update products in cart"; payload: ICartProduct[] }
  | { type: "Cart - Change cart quantity"; payload: ICartProduct }
  | { type: "Cart - Remove product in cart"; payload: ICartProduct }
  | {
      type: "Cart - Update order sumary";
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "Cart - Load":
      return {
        ...state,
      };
    case "Cart - Update products in cart":
      return {
        ...state,
        cart: [...action.payload],
      };
    case "Cart - Change cart quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product.slug !== action.payload.slug) return product;
          return action.payload;
        }),
      };
    case "Cart - Remove product in cart":
      return {
        ...state,
        cart: state.cart.filter(
          (product) => !(product.slug === action.payload.slug)
        ),
      };
    case "Cart - Update order sumary":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
