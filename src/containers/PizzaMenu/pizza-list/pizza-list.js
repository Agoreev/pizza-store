import React from "react";
import PizzaItem from "./pizza-item";
import classes from "./pizza-list.module.css";

const PizzaList = ({ data, currency, eurRate, cartItems }) => {
  const list = data.pizzas.map((pizza) => {
    return (
      <PizzaItem
        pizza={pizza}
        key={pizza._id}
        currency={currency}
        eurRate={eurRate}
        cartItem={cartItems.find((item) => item.pizzaId === pizza._id)}
      />
    );
  });
  return <div className={classes.PizzaList}>{list}</div>;
};

export default PizzaList;
