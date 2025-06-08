import { useContext } from "react";
import Modal from "../Modal/Modal.jsx";
import CartContext from "../../store/CartContext.jsx";
import Input from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";
import UserProgressContext from "../../store/UseProgressContext.jsx";
import { validateForm } from "./checkoutFormValidation.js";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.calculateTotal();

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(document.querySelector("#checkout-form"));
    const userInput = Object.fromEntries(fd.entries());
    const validationState = validateForm(userInput);

    if (!validationState.isValid) {
      for (let field in validationState) {
        if (field !== "isValid") {
          let element = document.querySelector("#" + field);

          if (element) {
            let error = validationState[field].error || "";
            element.setCustomValidity(error);
            element.reportValidity();
          }
        }
      }
      return;
    }

    window.location.reload();
  }

  return (
    <Modal open={userProgressCtx.isCheckout()}>
      <form id="checkout-form">
        <h2>Checkout</h2>
        <p>Total Amount: {cartTotal}</p>

        <Input label="Full Name" type="text" id="name" required />
        <Input label="Email" type="email" id="email" required />
        <Input label="Street" type="text" id="street" required />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postalCode" required />
          <Input label="City" type="text" id="city" required />
        </div>
        <p className="modal-actions">
          <Button textOnly type="button" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSubmit}>Submit order</Button>
        </p>
      </form>
    </Modal>
  );
}
