import React from "react";
import classes from "./price.module.css";

const Price = ({ price, rate, currency }) => {
  return (
    <span className={classes.Price}>
      {currency === "$" ? (price * 1).toFixed(2) : (price * rate).toFixed(2)}
      {"\u00A0" + currency}
    </span>
  );
};

export default Price;
