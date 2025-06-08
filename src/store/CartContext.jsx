import { act, createContext, useReducer } from "react";
import CartContextConstants from "./CartContextConstants";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (item) => {},
  calculateTotal: (items) => {},
});

function cartReducer(state, action) {
  const existingCartItemIndex = getExistingCartItemIndex(state, action);
  const updatedItems = [...state.items];

  if (action.type === CartContextConstants.ADD_ITEM) {
    if (!updateItem(action, state, existingCartItemIndex, updatedItems)) {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
  }

  if (action.type === CartContextConstants.REMOVE_ITEM) {
    updateItem(action, state, existingCartItemIndex, updatedItems);
  }

  return { ...state, items: updatedItems };
}

function updateItem(action, state, existingCartItemIndex, updatedItems) {
  if (existingCartItemIndex > -1) {
    const actionNumber = action.type === CartContextConstants.ADD_ITEM ? 1 : -1;
    const existingItem = state.items[existingCartItemIndex];

    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + actionNumber,
    };

    if (
      action.type === CartContextConstants.REMOVE_ITEM &&
      updatedItem.quantity === 0
    ) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return true;
  }
  return false;
}

function getExistingCartItemIndex(state, action) {
  return state.items.findIndex((item) => item.id === action.item.id);
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: CartContextConstants.ADD_ITEM, item });
  }

  function removeItem(item) {
    dispatchCartAction({ type: CartContextConstants.REMOVE_ITEM, item });
  }

  function calculateTotal() {
    return cart.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    calculateTotal,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
