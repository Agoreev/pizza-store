import React from "react";
import classes from "./pizza-controls.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PizzaControls = ({ count, onRemoveFromCart, onChangeCount, pizzaId }) => {
  return (
    <div className={classes.PizzaControls}>
      <button
        className="icon-button"
        onChangeCount={() => onChangeCount(pizzaId, -1)}
      >
        <FontAwesomeIcon icon="minus" />
      </button>
      <span>{count}</span>
      <button
        onChangeCount={() => onChangeCount(pizzaId, 1)}
        className="icon-button"
      >
        <FontAwesomeIcon icon="plus" />
      </button>
      <button
        onRemoveFromCart={() => onRemoveFromCart(pizzaId)}
        className="icon-button"
      >
        <FontAwesomeIcon icon="trash-alt" />
      </button>
    </div>
  );
};

export default PizzaControls;
