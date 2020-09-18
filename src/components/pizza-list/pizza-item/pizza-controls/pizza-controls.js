import React from "react";
import classes from "./pizza-controls.module.css";

const PizzaControls = ({ count, onRemoveFromCart, onChangeCount, pizzaId }) => {
  return (
    <div className={classes.PizzaControls}>
      <button
        onChangeCount={() => onChangeCount(pizzaId, -1)}
        disabled={count <= 1}
      >
        -
      </button>
      <span>{count}</span>
      <button onChangeCount={() => onChangeCount(pizzaId, 1)}>+</button>
      <button onRemoveFromCart={() => onRemoveFromCart(pizzaId)}>X</button>
    </div>
  );
};

export default PizzaControls;
