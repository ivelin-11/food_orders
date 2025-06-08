import { createContext, useState } from "react";
import UserProgressConstants from "./UserProgressConstants.js";
const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  isCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
  isCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress(UserProgressConstants.CART);
  }

  function hideCart() {
    setUserProgress("");
  }

  function isCart() {
    return userProgress === UserProgressConstants.CART;
  }

  function showCheckout() {
    setUserProgress(UserProgressConstants.CHECKOUT);
  }

  function hideCheckout() {
    setUserProgress("");
  }

  function isCheckout() {
    return userProgress === UserProgressConstants.CHECKOUT;
  }

  const userProgressCxt = {
    progress: userProgress,
    showCart,
    hideCart,
    isCart,
    showCheckout,
    hideCheckout,
    isCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressCxt}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
