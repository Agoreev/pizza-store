import React from "react";
import classes from "./pizza-item.module.css";

const PizzaItem = ({ pizza }) => {
  const { name, description, img, price } = pizza;
  return (
    <article className={classes.Pizza}>
      <main className={classes.Main}>
        <img className={classes.Image} src={img} alt={name} />
        <h2 className={classes.Name}>{name}</h2>
        <p className={classes.Description}>{description}</p>
      </main>
      <footer className={classes.Footer}>
        <span className={classes.Price}>{price}</span>
        <button className="btn btn_normal">I want this</button>
      </footer>
    </article>
  );
};

export default PizzaItem;
