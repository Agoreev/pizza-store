import React from "react";
import classes from "./cart-button.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartButton = ({ itemsCount }) => {
  return (
    <div className={classes.CartButton}>
      <span className={classes.Count}>{itemsCount}</span>
      <Link to="/cart" className={classes.Button}>
        <FontAwesomeIcon icon="shopping-cart" />
      </Link>
    </div>
  );
};

export default CartButton;
