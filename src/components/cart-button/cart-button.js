import React from "react";
import classes from "./cart-button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartButton = ({ itemsCount }) => {
  return (
    <div className={classes.CartButton}>
      <span className={classes.Count}>{itemsCount}</span>
      <button className={classes.Button}>
        <FontAwesomeIcon icon="shopping-cart" />
      </button>
    </div>
  );
};

export default CartButton;
