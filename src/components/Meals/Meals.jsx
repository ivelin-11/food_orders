import initialMeals from "../../data/available-meals.json";
import { useState, useEffect } from "react";
import sleep from "../../util/sleep.js";
import MealItem from "../MealItem/MealItem.jsx";
import Spinner from "../Spinner/Spinner.jsx";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function getMeals() {
      await sleep(3000);
      setLoadedMeals([...initialMeals]);
    }

    getMeals();
  }, []);

  const spinnerStyle = { borderTopColor: "#ffc404", marginLeft: "50%" };

  return (
    <ul id="meals">
      {loadedMeals.length > 0 ? (
        loadedMeals.map((meal) => <MealItem key={meal.id} meal={meal} />)
      ) : (
        <Spinner styleProp={spinnerStyle} />
      )}
    </ul>
  );
}
