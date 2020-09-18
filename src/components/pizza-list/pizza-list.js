import React from "react";
import PizzaItem from "./pizza-item";
import classes from "./pizza-list.module.css";

const PizzaList = ({ data }) => {
  const list = data.pizzas.map((pizza) => {
    return <PizzaItem pizza={pizza} key={pizza._id} />;
  });
  return <div className={classes.PizzaList}>{list}</div>;
};

export default PizzaList;
