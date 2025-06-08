import Checkout from "./components/Checkout/Checkout.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Header from "./components/Header/Header.jsx";
import Meals from "./components/Meals/Meals.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UseProgressContext.jsx";

function App() {
  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;
