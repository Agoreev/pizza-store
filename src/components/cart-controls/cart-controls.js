import React from "react";
import classes from "./cart-controls.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartControls = ({ count, toggleCart, pizzaId, price }) => {
  return (
    <div className={classes.PizzaControls}>
      <button
        className="icon-button"
        onClick={() =>
          toggleCart({ variables: { pizzaId, count: count - 1, price } })
        }
      >
        <FontAwesomeIcon icon="minus" />
      </button>
      <span className={classes.Count}>{count}</span>
      <button
        onClick={() =>
          toggleCart({ variables: { pizzaId, count: count + 1, price } })
        }
        className="icon-button"
      >
        <FontAwesomeIcon icon="plus" />
      </button>
      <button
        onClick={() => toggleCart({ variables: { pizzaId, count: 0, price } })}
        className="icon-button"
      >
        <FontAwesomeIcon icon="trash-alt" />
      </button>
    </div>
  );
};

export default CartControls;
