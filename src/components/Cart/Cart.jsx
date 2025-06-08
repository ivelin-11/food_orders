import { useContext } from "react";
import Modal from "../Modal/Modal.jsx";
import CartContext from "../../store/CartContext.jsx";
import { bgCurrencyFormatter } from "../../util/formatting.js";
import Button from "../Button/Button.jsx";
import UseProgressContext from "../../store/UseProgressContext.jsx";
import CartItem from "../CartItem/CartItem.jsx";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UseProgressContext);

  const cartTotal = cartCtx.calculateTotal();

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.isCart()}
      onClose={userProgressCtx.isCart() ? handleCloseCart : null}
    >
      <h2>Your cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">{bgCurrencyFormatter.format(cartTotal)}</p>
      <p className="modala-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
