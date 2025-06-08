import { useContext } from "react";
import { bgCurrencyFormatter } from "../../util/formatting";
import Button from "../Button/Button";
import CartContext from "../../store/CartContext";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleItemToCard() {
    cartCtx.addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={meal.image} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {bgCurrencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleItemToCard}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
